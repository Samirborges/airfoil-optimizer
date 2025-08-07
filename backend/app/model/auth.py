"""
Models relacionados à autenticação
"""
from pydantic import BaseModel, Field, EmailStr
from typing import Optional
from datetime import datetime


class UserLogin(BaseModel):
    """Model para login do usuário"""
    email: EmailStr = Field(description="Email do usuário")
    senha: str = Field(min_length=6, description="Senha do usuário")


class UserRegister(BaseModel):
    """Model para registro de novo usuário"""
    nome: str = Field(min_length=2, max_length=100, description="Nome completo")
    email: EmailStr = Field(description="Email do usuário")
    senha: str = Field(min_length=6, description="Senha do usuário")
    confirmar_senha: str = Field(min_length=6, description="Confirmação da senha")


class User(BaseModel):
    """Model do usuário (sem dados sensíveis)"""
    id: str
    nome: str
    email: EmailStr
    data_criacao: datetime
    ativo: bool = True


class Token(BaseModel):
    """Model para token de autenticação"""
    access_token: str
    token_type: str = "bearer"
    expires_in: int


class AuthResponse(BaseModel):
    """Model para resposta de autenticação"""
    user: User
    token: Token
    mensagem: str
