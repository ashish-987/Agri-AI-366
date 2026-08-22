from fastapi import APIRouter
from app.schemas.all_schemas import WeatherForecastResponse
from app.services.weather_service import WeatherService

router = APIRouter(prefix="/weather", tags=["Weather Intelligence"])


@router.get("/current/{district}", response_model=WeatherForecastResponse)
def get_weather(district: str = "Ludhiana"):
    res = WeatherService.get_district_weather(district)
    return WeatherForecastResponse(**res)


@router.get("/forecast/7day/{district}")
def get_forecast(district: str = "Ludhiana"):
    return WeatherService.get_7day_forecast(district)
