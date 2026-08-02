from fastapi import APIRouter, Depends, HTTPException, status
from app.schemas.user import UserLogin, UserResponse

router = APIRouter(prefix="/auth", tags=["Authentication"])

@router.post("/login", response_model=UserResponse)
def mock_login(login_data: UserLogin):
    """
    Mock authentication supporting Email & Google OAuth login.
    Returns persistent JWT token session.
    """
    name = login_data.email.split("@")[0].replace(".", " ").title() if "@" in login_data.email else "Discerning Client"
    avatar = f"https://api.dicebear.com/7.x/avataaars/svg?seed={login_data.email}"
    
    return UserResponse(
        id=f"usr_{abs(hash(login_data.email)) % 1000000}",
        email=login_data.email,
        full_name=f"Lord / Lady {name}" if name != "Discerning Client" else "Valued VIP Client",
        avatar_url=avatar,
        tier="Charis VIP Sovereign Member",
        access_token=f"charis_jwt_session_token_{abs(hash(login_data.email))}"
    )

@router.get("/me", response_model=UserResponse)
def get_current_user():
    return UserResponse(
        id="usr_888888",
        email="vip@charis.luxury",
        full_name="Alexander von Montgomery",
        avatar_url="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
        tier="Charis VIP Sovereign Member",
        access_token="charis_jwt_session_token_active"
    )
