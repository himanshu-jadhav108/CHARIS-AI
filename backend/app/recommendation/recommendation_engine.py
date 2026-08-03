from typing import List, Dict, Any, Optional
from sqlalchemy.orm import Session
from app.models.product import Product
from app.schemas.product import ProductResponse
from app.services.semantic_search_engine import semantic_search_engine
from app.services.gift_experience_engine import gift_experience_engine
from app.services.ai_service import ai_service
from app.prompts.prompt_library import MEMORY_BOX_PROMPT
from app.models.consultation import MemoryBoxModel, GiftHistory, Recipient
import uuid
import json

class RecommendationEngine:
    """
    CHARIS Orchestrated Recommendation Engine:
    Synthesizes Semantic Search, AI Experience Curation, and Keepsake Persistence.
    """

    def generate_curated_experiences(
        self, 
        db: Session, 
        preferences: Dict[str, Any],
        emotion_data: Dict[str, Any] = None,
        recipient_profile: Dict[str, Any] = None,
        user_id: str = "guest_vip",
        consultation_id: str = "temp_consult"
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

        # Resolve recipient_id from database if available
        recipient_id = None
        db_rec = db.query(Recipient).filter(
            Recipient.user_id == user_id,
            Recipient.name.ilike(f"%{rec_name}%")
        ).first()
        if db_rec:
            recipient_id = db_rec.id

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

            # 3. Generate Signature Keepsake Memory Box via AIService / Gemini
            memory_box = ai_service.generate_memory_box(
                system_prompt=MEMORY_BOX_PROMPT,
                product_name=prod.name,
                recipient_name=rec_name,
                occasion=occ_name,
                primary_emotion=primary_emotion
            )

            # 4. Recommendation Scoring Engine using actual recipient context
            scoring_prompt = f"""
You are the Chief Curator of CHARIS. We are matching a luxury product to a recipient.
Recipient Profile:
- Name: {rec_name}
- Relationship: {preferences.get('relationship', 'Valued Relation')}
- Lifestyle: {recipient_profile.get('lifestyle', 'Refined Society')}
- Hobbies: {", ".join(recipient_profile.get('hobbies', []))}
- Luxury Style: {recipient_profile.get('luxury_preference', 'Quiet Luxury')}

Selected Product:
- Name: {prod.name}
- Brand: {prod.brand}
- Description: {prod.description}
- Product Story: {prod.story}

Analyze this match and return a JSON object with:
1. match_score: Float between 85.0 and 99.9 based on interest, lifestyle, and occasion.
2. confidence: Float between 0.8 and 1.0 indicating fit certainty.
3. reasoning: An exquisite 2-sentence explanation connecting the product features to the recipient's lifestyle.
4. why_selected: A description of why this specific gift fits the emotional intent ({primary_emotion}).

Format your output ONLY as a valid JSON block matching this structure without any markdown formatting.
"""
            try:
                raw_json = ai_service.provider.generate_text(
                    "You are a structured recommendation analyzer. Output ONLY JSON.", 
                    scoring_prompt
                )
                # Clean JSON markdown delimiters if present
                clean_json = raw_json.replace("```json", "").replace("```", "").strip()
                score_data = json.loads(clean_json)
                match_score = float(score_data.get("match_score", min(round(score / 1.4, 1), 99.8)))
                confidence = float(score_data.get("confidence", 0.95))
                tailored_reason = score_data.get("reasoning", "")
                why_selected = score_data.get("why_selected", "")
            except Exception:
                # Fallback scoring parameters
                match_score = min(round(score / 1.4, 1), 99.8)
                confidence = 0.92
                tailored_reason = (
                    f"Curated for {rec_name}'s aesthetic profile as a pinnacle gesture of {primary_emotion}. "
                    f"Its heritage craftsmanship aligns seamlessly with their appreciation for {recipient_profile.get('luxury_preference', 'fine art')}."
                )
                why_selected = f"Selected because it serves as a supreme statement of {primary_emotion} for {occ_name}."

            results.append({
                "product": p_schema.model_dump(),
                "match_score": match_score,
                "confidence_score": confidence,
                "tailored_reason": tailored_reason,
                "why_selected": why_selected,
                "emotional_meaning": emotion_data.get("emotional_summary", "A radiant symbol of enduring affection."),
                "experience_package": experience_package,
                "memory_box": memory_box
            })

            # 5. Persist keepsakes (Memory Box & Gift History) directly in PostgreSQL
            try:
                db_mb = MemoryBoxModel(
                    id=f"mb_{uuid.uuid4().hex[:8]}",
                    user_id=user_id,
                    consultation_id=consultation_id,
                    why_it_matters=memory_box.get("why_this_gift_matters", ""),
                    emotional_story=memory_box.get("emotional_story", ""),
                    personal_reflection=memory_box.get("personal_reflection", ""),
                    luxury_presentation=memory_box.get("luxury_presentation", "")
                )
                db.add(db_mb)

                db_gh = GiftHistory(
                    id=f"gh_{uuid.uuid4().hex[:8]}",
                    user_id=user_id,
                    recipient_id=recipient_id,
                    product_id=prod.id,
                    occasion=occ_name,
                    budget=preferences.get("budget", "Premium"),
                    generated_message=experience_package.get("greeting_card_text"),
                    delivery_preference=experience_package.get("delivery_protocol", "White-Glove Armored Courier")
                )
                db.add(db_gh)
                db.commit()
            except Exception as db_err:
                db.rollback()
                print(f"Error persisting keepsake data: {db_err}")

        return results

recommendation_engine = RecommendationEngine()
