class AIService:
    @staticmethod
    def generate_agronomist_reply(user_message: str, language: str = "en") -> dict:
        return {
            "reply": "Based on your soil NPK telemetry (42 ppm Nitrogen) and Tillering crop lifecycle (Day 42), apply 25kg/acre Urea top-dressing followed by light drip irrigation.",
            "insight_box": "Recommendation: Avoid excessive flooding. Maintain 60-65% soil moisture for maximum nutrient uptake.",
            "follow_up_prompt": "Would you like me to trigger an automated irrigation schedule for 02:00 PM today?"
        }
