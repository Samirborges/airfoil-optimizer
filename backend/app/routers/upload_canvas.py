from fastapi import APIRouter
from ..model import CanvasUploadPayload, UploadResponse

upload_canvas_router = APIRouter(
    prefix="/draw/canvas", 
    tags=["upload-canvas"]
)

@upload_canvas_router.post("/", response_model=UploadResponse)
async def upload_canvas(canvas_payload: CanvasUploadPayload):
    """
    Endpoint que recebe o canva do perfil da asa
    """
    
    # TODO Adicionar lógica de validação do canva
    
    return UploadResponse(
        mensagem="Desenho recebido com sucesso!",
        nome=canvas_payload.nome
    )