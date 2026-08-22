from datetime import datetime
from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from app.database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String(120), nullable=False)
    email = Column(String(120), unique=True, index=True, nullable=False)
    phone = Column(String(30), unique=True, index=True, nullable=True)
    hashed_password = Column(String(255), nullable=False)
    district = Column(String(100), default="Ludhiana")
    state = Column(String(100), default="Punjab")
    is_active = Column(Boolean, default=True)
    is_verified = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    farms = relationship("Farm", back_populates="owner")
    scans = relationship("DiseaseScan", back_populates="user")


class Farm(Base):
    __tablename__ = "farms"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    name = Column(String(100), nullable=False)
    crop_type = Column(String(100), nullable=False)
    area_acres = Column(Float, default=10.0)
    district = Column(String(100), default="Ludhiana")
    soil_type = Column(String(50), default="Alluvial Clay")
    latitude = Column(Float, nullable=True)
    longitude = Column(Float, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    owner = relationship("User", back_populates="farms")
    soil_records = relationship("SoilTelemetry", back_populates="farm")


class DiseaseScan(Base):
    __tablename__ = "disease_scans"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    crop_name = Column(String(100), nullable=False)
    disease_detected = Column(String(150), nullable=False)
    confidence_score = Column(Float, default=0.984)
    image_url = Column(String(255), nullable=True)
    treatment_recommendation = Column(Text, nullable=True)
    organic_remedy = Column(Text, nullable=True)
    scanned_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="scans")


class WeatherRecord(Base):
    __tablename__ = "weather_records"

    id = Column(Integer, primary_key=True, index=True)
    district = Column(String(100), index=True, nullable=False)
    temp_c = Column(Float, nullable=False)
    condition = Column(String(100), nullable=False)
    humidity_pct = Column(Integer, nullable=False)
    wind_kmh = Column(Float, nullable=False)
    rain_probability_pct = Column(Integer, default=10)
    recorded_at = Column(DateTime, default=datetime.utcnow)


class SoilTelemetry(Base):
    __tablename__ = "soil_telemetry"

    id = Column(Integer, primary_key=True, index=True)
    farm_id = Column(Integer, ForeignKey("farms.id"), nullable=False)
    nitrogen_ppm = Column(Float, default=42.0)
    phosphorus_ppm = Column(Float, default=18.5)
    potassium_ppm = Column(Float, default=160.0)
    ph_level = Column(Float, default=6.8)
    moisture_pct = Column(Float, default=62.0)
    recorded_at = Column(DateTime, default=datetime.utcnow)

    farm = relationship("Farm", back_populates="soil_records")


class FertilizerRecommendation(Base):
    __tablename__ = "fertilizer_recommendations"

    id = Column(Integer, primary_key=True, index=True)
    crop_name = Column(String(100), nullable=False)
    growth_stage = Column(String(100), nullable=False)
    recommended_urea_kg = Column(Float, default=25.0)
    recommended_dap_kg = Column(Float, default=15.0)
    recommended_mop_kg = Column(Float, default=10.0)
    advisory_notes = Column(Text, nullable=True)


class IrrigationSchedule(Base):
    __tablename__ = "irrigation_schedules"

    id = Column(Integer, primary_key=True, index=True)
    farm_id = Column(Integer, ForeignKey("farms.id"), nullable=False)
    water_volume_liters = Column(Float, default=1200.0)
    scheduled_time = Column(DateTime, nullable=False)
    status = Column(String(50), default="Pending")


class CropYield(Base):
    __tablename__ = "crop_yields"

    id = Column(Integer, primary_key=True, index=True)
    crop_name = Column(String(100), nullable=False)
    district = Column(String(100), nullable=False)
    estimated_yield_quintals_per_acre = Column(Float, default=22.5)
    predicted_confidence = Column(Float, default=0.94)


class MandiPrice(Base):
    __tablename__ = "mandi_prices"

    id = Column(Integer, primary_key=True, index=True)
    commodity = Column(String(100), index=True, nullable=False)
    district = Column(String(100), index=True, nullable=False)
    price_per_quintal = Column(Float, nullable=False)
    change_pct = Column(Float, default=0.0)
    updated_at = Column(DateTime, default=datetime.utcnow)


class MarketplaceListing(Base):
    __tablename__ = "marketplace_listings"

    id = Column(Integer, primary_key=True, index=True)
    seller_name = Column(String(100), nullable=False)
    crop_name = Column(String(100), nullable=False)
    quantity_quintals = Column(Float, nullable=False)
    asking_price_per_quintal = Column(Float, nullable=False)
    district = Column(String(100), nullable=False)
    status = Column(String(50), default="Available")
    created_at = Column(DateTime, default=datetime.utcnow)


class EquipmentItem(Base):
    __tablename__ = "equipment_items"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(120), nullable=False)
    category = Column(String(80), nullable=False)
    daily_rate_inr = Column(Float, nullable=False)
    location = Column(String(100), nullable=False)
    is_available = Column(Boolean, default=True)


class ExpertProfile(Base):
    __tablename__ = "expert_profiles"

    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String(120), nullable=False)
    specialty = Column(String(120), nullable=False)
    rating = Column(Float, default=4.9)
    consultation_fee = Column(Float, default=500.0)
    is_online = Column(Boolean, default=True)


class CommunityPost(Base):
    __tablename__ = "community_posts"

    id = Column(Integer, primary_key=True, index=True)
    author_name = Column(String(100), nullable=False)
    title = Column(String(200), nullable=False)
    content = Column(Text, nullable=False)
    likes_count = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)


class Notification(Base):
    __tablename__ = "notifications"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, nullable=True)
    title = Column(String(150), nullable=False)
    message = Column(Text, nullable=False)
    category = Column(String(50), default="Weather")
    created_at = Column(DateTime, default=datetime.utcnow)
