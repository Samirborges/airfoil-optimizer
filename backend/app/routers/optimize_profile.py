from fastapi import APIRouter
from ..services.airfoil_service import build_payload

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
        return {"mensagem": "Payload gerado com sucesso! Veja o terminal.", "payload": payload}
    except Exception as e:
        return {"erro": str(e)}