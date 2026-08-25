from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes.health import router as health_router
from routes.weather import router as weather_router
from routes.soil import router as soil_router
from routes.fertilizer import router as fertilizer_router
from routes.farms import router as farms_router
from routes.fields import router as fields_router
from routes.crops import router as crops_router
from routes.ai import router as ai_router


app = FastAPI(
    title="AgriAI 366 API",
    description="AI-powered agriculture backend",
    version="1.0.0"
)


# ==========================================
# CORS
# ==========================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "https://agri-ai-366.netlify.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ==========================================
# ROOT
# ==========================================

@app.get("/")
def root():
    return {
        "success": True,
        "message": "AgriAI 366 API is working",
        "version": "1.0.0"
    }


# ==========================================
# ROUTES
# ==========================================

app.include_router(health_router)
app.include_router(weather_router)
app.include_router(soil_router)
app.include_router(fertilizer_router)
app.include_router(farms_router)
app.include_router(fields_router)
app.include_router(crops_router)
app.include_router(ai_router)
