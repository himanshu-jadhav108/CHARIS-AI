import uuid
from typing import List, Dict, Any, Optional
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.consultation import Consultation, BookmarkedGift
from app.models.product import Product
from app.schemas.product import ProductResponse

router = APIRouter(prefix="/history", tags=["Consultation History & Bookmarks"])

@router.get("/consultations")
def get_user_consultations(user_id: str = Query("guest_vip"), db: Session = Depends(get_db)):
    consultations = db.query(Consultation).filter(Consultation.user_id == user_id).order_by(Consultation.created_at.desc()).all()
    
    res = []
    for c in consultations:
        res.append({
            "id": c.id,
            "title": c.title or f"Consultation for {c.recipient or 'VIP'}",
            "recipient": c.recipient,
            "occasion": c.occasion,
            "budget": c.budget,
            "status": c.status,
            "created_at": c.created_at.strftime("%Y-%m-%d %H:%M") if c.created_at else "",
            "message_count": len(c.chat_history or []),
            "has_recommendations": bool(c.recommendations_payload)
        })
    return res

@router.get("/bookmarks")
def get_bookmarked_gifts(user_id: str = Query("guest_vip"), db: Session = Depends(get_db)):
    bookmarks = db.query(BookmarkedGift).filter(BookmarkedGift.user_id == user_id).all()
    product_ids = [b.product_id for b in bookmarks]
    
    if not product_ids:
        return []
        
    products = db.query(Product).filter(Product.id.in_(product_ids)).all()
    return [ProductResponse.model_validate(p) for p in products]

@router.post("/bookmarks/toggle")
def toggle_bookmark(payload: Dict[str, Any], db: Session = Depends(get_db)):
    user_id = payload.get("user_id", "guest_vip")
    product_id = payload.get("product_id")
    
    if not product_id:
        raise HTTPException(status_code=400, detail="product_id is required")
        
    existing = db.query(BookmarkedGift).filter(
        BookmarkedGift.user_id == user_id, 
        BookmarkedGift.product_id == product_id
    ).first()
    
    if existing:
        db.delete(existing)
        db.commit()
        return {"bookmarked": False, "product_id": product_id}
    else:
        new_bm = BookmarkedGift(
            id=f"bm_{uuid.uuid4().hex[:8]}",
            user_id=user_id,
            product_id=product_id
        )
        db.add(new_bm)
        db.commit()
        return {"bookmarked": True, "product_id": product_id}
