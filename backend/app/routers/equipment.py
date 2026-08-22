from sqlalchemy.orm import Session
from app.dependencies import get_db
from app.models.all_models import EquipmentItem

router = APIRouter(prefix="/equipment", tags=["Equipment Leasing Hub"])


@router.get("/available")
def get_equipment_listings(db: Session = Depends(get_db)):
    items = db.query(EquipmentItem).filter(EquipmentItem.is_available == True).all()
    if not items:
        return [
            {
                "id": 1,
                "title": "Mahindra 575 DI Tractor (50 HP)",
                "category": "Tractors",
                "daily_rate_inr": 1800.0,
                "location": "Ludhiana Sector B",
                "is_available": True
            }
        ]
    return items

