from sqlalchemy import Column, String, DateTime, JSON, Text, ForeignKey
from sqlalchemy.sql import func
from app.core.database import Base

class Consultation(Base):
    __tablename__ = "consultations"

    id = Column(String, primary_key=True, index=True)
    user_id = Column(String, index=True, nullable=False)
    title = Column(String, default="Bespoke Gift Consultation")
    recipient = Column(String, nullable=True)
    occasion = Column(String, nullable=True)
    budget = Column(String, nullable=True)
    
    status = Column(String, default="active") # active, completed
    
    preferences = Column(JSON, default=dict) # Extracted preferences dict
    chat_history = Column(JSON, default=list) # List of message objects {sender, text, timestamp}
    recommended_product_ids = Column(JSON, default=list) # Array of product IDs recommended
    recommendations_payload = Column(JSON, default=list) # Full recommendation metadata
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now(), server_default=func.now())

class BookmarkedGift(Base):
    __tablename__ = "bookmarked_gifts"

    id = Column(String, primary_key=True, index=True)
    user_id = Column(String, index=True, nullable=False)
    product_id = Column(String, nullable=False)
    notes = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class Recipient(Base):
    __tablename__ = "recipients"

    id = Column(String, primary_key=True, index=True)
    user_id = Column(String, index=True, nullable=False)
    name = Column(String, nullable=False)
    relationship = Column(String, nullable=False)
    birthday = Column(String, nullable=True)
    anniversary = Column(String, nullable=True)
    favourite_colours = Column(JSON, default=list)
    favourite_brands = Column(JSON, default=list)
    hobbies = Column(JSON, default=list)
    lifestyle = Column(String, nullable=True)
    luxury_preference = Column(String, nullable=True)
    personal_notes = Column(Text, nullable=True)
    photo_url = Column(String, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class GiftHistory(Base):
    __tablename__ = "gift_history"

    id = Column(String, primary_key=True, index=True)
    user_id = Column(String, index=True, nullable=False)
    recipient_id = Column(String, nullable=True)
    product_id = Column(String, nullable=False)
    occasion = Column(String, nullable=False)
    date = Column(String, nullable=True)
    budget = Column(String, nullable=True)
    generated_message = Column(Text, nullable=True)
    delivery_preference = Column(String, default="White-Glove Armored Courier")
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class MemoryBoxModel(Base):
    __tablename__ = "memory_boxes"

    id = Column(String, primary_key=True, index=True)
    user_id = Column(String, index=True, nullable=False)
    consultation_id = Column(String, nullable=False)
    why_it_matters = Column(Text, nullable=False)
    emotional_story = Column(Text, nullable=False)
    personal_reflection = Column(Text, nullable=False)
    luxury_presentation = Column(Text, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class UserPreference(Base):
    __tablename__ = "user_preferences"

    id = Column(String, primary_key=True, index=True)
    user_id = Column(String, unique=True, index=True, nullable=False)
    preferred_currency = Column(String, default="₹")
    language = Column(String, default="English")
    theme_preference = Column(String, default="Classic Luxury")
    notification_preference = Column(String, default="Email & WhatsApp")
    luxury_preference = Column(String, default="Quiet Understated Luxury")
    created_at = Column(DateTime(timezone=True), server_default=func.now())

