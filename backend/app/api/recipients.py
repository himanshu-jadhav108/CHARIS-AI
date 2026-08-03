from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Dict, Any
from app.core.database import get_db
from app.models.consultation import Recipient
from app.models.user import User
from app.api.auth import get_current_user
import uuid

router = APIRouter(prefix="/recipients", tags=["Recipient Management"])

@router.get("")
def get_recipients(user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    """
    Retrieve all recipients for the authenticated user.
    """
    recipients = db.query(Recipient).filter(Recipient.user_id == user.id).order_by(Recipient.created_at.desc()).all()
    return recipients

@router.post("")
def create_recipient(payload: Dict[str, Any], user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    """
    Create a new recipient profile for the authenticated user.
    """
    name = payload.get("name")
    relationship = payload.get("relationship")
    
    if not name or not relationship:
        raise HTTPException(status_code=400, detail="Name and relationship are required")

    rec = Recipient(
        id=f"rec_{uuid.uuid4().hex[:8]}",
        user_id=user.id,
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
def update_recipient(rec_id: str, payload: Dict[str, Any], user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    """
    Update a recipient profile, enforcing ownership.
    """
    rec = db.query(Recipient).filter(Recipient.id == rec_id, Recipient.user_id == user.id).first()
    if not rec:
        raise HTTPException(status_code=404, detail="Recipient not found or unauthorized")
        
    for key, val in payload.items():
        if hasattr(rec, key):
            setattr(rec, key, val)
            
    db.commit()
    db.refresh(rec)
    return rec

@router.delete("/{rec_id}")
def delete_recipient(rec_id: str, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    """
    Delete a recipient profile, enforcing ownership.
    """
    rec = db.query(Recipient).filter(Recipient.id == rec_id, Recipient.user_id == user.id).first()
    if not rec:
        raise HTTPException(status_code=404, detail="Recipient not found or unauthorized")
        
    db.delete(rec)
    db.commit()
    return {"deleted": True, "id": rec_id}
