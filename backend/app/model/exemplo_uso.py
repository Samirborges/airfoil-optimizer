"""
Exemplo de uso dos models criados
"""

# Como importar e usar os models:

# 1. Importação simples dos models necessários
from app.model import AirfoilInputData, ImageUploadPayload, APIResponse

# 2. Exemplo de uso no endpoint
async def exemplo_endpoint(dados: AirfoilInputData):
    # Validação automática via Pydantic
    # dados.envergadura já é validado como float > 0
    
    # Processamento dos dados
    resultado = processar_dados_aerodinamicos(dados)
    
    # Retorno padronizado
    return APIResponse(
        mensagem="Dados processados com sucesso",
        data=resultado
    )

# 3. Validação customizada
def validar_dados_avancados(dados: AirfoilInputData) -> bool:
    # Validações de negócio específicas
    if dados.velocidade > dados.altitude * 0.1:
        return False
    return True

# 4. Reutilização de models
def salvar_historico(dados: AirfoilInputData, resultado):
    # Model pode ser reutilizado em diferentes contextos
    historico = {
        "input": dados.dict(),
        "output": resultado,
        "timestamp": datetime.now()
    }
    return historico
