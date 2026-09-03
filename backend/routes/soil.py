from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional
from supabase_client import supabase
from services.soil_service import analyze_soil
from services.soil_ai import calculate_soil_health

router = APIRouter(prefix="/soil", tags=["Soil"])


class SoilAnalyzeRequest(BaseModel):
    field_id: str
    ph: float
    nitrogen: float
    phosphorus: float
    potassium: float
    organic_carbon: float
    moisture: float
    source: Optional[str] = "manual"
    test_date: Optional[str] = None


@router.post("/analyze")
def analyze_soil_post(data: SoilAnalyzeRequest):
    try:
        soil_data = {
            "field_id": data.field_id,
            "ph": data.ph,
            "nitrogen": data.nitrogen,
            "phosphorus": data.phosphorus,
            "potassium": data.potassium,
            "organic_carbon": data.organic_carbon,
            "moisture": data.moisture,
            "source": data.source,
            "test_date": data.test_date,
        }

        result = (
            supabase
            .table("soil_records")
            .insert(soil_data)
            .execute()
        )

        analysis = calculate_soil_health(
            data.ph,
            data.nitrogen,
            data.phosphorus,
            data.potassium,
            data.organic_carbon,
            data.moisture
        )

        return {
            "success": True,
            "message": "Soil analysis saved successfully",
            "record": result.data[0] if result.data else None,
            "analysis": analysis
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Soil analysis failed: {str(e)}"
        )


@router.get("/analyze")
async def analyze_soil_endpoint(
    ph: float,
    nitrogen: float,
    phosphorus: float,
    potassium: float,
    organic_carbon: float,
    moisture: float,
    crop: str = "Wheat"
):
    try:
        result = analyze_soil(
            ph=ph,
            nitrogen=nitrogen,
            phosphorus=phosphorus,
            potassium=potassium,
            organic_carbon=organic_carbon,
            moisture=moisture,
            crop=crop
        )

        return {
            "success": True,
            "data": result
        }

    except Exception as error:
        raise HTTPException(
            status_code=500,
            detail=str(error)
        )


@router.post("/")
def create_soil_record(record: SoilAnalyzeRequest):
    try:
        result = (
            supabase
            .table("soil_records")
            .insert(record.model_dump())
            .execute()
        )

        return {
            "success": True,
            "message": "Soil record saved successfully",
            "soil_record": result.data
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )


@router.get("/field/{field_id}")
def get_soil_records(field_id: str):
    try:
        result = (
            supabase
            .table("soil_records")
            .select("*")
            .eq("field_id", field_id)
            .order("test_date", desc=True)
            .execute()
        )

        return {
            "success": True,
            "soil_records": result.data
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )


@router.delete("/{record_id}")
def delete_soil_record(record_id: str):
    try:
        (
            supabase
            .table("soil_records")
            .delete()
            .eq("id", record_id)
            .execute()
        )

        return {
            "success": True,
            "message": "Soil record deleted successfully"
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )


class SoilUpdateRequest(BaseModel):
    field_id: Optional[str] = None
    ph: Optional[float] = None
    nitrogen: Optional[float] = None
    phosphorus: Optional[float] = None
    potassium: Optional[float] = None
    organic_carbon: Optional[float] = None
    moisture: Optional[float] = None
    source: Optional[str] = None
    test_date: Optional[str] = None


@router.put("/{record_id}")
def update_soil_record(record_id: str, record: SoilUpdateRequest):
    try:
        update_data = {k: v for k, v in record.model_dump().items() if v is not None}
        result = (
            supabase
            .table("soil_records")
            .update(update_data)
            .eq("id", record_id)
            .execute()
        )

        return {
            "success": True,
            "message": "Soil record updated successfully",
            "soil_record": result.data
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )


