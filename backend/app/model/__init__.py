"""
Models do sistema de otimização de perfil aerodinâmico
"""

# Imports dos models para facilitar o uso
from .airfoil import AirfoilInputData, AirfoilOptimizationResult
from .upload import ImageUploadPayload, CanvasUploadPayload, UploadResponse
from .auth import UserLogin, UserRegister, User, Token, AuthResponse
from .common import APIResponse, ErrorResponse, PaginatedResponse

__all__ = [
    # Airfoil models
    "AirfoilInputData",
    "AirfoilOptimizationResult",
    
    # Upload models
    "ImageUploadPayload", 
    "CanvasUploadPayload",
    "UploadResponse",
    
    # Auth models
    "UserLogin",
    "UserRegister", 
    "User",
    "Token",
    "AuthResponse",
    
    # Common models
    "APIResponse",
    "ErrorResponse",
    "PaginatedResponse",
]