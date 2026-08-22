from fastapi import APIRouter
from app.schemas.all_schemas import PriceForecastResponse
from app.services.market_service import MarketService

router = APIRouter(prefix="/price-prediction", tags=["AI Price Forecasting"])


@router.get("/forecast", response_model=PriceForecastResponse)
def get_price_forecast(commodity: str = "Wheat", district: str = "Ludhiana"):
    res = MarketService.predict_price_trajectory(commodity, district)
    return PriceForecastResponse(**res)
