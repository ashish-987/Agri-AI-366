from sqlalchemy.orm import Session
from app.dependencies import get_db, get_current_user_id
from app.schemas.all_schemas import UserProfileResponse
from app.models.all_models import User

router = APIRouter(prefix="/users", tags=["Users"])


@router.get("/me", response_model=UserProfileResponse)
def get_user_profile(user_email: str = Depends(get_current_user_id), db: Session = Depends(get_db)):
    if user_email:
        user = db.query(User).filter(User.email == user_email).first()
        if user:
            return user
            
    # Default fallback user if no auth token provided
    default_user = db.query(User).first()
    if default_user:
        return default_user
        
    return UserProfileResponse(
        id=1,
        full_name="Gurpreet Singh",
        email="gurpreet.singh@gmail.com",
        phone="+91 98123 45678",
        district="Ludhiana",
        state="Punjab",
        is_verified=True
    )

