from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional
import base64
import re 
import os 
from pathlib import Path

upload_imagem_router = APIRouter(prefix="/upload/imagem", tags=["upload data"])

class ConfigObject(BaseModel):
    img: Optional[str] = None
    envergadura: float
    cordaMedia: float
    pesoEstimado: float
    velocidadeCruzeiro: float
    altitude: float
    
# Defina a pasta onde as imagens salvas serão armazenadas
# Cria o diretório se ele não existir
IMAGE_DIR = "uploaded_images"
Path(IMAGE_DIR).mkdir(exist_ok=True)
    

@upload_imagem_router.post("/")
async def upload_imagem(config: ConfigObject):
    """
    Endpoint POST da imagem do perfil da asa
    """
    img_data_b64 = config.img
    
    try:
        # A API só deve processar a imagem se ela existir
        if img_data_b64:
            # Padrão para extrair o formato e os dados base64 do prefixo 'data:image/...;base64,...'
            img_prefix_match = re.match(r"data:image/(?P<ext>.*?);base64,(?P<data>.*)", img_data_b64)

            if not img_prefix_match:
                raise HTTPException(status_code=400, detail="Formato da string da imagem é inválido.")

            img_data_str = img_prefix_match.group("data")
            img_ext = img_prefix_match.group("ext")

            # Validação para formatos leves e comuns de imagem
            if img_ext.lower() not in ["png", "jpeg", "jpg"]:
                raise HTTPException(status_code=400, detail=f"Formato de imagem '{img_ext}' não suportado. Por favor, use PNG ou JPEG.")

            # Decodifica a string base64
            img_data = base64.b64decode(img_data_str)
            
            # Crie um nome de arquivo único (você pode usar um UUID para evitar colisões)
            filename = f"image_{Path(config.img).stem}.{img_ext}"
            file_path = Path(IMAGE_DIR) / filename

            # Salve a imagem no servidor
            with open(file_path, "wb") as f:
                f.write(img_data)
            
            print(f"Imagem salva em: {file_path}")
            
            # Agora que a imagem foi salva, você pode processar os outros dados
            # TODO: Adicionar lógica para salvar os outros dados (envergadura, etc.)
            
            return {
                "mensagem": "Imagem e dados recebidos com sucesso!",
                "filename": filename,
                "envergadura": config.envergadura,
                # ... outros dados
            }
        
        # Caso a imagem não seja enviada, processe apenas os outros dados
        print("Dados recebidos sem imagem.")
        return {
            "mensagem": "Dados recebidos com sucesso (sem imagem).",
            "envergadura": config.envergadura,
            # ... outros dados
        }

    except Exception as e:
        # Captura erros gerais
        print(f"Erro ao processar dados: {e}")
        raise HTTPException(status_code=500, detail=f"Erro interno do servidor: {str(e)}")
    