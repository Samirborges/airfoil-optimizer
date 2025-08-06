from fastapi import APIRouter
from pydantic import BaseModel

input_data_router = APIRouter(prefix="/input/data", tags=["upload data"])

class InputPayload(BaseModel):
    envergadura: float
    corda: float
    peso: float
    velocidade: float
    altitude: float
    
    def __str__(self):
        return f'''
    Envergadura: {self.envergadura},
    Corda: {self.corda},
    Peso: {self.peso},
    Velocidade: {self.velocidade},
    Altitude: {self.altitude},
    '''
    
@input_data_router.post("/")
async def input_data(input_payload: InputPayload):
    """
    Endpoint que recebe as informações do aermodelo
    """

    return {
        "mensagem": "Dados do modelo recebido com sucesso!",
        "informações": input_payload
    }