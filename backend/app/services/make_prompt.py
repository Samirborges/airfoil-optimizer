import json
import os

JSON_TEMPLATE = """
    {
    "analysis": {
        "max_thickness": "string (e.g. '12.4%')",
        "camber_position": "string (e.g. '40%')",
        "estimated_profile": "string (e.g. 'NACA 2412')",
        "estimated_CL": "float",
        "estimated_CD": "float",
        "lift_to_drag_ratio": "float"
    },
    "optimization": {
        "suggested_profile": "string (e.g. 'NACA 2309')",
        "optimized_CL": "float",
        "optimized_CD": "float",
        "lift_to_drag_ratio": "float",
        "geometry_adjustments": [
        "string (recommendation about geometry adjustment)"
        ]
    },
    "justification": {
        "rationale": "string (scientific reasoning for the changes)",
        "expected_result": "string (expected aerodynamic improvement)"
    }
    }
"""

def load_json_airfoils_data():
    
    BASEDIRECOTORY = "./airfoil_data/"
    
    list_of_files_airfoils = [
        BASEDIRECOTORY + "naca0012_34.json",
        BASEDIRECOTORY + "naca2412.json",
        BASEDIRECOTORY + "naca4412.json"
    ]
    list_of_airfoils = []

    for file in list_of_files_airfoils:
        with open(file, "r") as f:
            airfoil_info = json.load(f)
            list_of_airfoils.append(airfoil_info)

    return list_of_airfoils


def make_prompt(
    envergadura,
    corda_media,
    peso_estimado,
    velocidade_cruzeiro,
    altitude,
    contour_points,
    cl_required,
    wing_area_m2,
    weight_newtons
):
    list_of_airfoils = load_json_airfoils_data()
    
    PROMPT = f"""
        Você é uma inteligência artificial especialista em engenharia aeronáutica e otimização de perfis de asa.
        Sua tarefa é analisar os dados do perfil fornecido e gerar um relatório de otimização e gerar um relatório de otimização exclusivamente no formato JSON abaixo.

        ❗️Não escreva explicações, títulos, ou texto fora do JSON.

        O JSON deve conter os seguintes campos:

        {JSON_TEMPLATE}
        
        Retorne apenas o JSON válido em português e nada mais.

        Realize a otimização de acordo com os dados do seguinte aermodelo:

        envergadura: {envergadura},
        cordaMedia: {corda_media},
        pesoEstimado: {peso_estimado},
        velocidadeCruzeiro: {velocidade_cruzeiro},
        altitude: {altitude}
        aero_calculations:
        cl_required: {cl_required},
        wing_area_m2: {wing_area_m2},
        weight_newtons: {weight_newtons}
        
        Pontos de contorno:
        {contour_points}
        
        Use os seguintes perfis aerodinâmicos como referência técnica para comparação:
        {list_of_airfoils}


        Compare o contorno extraído com os perfis acima e determine qual é mais próximo.
    """
    
    return PROMPT

if __name__ == "__main__":
    airfoils_data = load_json_airfoils_data()
    print(airfoils_data)