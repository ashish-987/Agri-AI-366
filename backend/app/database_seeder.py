from datetime import datetime, timedelta
from sqlalchemy.orm import Session
from app.models.all_models import (
    User,
    Farm,
    MandiPrice,
    EquipmentItem,
    ExpertProfile,
    CommunityPost,
    WeatherRecord,
    SoilTelemetry,
    Notification
)
from app.utils.helpers import get_password_hash


def seed_initial_data(db: Session):
    """Seed baseline data into empty database tables on initial application startup."""
    
    # 1. Seed Default Farmer User if empty
    if db.query(User).count() == 0:
        default_user = User(
            full_name="Gurpreet Singh",
            email="gurpreet.singh@gmail.com",
            phone="+91 98123 45678",
            hashed_password=get_password_hash("farmer123"),
            district="Ludhiana",
            state="Punjab",
            is_verified=True
        )
        db.add(default_user)
        db.commit()
        db.refresh(default_user)

        # Create baseline farm for default user
        default_farm = Farm(
            user_id=default_user.id,
            name="Punjab Sector A",
            crop_type="Sharbati Wheat",
            area_acres=12.0,
            district="Ludhiana",
            soil_type="Alluvial Clay"
        )
        db.add(default_farm)
        db.commit()
        db.refresh(default_farm)

        # Baseline Soil Telemetry
        soil_record = SoilTelemetry(
            farm_id=default_farm.id,
            nitrogen_ppm=42.0,
            phosphorus_ppm=18.5,
            potassium_ppm=160.0,
            ph_level=6.8,
            moisture_pct=62.0
        )
        db.add(soil_record)
        db.commit()

    # 2. Seed APMC Mandi Prices if empty
    if db.query(MandiPrice).count() == 0:
        prices = [
            MandiPrice(commodity="🌾 Wheat", district="Ludhiana", price_per_quintal=2450.0, change_pct=4.2),
            MandiPrice(commodity="🍅 Tomato", district="Karnal", price_per_quintal=3200.0, change_pct=8.5),
            MandiPrice(commodity="🫘 Soybean", district="Indore", price_per_quintal=4890.0, change_pct=-1.1),
            MandiPrice(commodity="🌽 Maize", district="Patiala", price_per_quintal=2180.0, change_pct=1.5),
            MandiPrice(commodity="🌾 Basmati Rice", district="Amritsar", price_per_quintal=4350.0, change_pct=3.8)
        ]
        db.add_all(prices)
        db.commit()

    # 3. Seed Equipment Hub Items if empty
    if db.query(EquipmentItem).count() == 0:
        equipment = [
            EquipmentItem(title="Mahindra 575 DI Tractor (50 HP)", category="Tractors", daily_rate_inr=1800.0, location="Ludhiana Sector B", is_available=True),
            EquipmentItem(title="DJI Agras T40 Spraying Drone", category="Drones", daily_rate_inr=3500.0, location="Patiala Central", is_available=True),
            EquipmentItem(title="Preet 987 Crop Combine Harvester", category="Harvesters", daily_rate_inr=4500.0, location="Jalandhar North", is_available=True)
        ]
        db.add_all(equipment)
        db.commit()

    # 4. Seed Certified Expert Profiles if empty
    if db.query(ExpertProfile).count() == 0:
        experts = [
            ExpertProfile(full_name="Dr. Harpreet Kaur", specialty="Wheat & Cereal Crop Pathologist", rating=4.9, consultation_fee=500.0, is_online=True),
            ExpertProfile(full_name="Dr. Rajesh Sharma", specialty="Soil Fertility & NPK Nutritionist", rating=4.8, consultation_fee=450.0, is_online=True),
            ExpertProfile(full_name="Dr. Sunita Verma", specialty="Veterinary & Livestock Specialist", rating=4.9, consultation_fee=600.0, is_online=False)
        ]
        db.add_all(experts)
        db.commit()

    # 5. Seed Community Forum Posts if empty
    if db.query(CommunityPost).count() == 0:
        posts = [
            CommunityPost(
                author_name="Lakhwinder Singh",
                title="Best biological fungicide for Yellow Rust in Ludhiana?",
                content="Brothers, has anyone tried Neem oil combined with Trichoderma viride? Getting great results on 12 acres Sharbati Wheat.",
                likes_count=48
            ),
            CommunityPost(
                author_name="Jaswinder Kaur",
                title="Direct Corporate Buying for Basmati Paddy",
                content="Just finalized a deal with Reliance Retail at ₹4,350/quintal directly through the AgriAI 366 Marketplace tab. Zero middleman fees!",
                likes_count=92
            )
        ]
        db.add_all(posts)
        db.commit()

    # 6. Seed Weather Records if empty
    if db.query(WeatherRecord).count() == 0:
        weather_rec = WeatherRecord(
            district="Ludhiana",
            temp_c=24.5,
            condition="Partly Cloudy with Light Rain",
            humidity_pct=68,
            wind_kmh=12.4,
            rain_probability_pct=25
        )
        db.add(weather_rec)
        db.commit()

    # 7. Seed Notifications if empty
    if db.query(Notification).count() == 0:
        notifs = [
            Notification(
                title="APMC Mandi Price Alert",
                message="Wheat price in Ludhiana mandi increased by +4.2% today (₹2,450/q).",
                category="Market"
            ),
            Notification(
                title="Light Rain Forecast Alert",
                message="Light showers expected in 24 hours. Postpone chemical foliar spraying.",
                category="Weather"
            )
        ]
        db.add_all(notifs)
        db.commit()
