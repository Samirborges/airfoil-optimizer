"""
Models relacionados aos dados do perfil aerodinâmico
"""
from pydantic import BaseModel, Field
from typing import Optional


class AirfoilInputData(BaseModel):
    """Model para dados de entrada do perfil aerodinâmico"""
    envergadura: float = Field(gt=0, description="Envergadura da asa em metros")
    corda: float = Field(gt=0, description="Corda da asa em metros") 
    peso: float = Field(gt=0, description="Peso do aeromodelo em kg")
    velocidade: float = Field(gt=0, description="Velocidade de voo em m/s")
    altitude: float = Field(ge=0, description="Altitude de voo em metros")
    
    class Config:
        json_schema_extra = {
            "example": {
                "envergadura": 1.2,
                "corda": 0.15,
                "peso": 2.5,
                "velocidade": 25.0,
                "altitude": 100.0
            }
        }


class AirfoilOptimizationResult(BaseModel):
    """Model para resultado da otimização do perfil"""
    perfil_otimizado: str
    coeficiente_sustentacao: float
    coeficiente_arrasto: float
    eficiencia: float
    observacoes: Optional[str] = None
