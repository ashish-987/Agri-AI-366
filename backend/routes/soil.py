from fastapi import APIRouter

router = APIRouter(prefix="/soil", tags=["Soil"])


@router.get("/")
def get_soil():
    return {"message": "Soil endpoint placeholder"}
