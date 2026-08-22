from sqlalchemy.orm import Session
from app.dependencies import get_db
from app.models.all_models import ExpertProfile

router = APIRouter(prefix="/experts", tags=["Expert Agronomist Network"])


@router.get("/list")
def get_expert_agronomists(db: Session = Depends(get_db)):
    experts = db.query(ExpertProfile).all()
    if not experts:
        return [
            {
                "id": 1,
                "full_name": "Dr. Harpreet Kaur",
                "specialty": "Wheat & Cereal Crop Pathologist",
                "rating": 4.9,
                "consultation_fee": 500.0,
                "is_online": True
            }
        ]
    return experts

