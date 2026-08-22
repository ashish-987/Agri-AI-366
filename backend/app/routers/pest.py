from fastapi import APIRouter
from app.ml.pest.analyzer import PestAnalyzer

router = APIRouter(prefix="/pest", tags=["Pest & Insect Alert System"])


@router.get("/risk-assessment")
def get_pest_risk(crop_type: str = "Wheat", humidity_pct: float = 68.0, temp_c: float = 24.5):
    analyzer = PestAnalyzer()
    return analyzer.evaluate_risk(crop_type, humidity_pct, temp_c)
