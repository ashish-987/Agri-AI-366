from fastapi import APIRouter, HTTPException

from services.weather_service import get_weather
from services.advisory_service import generate_weather_advisory
from services.forecast_service import calculate_forecast_advisory


router = APIRouter()


@router.get("/weather")
async def weather(
    latitude: float,
    longitude: float
):

    try:

        data = await get_weather(
            latitude,
            longitude
        )

        return {
            "success": True,
            "latitude": latitude,
            "longitude": longitude,
            "data": data
        }

    except Exception as error:

        raise HTTPException(
            status_code=500,
            detail=f"Weather service error: {str(error)}"
        )


@router.get("/weather/advisory")
async def weather_advisory(
    latitude: float,
    longitude: float
):

    try:

        data = await get_weather(
            latitude,
            longitude
        )

        current = data.get(
            "current",
            {}
        )

        advisory = generate_weather_advisory(
            current
        )

        return {
            "success": True,
            "latitude": latitude,
            "longitude": longitude,
            "current": current,
            "advisory": advisory
        }

    except Exception as error:

        raise HTTPException(
            status_code=500,
            detail=f"Advisory service error: {str(error)}"
        )


@router.get("/weather/forecast-advisory")
async def forecast_advisory(
    latitude: float,
    longitude: float
):

    try:

        data = await get_weather(
            latitude,
            longitude
        )

        daily = data.get("daily") or data.get("data", {}).get("daily", {})

        forecast = calculate_forecast_advisory(
            daily
        )

        return {
            "success": True,
            "latitude": latitude,
            "longitude": longitude,
            "forecast": forecast
        }

    except Exception as error:

        raise HTTPException(
            status_code=500,
            detail=f"Forecast advisory error: {str(error)}"
        )
