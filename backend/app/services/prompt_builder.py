import logging
from typing import Dict, Any
from app.prompts.prompt_library import LUXURY_CONCIERGE_SYSTEM_PROMPT

logger = logging.getLogger("charis.observability")

class PromptBuilder:
    @staticmethod
    def build_prompt(
        context: Dict[str, Any],
        summary: Dict[str, Any],
        user_message: str,
        template_name: str = "concierge_turn"
    ) -> str:
        """
        Assembles a highly personalized luxury prompt. Deduplicates parameters and instructs Gemini.
        """
        # Deduplicate values
        recipient = context.get("recipient_name") or summary.get("recipient") or "the recipient"
        relationship = context.get("relationship") or summary.get("relationship") or "valued relation"
        occasion = summary.get("occasion") or "a special milestone"
        budget = summary.get("budget") or "undecided premium budget"
        past_gifts = context.get("past_gifts", [])
        
        past_gifts_str = ", ".join([f"{g['gift']} for {g['occasion']}" for g in past_gifts]) if past_gifts else "None recorded"

        prompt = f"""
{LUXURY_CONCIERGE_SYSTEM_PROMPT}

=========================================
SOVEREIGN CLIENT & RELATIONSHIP CONTEXT
=========================================
- Recipient Name: {recipient}
- Relationship: {relationship}
- Occasion: {occasion}
- Budget Parameter: {budget}
- Past Gifts history: {past_gifts_str}
- Preferred Currency: {context.get('currency', '₹')}
- Luxury Tone Preference: {context.get('luxury_level', 'Quiet Luxury')}

=========================================
CONVERSATION BRIEF
=========================================
- User Preference Notes: {context.get('special_notes') or 'None'}
- Current User Message: "{user_message}"

=========================================
CONCIERGE COMPLIANCE RULES
=========================================
1. Do NOT ask for information already present in the context above (e.g. if we already know the recipient is {recipient}).
2. Reference previous gifts like "{past_gifts_str}" naturally if relevant to build long-term continuity.
3. Keep the tone sophisticated, empathetic, and warm.

Please reply in character as the CHARIS Private Client Director:
"""
        logger.info(f"Built final Gemini prompt. Template: {template_name}. Prompt length: {len(prompt)} chars.")
        return prompt
