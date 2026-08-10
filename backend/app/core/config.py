from pydantic import BaseModel
from typing import List, Optional
import os
from dotenv import load_dotenv

# Load .env file automatically from backend root
load_dotenv(os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), ".env"))

class Settings(BaseModel):
    PROJECT_NAME: str = "CHARIS - Luxury AI Gift Concierge"
    API_V1_STR: str = "/api"
    SECRET_KEY: str = "CHARIS_LUXURY_SECRET_KEY_98410294812"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7  # 7 days
    
    GEMINI_API_KEY: str = os.getenv("GEMINI_API_KEY", "")
    
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./charis_luxury.db")
    
    SUPABASE_URL: str = os.getenv("SUPABASE_URL", "")
    SUPABASE_KEY: str = os.getenv("SUPABASE_KEY", "")
    SUPABASE_JWT_SECRET: str = os.getenv("SUPABASE_JWT_SECRET", "")
    
    CORS_ORIGINS: List[str] = [
        origin.strip() for origin in os.getenv(
            "CORS_ORIGINS",
            "http://localhost:3000,http://127.0.0.1:3000,https://charis-luxury.vercel.app"
        ).split(",")
    ]

settings = Settings()


