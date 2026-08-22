from fastapi import APIRouter
from app.schemas.all_schemas import SoilTelemetryResponse
from app.services.soil_service import SoilService

router = APIRouter(prefix="/soil", tags=["Soil Telemetry"])


@router.get("/telemetry/{farm_id}", response_model=SoilTelemetryResponse)
def get_soil_telemetry(farm_id: int):
    res = SoilService.get_soil_health(farm_id)
    return SoilTelemetryResponse(**res)
