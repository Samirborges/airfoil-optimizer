"""
Models relacionados aos uploads (imagem e canvas)
"""
from pydantic import BaseModel, Field
from typing import Optional
import base64


class BaseUploadPayload(BaseModel):
    """Model base para uploads"""
    nome: str = Field(min_length=1, max_length=255, description="Nome do arquivo")
    dados_base64: str = Field(min_length=1, description="Dados em formato base64")
    
    def validate_base64(self) -> bool:
        """Valida se os dados estão em formato base64 válido"""
        try:
            base64.b64decode(self.dados_base64)
            return True
        except Exception:
            return False


class ImageUploadPayload(BaseUploadPayload):
    """Model para upload de imagem do perfil da asa"""
    formato: Optional[str] = Field(default="png", description="Formato da imagem")
    
    class Config:
        json_schema_extra = {
            "example": {
                "nome": "perfil_asa.png",
                "dados_base64": "iVBORw0KGgoAAAANSUhEUgAA...",
                "formato": "png"
            }
        }


class CanvasUploadPayload(BaseUploadPayload):
    """Model para upload do canvas desenhado"""
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
    nome: str
    id_arquivo: Optional[str] = None
    tamanho_bytes: Optional[int] = None
