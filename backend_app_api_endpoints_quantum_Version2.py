from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from app.core.quantum_utils import run_quantum_optimization, generate_quantum_random_number
from app.api.endpoints.auth import get_current_user # Importar a dependência de auth
from app.models.user import User # Importar o modelo User

router = APIRouter()

class OptimizationRequest(BaseModel):
    problem: str
    constraints: list

@router.post("/optimization")
def quantum_optimization(request: OptimizationRequest, current_user: User = Depends(get_current_user)):
    # Exemplo de restrição: apenas usuários premium podem usar a otimização
    if not current_user.licenses or current_user.licenses[0].license_type != "premium":
        raise HTTPException(status_code=403, detail="Acesso negado. Requer licença premium para otimização.")

    result = run_quantum_optimization(request.problem, request.constraints)
    return {
        "rota_otimizada": result["rota"],
        "tempo_estimado": result["tempo"],
        "quantum_simulation": True,
        "user": current_user.username
    }

@router.get("/random-number")
def get_quantum_random_number(current_user: User = Depends(get_current_user)):
    # Exemplo de restrição: usuários freemium podem ter um limite de chamadas
    if not current_user.licenses or current_user.licenses[0].license_type == "freemium":
        # Em um cenário real, você verificaria o uso e o limite aqui
        pass # Por enquanto, freemium pode acessar

    random_bit = generate_quantum_random_number()
    return {"quantum_random_bit": random_bit, "user": current_user.username}