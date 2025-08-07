from fastapi import APIRouter
from ..model import ImageUploadPayload, UploadResponse

upload_imagem_router = APIRouter(
    prefix="/upload/imagem", 
    tags=["upload-imagem"]
)

@upload_imagem_router.post("/", response_model=UploadResponse)
async def upload_imagem(payload: ImageUploadPayload):
    """
    Endpoint POST da imagem do perfil da asa
    """
    # TODO A aplicar lógica de validação da imagem
    
    return UploadResponse(
        mensagem="Imagem recebida e processada com sucesso!",
        nome=payload.nome
    )
    