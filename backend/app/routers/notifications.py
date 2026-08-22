from sqlalchemy.orm import Session
from app.dependencies import get_db
from app.models.all_models import Notification

router = APIRouter(prefix="/notifications", tags=["Alerts & Notifications"])


@router.get("/my-alerts")
def get_user_notifications(db: Session = Depends(get_db)):
    notifs = db.query(Notification).order_by(Notification.created_at.desc()).all()
    if not notifs:
        return [
            {
                "id": 1,
                "title": "APMC Mandi Price Alert",
                "message": "Wheat price in Ludhiana mandi increased by +4.2% today (₹2,450/q).",
                "category": "Market",
                "created_at": datetime.utcnow().isoformat()
            }
        ]
    return notifs

