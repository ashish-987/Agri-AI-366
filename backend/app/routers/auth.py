from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.dependencies import get_db
from app.schemas.all_schemas import UserRegister, UserLogin, TokenResponse
from app.utils.helpers import get_password_hash, verify_password, create_access_token

router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.post("/register", response_model=TokenResponse)
def register_farmer(payload: UserRegister, db: Session = Depends(get_db)):
    # Mock user creation - returns JWT token immediately
    token = create_access_token(subject=payload.email)
    return TokenResponse(
        access_token=token,
        user_name=payload.full_name,
        email=payload.email
    )


@router.post("/login", response_model=TokenResponse)
def login_farmer(payload: UserLogin, db: Session = Depends(get_db)):
    token = create_access_token(subject=payload.email)
    return TokenResponse(
        access_token=token,
        user_name=payload.email.split("@")[0].capitalize(),
        email=payload.email
    )


@router.post("/google", response_model=TokenResponse)
def google_one_tap_login():
    token = create_access_token(subject="gurpreet.singh@gmail.com")
    return TokenResponse(
        access_token=token,
        user_name="Gurpreet Singh (Google)",
        email="gurpreet.singh@gmail.com"
    )
