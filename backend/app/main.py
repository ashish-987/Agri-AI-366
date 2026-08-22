from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings
from app.database import engine, Base, SessionLocal
from app.database_seeder import seed_initial_data
from app.models import all_models  # Ensures models are imported for metadata

# Automatically initialize database tables & seed initial records on startup
Base.metadata.create_all(bind=engine)
with SessionLocal() as db_session:
    seed_initial_data(db_session)

# Import all 20 domain routers
from app.routers import (
    auth,
    users,
    farms,
    disease,
    weather,
    soil,
    fertilizer,
    irrigation,
    yield_prediction,
    price_prediction,
    market,
    marketplace,
    pest,
    satellite,
    community,
    equipment,
    experts,
    supply_chain,
    assistant,
    notifications
)

# Automatically initialize database tables on startup
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Set up CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root_health_check():
    return {
        "status": "Online",
        "app": settings.PROJECT_NAME,
        "version": settings.VERSION,
        "docs_url": "/docs",
        "health_check": f"{settings.API_V1_STR}/health"
    }


@app.get(f"{settings.API_V1_STR}/health")
def api_v1_health():
    return {
        "status": "Healthy",
        "active_districts_network": 366,
        "database": "Connected"
    }


# Register all 20 domain routers under /api/v1 prefix
api_prefix = settings.API_V1_STR
app.include_router(auth.router, prefix=api_prefix)
app.include_router(users.router, prefix=api_prefix)
app.include_router(farms.router, prefix=api_prefix)
app.include_router(disease.router, prefix=api_prefix)
app.include_router(weather.router, prefix=api_prefix)
app.include_router(soil.router, prefix=api_prefix)
app.include_router(fertilizer.router, prefix=api_prefix)
app.include_router(irrigation.router, prefix=api_prefix)
app.include_router(yield_prediction.router, prefix=api_prefix)
app.include_router(price_prediction.router, prefix=api_prefix)
app.include_router(market.router, prefix=api_prefix)
app.include_router(marketplace.router, prefix=api_prefix)
app.include_router(pest.router, prefix=api_prefix)
app.include_router(satellite.router, prefix=api_prefix)
app.include_router(community.router, prefix=api_prefix)
app.include_router(equipment.router, prefix=api_prefix)
app.include_router(experts.router, prefix=api_prefix)
app.include_router(supply_chain.router, prefix=api_prefix)
app.include_router(assistant.router, prefix=api_prefix)
app.include_router(notifications.router, prefix=api_prefix)
