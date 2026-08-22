from datetime import datetime
from fastapi import APIRouter

router = APIRouter(prefix="/notifications", tags=["Alerts & Notifications"])


@router.get("/my-alerts")
def get_user_notifications():
    return [
        {
            "id": 1,
            "title": "APMC Mandi Price Alert",
            "message": "Wheat price in Ludhiana mandi increased by +4.2% today (₹2,450/q).",
            "category": "Market",
            "timestamp": datetime.utcnow().isoformat()
        },
        {
            "id": 2,
            "title": "Light Rain Forecast Alert",
            "message": "Light showers expected in 24 hours. Postpone chemical foliar spraying.",
            "category": "Weather",
            "timestamp": datetime.utcnow().isoformat()
        }
    ]
