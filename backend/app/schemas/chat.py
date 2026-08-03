from pydantic import BaseModel
from typing import List, Optional, Dict, Any

class ChatMessage(BaseModel):
    id: str
    sender: str # "user" or "concierge"
    text: str
    timestamp: str

class PreferencesState(BaseModel):
    recipient: Optional[str] = None # e.g., Wife, Husband, CEO, Mother
    relationship: Optional[str] = None
    occasion: Optional[str] = None # Milestone Birthday, Anniversary, Promotion
    budget: Optional[str] = None # e.g., "$1,000 - $2,500", "$5,000+"
    age: Optional[str] = None
    gender: Optional[str] = None
    personality: Optional[List[str]] = [] # Sophisticated, Adventurous, Minimalist
    hobbies: Optional[List[str]] = []
    interests: Optional[List[str]] = []
    favorite_colors: Optional[List[str]] = []
    luxury_preferences: Optional[List[str]] = []
    lifestyle: Optional[str] = None
    desired_emotional_impact: Optional[str] = None # Wonder, Gratitude, Intimacy, Awe
    special_notes: Optional[str] = None

class ChatRequest(BaseModel):
    consultation_id: Optional[str] = None
    user_id: str = "guest_vip"
    message: str

class ChatResponse(BaseModel):
    consultation_id: str
    ai_message: str
    is_complete: bool = False
    preferences: PreferencesState
    recommendations: Optional[List[Dict[str, Any]]] = None
    suggested_quick_replies: Optional[List[str]] = []
