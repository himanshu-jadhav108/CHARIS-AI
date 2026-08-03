from pydantic import BaseModel
from typing import List, Optional, Dict, Any
from app.schemas.product import ProductResponse

class RecommendationItem(BaseModel):
    product: ProductResponse
    match_score: float
    luxury_score: float
    tailored_reason: str
    emotional_meaning: str
    story: str
    cta_text: str = "Request Concierge Acquisition"

class RecommendationRequest(BaseModel):
    consultation_id: Optional[str] = None
    preferences: Dict[str, Any]

class RecommendationResponse(BaseModel):
    consultation_id: Optional[str] = None
    summary: str
    top_recommendations: List[RecommendationItem]
