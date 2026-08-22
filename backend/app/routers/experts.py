from fastapi import APIRouter

router = APIRouter(prefix="/experts", tags=["Expert Agronomist Network"])


@router.get("/list")
def get_expert_agronomists():
    return [
        {
            "id": 1,
            "full_name": "Dr. Harpreet Kaur",
            "specialty": "Wheat & Cereal Crop Pathologist",
            "qualification": "Ph.D. PAU Ludhiana",
            "rating": 4.9,
            "consultation_fee_inr": 500.0,
            "is_online": True
        }
    ]
