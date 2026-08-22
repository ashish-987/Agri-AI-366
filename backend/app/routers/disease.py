from fastapi import APIRouter
from app.schemas.all_schemas import DiseaseScanRequest, DiseaseScanResponse
from app.services.disease_service import DiseaseService

router = APIRouter(prefix="/disease", tags=["AI Disease Detection"])


@router.post("/scan", response_model=DiseaseScanResponse)
def scan_crop_disease(payload: DiseaseScanRequest):
    res = DiseaseService.analyze_crop_image(payload.crop_name, payload.image_base64)
    return DiseaseScanResponse(**res)
