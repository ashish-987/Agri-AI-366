from sqlalchemy.orm import Session
from app.dependencies import get_db
from app.schemas.all_schemas import FarmCreate, FarmResponse
from app.models.all_models import Farm, User

router = APIRouter(prefix="/farms", tags=["Farm Management"])


@router.get("/", response_model=List[FarmResponse])
def get_farmer_farms(db: Session = Depends(get_db)):
    farms = db.query(Farm).all()
    if not farms:
        # Fallback baseline farm
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
    return farms


@router.post("/", response_model=FarmResponse)
def create_farm(payload: FarmCreate, db: Session = Depends(get_db)):
    default_user = db.query(User).first()
    user_id = default_user.id if default_user else 1

    new_farm = Farm(
        user_id=user_id,
        name=payload.name,
        crop_type=payload.crop_type,
        area_acres=payload.area_acres,
        district=payload.district,
        soil_type=payload.soil_type
    )
    db.add(new_farm)
    db.commit()
    db.refresh(new_farm)
    return new_farm

