from fastapi import APIRouter
from ..model import APIResponse

auth_router = APIRouter(
    prefix="/auth",
    tags=["auth"]
)

@auth_router.get("/")
def post_infos():
    return APIResponse(
        mensagem="Recursos enviados"
    )
