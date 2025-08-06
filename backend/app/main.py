from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

from api.auth_routes import auth_router
from api.upload_imagem import upload_imagem_router
from api.upload_canvas import upload_canvas_router
from api.input_datas import input_data_router

app.include_router(auth_router)
app.include_router(upload_imagem_router)
app.include_router(upload_canvas_router)
app.include_router(input_data_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # ou ["*"] para testes
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
