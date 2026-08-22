class WeatherService:
    @staticmethod
    def get_district_weather(district: str = "Ludhiana") -> dict:
        # Mock weather telemetry - easily plug OpenWeather API key in config.py
        return {
            "district": district,
            "temp_c": 24.5,
            "condition": "Partly Cloudy with Light Rain",
            "humidity_pct": 68,
            "wind_kmh": 12.4,
            "rain_probability_pct": 25,
            "advisory": "Optimal conditions for wheat tillering top-dressing. Postpone heavy pesticide spray for 24 hours."
        }

    @staticmethod
    def get_7day_forecast(district: str = "Ludhiana") -> list:
        days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        return [
            {"day": day, "high_c": 26 - i % 3, "low_c": 16 - i % 2, "condition": "Sunny" if i % 2 == 0 else "Light Rain"}
            for i, day in enumerate(days)
        ]
