from fastapi import APIRouter

router = APIRouter(prefix="/equipment", tags=["Equipment Leasing Hub"])


@router.get("/available")
def get_equipment_listings():
    return [
        {
            "id": 1,
            "title": "Mahindra 575 DI Tractor (50 HP)",
            "category": "Tractors",
            "daily_rate_inr": 1800.0,
            "location": "Ludhiana Sector B",
            "is_available": True
        },
        {
            "id": 2,
            "title": "DJI Agras T40 Spraying Drone",
            "category": "Drones",
            "daily_rate_inr": 3500.0,
            "location": "Patiala Central",
            "is_available": True
        }
    ]
