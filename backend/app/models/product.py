from sqlalchemy import Column, String, Float, Integer, Text, JSON
from app.core.database import Base

class Product(Base):
    __tablename__ = "products"

    id = Column(String, primary_key=True, index=True)
    name = Column(String, nullable=False, index=True)
    brand = Column(String, nullable=False)
    price = Column(Float, nullable=False)
    category = Column(String, nullable=False, index=True)
    image = Column(String, nullable=False)
    gallery = Column(JSON, default=list)
    description = Column(Text, nullable=False)
    luxury_score = Column(Float, default=9.5)
    
    # JSON tag fields for hybrid matching
    personality_tags = Column(JSON, default=list)
    interest_tags = Column(JSON, default=list)
    occasion_tags = Column(JSON, default=list)
    relationship_tags = Column(JSON, default=list)
    emotional_tags = Column(JSON, default=list)
    
    story = Column(Text, nullable=False)
    delivery = Column(String, default="White-glove courier dispatch within 48 hours")
    features = Column(JSON, default=list)
    reviews = Column(JSON, default=list)
