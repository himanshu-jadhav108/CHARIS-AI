from typing import Dict, Any, List, Optional
from sqlalchemy.orm import Session
from app.models.consultation import GiftHistory, Recipient, UserPreference
import uuid

class UserMemoryService:
    """
    CHARIS User Memory Service: Stores and retrieves user gifting history, 
    favorite brands, important dates, and notes from the database.
    """

    def get_user_memory(self, user_id: str, db: Session) -> Dict[str, Any]:
        """
        Gathers user memory indicators, past gifts, and important dates from DB.
        """
        if not db:
            return {
                "user_id": user_id,
                "favorite_brands": ["Forest Essentials", "Vacheron Constantin", "Hermès"],
                "gifting_history": [],
                "important_dates": []
            }
            
        pref = db.query(UserPreference).filter(UserPreference.user_id == user_id).first()
        recipients = db.query(Recipient).filter(Recipient.user_id == user_id).all()
        history = db.query(GiftHistory).filter(GiftHistory.user_id == user_id).all()

        fav_brands = set()
        for r in recipients:
            if r.favourite_brands:
                fav_brands.update(r.favourite_brands)
        if pref and pref.luxury_preference:
            fav_brands.add(pref.luxury_preference)

        gifting_history = []
        for h in history:
            gifting_history.append({
                "year": h.created_at.strftime("%Y") if h.created_at else "2026",
                "recipient": h.recipient_id or "Someone Special",
                "occasion": h.occasion,
                "gift_name": h.product_id,
                "price_inr": 0.0
            })

        important_dates = []
        for r in recipients:
            if r.birthday:
                important_dates.append({"event": f"{r.name}'s Birthday", "date": r.birthday})
            if r.anniversary:
                important_dates.append({"event": f"{r.name}'s Anniversary", "date": r.anniversary})

        return {
            "user_id": user_id,
            "favorite_brands": list(fav_brands) if fav_brands else ["Cartier", "Hermès", "Vacheron Constantin"],
            "gifting_history": gifting_history,
            "important_dates": important_dates
        }

    def record_gift_consultation(
        self, 
        user_id: str, 
        recipient_name: str, 
        occasion: str, 
        gift_name: str, 
        price_inr: float,
        db: Session
    ):
        """
        Persist a new gift consultation history event to SQL database.
        """
        if not db:
            return
            
        db_rec = db.query(Recipient).filter(
            Recipient.user_id == user_id,
            Recipient.name.ilike(f"%{recipient_name}%")
        ).first()
        recipient_id = db_rec.id if db_rec else None

        try:
            new_gh = GiftHistory(
                id=f"gh_{uuid.uuid4().hex[:8]}",
                user_id=user_id,
                recipient_id=recipient_id,
                product_id=gift_name,
                occasion=occasion,
                budget=str(price_inr)
            )
            db.add(new_gh)
            db.commit()
        except Exception as e:
            db.rollback()
            print(f"Error recording gift consultation in database memory: {e}")

    def generate_memory_context_note(self, user_id: str, recipient_name: str, db: Session) -> Optional[str]:
        """
        Query past gifts in SQL database and output complementary concierge suggestions.
        """
        if not db or not recipient_name:
            return None

        db_rec = db.query(Recipient).filter(
            Recipient.user_id == user_id,
            Recipient.name.ilike(f"%{recipient_name}%")
        ).first()
        
        if not db_rec:
            return None

        past = db.query(GiftHistory).filter(
            GiftHistory.user_id == user_id,
            GiftHistory.recipient_id == db_rec.id
        ).order_by(GiftHistory.created_at.desc()).first()

        if past:
            year = past.created_at.strftime("%Y") if past.created_at else "2025"
            return f"I recall that in {year}, you presented {recipient_name} with the {past.product_id} for their {past.occasion}. For this occasion, I have selected something complementary that expands their collection."

        return None

user_memory_service = UserMemoryService()
