from typing import List
from pydantic import BaseModel
from sqlalchemy.orm import Session
from app.dependencies import get_db
from app.models.all_models import CommunityPost

router = APIRouter(prefix="/community", tags=["Farmer Community Forum"])


class PostCreate(BaseModel):
    title: str
    content: str
    author_name: str = "Gurpreet Singh"


@router.get("/posts")
def get_community_posts(db: Session = Depends(get_db)):
    posts = db.query(CommunityPost).order_by(CommunityPost.created_at.desc()).all()
    if not posts:
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
    return posts


@router.post("/posts")
def create_community_post(payload: PostCreate, db: Session = Depends(get_db)):
    new_post = CommunityPost(
        author_name=payload.author_name,
        title=payload.title,
        content=payload.content,
        likes_count=0
    )
    db.add(new_post)
    db.commit()
    db.refresh(new_post)
    return new_post

