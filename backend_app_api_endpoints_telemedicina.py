from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

class ConsultaRequest(BaseModel):
    paciente_id: str
    especialidade: str
    preferencia_idioma: str = "pt"

@router.post("/consulta")
def solicitar_consulta(req: ConsultaRequest):
    # Lógica para agendamento inteligente
    return {
        "status": "agendamento_pendente",
        "paciente_id": req.paciente_id,
        "especialidade": req.especialidade,
        "idioma": req.preferencia_idioma
    }