import re
from typing import Dict, Any, List

class EmotionEngine:
    """
    CHARIS Emotion Engine: Analyzes emotional intent behind conversational input.
    Extracts primary & secondary emotional vectors across 14 dimensions.
    """

    EMOTIONAL_DIMENSIONS = [
        "Gratitude", "Love", "Respect", "Admiration", "Celebration", 
        "Apology", "Sympathy", "Friendship", "Romance", "Achievement", 
        "Pride", "Family Bond", "Nostalgia", "Surprise", "Excitement"
    ]

    KEYWORD_MAP = {
        "Gratitude": ["thank", "thankful", "grateful", "appreciation", "gratitude", "indebted"],
        "Love": ["love", "soulmate", "dearest", "beloved", "cherish", "adore", "heart"],
        "Respect": ["respect", "esteem", "honor", "mentor", "leader", "distinction", "dignity"],
        "Admiration": ["admire", "inspiration", "awe", "role model", "brilliant"],
        "Celebration": ["birthday", "anniversary", "diwali", "wedding", "milestone", "celebrate", "toast"],
        "Apology": ["sorry", "apologize", "forgive", "make up", "reconcile"],
        "Sympathy": ["comfort", "sympathy", "support", "healing", "peace"],
        "Friendship": ["friend", "companion", "pal", "cheers", "bond", "trust"],
        "Romance": ["romantic", "romance", "passion", "valentine", "proposal", "honeymoon"],
        "Achievement": ["promotion", "triumph", "graduation", "deal", "success", "award"],
        "Pride": ["proud", "pride", "daughter", "son", "accomplishment"],
        "Family Bond": ["mother", "father", "parent", "sister", "brother", "family", "rakhi", "heritage"],
        "Nostalgia": ["memory", "reminisce", "years", "old times", "childhood", "legacy"],
        "Surprise": ["surprise", "unexpected", "astonish", "unboxing", "secret"],
        "Excitement": ["excited", "thrill", "adrenalin", "adventure", "journey"]
    }

    def analyze_emotion(self, text: str, context_history: List[Dict[str, Any]] = None) -> Dict[str, Any]:
        text_lower = text.lower()
        scores: Dict[str, float] = {dim: 0.0 for dim in self.EMOTIONAL_DIMENSIONS}

        for dim, keywords in self.KEYWORD_MAP.items():
            for kw in keywords:
                if kw in text_lower:
                    scores[dim] += 1.0

        # Sort dimensions by score
        sorted_dims = sorted(scores.items(), key=lambda x: x[1], reverse=True)
        top_dims = [dim for dim, sc in sorted_dims if sc > 0]

        primary = top_dims[0] if top_dims else "Celebration"
        secondary = top_dims[1:4] if len(top_dims) > 1 else ["Gratitude", "Admiration"]

        intensity = min(0.5 + len(top_dims) * 0.15, 1.0)

        poetic_summaries = {
            "Love": "A profound gesture of eternal romance and deep emotional devotion.",
            "Gratitude": "An expression of heartfelt appreciation for their presence in your life.",
            "Respect": "A dignified tribute to their distinction, wisdom, and leadership.",
            "Celebration": "A radiant commemoration of life's grandest milestone.",
            "Family Bond": "An enduring token honoring heritage, roots, and family warmth.",
            "Achievement": "A proud salute to remarkable triumph and milestone success."
        }

        summary = poetic_summaries.get(primary, f"A meaningful gesture conveying {primary.lower()} and enduring elegance.")

        return {
            "primary_emotion": primary,
            "secondary_emotions": secondary,
            "intensity_score": round(intensity, 2),
            "emotional_summary": summary,
            "dimension_scores": scores
        }

emotion_engine = EmotionEngine()
