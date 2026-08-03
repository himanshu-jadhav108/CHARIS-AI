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
        
        # Key validation warning check
        if self.api_key:
            if not self.api_key.startswith("AIzaSy"):
                print("WARNING: The GEMINI_API_KEY in .env does not match the valid Google API Key format (starting with 'AIzaSy'). Using fallback concierge simulator.")
            try:
                import google.generativeai as genai
                genai.configure(api_key=self.api_key)
                self._client = genai.GenerativeModel("gemini-1.5-flash")
            except Exception as e:
                print(f"Gemini SDK init warning: {e}")

    def generate_text(self, system_prompt: str, user_prompt: str) -> str:
        if self._client and self.api_key and self.api_key.startswith("AIzaSy"):
            try:
                full_prompt = f"{system_prompt}\n\nUSER PROMPT:\n{user_prompt}"
                response = self._client.generate_content(full_prompt)
                if response and response.text:
                    return response.text
            except Exception as err:
                print(f"Gemini API invocation error: {err}. Triggering fallback simulation.")
        
        return self._simulate_gemini_response(system_prompt, user_prompt)

    def _simulate_gemini_response(self, system_prompt: str, user_prompt: str) -> str:
        """High-quality Mayfair luxury concierge fallback simulation."""
        recipient = "your recipient"
        occasion = "this special celebration"
        budget = "your budget"
        
        # Dynamic variable extraction from prompt text
        for line in user_prompt.split("\n"):
            if "Recipient Name:" in line:
                val = line.split(":", 1)[1].strip()
                if val and val != "None" and val != "the recipient":
                    recipient = val
            elif "Occasion:" in line:
                val = line.split(":", 1)[1].strip()
                if val and val != "None" and val != "a special milestone":
                    occasion = val
            elif "Budget Parameter:" in line:
                val = line.split(":", 1)[1].strip()
                if val and val != "None" and val != "undecided premium budget":
                    budget = val

        if "Memory Box" in system_prompt or "Memory Box" in user_prompt:
            product_name = "Selected Piece"
            for line in user_prompt.split("\n"):
                if "Product:" in line:
                    product_name = line.split(":", 1)[1].strip()
            return (
                f"WHY THIS GIFT MATTERS:\n"
                f"This exquisite {product_name} was hand-selected to honor deep devotion and artistic distinction. It transcends mere physical material to become a living memory of your shared milestone.\n\n"
                f"EMOTIONAL STORY:\n"
                f"Like rare gold leaf applied under candlelight, true affection requires patience and rare craft. Presenting this gesture demonstrates how profoundly you value their presence in your life.\n\n"
                f"PERSONAL REFLECTION:\n"
                f"An heirloom to be passed down across generations, rekindling the warmth of this day every time it is admired."
            )
        elif "Greeting" in system_prompt or "Calligrapher" in system_prompt:
            return (
                f"Dearest {recipient},\n\n"
                f"To mark this grand occasion of {occasion}, may this handcrafted piece stand as an enduring tribute "
                f"to your incomparable grace, joy, and timeless elegance.\n\n"
                f"With eternal affection,"
            )
        elif "completed" in user_prompt or "reveal" in user_prompt or "Sovereign Client" not in user_prompt:
            return (
                f"Splendid. I have prepared a comprehensive emotional dossier for {recipient} "
                f"commemorating {occasion}. I am delighted to present our curated luxury recommendations "
                f"and keepsake Memory Box for your final selection."
            )
        else:
            # Check what information is missing and ask a tailored concierge question
            if recipient == "your recipient":
                return "To begin our journey, who is this extraordinary gift for? (e.g. your partner, spouse, parent, a cherished friend, or a distinguished executive)"
            elif occasion == "this special celebration":
                return f"Understood. What grand celebration or milestone are we commemorating today for {recipient}?"
            elif budget == "your budget":
                return f"Splendid. What investment budget tier do you have in mind for this bespoke curation for {recipient}?"
            else:
                return f"Fascinating. How would you describe {recipient}'s personal style, passions, and aesthetic inclination?"

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

        if "WHY THIS GIFT MATTERS:" in raw_text or "WHY THIS GIFT MATTERS" in raw_text:
            parts = raw_text.split("EMOTIONAL STORY:")
            why_it_matters = parts[0].replace("WHY THIS GIFT MATTERS:", "").replace("WHY THIS GIFT MATTERS", "").strip()
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
