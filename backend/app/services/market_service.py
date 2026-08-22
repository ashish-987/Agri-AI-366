class MarketService:
    @staticmethod
    def get_live_ticker() -> list:
        return [
            {"commodity": "🌾 Wheat", "district": "Ludhiana", "price_per_quintal": 2450.0, "change_pct": 4.2},
            {"commodity": "🍅 Tomato", "district": "Karnal", "price_per_quintal": 3200.0, "change_pct": 8.5},
            {"commodity": "🫘 Soybean", "district": "Indore", "price_per_quintal": 4890.0, "change_pct": -1.1},
            {"commodity": "🌽 Maize", "district": "Patiala", "price_per_quintal": 2180.0, "change_pct": 1.5},
            {"commodity": "🌾 Basmati Rice", "district": "Amritsar", "price_per_quintal": 4350.0, "change_pct": 3.8}
        ]

    @staticmethod
    def predict_price_trajectory(commodity: str, district: str = "Ludhiana") -> dict:
        return {
            "commodity": commodity,
            "district": district,
            "current_price": 2450.0,
            "forecast_7d": 2550.0,
            "forecast_14d": 2620.0,
            "trend": "Bullish (+6.9%)",
            "accuracy_confidence": 0.942,
            "recommendation": "Hold harvest for 7 to 10 days to maximize APMC mandi payout."
        }
