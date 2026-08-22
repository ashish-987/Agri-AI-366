from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel, EmailStr, Field


# Auth Schemas
class UserRegister(BaseModel):
    full_name: str
    email: EmailStr
    password: str
    phone: Optional[str] = None
    district: Optional[str] = "Ludhiana"
    state: Optional[str] = "Punjab"


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user_name: str
    email: str


class UserProfileResponse(BaseModel):
    id: int
    full_name: str
    email: str
    phone: Optional[str] = None
    district: str
    state: str
    is_verified: bool

    class Config:
        from_attributes = True


# Farm Schemas
class FarmCreate(BaseModel):
    name: str
    crop_type: str
    area_acres: float = 10.0
    district: str = "Ludhiana"
    soil_type: str = "Alluvial Clay"


class FarmResponse(FarmCreate):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True


# Disease Scan Schemas
class DiseaseScanRequest(BaseModel):
    crop_name: str = "Sharbati Wheat"
    image_base64: Optional[str] = None


class DiseaseScanResponse(BaseModel):
    crop_name: str
    disease_detected: str
    confidence_score: float
    treatment_recommendation: str
    organic_remedy: str
    scanned_at: datetime


# Weather Schemas
class WeatherForecastResponse(BaseModel):
    district: str
    temp_c: float
    condition: str
    humidity_pct: int
    wind_kmh: float
    rain_probability_pct: int
    advisory: str


# Soil Telemetry
class SoilTelemetryResponse(BaseModel):
    farm_id: int
    nitrogen_ppm: float
    phosphorus_ppm: float
    potassium_ppm: float
    ph_level: float
    moisture_pct: float
    health_status: str


# Mandi Price Schemas
class MandiPriceTickerItem(BaseModel):
    commodity: str
    district: str
    price_per_quintal: float
    change_pct: float


class PriceForecastResponse(BaseModel):
    commodity: str
    district: str
    current_price: float
    forecast_7d: float
    forecast_14d: float
    trend: str
    accuracy_confidence: float


# Marketplace Schemas
class ListingCreate(BaseModel):
    crop_name: str
    quantity_quintals: float
    asking_price_per_quintal: float
    district: str = "Ludhiana"


class ListingResponse(ListingCreate):
    id: int
    seller_name: str
    status: str
    created_at: datetime

    class Config:
        from_attributes = True


# Assistant AI Chat
class ChatMessageRequest(BaseModel):
    message: str
    language: str = "en"


class ChatMessageResponse(BaseModel):
    reply: str
    insight_box: Optional[str] = None
    follow_up_prompt: Optional[str] = None


# Generic Response
class MessageStatusResponse(BaseModel):
    status: str
    message: str
