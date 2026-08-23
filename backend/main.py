from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes.health import router as health_router


app = FastAPI(
    title="AgriAI 366 API",
    description="AI-powered agriculture backend",
    version="1.0.0"
)

# Enable CORS for React frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {
        "success": True,
        "message": "AgriAI 366 API is working",
        "version": "1.0.0"
    }


app.include_router(
    health_router
)
