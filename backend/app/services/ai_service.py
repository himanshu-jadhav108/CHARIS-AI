import os
import json
from typing import Dict, Any, List, Optional
from app.core.config import settings

class LLMProvider:
    """Abstract Base Interface for LLM Providers (Gemini, Llama, Qwen, Mistral, DeepSeek)."""
    def generate_text(self, system_prompt: str, user_prompt: str) -> str:
        raise NotImplementedError

class GeminiProvider(LLMProvider):
    """Google Gemini API Provider implementation."""
    def __init__(self, api_key: Optional[str] = None):
        self.api_key = api_key or getattr(settings, "GEMINI_API_KEY", None) or os.getenv("GEMINI_API_KEY")
        self._client = None
        if self.api_key:
            try:
                import google.generativeai as genai
                genai.configure(api_key=self.api_key)
                self._client = genai.GenerativeModel("gemini-1.5-flash")
            except Exception as e:
                print(f"Gemini SDK init warning: {e}")

    def generate_text(self, system_prompt: str, user_prompt: str) -> str:
        if self._client:
            try:
                full_prompt = f"{system_prompt}\n\nUSER PROMPT:\n{user_prompt}"
                response = self._client.generate_content(full_prompt)
                if response and response.text:
                    return response.text
            except Exception as err:
                print(f"Gemini API invocation error: {err}")
        
        # Simulated fallback if offline or no key
        return self._simulate_gemini_response(system_prompt, user_prompt)

    def _simulate_gemini_response(self, system_prompt: str, user_prompt: str) -> str:
        """High-quality Mayfair luxury concierge fallback simulation."""
        if "Memory Box" in system_prompt or "Memory Box" in user_prompt:
            return (
                "WHY THIS GIFT MATTERS:\n"
                "This piece was selected to honor deep devotion and artistic distinction. It transcends mere physical material to become a living memory of your shared milestone.\n\n"
                "EMOTIONAL STORY:\n"
                "Like rare gold leaf applied under candlelight, true affection requires patience and rare craft. Presenting this gesture demonstrates how profoundly you value their presence in your life.\n\n"
                "PERSONAL REFLECTION:\n"
                "A heirloom to be passed down across generations, rekindling the warmth of this day every time it is admired."
            )
        elif "Greeting" in system_prompt or "Calligrapher" in system_prompt:
            return (
                "Dearest Beloved,\n\n"
                "To mark this grand occasion, may this handcrafted piece stand as an enduring tribute "
                "to your incomparable grace, joy, and timeless elegance.\n\n"
                "With eternal affection,"
            )
        else:
            return (
                "Splendid choice. I have refined your dossier to reflect their artistic taste and emotional importance. "
                "Allow me to curate CHARIS's top 3 complete luxury gift experiences for you."
            )

class AIService:
    """
    CHARIS AIService Abstraction Layer.
    Coordinates LLM provider invocations for dialogue, emotional explanations, memory box creation,
    and calligraphic gift card messaging.
    """
    def __init__(self, provider: Optional[LLMProvider] = None):
        self.provider = provider or GeminiProvider()

    def generate_concierge_turn(self, system_prompt: str, conversation_history_summary: str, latest_user_msg: str) -> str:
        user_prompt = f"CONVERSATION HISTORY:\n{conversation_history_summary}\n\nLATEST USER TURN:\n{latest_user_msg}"
        return self.provider.generate_text(system_prompt, user_prompt)

    def generate_memory_box(
        self, 
        system_prompt: str, 
        product_name: str, 
        recipient_name: str, 
        occasion: str, 
        primary_emotion: str
    ) -> Dict[str, str]:
        user_prompt = f"Product: {product_name}\nRecipient: {recipient_name}\nOccasion: {occasion}\nPrimary Emotion: {primary_emotion}"
        raw_text = self.provider.generate_text(system_prompt, user_prompt)
        
        # Parse into structured dictionary
        why_it_matters = "Selected to honor deep emotional devotion and artistic distinction."
        emotional_story = "Like gold leaf applied under candlelight, true affection requires patience and rare craft."
        personal_reflection = "A heirloom to be passed down across generations, rekindling warmth whenever admired."
        luxury_presentation = "Unwrap under warm ambient candlelight accompanied by the fragrance of white avalanche roses."

        if "WHY THIS GIFT MATTERS:" in raw_text:
            parts = raw_text.split("EMOTIONAL STORY:")
            why_it_matters = parts[0].replace("WHY THIS GIFT MATTERS:", "").strip()
            if len(parts) > 1:
                story_parts = parts[1].split("PERSONAL REFLECTION:")
                emotional_story = story_parts[0].strip()
                if len(story_parts) > 1:
                    personal_reflection = story_parts[1].strip()

        return {
            "why_this_gift_matters": why_it_matters,
            "emotional_story": emotional_story,
            "personal_reflection": personal_reflection,
            "luxury_presentation": luxury_presentation
        }

ai_service = AIService()
