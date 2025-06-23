from fastapi import APIRouter
from pydantic import BaseModel
from app.core.quantum_utils import run_quantum_optimization

router = APIRouter()

class OptimizationRequest(BaseModel):
    problem: str
    constraints: list

@router.post("/optimization")
def quantum_optimization(request: OptimizationRequest):
    result = run_quantum_optimization(request.problem, request.constraints)
    return {
        "rota_otimizada": result["rota"],
        "tempo_estimado": result["tempo"],
        "quantum_simulation": True
    }