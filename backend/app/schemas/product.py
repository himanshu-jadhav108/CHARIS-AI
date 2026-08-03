from pydantic import BaseModel
from typing import List, Optional, Any

class ProductBase(BaseModel):
    id: str
    name: str
    brand: str
    price: float
    category: str
    image: str
    gallery: List[str] = []
    description: str
    luxury_score: float = 9.5
    personality_tags: List[str] = []
    interest_tags: List[str] = []
    occasion_tags: List[str] = []
    relationship_tags: List[str] = []
    emotional_tags: List[str] = []
    story: str
    delivery: str = "White-glove courier dispatch within 48 hours"
    features: List[str] = []
    reviews: List[Any] = []

class ProductResponse(ProductBase):
    class Config:
        from_attributes = True

class ProductFilter(BaseModel):
    category: Optional[str] = None
    min_price: Optional[float] = None
    max_price: Optional[float] = None
    search: Optional[str] = None
