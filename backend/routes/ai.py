from fastapi import APIRouter

router = APIRouter(prefix="/ai", tags=["AI Intelligence"])


@router.get("/")
def get_ai():
    return {"message": "AI services endpoint placeholder"}
