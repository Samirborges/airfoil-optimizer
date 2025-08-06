from fastapi import APIRouter
from pydantic import BaseModel

upload_canvas_router = APIRouter(prefix="/draw/canvas", tags=["draw_canvas"])

class CanvasPayload(BaseModel):
    nome: str
    dado_base64: str

@upload_canvas_router.post("/draw/canvas")
async def upload_canva(canva_upload: CanvasPayload):
    """
    Endpoint que recebe o canva do perfil da asa
    """
    
    # Lógica de validação do canva
    
    return {
        "mensagem": "Desenho recebido com sucesso!",
        "nome": canva_upload.nome
    }