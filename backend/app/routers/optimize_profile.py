from fastapi import APIRouter
from ..services.airfoil_service import build_payload
import requests
from google import genai
import json
from ..services.make_prompt import make_prompt

optimize_router = APIRouter(prefix="/optimize", tags=["optimize"])

client = genai.Client(api_key="AIzaSyDEvBn4KOeb5hobIm-crF9SAS9H5Gh440s")

@optimize_router.get("/debug/{session_id}")
async def debug_payload(session_id: str):
    """
    Endpoint para montar o payload consolidado e exibir no terminal (debug).
    """
    try:
        payload = build_payload(session_id)
        print("\n===== PAYLOAD GERADO =====")
        print(json.dumps(payload, indent=4))
        print("==========================\n")
        
        envergadura = payload["user_input"]["envergadura"]
        corda_media = payload["user_input"]["cordaMedia"]
        peso_estimado = payload["user_input"]["pesoEstimado"]
        velocidade_cruzeiro = payload["user_input"]["velocidadeCruzeiro"]
        altitude = payload["user_input"]["altitude"]
        
        contur_points = payload["image_processing"]["contour_points"]
        
        cl_required = payload["aero_calculations"]["cl_required"]
        wing_area_m2 = payload["aero_calculations"]["wing_area_m2"]
        weight_newtons = payload["aero_calculations"]["weight_newtons"]
        
        
        try:
            PROMPT = make_prompt(
            envergadura,
            corda_media,
            peso_estimado,
            velocidade_cruzeiro,
            altitude,
            contur_points,
            cl_required,
            wing_area_m2,
            weight_newtons
        )
        except Exception as e:
            print("Erro ao gerar o prompt:", str(e))
        
        print("\n===== PROMPT GERADO =====")
        print(PROMPT)
        print("=========================\n")

        optimize_result = 0
       
        try:
            response = client.models.generate_content(model="gemini-flash-latest", contents=PROMPT)
            
            print("\n===== RESPOSTA DA IA =====")
            print(json.dumps(optimize_result, indent=4, ensure_ascii=False))
            print("==========================\n")
            
            optimize_result = json.loads(response.text.replace("```json", "").replace("```", ""))
            
        except ValueError:
            print("Erro ao analisar a resposta da IA. Resposta recebida:")
            print(response.text)
        

        return {"mensagem": "Payload gerado com sucesso! Veja o terminal.", "Retorno": optimize_result}
    except Exception as e:
        return {"erro": str(e)}
    