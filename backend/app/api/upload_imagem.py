from fastapi import APIRouter
from pydantic import BaseModel

upload_imagem_router = APIRouter(prefix="/upload/imagem", tags=["upload data"])

class ImagePayLoad(BaseModel):
    nome: str
    dados_base64: str 
    

@upload_imagem_router.post("/")
async def upload_imagem(payload: ImagePayLoad):
    """
    Endpoint POST da imagem do perfil da asa
    """
    # TODO A aplicar lógica de validação da imagem
    
    return {
        "mensagem": "Imagem recebida e processada com sucesso!",
        "nome": payload.nome
    }
    