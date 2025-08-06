from fastapi import FastAPI

app = FastAPI()

from api.auth_routes import auth_router
from api.upload_imagem import upload_imagem_router

app.include_router(auth_router)
app.include_router(upload_imagem_router)