from datetime import datetime
from typing import List
from fastapi import APIRouter, Depends
from app.schemas.all_schemas import FarmCreate, FarmResponse

router = APIRouter(prefix="/farms", tags=["Farm Management"])


@router.get("/", response_model=List[FarmResponse])
def get_farmer_farms():
    return [
        FarmResponse(
            id=1,
            name="Punjab Sector A",
            crop_type="Sharbati Wheat",
            area_acres=12.0,
            district="Ludhiana",
            soil_type="Alluvial Clay",
            created_at=datetime.utcnow()
        )
    ]


@router.post("/", response_model=FarmResponse)
def create_farm(payload: FarmCreate):
    return FarmResponse(
        id=2,
        name=payload.name,
        crop_type=payload.crop_type,
        area_acres=payload.area_acres,
        district=payload.district,
        soil_type=payload.soil_type,
        created_at=datetime.utcnow()
    )
