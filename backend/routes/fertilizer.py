from fastapi import APIRouter, HTTPException

from services.fertilizer_service import (
    generate_fertilizer_recommendation
)


router = APIRouter(
    prefix="/fertilizer",
    tags=["Fertilizer"]
)


@router.get("/recommend")
async def fertilizer_recommendation(
    crop: str = "Wheat",
    nitrogen: float = 0,
    phosphorus: float = 0,
    potassium: float = 0
):

    try:

        result = generate_fertilizer_recommendation(
            crop=crop,
            nitrogen=nitrogen,
            phosphorus=phosphorus,
            potassium=potassium
        )

        return {
            "success": True,
            "data": result
        }

    except Exception as error:

        raise HTTPException(
            status_code=500,
            detail=str(error)
        )
