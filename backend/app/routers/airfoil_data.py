from fastapi import APIRouter, Query
from pydantic import BaseModel
from typing import Optional
from ..aero.cl_basic import calculate_cl_basic
from ..services.airfoil_service import save_airfoil_data # Importe a função

class AirfoilInputData(BaseModel):
    envergadura: float
    cordaMedia: float
    pesoEstimado: float
    velocidadeCruzeiro: float
    altitude: Optional[float] = 0.0

class APIResponse(BaseModel):
    mensagem: str
    data: dict

airfoil_router = APIRouter(
    prefix="/input/airfoil-data",
    tags=["airfoil-data"]
)
    
def format_input_payload(payload: AirfoilInputData):
    return (
        f"Envergadura: {payload.envergadura},"
        f"Corda: {payload.cordaMedia},"
        f"Peso: {payload.pesoEstimado},"
        f"Velocidade: {payload.velocidadeCruzeiro},"
        f"Altitude: {payload.altitude},"
    )
    
@airfoil_router.post("/")
async def input_datas(
    input_payload: AirfoilInputData,
    session_id: str = Query(..., description="ID da sessão para rastrear os dados")
):
    # Salva os dados do aeromodelo na sessão usando o session_id
    save_airfoil_data(session_id, input_payload.model_dump())
    
    data_format = format_input_payload(input_payload)
    
    lift_coefficient = calculate_cl_basic(input_payload.pesoEstimado, input_payload.velocidadeCruzeiro, input_payload.envergadura, input_payload.cordaMedia, input_payload.altitude)

    return APIResponse(
        mensagem="Dados do modelo recebido e salvos na sessão!",
        data={
            "informações": data_format,
            "cv": lift_coefficient,
            "session_id": session_id
        }
    )