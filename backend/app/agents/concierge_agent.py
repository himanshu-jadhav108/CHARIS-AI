import json
import time
from typing import Dict, Any, List, Tuple
from sqlalchemy.orm import Session
from app.schemas.chat import PreferencesState, ChatMessage
from app.services.ai_service import ai_service
from app.services.emotion_engine import emotion_engine
from app.services.recipient_profile_engine import recipient_profile_engine
from app.services.user_memory_service import user_memory_service
from app.services.context_builder import ContextBuilder
from app.services.conversation_summary import ConversationSummaryService
from app.services.prompt_builder import PromptBuilder
from app.services.response_validator import ResponseValidator
from app.services.luxury_formatter import LuxuryFormatter
from app.services.observability import ObservabilityTracker

class ConciergeAgent:
    """
    Sovereign AI Concierge Agent coordinating dialogue manager, emotion engine,
    recipient profiler, user memory, and Gemini AIService provider through
    ContextBuilder, ConversationSummary, PromptBuilder, ResponseValidator, and LuxuryFormatter.
    """

    DYNAMIC_QUESTIONS = [
        {
            "field": "recipient",
            "keywords": ["for", "recipient", "who"],
            "question": "To begin our journey, who is this extraordinary gift for? (e.g. your partner, spouse, parent, a cherished friend, or a distinguished executive)",
            "quick_replies": ["My Wife / Partner", "My Husband / Partner", "My Mother", "My Father", "Key Business Leader / Executive", "Self-Reward"]
        },
        {
            "field": "occasion",
            "keywords": ["occasion", "celebration", "why"],
            "question": "What grand celebration or milestone are we commemorating today?",
            "quick_replies": ["Diwali Royal Celebration", "Wedding Anniversary", "Milestone Birthday", "Royal Wedding / Engagement", "Griha Pravesh (Housewarming)", "Raksha Bandhan"]
        },
        {
            "field": "budget",
            "keywords": ["budget", "price", "spend", "cost", "₹", "rs", "rupee", "lakh"],
            "question": "What investment budget tier do you have in mind for this bespoke curation?",
            "quick_replies": ["₹75,000 - ₹2,50,000", "₹2,50,000 - ₹10,00,000", "₹10,00,000 - ₹50,00,000", "₹50,00,000 - ₹2.5 Cr+"]
        },
        {
            "field": "personality",
            "keywords": ["personality", "character", "vibe", "style"],
            "question": "How would you describe their personal style and aesthetic inclination?",
            "quick_replies": ["Understated Quiet Luxury", "Heritage & Artisanal", "Radiant High Glamour", "Technological Mastery", "Royal Indian Heritage"]
        },
        {
            "field": "desired_emotional_impact",
            "keywords": ["emotion", "feeling", "impact", "feel"],
            "question": "What emotional resonance or feeling do you wish to evoke when they unwrap this gift experience?",
            "quick_replies": ["Breathtaking Love & Devotion", "Deep Gratitude & Reverence", "Quiet Respect & Prestige", "Unbridled Joy & Exhilaration"]
        }
    ]

    def process_turn(
        self, 
        user_message: str, 
        current_prefs: Dict[str, Any], 
        chat_history: List[ChatMessage],
        user_id: str = "guest_vip",
        db: Session = None
    ) -> Tuple[str, Dict[str, Any], Dict[str, Any], Dict[str, Any], bool, List[str]]:
        
        stage_latencies = {}
        
        # 1. Analyze Emotional Intent
        emotion_data = emotion_engine.analyze_emotion(user_message)

        # 2. Extract / Update Recipient Profile
        recipient_profile = recipient_profile_engine.build_profile(user_message, current_prefs.get("recipient_profile"))

        # 3. Update Preferences
        updated_prefs = dict(current_prefs or {})
        text_lower = user_message.lower()

        if "wife" in text_lower or "partner" in text_lower:
            updated_prefs["recipient"] = "Wife / Partner"
            updated_prefs["relationship"] = "Wife"
        elif "husband" in text_lower:
            updated_prefs["recipient"] = "Husband / Partner"
            updated_prefs["relationship"] = "Husband"
        elif "mother" in text_lower or "mom" in text_lower:
            updated_prefs["recipient"] = "Mother"
            updated_prefs["relationship"] = "Mother"
        elif "father" in text_lower or "dad" in text_lower:
            updated_prefs["recipient"] = "Father"
            updated_prefs["relationship"] = "Father"
        elif not updated_prefs.get("recipient"):
            updated_prefs["recipient"] = user_message.strip().title()

        if "₹" in user_message or "lakh" in text_lower or "rs" in text_lower or "budget" in text_lower:
            updated_prefs["budget"] = user_message

        if any(w in text_lower for w in ["diwali", "anniversary", "birthday", "wedding", "housewarming"]):
            updated_prefs["occasion"] = user_message.strip().title()

        updated_prefs["recipient_profile"] = recipient_profile
        updated_prefs["emotion_data"] = emotion_data

        user_turns_count = len([m for m in chat_history if m.sender == "user"]) + 1

        # Check turn completeness
        is_complete = user_turns_count >= 4 or (updated_prefs.get("recipient") and updated_prefs.get("occasion") and updated_prefs.get("budget"))

        if is_complete:
            rec = updated_prefs.get("recipient", "your recipient")
            occ = updated_prefs.get("occasion", "this special celebration")
            
            # Check user memory for past contextual note
            mem_note = user_memory_service.generate_memory_context_note(user_id, rec)
            mem_prefix = f"\n\n({mem_note})" if mem_note else ""

            response = (
                f"Splendid. I have crafted a comprehensive emotional profile for {rec}, "
                f"capturing their intent of {emotion_data['primary_emotion']} for {occ}.{mem_prefix}\n\n"
                f"Allow me to prepare CHARIS's curated luxury gift experiences for you."
            )
            return response, updated_prefs, emotion_data, recipient_profile, True, []

        # Find next dynamic question
        next_q = self.DYNAMIC_QUESTIONS[min(user_turns_count, len(self.DYNAMIC_QUESTIONS) - 1)]
        
        # PIPELINE ORCHESTRATION WITH OBSERVABILITY
        
        # Step 1: Context Builder
        t_start = time.perf_counter()
        context_builder = ContextBuilder(db) if db else None
        context = context_builder.build_context(user_id) if context_builder else {}
        stage_latencies["context_build"] = time.perf_counter() - t_start

        # Step 2: Conversation Summary Service
        t_start = time.perf_counter()
        hist_list = [{"sender": m.sender, "text": m.text} for m in chat_history]
        summary = ConversationSummaryService.generate_summary(hist_list)
        stage_latencies["conv_summary"] = time.perf_counter() - t_start

        # Step 3: Prompt Builder
        t_start = time.perf_counter()
        final_prompt = PromptBuilder.build_prompt(context, summary, user_message)
        stage_latencies["prompt_build"] = time.perf_counter() - t_start

        # Step 4: Gemini Call
        t_start = time.perf_counter()
        hist_str = "\n".join([f"{m.sender}: {m.text}" for m in chat_history[-3:]])
        ai_response = ai_service.generate_concierge_turn(
            final_prompt, 
            hist_str, 
            user_message
        )
        stage_latencies["gemini_call"] = time.perf_counter() - t_start

        # Fallback to dynamic question if AI returned generic string
        if len(ai_response) < 15 or "AI" in ai_response:
            ai_response = f"Understood. {next_q['question']}"

        # Step 5: Response Validator
        t_start = time.perf_counter()
        validator = ResponseValidator([])
        validation_res = validator.validate(ai_response, check_products=False)
        stage_latencies["validation"] = time.perf_counter() - t_start

        if not validation_res["valid"]:
            # Self-healing fallback
            ai_response = f"I appreciate your response. Let us focus on the details: {next_q['question']}"

        # Step 6: Luxury Formatter
        t_start = time.perf_counter()
        formatted_response = LuxuryFormatter.format_response(ai_response)
        stage_latencies["formatting"] = time.perf_counter() - t_start

        # Track observability metrics
        token_usage = {
            "prompt_chars": len(final_prompt),
            "completion_chars": len(formatted_response),
            "estimated_tokens": (len(final_prompt) + len(formatted_response)) // 4
        }
        ObservabilityTracker.track_metrics(
            stage_latencies=stage_latencies,
            token_usage=token_usage,
            metadata={"conversation_id": "current_session", "fallback_used": not validation_res["valid"]}
        )

        return formatted_response, updated_prefs, emotion_data, recipient_profile, False, next_q.get("quick_replies", [])

concierge_agent = ConciergeAgent()
