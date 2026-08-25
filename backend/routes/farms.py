from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional
from database import supabase

router = APIRouter(prefix="/farms", tags=["Farms"])


class FarmCreate(BaseModel):
    user_id: str
    farm_name: str
    state: Optional[str] = None
    district: Optional[str] = None
    village: Optional[str] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    area_acres: Optional[float] = None


@router.post("/")
def create_farm(farm: FarmCreate):
    if not supabase:
        raise HTTPException(
            status_code=500,
            detail="Supabase credentials missing in backend/.env"
        )

    try:
        result = supabase.table("farms").insert(
            farm.model_dump()
        ).execute()

        return {
            "success": True,
            "message": "Farm created successfully",
            "farm": result.data
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )


@router.get("/{user_id}")
def get_farms(user_id: str):
    if not supabase:
        raise HTTPException(
            status_code=500,
            detail="Supabase credentials missing in backend/.env"
        )

    try:
        result = (
            supabase
            .table("farms")
            .select("*")
            .eq("user_id", user_id)
            .execute()
        )

        return {
            "success": True,
            "farms": result.data
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )


@router.put("/{farm_id}")
def update_farm(farm_id: str, farm: FarmCreate):
    if not supabase:
        raise HTTPException(
            status_code=500,
            detail="Supabase credentials missing in backend/.env"
        )

    try:
        result = (
            supabase
            .table("farms")
            .update(farm.model_dump())
            .eq("id", farm_id)
            .execute()
        )

        return {
            "success": True,
            "message": "Farm updated successfully",
            "farm": result.data
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )


@router.delete("/{farm_id}")
def delete_farm(farm_id: str):
    if not supabase:
        raise HTTPException(
            status_code=500,
            detail="Supabase credentials missing in backend/.env"
        )

    try:
        result = (
            supabase
            .table("farms")
            .delete()
            .eq("id", farm_id)
            .execute()
        )

        return {
            "success": True,
            "message": "Farm deleted successfully",
            "farm": result.data
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )
