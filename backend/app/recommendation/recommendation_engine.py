from typing import List, Dict, Any
from sqlalchemy.orm import Session
from app.models.product import Product
from app.schemas.product import ProductResponse
from app.services.semantic_search_engine import semantic_search_engine
from app.services.gift_experience_engine import gift_experience_engine
from app.services.ai_service import ai_service
from app.prompts.prompt_library import MEMORY_BOX_PROMPT

class RecommendationEngine:
    """
    CHARIS Orchestrated Recommendation Engine:
    Synthesizes Semantic Search, Gift Experience Curation, and Memory Box creation.
    """

    def generate_curated_experiences(
        self, 
        db: Session, 
        preferences: Dict[str, Any],
        emotion_data: Dict[str, Any] = None,
        recipient_profile: Dict[str, Any] = None
    ) -> List[Dict[str, Any]]:
        
        emotion_data = emotion_data or preferences.get("emotion_data") or {"primary_emotion": "Love"}
        recipient_profile = recipient_profile or preferences.get("recipient_profile") or {}

        # 1. Run Semantic Product Search & Hybrid Vector Ranking
        ranked_products = semantic_search_engine.rank_products(db, preferences, emotion_data, recipient_profile)
        if not ranked_products:
            return []

        results = []
        rec_name = preferences.get("recipient", "Valued Recipient")
        occ_name = preferences.get("occasion", "Special Milestone")
        primary_emotion = emotion_data.get("primary_emotion", "Love")

        for idx, (prod, score) in enumerate(ranked_products):
            p_schema = ProductResponse.model_validate(prod)

            # 2. Generate 360 Gift Experience Package
            experience_package = gift_experience_engine.create_experience(
                product=prod,
                recipient_name=rec_name,
                occasion=occ_name,
                primary_emotion=primary_emotion,
                index=idx
            )

            # 3. Generate Signature Memory Box via AIService / Gemini
            memory_box = ai_service.generate_memory_box(
                system_prompt=MEMORY_BOX_PROMPT,
                product_name=prod.name,
                recipient_name=rec_name,
                occasion=occ_name,
                primary_emotion=primary_emotion
            )

            # Tailored Rationale
            tailored_reason = (
                f"Curated for {rec_name}'s aesthetic profile as a pinnacle gesture of {primary_emotion}. "
                f"Its heritage craftsmanship aligns seamlessly with their appreciation for {recipient_profile.get('luxury_preference', 'fine art')}."
            )

            results.append({
                "product": p_schema.model_dump(),
                "match_score": min(round(score / 1.4, 1), 99.8),
                "luxury_score": prod.luxury_score or 9.8,
                "tailored_reason": tailored_reason,
                "emotional_meaning": emotion_data.get("emotional_summary", "A radiant symbol of enduring affection."),
                "experience_package": experience_package,
                "memory_box": memory_box
            })

        return results

recommendation_engine = RecommendationEngine()
