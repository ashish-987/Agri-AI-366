from sqlalchemy.orm import Session
from app.dependencies import get_db
from app.schemas.all_schemas import ListingCreate, ListingResponse
from app.models.all_models import MarketplaceListing

router = APIRouter(prefix="/marketplace", tags=["Direct Farmer Marketplace"])


@router.get("/listings", response_model=List[ListingResponse])
def get_crop_listings(db: Session = Depends(get_db)):
    listings = db.query(MarketplaceListing).order_by(MarketplaceListing.created_at.desc()).all()
    if not listings:
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
    return listings


@router.post("/listings", response_model=ListingResponse)
def create_crop_listing(payload: ListingCreate, db: Session = Depends(get_db)):
    new_listing = MarketplaceListing(
        seller_name="Gurpreet Singh",
        crop_name=payload.crop_name,
        quantity_quintals=payload.quantity_quintals,
        asking_price_per_quintal=payload.asking_price_per_quintal,
        district=payload.district or "Ludhiana",
        status="Active Direct Listing"
    )
    db.add(new_listing)
    db.commit()
    db.refresh(new_listing)
    return new_listing

