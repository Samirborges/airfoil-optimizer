from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .routers import auth, airfoil_data, upload_imagem, upload_canvas


app = FastAPI(
    title="Airfoil Optimizer API",
    description="""
        This API provides endpoints for managing airfoil optimization tasks,
        including authentication, image uploads, canvas uploads, and input data management.
        
        It is designed to work with a frontend application for airfoil optimization.
    """,
    version="1.0.0",
    license_info={
        "name": "Apache 2.0",
        "url": "https://www.apache.org/licenses/LICENSE-2.0",
    },
)

app.include_router(auth.auth_router, tags=["auth"])
app.include_router(airfoil_data.airfoil_router, tags=["airfoil-data"])
app.include_router(upload_imagem.upload_imagem_router, tags=["upload-imagem"])
app.include_router(upload_canvas.upload_canvas_router, tags=["upload-canvas"])

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # ou ["*"] para testes
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
