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
    
    DATABASE_URL: str = "sqlite:///./charis_luxury.db"
    
    CORS_ORIGINS: List[str] = [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "https://*.vercel.app"
    ]

settings = Settings()


