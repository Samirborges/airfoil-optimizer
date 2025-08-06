from fastapi import APIRouter
from pydantic import BaseModel

input_data_router = APIRouter(prefix="/input/data", tags=["upload data"])

class InputPayload(BaseModel):
    envergadura: float
    corda: float
    peso: float
    velocidade: float
    altitude: float
        
    
def format_input_payload(payload: InputPayload):
    return ( 
        f"Envergadura: {payload.envergadura},"
        f"Corda: {payload.corda},"
        f"Peso: {payload.peso},"
        f"Velocidade: {payload.velocidade},"
        f"Altitude: {payload.altitude},"
    )

    
    
@input_data_router.post("/")
async def input_data(input_payload: InputPayload):
    """
    Endpoint que recebe as informações do aermodelo
    """
    
    data_format = format_input_payload(input_payload)

    return {
        "mensagem": "Dados do modelo recebido com sucesso!",
        "informações": data_format
    }