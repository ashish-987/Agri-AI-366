from fastapi import APIRouter

router = APIRouter(prefix="/supply-chain", tags=["Supply Chain & Logistics"])


@router.get("/cold-storage")
def get_cold_storage_units(district: str = "Ludhiana"):
    return [
        {
            "id": 101,
            "facility_name": "Punjab Agri Cold Chain Hub",
            "capacity_tons": 5000,
            "available_space_tons": 1200,
            "temp_c": 4.0,
            "district": district
        }
    ]
