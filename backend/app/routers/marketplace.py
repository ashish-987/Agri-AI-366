from datetime import datetime
from typing import List
from fastapi import APIRouter
from app.schemas.all_schemas import ListingCreate, ListingResponse

router = APIRouter(prefix="/marketplace", tags=["Direct Farmer Marketplace"])


@router.get("/listings", response_model=List[ListingResponse])
def get_crop_listings():
    return [
        ListingResponse(
            id=1,
            seller_name="Gurpreet Singh",
            crop_name="Sharbati Premium Wheat",
            quantity_quintals=250.0,
            asking_price_per_quintal=2450.0,
            district="Ludhiana",
            status="Active Direct Listing",
            created_at=datetime.utcnow()
        )
    ]


@router.post("/listings", response_model=ListingResponse)
def create_crop_listing(payload: ListingCreate):
    return ListingResponse(
        id=2,
        seller_name="Farmer Singh",
        crop_name=payload.crop_name,
        quantity_quintals=payload.quantity_quintals,
        asking_price_per_quintal=payload.asking_price_per_quintal,
        district=payload.district,
        status="Active Direct Listing",
        created_at=datetime.utcnow()
    )
