from sqlalchemy.orm import Session
from app.dependencies import get_db
from app.schemas.all_schemas import MandiPriceTickerItem
from app.models.all_models import MandiPrice
from app.services.market_service import MarketService

router = APIRouter(prefix="/market", tags=["APMC Mandi Intelligence"])


@router.get("/ticker", response_model=List[MandiPriceTickerItem])
def get_mandi_ticker(db: Session = Depends(get_db)):
    prices = db.query(MandiPrice).all()
    if not prices:
        return MarketService.get_live_ticker()
    return prices

