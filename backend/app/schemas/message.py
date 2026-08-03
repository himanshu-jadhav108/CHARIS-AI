from pydantic import BaseModel
from typing import Optional

class MessageGenRequest(BaseModel):
    recipient_name: Optional[str] = "Beloved"
    relationship: Optional[str] = "Partner"
    occasion: Optional[str] = "Special Milestone"
    tone: str = "Luxury" # Romantic, Professional, Family, Friend, Luxury, Heartfelt
    gift_name: Optional[str] = None
    user_notes: Optional[str] = None
    existing_message: Optional[str] = None # For improve mode

class MessageGenResponse(BaseModel):
    generated_message: str
    tone: str
    suggested_handwriting_style: str = "Bespoke Calligraphy"
