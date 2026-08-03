from fastapi import APIRouter, Depends
from app.schemas.message import MessageGenRequest, MessageGenResponse
from app.services.ai_service import ai_service
from app.prompts.prompt_library import GREETING_MESSAGE_PROMPT
from app.models.user import User
from app.api.auth import get_current_user

router = APIRouter(prefix="/messages", tags=["AI Gift Card Generator"])

@router.post("/generate", response_model=MessageGenResponse)
def generate_gift_message(payload: MessageGenRequest, user: User = Depends(get_current_user)):
    """
    Generate or refine AI Gift Card Message with custom luxury tones using AIService & Gemini.
    """
    name = payload.recipient_name or "Beloved"
    gift = payload.gift_name or "this timeless gesture"
    occ = payload.occasion or "Special Celebration"
    tone = payload.tone or "Luxury"

    # Call Gemini to dynamically compose the calligraphy message
    user_prompt = f"""
Compose a bespoke calligraphic keepsake message:
- Recipient: {name}
- Occasion: {occ}
- Gift Piece: {gift}
- Tone: {tone}
- Existing Draft/Notes to refine: "{payload.existing_message or 'None'}"

Compose only the card content itself. Keep it between 2 and 4 elegant, emotionally evocative lines. Avoid brackets, tags, notes, or meta explanations. Reply in the voice of a private Mayfair calligraphy master.
"""
    try:
        msg = ai_service.provider.generate_text(GREETING_MESSAGE_PROMPT, user_prompt)
    except Exception:
        # Graceful fallback if offline
        msg = (
            f"Presented to {name},\n\n"
            f"To commemorate {occ}, may this {gift} stand as an enduring tribute to your "
            f"incomparable grace, distinction, and timeless elegance.\n\n"
            f"With compliments,"
        )

    return MessageGenResponse(
        generated_message=msg.strip(),
        tone=tone,
        suggested_handwriting_style="Imperial Gold Calligraphy"
    )
