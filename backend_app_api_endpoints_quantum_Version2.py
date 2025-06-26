from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from app.core.quantum_utils import run_quantum_optimization, generate_quantum_random_number
from app.core.security import decode_access_token

router = APIRouter()

# Dependência para verificar o token de acesso
def get_current_user(token: str = Depends(router.oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    payload = decode_access_token(token)
    if payload is None:
        raise credentials_exception
    username: str = payload.get("sub")
    if username is None:
        raise credentials_exception
    # Em um cenário real, você buscaria o usuário no banco de dados aqui
    return username

class OptimizationRequest(BaseModel):
    problem: str
    constraints: list

@router.post("/optimization")
def quantum_optimization(request: OptimizationRequest, current_user: str = Depends(get_current_user)):
    result = run_quantum_optimization(request.problem, request.constraints)
    return {
        "rota_otimizada": result["rota"],
        "tempo_estimado": result["tempo"],
        "quantum_simulation": True,
        "user": current_user
    }

@router.get("/random-number")
def get_quantum_random_number(current_user: str = Depends(get_current_user)):
    random_bit = generate_quantum_random_number()
    return {"quantum_random_bit": random_bit, "user": current_user}