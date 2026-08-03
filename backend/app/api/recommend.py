from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.schemas.recommendation import RecommendationRequest, RecommendationResponse
from app.recommendation.recommendation_engine import recommendation_engine

router = APIRouter(prefix="/recommend", tags=["Recommendation Engine"])

@router.post("/get", response_model=RecommendationResponse)
def get_recommendations(payload: RecommendationRequest, db: Session = Depends(get_db)):
    """
    Direct recommendation route matching preference dictionary to top 3 luxury products.
    """
    recs = recommendation_engine.rank_products(db, payload.preferences)
    
    recip = payload.preferences.get("recipient", "your recipient")
    summary = f"Curated 3 bespoke luxury selections crafted for {recip} based on your preferences."
    
    return RecommendationResponse(
        consultation_id=payload.consultation_id,
        summary=summary,
        top_recommendations=recs
    )
