from datetime import datetime, timedelta
from fastapi import APIRouter

router = APIRouter(prefix="/irrigation", tags=["Smart Irrigation"])


@router.get("/schedule/{farm_id}")
def get_irrigation_schedule(farm_id: int):
    return {
        "farm_id": farm_id,
        "next_irrigation_time": (datetime.utcnow() + timedelta(hours=4)).isoformat(),
        "recommended_volume_liters": 1200.0,
        "trigger": "Automated Drip Valve Sensor Node A1",
        "status": "Scheduled"
    }
