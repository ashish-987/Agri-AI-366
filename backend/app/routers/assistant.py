from fastapi import APIRouter
from app.schemas.all_schemas import ChatMessageRequest, ChatMessageResponse
from app.services.ai_service import AIService

router = APIRouter(prefix="/assistant", tags=["24/7 AI Voice Agronomist"])


@router.post("/chat", response_model=ChatMessageResponse)
def chat_with_agronomist(payload: ChatMessageRequest):
    res = AIService.generate_agronomist_reply(payload.message, payload.language)
    return ChatMessageResponse(**res)
