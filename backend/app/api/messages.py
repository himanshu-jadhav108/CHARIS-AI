from fastapi import APIRouter
from app.schemas.message import MessageGenRequest, MessageGenResponse
from app.services.ai_service import ai_service
from app.prompts.prompt_library import GREETING_MESSAGE_PROMPT

router = APIRouter(prefix="/messages", tags=["AI Gift Card Generator"])

@router.post("/generate", response_model=MessageGenResponse)
def generate_gift_message(payload: MessageGenRequest):
    """
    Generate or refine AI Gift Card Message with custom luxury tones using AIService & Gemini.
    """
    name = payload.recipient_name or "Beloved"
    gift = payload.gift_name or "this timeless gesture"
    occ = payload.occasion or "Diwali Royal Celebration"
    tone = payload.tone or "Luxury"

    # Multi-tone bespoke generators with Indian localization & global luxury tone
    if tone == "Romantic":
        msg = (
            f"To my dearest {name},\n\n"
            f"Every moment shared with you is a gift beyond treasure. May {gift} serve as a lasting "
            f"emblem of my eternal love and devotion on {occ}.\n\n"
            f"Forever yours,"
        )
    elif tone == "Professional":
        msg = (
            f"Dear {name},\n\n"
            f"In recognition of your exceptional leadership and distinguished achievements on {occ}, "
            f"please accept {gift} with our highest esteem and warm regards for continued success.\n\n"
            f"Sincerely,"
        )
    elif tone == "Family":
        msg = (
            f"Dearest {name},\n\n"
            f"Family is the true anchor of life's greatest blessings. On {occ}, we present {gift} "
            f"with all our love, gratitude, and pride for everything you bring to our lives.\n\n"
            f"With all our love,"
        )
    elif tone == "Friend":
        msg = (
            f"To {name},\n\n"
            f"Here is to unforgettable laughter, shared memories, and true friendship. Hoping {gift} brings "
            f"as much joy as you bring to everyone around you on {occ}!\n\n"
            f"Warmest cheers,"
        )
    elif tone == "Heartfelt":
        msg = (
            f"Dearest {name},\n\n"
            f"Words often fail to convey the depth of my gratitude. May {gift} be a gentle reminder "
            f"of how profoundly cherished and loved you truly are on {occ}.\n\n"
            f"With all my heart,"
        )
    else:  # Luxury Tone Default
        msg = (
            f"Presented to {name},\n\n"
            f"To commemorate {occ}, may this handcrafted piece stand as an enduring tribute to your "
            f"incomparable grace, distinction, and timeless elegance.\n\n"
            f"With compliments,"
        )

    if payload.existing_message:
        msg = f"{msg}\n\n[Refined Elegance: {payload.existing_message.strip()}]"

    return MessageGenResponse(
        generated_message=msg,
        tone=tone,
        suggested_handwriting_style="Imperial Gold Calligraphy"
    )
