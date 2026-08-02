import logging
from typing import Dict, Any, List
from sqlalchemy.orm import Session
from app.models.consultation import Recipient, GiftHistory, UserPreference

logger = logging.getLogger("charis.observability")

class ContextBuilder:
    def __init__(self, db: Session):
        self.db = db

    def build_context(self, user_id: str, recipient_id: str = None) -> Dict[str, Any]:
        """
        Gathers user profiles, preferences, recipient dossiers, and past gift history.
        """
        context = {
            "user_id": user_id,
            "currency": "₹",
            "language": "English",
            "theme": "Classic Luxury",
            "luxury_level": "Ultra-Premium",
            "recipient_name": None,
            "relationship": None,
            "hobbies": [],
            "favourite_colours": [],
            "lifestyle": None,
            "luxury_preference": None,
            "past_gifts": [],
            "special_notes": None
        }

        # 1. Fetch user preference
        pref = self.db.query(UserPreference).filter(UserPreference.user_id == user_id).first()
        if pref:
            context["currency"] = pref.preferred_currency
            context["language"] = pref.language
            context["theme"] = pref.theme_preference
            context["luxury_level"] = pref.luxury_preference

        # 2. Fetch recipient dossier if provided
        if recipient_id:
            rec = self.db.query(Recipient).filter(Recipient.id == recipient_id).first()
            if rec:
                context["recipient_name"] = rec.name
                context["relationship"] = rec.relationship
                context["hobbies"] = rec.hobbies
                context["favourite_colours"] = rec.favourite_colours
                context["lifestyle"] = rec.lifestyle
                context["luxury_preference"] = rec.luxury_preference
                context["special_notes"] = rec.personal_notes

                # Fetch past gifts for this recipient
                past = self.db.query(GiftHistory).filter(GiftHistory.recipient_id == recipient_id).all()
                context["past_gifts"] = [
                    {
                        "gift": g.product_id,
                        "occasion": g.occasion,
                        "date": g.date,
                        "budget": g.budget
                    } for g in past
                ]

        logger.info(f"Built Rich AI Context for User {user_id} - Recipient {recipient_id}")
        return context
