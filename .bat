@echo off
REM -- Executa o Backend em uma nova janela --

REM Usa 'start "Título da Janela"' para abrir em uma nova janela
start "Backend Uvicorn" cmd /k "venv\Scripts\activate && cd backend && uvicorn app.main:app --reload"

REM -- Espera um pouco, apenas para garantir (opcional, mas pode ser útil) --
timeout /t 5

REM -- Executa o Frontend em outra nova janela --
start "Frontend React" cmd /k "cd frontend\form-airfoil-optimizer && npm run dev"

REM -- Opcional: Pausa no final para manter a janela do .bat aberta --
pause