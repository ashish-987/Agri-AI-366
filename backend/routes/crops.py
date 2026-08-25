from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional
from database import supabase

router = APIRouter(prefix="/crops", tags=["Crops"])


class CropCreate(BaseModel):
    field_id: str
    crop_name: str
    variety: Optional[str] = None
    sowing_date: Optional[str] = None
    expected_harvest_date: Optional[str] = None
    growth_stage: Optional[str] = None
    season: Optional[str] = None


@router.post("/")
def create_crop(crop: CropCreate):
    if not supabase:
        raise HTTPException(
            status_code=500,
            detail="Supabase credentials missing in backend/.env"
        )

    try:
        result = (
            supabase
            .table("crops")
            .insert(crop.model_dump())
            .execute()
        )

        return {
            "success": True,
            "message": "Crop created successfully",
            "crop": result.data
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )


@router.get("/field/{field_id}")
def get_crops(field_id: str):
    if not supabase:
        raise HTTPException(
            status_code=500,
            detail="Supabase credentials missing in backend/.env"
        )

    try:
        result = (
            supabase
            .table("crops")
            .select("*")
            .eq("field_id", field_id)
            .execute()
        )

        return {
            "success": True,
            "crops": result.data
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )


@router.delete("/{crop_id}")
def delete_crop(crop_id: str):
    if not supabase:
        raise HTTPException(
            status_code=500,
            detail="Supabase credentials missing in backend/.env"
        )

    try:
        supabase \
            .table("crops") \
            .delete() \
            .eq("id", crop_id) \
            .execute()

        return {
            "success": True,
            "message": "Crop deleted successfully"
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )
