from fastapi import APIRouter, HTTPException
from ..model import ImageUploadPayload, UploadResponse
import base64
import re
from pathlib import Path

upload_imagem_router = APIRouter(
    prefix="/upload/imagem", 
    tags=["upload-imagem"]
)

# Defina a pasta onde as imagens salvas serão armazenadas
# Cria o diretório se ele não existir
IMAGE_DIR = "uploaded_images"
Path(IMAGE_DIR).mkdir(exist_ok=True)

@upload_imagem_router.post("/", response_model=UploadResponse)
async def upload_imagem(config: ImageUploadPayload):
    """
    Endpoint POST da imagem do perfil da asa com dados aerodinâmicos
    """
    img_data_b64 = config.img
    
    try:
        # A API só deve processar a imagem se ela existir
        if img_data_b64:
            try:
                # Usar o método de validação do model
                img_ext, img_data_str = config.validate_image_format(img_data_b64)
            except ValueError as e:
                raise HTTPException(status_code=400, detail=str(e))

            # Decodifica a string base64
            img_data = base64.b64decode(img_data_str)
            
            # Crie um nome de arquivo único
            filename = f"image_envergadura_{config.envergadura}m.{img_ext}"
            file_path = Path(IMAGE_DIR) / filename

            # Salve a imagem no servidor
            with open(file_path, "wb") as f:
                f.write(img_data)
            
            print(f"Imagem salva em: {file_path}")
            
            return UploadResponse(
                mensagem="Imagem e dados recebidos com sucesso!",
                filename=filename,
                envergadura=config.envergadura,
                cordaMedia=config.cordaMedia,
                pesoEstimado=config.pesoEstimado,
                velocidadeCruzeiro=config.velocidadeCruzeiro,
                altitude=config.altitude
            )
        
        # Caso a imagem não seja enviada, processe apenas os outros dados
        print("Dados recebidos sem imagem.")
        return UploadResponse(
            mensagem="Dados recebidos com sucesso (sem imagem).",
            envergadura=config.envergadura,
            cordaMedia=config.cordaMedia,
            pesoEstimado=config.pesoEstimado,
            velocidadeCruzeiro=config.velocidadeCruzeiro,
            altitude=config.altitude
        )

    except Exception as e:
        # Captura erros gerais
        print(f"Erro ao processar dados: {e}")
        raise HTTPException(status_code=500, detail=f"Erro interno do servidor: {str(e)}")
    