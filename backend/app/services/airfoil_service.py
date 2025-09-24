import uuid
from datetime import datetime
from ..aero.cl_basic import calculate_cl_basic

# Simulação de cache em memória (depois pode ser Redis ou DB)
SESSION_STORE = {}

def save_image_data(session_id, contour, filename):
    SESSION_STORE[session_id] = SESSION_STORE.get(session_id, {})
    SESSION_STORE[session_id]["contour"] = contour
    SESSION_STORE[session_id]["filename"] = filename

def save_airfoil_data(session_id, data):
    cl_required = calculate_cl_basic(
        data["pesoEstimado"],
        data["velocidadeCruzeiro"],
        data["envergadura"],
        data["cordaMedia"],
        data.get("altitude", 0)
    )
    SESSION_STORE[session_id] = SESSION_STORE.get(session_id, {})
    SESSION_STORE[session_id]["airfoil_data"] = data
    SESSION_STORE[session_id]["cl_required"] = cl_required

def build_payload(session_id):
    if session_id not in SESSION_STORE:
        raise ValueError("Sessão não encontrada ou incompleta")

    session = SESSION_STORE[session_id]
    if "contour" not in session or "airfoil_data" not in session:
        raise ValueError("Dados insuficientes: falta imagem ou dados do aeromodelo")

    data = session["airfoil_data"]

    payload = {
        "session_id": session_id,
        "timestamp": datetime.utcnow().isoformat(),
        "user_input": data,
        "image_processing": {
            "filename": session["filename"],
            "contour_points": session["contour"],
            "format": "normalized_xy"
        },
        "aero_calculations": {
            "cl_required": session["cl_required"],
            "wing_area_m2": data["envergadura"] * data["cordaMedia"],
            "weight_newtons": data["pesoEstimado"] * 9.81
        },
        "metadata": {
            "project": "Airfoil AI Designer",
            "version": "0.1.0"
        }
    }
    return payload