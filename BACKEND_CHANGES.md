# Developer Guide: Future Backend Customization & Production Checklist

This document details all specific locations, API keys, database migrations, real ML model weight placements, and frontend integration steps you will need to customize as your project scales to production.

---

## 🔑 1. Environment Variables & Third-Party API Keys

**File**: [`backend/.env`](file:///d:/SIH-2026/AgriAi-366/backend/.env) (created from [`backend/.env.example`](file:///d:/SIH-2026/AgriAi-366/backend/.env.example))

When deploying or moving beyond mock data, update the following keys in your `.env` file:

| Variable Name | Purpose | Where to Obtain Key / Action Needed |
|---|---|---|
| `SECRET_KEY` | JWT Session Token Encryption | Replace default string with a secure generated 64-char key (`openssl rand -hex 32`). |
| `DATABASE_URL` | Production Database URL | Change `sqlite:///./agriai366.db` to PostgreSQL/MySQL e.g. `postgresql://user:pass@host:5432/agriai366_db`. |
| `OPENWEATHER_API_KEY` | Live weather forecasts & alerts | Register at [OpenWeatherMap API](https://openweathermap.org/api). |
| `APMC_MANDI_API_KEY` | Real 366 district mandi price feeds | Register at Govt of India Data Portal ([data.gov.in](https://data.gov.in)). |
| `SENTINEL_SATELLITE_KEY` | Satellite NDVI Vegetation Index maps | Register at [Copernicus / Sentinel Hub API](https://www.sentinel-hub.com/). |
| `GEMINI_API_KEY` | 24/7 Voice AI Agronomist Chat | Obtain key from [Google AI Studio](https://aistudio.google.com/). |

---

## 🗄️ 2. Database Migrations (Alembic)

**Files**: [`backend/app/database.py`](file:///d:/SIH-2026/AgriAi-366/backend/app/database.py), [`backend/app/models/all_models.py`](file:///d:/SIH-2026/AgriAi-366/backend/app/models/all_models.py)

Currently, FastAPI automatically initializes database tables on startup via `Base.metadata.create_all(bind=engine)` in [`main.py`](file:///d:/SIH-2026/AgriAi-366/backend/app/main.py).

When modifying DB schemas later:
1. Install Alembic: `pip install alembic`
2. Initialize Alembic: `cd backend && alembic init alembic`
3. Edit `alembic/env.py` to point to `from app.models.all_models import Base; target_metadata = Base.metadata`
4. Generate migration: `alembic revision --autogenerate -m "Add new field"`
5. Apply migration: `alembic upgrade head`

---

## 🤖 3. Machine Learning Model Weights & Real Inference

**Directory**: [`backend/app/ml/`](file:///d:/SIH-2026/AgriAi-366/backend/app/ml/)

Replace the modular stubs with your trained PyTorch, TensorFlow, or Scikit-learn model artifacts:

### A. Crop Disease Scanner
- **Stub File**: [`backend/app/ml/disease/predictor.py`](file:///d:/SIH-2026/AgriAi-366/backend/app/ml/disease/predictor.py)
- **Service Integration**: [`backend/app/services/disease_service.py`](file:///d:/SIH-2026/AgriAi-366/backend/app/services/disease_service.py)
- **Change**: Load your `.pt` / `.h5` model file in `DiseasePredictor.__init__()` and run OpenCV / Pillow tensor transformations inside `predict_leaf()`.

### B. APMC Mandi Price Forecasting
- **Stub File**: [`backend/app/ml/price/forecaster.py`](file:///d:/SIH-2026/AgriAi-366/backend/app/ml/price/forecaster.py)
- **Service Integration**: [`backend/app/services/market_service.py`](file:///d:/SIH-2026/AgriAi-366/backend/app/services/market_service.py)
- **Change**: Replace dummy percentage calculations with trained Prophet / LSTM / XGBoost models taking historical mandi arrivals as input.

### C. Yield & Pest Risk Models
- **Yield Estimator Stub**: [`backend/app/ml/yield/estimator.py`](file:///d:/SIH-2026/AgriAi-366/backend/app/ml/yield/estimator.py)
- **Pest Risk Analyzer Stub**: [`backend/app/ml/pest/analyzer.py`](file:///d:/SIH-2026/AgriAi-366/backend/app/ml/pest/analyzer.py)

---

## 🔌 4. Connecting Frontend (React + Vite) to FastAPI Backend

Currently, the React frontend components use mock data or local state.

To connect React to the FastAPI backend:
1. In your frontend root, create a `.env` file:
   ```env
   VITE_API_BASE_URL=http://localhost:8000/api/v1
   ```
2. Create an `src/services/api.js` helper using `fetch` or `axios`:
   ```javascript
   const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';

   export async function fetchMandiTicker() {
     const res = await fetch(`${API_BASE_URL}/market/ticker`);
     return res.json();
   }

   export async function loginFarmer(email, password) {
     const res = await fetch(`${API_BASE_URL}/auth/login`, {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({ email, password })
     });
     return res.json();
   }
   ```
3. Replace local state defaults in page components (`Marketplace.jsx`, `WeatherIntel.jsx`, `AiAssistant.jsx`, `DiseaseScan.jsx`) with `useEffect()` data fetching hooks.

---

## 🛠️ 5. Deployment Options

- **Docker Container**: Add a `Dockerfile` in `backend/` using `python:3.11-slim` and `CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]`.
- **Cloud Hosting**: Deployable on Google Cloud Run, AWS ECS, Railway, or Render with zero code changes.
