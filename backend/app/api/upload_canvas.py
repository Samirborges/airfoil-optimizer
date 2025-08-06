from fastapi import APIRouter
from pydantic import BaseModel

upload_canvas_router = APIRouter(prefix="/draw/canvas", tags=["upload data"])

class CanvasPayload(BaseModel):
    nome: str
    dado_base64: str

@upload_canvas_router.post("/")
async def upload_canvas(canvas_payload: CanvasPayload):
    """
    Endpoint que recebe o canva do perfil da asa
    """
    
    # TODO Adicionar lógica de validação do canva
    
    return {
        "mensagem": "Desenho recebido com sucesso!",
        "nome": canvas_payload.nome
    }