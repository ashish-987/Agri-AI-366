"""
Crop Yield Prediction Estimator Stub using soil telemetry + satellite NDVI indices.
"""

class YieldEstimator:
    def estimate(self, farm_area_acres: float, crop_type: str, ndvi_score: float) -> float:
        base_yield_per_acre = 22.5  # quintals
        return round(farm_area_acres * base_yield_per_acre * (0.8 + 0.2 * ndvi_score), 2)
