from typing import Dict, Any, List

class RecipientProfileEngine:
    """
    CHARIS Recipient Profile Engine: Synthesizes conversational context into a structured
    12-dimensional luxury profile.
    """

    def build_profile(self, user_text: str, current_profile: Dict[str, Any] = None) -> Dict[str, Any]:
        text = user_text.lower()
        profile = dict(current_profile or {})

        # 1. Lifestyle
        if any(w in text for w in ["exec", "ceo", "business", "corporate"]):
            profile["lifestyle"] = "Executive Leader & Visionary"
            profile["work_style"] = "High-Powered Leadership"
        elif any(w in text for w in ["art", "design", "fashion", "creative"]):
            profile["lifestyle"] = "Artistic & Aesthetic Connoisseur"
            profile["work_style"] = "Creative Director / Visionary"
        elif any(w in text for w in ["travel", "yacht", "island", "jetset"]):
            profile["lifestyle"] = "Jetset Global Nomad"
            profile["travel_preference"] = "Private Island & Luxury Riviera"
        elif any(w in text for w in ["wellness", "spa", "home", "peace"]):
            profile["lifestyle"] = "Quiet Sanctuary & Mindful Luxury"

        # 2. Luxury Preference
        if any(w in text for w in ["quiet", "subtle", "understated", "hermes"]):
            profile["luxury_preference"] = "Understated Quiet Luxury"
        elif any(w in text for w in ["sparkle", "diamonds", "gold", "glamour"]):
            profile["luxury_preference"] = "Radiant High Glamour"
        elif any(w in text for w in ["tech", "modern", "apple", "dyson"]):
            profile["luxury_preference"] = "Couture Technological Mastery"
        elif any(w in text for w in ["artisanal", "handcrafted", "heritage", "attar", "silk"]):
            profile["luxury_preference"] = "Artisanal Heritage & Craft"

        # 3. Love Language
        if any(w in text for w in ["words", "letter", "card", "note"]):
            profile["love_language"] = "Words of Affirmation & Calligraphy"
        elif any(w in text for w in ["unboxing", "surprise", "presentation"]):
            profile["love_language"] = "Bespoke Gift Ceremony"
        elif any(w in text for w in ["experience", "trip", "escape", "dinner"]):
            profile["love_language"] = "Quality Experience & Time"

        # Defaults if empty
        profile.setdefault("lifestyle", profile.get("lifestyle", "Refined High Society"))
        profile.setdefault("hobbies", profile.get("hobbies", ["Fine Horology", "Art", "Gastronomy"]))
        profile.setdefault("luxury_preference", profile.get("luxury_preference", "Timeless Heritage"))
        profile.setdefault("love_language", profile.get("love_language", "Receiving Bespoke Artifacts"))
        profile.setdefault("communication_style", "Formal & Dignified")
        profile.setdefault("favourite_colours", ["Champagne Gold", "Deep Burgundy", "Obsidian", "Emerald"])
        profile.setdefault("travel_preference", "Udaipur Palaces & French Riviera")
        profile.setdefault("personality_traits", ["Sophisticated", "Discerning", "Generous"])
        profile.setdefault("values", ["Heritage", "Craftsmanship", "Emotional Resonance"])
        profile.setdefault("age_group", "30s - 50s")

        return profile

recipient_profile_engine = RecipientProfileEngine()
