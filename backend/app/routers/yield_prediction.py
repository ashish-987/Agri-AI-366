from fastapi import APIRouter
from app.ml.yield_.estimator import YieldEstimator

router = APIRouter(prefix="/yield", tags=["AI Yield Prediction"])


@router.get("/estimate")
def predict_yield(crop_type: str = "Wheat", area_acres: float = 12.0, ndvi_score: float = 0.84):
    estimator = YieldEstimator()
    total_yield = estimator.estimate(area_acres, crop_type, ndvi_score)
    return {
        "crop_type": crop_type,
        "area_acres": area_acres,
        "estimated_total_quintals": total_yield,
        "yield_per_acre": round(total_yield / area_acres, 2),
        "confidence_score": 0.94
    }
