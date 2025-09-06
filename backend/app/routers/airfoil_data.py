from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional
from ..aero.cl_basic import calculate_cl_basic

# Definir um novo modelo para os dados do aeromodelo
class AirfoilInputData(BaseModel):
    img: Optional[str] = None # Campo para o nome do arquivo da imagem
    envergadura: float
    cordaMedia: float
    pesoEstimado: float
    velocidadeCruzeiro: float
    altitude: float

# Este modelo pode ser removido e a função usada diretamente
class APIResponse(BaseModel):
    mensagem: str
    data: dict

airfoil_router = APIRouter(
    prefix="/input/airfoil-data",
    tags=["airfoil-data"]
)
    
def format_input_payload(payload: AirfoilInputData):
    return (
        f"Imagem: {payload.img},"
        f"Envergadura: {payload.envergadura},"
        f"Corda: {payload.cordaMedia}," # Corrigido para 'cordaMedia'
        f"Peso: {payload.pesoEstimado}," # Corrigido para 'pesoEstimado'
        f"Velocidade: {payload.velocidadeCruzeiro},"
        f"Altitude: {payload.altitude},"
    )
    
@airfoil_router.post("/")
async def input_datas(input_payload: AirfoilInputData):
    """
    Endpoint que recebe as informações do aermodelo
    """
    # TODO Adicionar validação das informações do Input
    
    data_format = format_input_payload(input_payload)
    
    # TODO fazer o tratamento na chamada da função caso não seja colocado a altitude.
    lift_coefficient = calculate_cl_basic(input_payload.pesoEstimado, input_payload.velocidadeCruzeiro, input_payload.envergadura, input_payload.cordaMedia, input_payload.altitude)


    return APIResponse(
        mensagem="Dados do modelo recebido com sucesso!",
        data={
            "informações": data_format,
            "cv": lift_coefficient
        }
    )