from fastapi import APIRouter
from ..services.airfoil_service import build_payload
import requests

optimize_router = APIRouter(prefix="/optimize", tags=["optimize"])

@optimize_router.get("/debug/{session_id}")
async def debug_payload(session_id: str):
    """
    Endpoint para montar o payload consolidado e exibir no terminal (debug).
    """
    try:
        payload = build_payload(session_id)
        print("\n===== PAYLOAD GERADO =====")
        import json
        print(json.dumps(payload, indent=4))
        print("==========================\n")
        
        # Enviando para o n8n 
        # TODO Trocar para URL de produção
        WEB_HOOK_URL = "https://corvosaerodesign.app.n8n.cloud/webhook/a7550ac0-8b33-4076-8b47-bec3996cefd1"

        response = requests.post(WEB_HOOK_URL, json=payload)
        
        # Verificando a resposta
        n8n_data = 0
        if response.status_code == 200:
            print('Requisição enviada com sucesso!')
            try:
                n8n_data = response.json()
            except ValueError:
                ...
        else:
            print(f'Erro ao enviar: {response.status_code} - {response.text}')
            n8n_data = {"erro": "Resposta não era JSON", "texto": response.text}

        
        return {"mensagem": "Payload gerado com sucesso! Veja o terminal.", "Retorno": n8n_data}
    except Exception as e:
        return {"erro": str(e)}