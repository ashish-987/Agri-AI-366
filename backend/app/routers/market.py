from typing import List
from fastapi import APIRouter
from app.schemas.all_schemas import MandiPriceTickerItem
from app.services.market_service import MarketService

router = APIRouter(prefix="/market", tags=["APMC Mandi Intelligence"])


@router.get("/ticker", response_model=List[MandiPriceTickerItem])
def get_mandi_ticker():
    return MarketService.get_live_ticker()
