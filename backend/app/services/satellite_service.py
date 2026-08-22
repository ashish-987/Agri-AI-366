class SatelliteService:
    @staticmethod
    def get_ndvi_analysis(farm_id: int) -> dict:
        return {
            "farm_id": farm_id,
            "ndvi_score": 0.84,
            "vegetation_health": "Optimal Green Canopy",
            "chlorophyll_index": "High",
            "anomaly_detected": False,
            "satellite_source": "Sentinel-2 MSI",
            "last_pass_date": "2026-08-20"
        }
