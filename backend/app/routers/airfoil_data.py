from fastapi import APIRouter
from ..model import AirfoilInputData, APIResponse

airfoil_router = APIRouter(
    prefix="/input/airfoil-data",
    tags=["airfoil-data"]
)
    
def format_input_payload(payload: AirfoilInputData):
    return ( 
        f"Envergadura: {payload.envergadura},"
        f"Corda: {payload.corda},"
        f"Peso: {payload.peso},"
        f"Velocidade: {payload.velocidade},"
        f"Altitude: {payload.altitude},"
    )

    
    
@airfoil_router.post("/")
async def input_datas(input_payload: AirfoilInputData):
    """
    Endpoint que recebe as informações do aermodelo
    """
    
    # TODO Adicionar validação das informações do Input
    
    data_format = format_input_payload(input_payload)

    return APIResponse(
        mensagem="Dados do modelo recebido com sucesso!",
        data={"informações": data_format}
    )