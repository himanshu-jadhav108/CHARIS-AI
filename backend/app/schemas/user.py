from pydantic import BaseModel, EmailStr
from typing import Optional, List

class UserLogin(BaseModel):
    email: str
    password: Optional[str] = None
    provider: str = "email" # google, email

class UserResponse(BaseModel):
    id: str
    email: str
    full_name: str
    avatar_url: Optional[str] = None
    tier: str = "Charis VIP Member"
    access_token: Optional[str] = None

    class Config:
        from_attributes = True
