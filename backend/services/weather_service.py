import httpx


OPEN_METEO_URL = "https://api.open-meteo.com/v1/forecast"


async def get_weather(
    latitude: float,
    longitude: float
):
    params = {
        "latitude": latitude,
        "longitude": longitude,

        "current": ",".join([
            "temperature_2m",
            "relative_humidity_2m",
            "apparent_temperature",
            "precipitation",
            "rain",
            "weather_code",
            "wind_speed_10m"
        ]),

        "hourly": ",".join([
            "temperature_2m",
            "relative_humidity_2m",
            "precipitation_probability",
            "precipitation",
            "rain",
            "weather_code",
            "wind_speed_10m"
        ]),

        "daily": ",".join([
            "weather_code",
            "temperature_2m_max",
            "temperature_2m_min",
            "precipitation_sum",
            "rain_sum",
            "precipitation_probability_max",
            "wind_speed_10m_max"
        ]),

        "timezone": "auto",

        "forecast_days": 7
    }

    async with httpx.AsyncClient(
        timeout=15.0
    ) as client:

        response = await client.get(
            OPEN_METEO_URL,
            params=params
        )

        response.raise_for_status()

        return response.json()
