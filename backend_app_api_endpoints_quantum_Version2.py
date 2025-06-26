from fastapi import APIRouter
from pydantic import BaseModel
from app.core.quantum_utils import run_quantum_optimization, generate_quantum_random_number

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

@router.get("/random-number")
def get_quantum_random_number():
    random_bit = generate_quantum_random_number()
    return {"quantum_random_bit": random_bit}