from fastapi import APIRouter

router = APIRouter(prefix="/fertilizer", tags=["Fertilizer Calculator"])


@router.get("/recommendation")
def get_fertilizer_dosage(crop_name: str = "Wheat", growth_stage: str = "Tillering", acres: float = 10.0):
    return {
        "crop_name": crop_name,
        "growth_stage": growth_stage,
        "urea_dosage_kg": round(25.0 * acres, 2),
        "dap_dosage_kg": round(15.0 * acres, 2),
        "mop_dosage_kg": round(10.0 * acres, 2),
        "application_method": "Top dressing followed by light irrigation"
    }
