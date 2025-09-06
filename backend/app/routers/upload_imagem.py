from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional
import base64
import re
from pathlib import Path
from ..cv.contour_extraction import extract_countur

upload_imagem_router = APIRouter(prefix="/upload/imagem", tags=["upload-imagem"])

# Model para receber apenas a string base64
class ImagePayload(BaseModel):
    img: str

# Defina a pasta onde as imagens salvas serão armazenadas
IMAGE_DIR = "uploaded_images"
Path(IMAGE_DIR).mkdir(exist_ok=True)

@upload_imagem_router.post("/")
async def upload_imagem(payload: ImagePayload):
    """
    Endpoint POST para o upload de uma imagem em formato base64.
    """
    img_data_b64 = payload.img

    try:
        # Extrair o tipo de arquivo e os dados base64
        img_prefix_match = re.match(r"data:image/(?P<ext>.*?);base64,(?P<data>.*)", img_data_b64)
        
        if not img_prefix_match:
            raise HTTPException(status_code=400, detail="Formato da string da imagem é inválido.")

        img_data_str = img_prefix_match.group("data")
        img_ext = img_prefix_match.group("ext")
        
        # Validação do formato
        if img_ext.lower() not in ["png", "jpeg", "jpg"]:
            raise HTTPException(status_code=400, detail=f"Formato de imagem '{img_ext}' não suportado.")

        # Decodifica a string base64 e salva
        img_data = base64.b64decode(img_data_str)
        filename = f"{Path(img_ext).stem}.{img_ext}"
        file_path = Path(IMAGE_DIR) / filename
        
        with open(file_path, "wb") as f:
            f.write(img_data)
        
        print(f"Imagem salva em: {file_path}")
        extract_countur(file_path)
        
        return {"mensagem": "Imagem salva com sucesso!", "filename": filename}

    except Exception as e:
        print(f"Erro ao processar a imagem: {e}")
        raise HTTPException(status_code=500, detail=f"Erro interno do servidor: {str(e)}")