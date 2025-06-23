from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

class PerfilSaude(BaseModel):
    paciente_id: str
    idade: int
    sexo: str
    historico: list

@router.post("/plano-preventivo")
def plano_preventivo(perfil: PerfilSaude):
    # Geração de recomendações personalizadas
    return {
        "paciente_id": perfil.paciente_id,
        "recomendacoes": [
            "Check-up anual",
            "Vacina da gripe",
            "Prática regular de atividade física"
        ]
    }