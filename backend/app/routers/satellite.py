from fastapi import APIRouter
from app.services.satellite_service import SatelliteService

router = APIRouter(prefix="/satellite", tags=["Satellite NDVI Digital Twin"])


@router.get("/ndvi/{farm_id}")
def get_farm_ndvi(farm_id: int):
    return SatelliteService.get_ndvi_analysis(farm_id)
