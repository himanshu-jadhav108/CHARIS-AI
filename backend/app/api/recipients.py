import uuid
from typing import List, Dict, Any
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.consultation import Recipient

router = APIRouter(prefix="/recipients", tags=["Recipient Management"])

@router.get("")
def get_recipients(user_id: str = Query("guest_vip"), db: Session = Depends(get_db)):
    recipients = db.query(Recipient).filter(Recipient.user_id == user_id).order_by(Recipient.created_at.desc()).all()
    return recipients

@router.post("")
def create_recipient(payload: Dict[str, Any], db: Session = Depends(get_db)):
    user_id = payload.get("user_id", "guest_vip")
    name = payload.get("name")
    relationship = payload.get("relationship")
    
    if not name or not relationship:
        raise HTTPException(status_code=400, detail="Name and relationship are required")

    rec = Recipient(
        id=f"rec_{uuid.uuid4().hex[:8]}",
        user_id=user_id,
        name=name,
        relationship=relationship,
        birthday=payload.get("birthday"),
        anniversary=payload.get("anniversary"),
        favourite_colours=payload.get("favourite_colours", []),
        favourite_brands=payload.get("favourite_brands", []),
        hobbies=payload.get("hobbies", []),
        lifestyle=payload.get("lifestyle"),
        luxury_preference=payload.get("luxury_preference"),
        personal_notes=payload.get("personal_notes"),
        photo_url=payload.get("photo_url")
    )
    db.add(rec)
    db.commit()
    db.refresh(rec)
    return rec

@router.put("/{rec_id}")
def update_recipient(rec_id: str, payload: Dict[str, Any], db: Session = Depends(get_db)):
    rec = db.query(Recipient).filter(Recipient.id == rec_id).first()
    if not rec:
        raise HTTPException(status_code=404, detail="Recipient not found")
        
    for key, val in payload.items():
        if hasattr(rec, key):
            setattr(rec, key, val)
            
    db.commit()
    db.refresh(rec)
    return rec

@router.delete("/{rec_id}")
def delete_recipient(rec_id: str, db: Session = Depends(get_db)):
    rec = db.query(Recipient).filter(Recipient.id == rec_id).first()
    if not rec:
        raise HTTPException(status_code=404, detail="Recipient not found")
        
    db.delete(rec)
    db.commit()
    return {"deleted": True, "id": rec_id}
