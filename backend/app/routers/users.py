from fastapi import APIRouter, Depends
from app.dependencies import get_current_user_id
from app.schemas.all_schemas import UserProfileResponse

router = APIRouter(prefix="/users", tags=["Users"])


@router.get("/me", response_model=UserProfileResponse)
def get_user_profile(user_id: str = Depends(get_current_user_id)):
    return UserProfileResponse(
        id=1,
        full_name="Gurpreet Singh",
        email="gurpreet.singh@gmail.com",
        phone="+91 98123 45678",
        district="Ludhiana",
        state="Punjab",
        is_verified=True
    )
