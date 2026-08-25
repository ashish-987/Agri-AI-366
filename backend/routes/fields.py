from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional
from database import supabase

router = APIRouter(prefix="/fields", tags=["Fields"])


class FieldCreate(BaseModel):
    farm_id: str
    field_name: str
    area_acres: Optional[float] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None


@router.post("/")
def create_field(field: FieldCreate):
    if not supabase:
        raise HTTPException(
            status_code=500,
            detail="Supabase credentials missing in backend/.env"
        )

    try:
        result = (
            supabase
            .table("fields")
            .insert(field.model_dump())
            .execute()
        )

        return {
            "success": True,
            "message": "Field created successfully",
            "field": result.data
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/farm/{farm_id}")
def get_fields(farm_id: str):
    if not supabase:
        raise HTTPException(
            status_code=500,
            detail="Supabase credentials missing in backend/.env"
        )

    try:
        result = (
            supabase
            .table("fields")
            .select("*")
            .eq("farm_id", farm_id)
            .execute()
        )

        return {
            "success": True,
            "fields": result.data
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.delete("/{field_id}")
def delete_field(field_id: str):
    if not supabase:
        raise HTTPException(
            status_code=500,
            detail="Supabase credentials missing in backend/.env"
        )

    try:
        result = (
            supabase
            .table("fields")
            .delete()
            .eq("id", field_id)
            .execute()
        )

        return {
            "success": True,
            "message": "Field deleted successfully"
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
