import uuid
from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.consultation import Consultation
from app.schemas.chat import ChatRequest, PreferencesState, ChatMessage
from app.agents.concierge_agent import concierge_agent
from app.recommendation.recommendation_engine import recommendation_engine

router = APIRouter(prefix="/chat", tags=["AI Concierge Chat"])

@router.post("/message")
def send_chat_message(payload: ChatRequest, db: Session = Depends(get_db)):
    """
    Process incoming user turn in gift consultation, analyze emotional intent,
    build recipient profile, and return response + curated experiences if complete.
    """
    consultation_id = payload.consultation_id or f"consult_{uuid.uuid4().hex[:8]}"
    
    consultation = db.query(Consultation).filter(Consultation.id == consultation_id).first()
    if not consultation:
        consultation = Consultation(
            id=consultation_id,
            user_id=payload.user_id,
            title="Sovereign Gift Consultation",
            status="active",
            preferences={},
            chat_history=[],
            recommended_product_ids=[]
        )
        db.add(consultation)
        db.commit()
        db.refresh(consultation)

    chat_history_data = consultation.chat_history or []
    history_objs = [ChatMessage(**m) for m in chat_history_data]

    # Append user turn
    user_msg_id = f"msg_{uuid.uuid4().hex[:6]}"
    user_msg = ChatMessage(
        id=user_msg_id,
        sender="user",
        text=payload.message,
        timestamp=datetime.now().strftime("%I:%M %p")
    )
    chat_history_data.append(user_msg.model_dump())

    # Agent processing turn
    current_prefs = consultation.preferences or {}
    (
        ai_response_text, 
        updated_prefs, 
        emotion_data, 
        recipient_profile, 
        is_complete, 
        quick_replies
    ) = concierge_agent.process_turn(
        user_message=payload.message,
        current_prefs=current_prefs,
        chat_history=history_objs,
        user_id=payload.user_id,
        db=db
    )

    # Append AI turn
    ai_msg_id = f"msg_{uuid.uuid4().hex[:6]}"
    ai_msg = ChatMessage(
        id=ai_msg_id,
        sender="concierge",
        text=ai_response_text,
        timestamp=datetime.now().strftime("%I:%M %p")
    )
    chat_history_data.append(ai_msg.model_dump())

    recommendations_payload = None
    if is_complete:
        consultation.status = "completed"
        # Run hybrid recommendation pipeline with experience curation & Memory Box
        recs = recommendation_engine.generate_curated_experiences(
            db=db,
            preferences=updated_prefs,
            emotion_data=emotion_data,
            recipient_profile=recipient_profile
        )
        recommendations_payload = recs
        consultation.recommended_product_ids = [r["product"]["id"] for r in recs]
        consultation.recommendations_payload = recommendations_payload

    # Save to database
    consultation.preferences = updated_prefs
    consultation.chat_history = chat_history_data
    if updated_prefs.get("recipient"):
        consultation.recipient = updated_prefs.get("recipient")
    if updated_prefs.get("occasion"):
        consultation.occasion = updated_prefs.get("occasion")
    if updated_prefs.get("budget"):
        consultation.budget = updated_prefs.get("budget")

    db.commit()

    return {
        "consultation_id": consultation_id,
        "ai_message": ai_response_text,
        "is_complete": is_complete,
        "preferences": updated_prefs,
        "emotion_data": emotion_data,
        "recipient_profile": recipient_profile,
        "recommendations": recommendations_payload,
        "suggested_quick_replies": quick_replies
    }
