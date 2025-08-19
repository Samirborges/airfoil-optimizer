"""
Models relacionados aos uploads (imagem e canvas)
"""
from pydantic import BaseModel, Field
from typing import Optional
import base64
import re


class BaseUploadPayload(BaseModel):
    """Model base para uploads"""
    def validate_base64(self, data: str) -> bool:
        """Valida se os dados estão em formato base64 válido"""
        try:
            base64.b64decode(data)
            return True
        except Exception:
            return False

    def validate_image_format(self, img_data: str) -> tuple[str, str]:
        """Valida e extrai formato e dados da imagem base64"""
        img_prefix_match = re.match(r"data:image/(?P<ext>.*?);base64,(?P<data>.*)", img_data)
        
        if not img_prefix_match:
            raise ValueError("Formato da string da imagem é inválido.")
        
        img_ext = img_prefix_match.group("ext")
        img_data_str = img_prefix_match.group("data")
        
        if img_ext.lower() not in ["png", "jpeg", "jpg"]:
            raise ValueError(f"Formato de imagem '{img_ext}' não suportado. Use PNG ou JPEG.")
        
        return img_ext, img_data_str


class ImageUploadPayload(BaseUploadPayload):
    """Model para upload de imagem do perfil da asa com dados aerodinâmicos"""
    img: Optional[str] = Field(None, description="Dados da imagem em base64 com prefixo data:image")
    envergadura: float = Field(gt=0, description="Envergadura da asa em metros")
    cordaMedia: float = Field(gt=0, description="Corda média da asa em metros") 
    pesoEstimado: float = Field(gt=0, description="Peso estimado do aeromodelo em kg")
    velocidadeCruzeiro: float = Field(gt=0, description="Velocidade de cruzeiro em m/s")
    altitude: float = Field(ge=0, description="Altitude de operação em metros")
    
    class Config:
        json_schema_extra = {
            "example": {
                "img": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...",
                "envergadura": 1.2,
                "cordaMedia": 0.15,
                "pesoEstimado": 2.5,
                "velocidadeCruzeiro": 25.0,
                "altitude": 100.0
            }
        }


class CanvasUploadPayload(BaseUploadPayload):
    """Model para upload do canvas desenhado"""
    nome: str = Field(min_length=1, max_length=255, description="Nome do arquivo")
    dados_base64: str = Field(min_length=1, description="Dados em formato base64")
    largura: Optional[int] = Field(default=800, description="Largura do canvas em pixels")
    altura: Optional[int] = Field(default=600, description="Altura do canvas em pixels")
    
    class Config:
        json_schema_extra = {
            "example": {
                "nome": "desenho_perfil.png",
                "dados_base64": "iVBORw0KGgoAAAANSUhEUgAA...",
                "largura": 800,
                "altura": 600
            }
        }


class UploadResponse(BaseModel):
    """Model para resposta de upload"""
    mensagem: str
    filename: Optional[str] = None
    envergadura: Optional[float] = None
    cordaMedia: Optional[float] = None
    pesoEstimado: Optional[float] = None
    velocidadeCruzeiro: Optional[float] = None
    altitude: Optional[float] = None
