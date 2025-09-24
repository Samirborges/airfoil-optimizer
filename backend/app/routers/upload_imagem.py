from fastapi import APIRouter, HTTPException, Query
from pydantic import BaseModel
import base64
import re
from pathlib import Path
from ..cv.contour_extraction import extract_countur
import cv2
from ..services.airfoil_service import save_image_data # Importe a função

upload_imagem_router = APIRouter(prefix="/upload/imagem", tags=["upload-imagem"])

class ImagePayload(BaseModel):
    img: str

IMAGE_DIR = "uploaded_images"
Path(IMAGE_DIR).mkdir(exist_ok=True)

@upload_imagem_router.post("/")
async def upload_imagem(
    payload: ImagePayload,
    session_id: str = Query(..., description="ID da sessão para rastrear os dados")
):
    img_data_b64 = payload.img

    try:
        img_prefix_match = re.match(r"data:image/(?P<ext>.*?);base64,(?P<data>.*)", img_data_b64)
        if not img_prefix_match:
            raise HTTPException(status_code=400, detail="Formato da string da imagem é inválido.")

        img_data_str = img_prefix_match.group("data")
        img_ext = img_prefix_match.group("ext")
        if img_ext.lower() not in ["png", "jpeg", "jpg"]:
            raise HTTPException(status_code=400, detail=f"Formato de imagem '{img_ext}' não suportado.")

        img_data = base64.b64decode(img_data_str)
        filename = f"image_{session_id}.{img_ext}"
        file_path = Path(IMAGE_DIR) / filename
        
        with open(file_path, "wb") as f:
            f.write(img_data)
        
        print(f"Imagem salva em: {file_path}")
        original, contours_drawn, normalized_contour = extract_countur(file_path)

        if normalized_contour is not None:
            save_image_data(session_id, normalized_contour, filename)

        if original is not None and contours_drawn is not None:
            cv2.imshow("Imagem Original", original)
            cv2.imshow("Contornos Encontrados", contours_drawn)
            cv2.waitKey(0)
            cv2.destroyAllWindows()
        
        return {"mensagem": "Imagem processada e dados da sessão salvos com sucesso!", "session_id": session_id}

    except Exception as e:
        print(f"Erro ao processar a imagem: {e}")
        raise HTTPException(status_code=500, detail=f"Erro interno do servidor: {str(e)}")