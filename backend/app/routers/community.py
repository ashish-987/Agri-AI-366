from datetime import datetime
from fastapi import APIRouter

router = APIRouter(prefix="/community", tags=["Farmer Community Forum"])


@router.get("/posts")
def get_community_posts():
    return [
        {
            "id": 1,
            "author_name": "Lakhwinder Singh",
            "title": "Best biological fungicide for Yellow Rust in Ludhiana?",
            "content": "Brothers, has anyone tried Neem oil combined with Trichoderma viride? Getting great results on 12 acres Sharbati Wheat.",
            "likes_count": 48,
            "created_at": datetime.utcnow().isoformat()
        }
    ]
