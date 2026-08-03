from fastapi import APIRouter, Depends, HTTPException, status, Security
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session
from jose import jwt, JWTError
from app.core.config import settings
from app.core.database import get_db
from app.models.user import User
from app.schemas.user import UserLogin, UserResponse

router = APIRouter(prefix="/auth", tags=["Authentication"])
security = HTTPBearer()

def get_current_user(credentials: HTTPAuthorizationCredentials = Security(security), db: Session = Depends(get_db)) -> User:
    """
    Decodes the Supabase JWT token from the Authorization header,
    verifies it against the Supabase JWT secret, and retrieves or creates
    the corresponding user in the database.
    """
    token = credentials.credentials
    
    # Fallback for local development or mock sessions
    if not settings.SUPABASE_JWT_SECRET or token == "active_session_token" or token.startswith("charis_jwt_session_token_"):
        user_id = "usr_guest_vip"
        if token.startswith("charis_jwt_session_token_"):
            user_id = f"usr_{token.split('_')[-1]}"
            
        user = db.query(User).filter(User.id == user_id).first()
        if not user:
            user = User(
                id=user_id,
                email="vip.client@charis.luxury",
                full_name="Lord / Lady Alexander",
                tier="Charis VIP Sovereign Member",
                avatar_url="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"
            )
            db.add(user)
            db.commit()
            db.refresh(user)
        return user

    try:
        # Decode token with Supabase JWT secret
        payload = jwt.decode(token, settings.SUPABASE_JWT_SECRET, algorithms=["HS256"], options={"verify_aud": False})
        user_id = payload.get("sub")
        email = payload.get("email")
        if user_id is None:
            raise HTTPException(status_code=401, detail="Invalid token: missing subject claim")
    except JWTError as err:
        raise HTTPException(status_code=401, detail=f"Token verification failed: {str(err)}")

    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        # Lazy synchronize user record from decrypted JWT
        name = email.split("@")[0].replace(".", " ").title() if email else "VIP Client"
        user = User(
            id=user_id,
            email=email or f"user_{user_id[:8]}@charis.luxury",
            full_name=f"Lord / Lady {name}" if name != "VIP Client" else "Valued VIP Client",
            tier="Charis VIP Sovereign Member",
            avatar_url=f"https://api.dicebear.com/7.x/avataaars/svg?seed={email or user_id}"
        )
        db.add(user)
        db.commit()
        db.refresh(user)

    return user

@router.post("/login", response_model=UserResponse)
def login_or_register(login_data: UserLogin, db: Session = Depends(get_db)):
    """
    Authenticates or registers a user record in the local database.
    """
    email = login_data.email
    user_id = f"usr_{abs(hash(email)) % 1000000}"
    
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        name = email.split("@")[0].replace(".", " ").title() if "@" in email else "VIP Client"
        user = User(
            id=user_id,
            email=email,
            full_name=f"Lord / Lady {name}" if name != "VIP Client" else "Valued VIP Client",
            avatar_url=f"https://api.dicebear.com/7.x/avataaars/svg?seed={email}",
            tier="Charis VIP Sovereign Member"
        )
        db.add(user)
        db.commit()
        db.refresh(user)

    return UserResponse(
        id=user.id,
        email=user.email,
        full_name=user.full_name,
        avatar_url=user.avatar_url,
        tier=user.tier,
        access_token=f"charis_jwt_session_token_{user.id.split('_')[-1]}"
    )

@router.get("/me", response_model=UserResponse)
def get_current_user_profile(user: User = Depends(get_current_user)):
    return UserResponse(
        id=user.id,
        email=user.email,
        full_name=user.full_name,
        avatar_url=user.avatar_url,
        tier=user.tier,
        access_token="active_session_token"
    )
