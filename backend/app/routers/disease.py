from sqlalchemy.orm import Session
from app.dependencies import get_db
from app.schemas.all_schemas import DiseaseScanRequest, DiseaseScanResponse
from app.services.disease_service import DiseaseService
from app.models.all_models import DiseaseScan

router = APIRouter(prefix="/disease", tags=["AI Disease Detection"])


@router.post("/scan", response_model=DiseaseScanResponse)
def scan_crop_disease(payload: DiseaseScanRequest, db: Session = Depends(get_db)):
    res = DiseaseService.analyze_crop_image(payload.crop_name, payload.image_base64)
    
    scan_record = DiseaseScan(
        crop_name=res["crop_name"],
        disease_detected=res["disease_detected"],
        confidence_score=res["confidence_score"],
        treatment_recommendation=res["treatment_recommendation"],
        organic_remedy=res["organic_remedy"]
    )
    db.add(scan_record)
    db.commit()
    db.refresh(scan_record)

    return DiseaseScanResponse(**res)

