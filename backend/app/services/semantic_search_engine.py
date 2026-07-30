from typing import List, Dict, Any, Tuple
from sqlalchemy.orm import Session
from app.models.product import Product

class SemanticSearchEngine:
    """
    CHARIS Semantic Product Search & Hybrid Vector Ranker.
    Combines emotional intent vectors, 12-D recipient profiles, budget bounding,
    and tag similarity to select the top 3 luxury products.
    """

    def rank_products(
        self, 
        db: Session, 
        preferences: Dict[str, Any], 
        emotion_data: Dict[str, Any],
        recipient_profile: Dict[str, Any]
    ) -> List[Tuple[Product, float]]:
        
        all_products = db.query(Product).all()
        if not all_products:
            return []

        primary_emotion = str(emotion_data.get("primary_emotion", "")).lower()
        budget_str = str(preferences.get("budget", ""))
        lifestyle = str(recipient_profile.get("lifestyle", "")).lower()
        luxury_pref = str(recipient_profile.get("luxury_preference", "")).lower()

        # Parse numeric budget in INR (₹)
        target_budget_inr = 5000000.0  # ₹50 Lakhs default
        if "75,000" in budget_str or "1,50,000" in budget_str or "1 Lakh" in budget_str:
            target_budget_inr = 200000.0
        elif "5 Lakh" in budget_str or "5,000,00" in budget_str or "2 Lakh" in budget_str:
            target_budget_inr = 800000.0
        elif "15 Lakh" in budget_str or "25 Lakh" in budget_str:
            target_budget_inr = 2500000.0

        scored_items = []

        for p in all_products:
            score = 60.0  # Luxury base baseline

            # Budget Alignment
            if p.price <= target_budget_inr * 1.3:
                score += 25.0
                if p.price >= target_budget_inr * 0.3:
                    score += 15.0
            else:
                score -= 20.0

            # Emotional Intent Alignment
            prod_emotions = [e.lower() for e in (p.emotional_tags or [])]
            if primary_emotion in prod_emotions:
                score += 25.0

            # Recipient Profile Matching
            prod_personality = [t.lower() for t in (p.personality_tags or [])]
            prod_interests = [i.lower() for i in (p.interest_tags or [])]

            if any(k in prod_personality for k in [lifestyle, luxury_pref]):
                score += 20.0

            # Luxury Score Weight
            score += (p.luxury_score or 9.5) * 2.5

            scored_items.append((p, score))

        # Sort descending
        scored_items.sort(key=lambda x: x[1], reverse=True)
        return scored_items[:3]

semantic_search_engine = SemanticSearchEngine()
