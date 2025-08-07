"""
Models comuns e utilitários compartilhados
"""
from pydantic import BaseModel
from typing import Optional, Any, Dict
from datetime import datetime


class APIResponse(BaseModel):
    """Model padrão para respostas da API"""
    success: bool = True
    mensagem: str
    data: Optional[Any] = None
    timestamp: datetime = datetime.now()


class ErrorResponse(BaseModel):
    """Model para respostas de erro"""
    success: bool = False
    error: str
    details: Optional[Dict[str, Any]] = None
    timestamp: datetime = datetime.now()


class PaginatedResponse(BaseModel):
    """Model para respostas paginadas"""
    items: list
    total: int
    page: int = 1
    size: int = 10
    has_next: bool = False
    has_prev: bool = False
