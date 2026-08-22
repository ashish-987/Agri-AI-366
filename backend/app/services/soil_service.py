class SoilService:
    @staticmethod
    def get_soil_health(farm_id: int) -> dict:
        return {
            "farm_id": farm_id,
            "nitrogen_ppm": 42.0,
            "phosphorus_ppm": 18.5,
            "potassium_ppm": 160.0,
            "ph_level": 6.8,
            "moisture_pct": 62.0,
            "health_status": "Optimal Soil Telemetry",
            "organic_carbon_pct": 0.72
        }
