# AgriAI 366 FastAPI Backend Service

Production-ready modular REST API built with **FastAPI**, **Python 3.10+**, **SQLAlchemy**, and **Pydantic v2** supporting all 366 districts of Indian agriculture.

---

## 🚀 Quick Start Guide

### 1. Create Virtual Environment & Install Dependencies
```bash
cd backend
python -m venv venv

# On Windows (PowerShell):
.\venv\Scripts\Activate.ps1

# On Linux/macOS:
source venv/bin/activate

pip install -r requirements.txt
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

### 3. Run FastAPI Development Server
```bash
uvicorn app.main:app --reload --port 8000
```

- **Interactive Swagger API Docs**: [http://localhost:8000/docs](http://localhost:8000/docs)
- **ReDoc Interactive Documentation**: [http://localhost:8000/redoc](http://localhost:8000/redoc)
- **API Health Endpoint**: [http://localhost:8000/api/v1/health](http://localhost:8000/api/v1/health)

---

## 📂 Project Structure

```
backend/
├── app/
│   ├── main.py                # FastAPI App, CORS, Router Registration
│   ├── config.py              # Environment settings & Pydantic Config
│   ├── database.py            # SQLAlchemy Engine & SessionLocal
│   ├── dependencies.py        # Auth JWT & DB Session dependencies
│   │
│   ├── routers/               # 20 Domain Routers (/api/v1/*)
│   │   ├── auth.py
│   │   ├── users.py
│   │   ├── farms.py
│   │   ├── disease.py
│   │   ├── weather.py
│   │   ├── soil.py
│   │   ├── fertilizer.py
│   │   ├── irrigation.py
│   │   ├── yield_prediction.py
│   │   ├── price_prediction.py
│   │   ├── market.py
│   │   ├── marketplace.py
│   │   ├── pest.py
│   │   ├── satellite.py
│   │   ├── community.py
│   │   ├── equipment.py
│   │   ├── experts.py
│   │   ├── supply_chain.py
│   │   ├── assistant.py
│   │   └── notifications.py
│   │
│   ├── services/              # Business logic & third party wrappers
│   ├── models/                # SQLAlchemy ORM Data Models
│   ├── schemas/               # Pydantic v2 Request/Response Schemas
│   ├── ml/                    # Computer Vision & Time-series ML Stubs
│   └── utils/                 # Helpers (JWT, password hashing, haversine)
│
├── requirements.txt
├── .env.example
└── README.md
```
