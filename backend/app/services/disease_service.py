from datetime import datetime


class DiseaseService:
    @staticmethod
    def analyze_crop_image(crop_name: str = "Sharbati Wheat", image_base64: str = None) -> dict:
        return {
            "crop_name": crop_name,
            "disease_detected": "Yellow Rust (Puccinia striiformis)",
            "confidence_score": 0.984,
            "treatment_recommendation": "Apply Tebuconazole 250 EC at 1ml/Liter of water via foliar spray during morning hours.",
            "organic_remedy": "Spray Neem oil solution (5ml/L) combined with liquid bio-fungicide (Trichoderma viride).",
            "scanned_at": datetime.utcnow()
        }
