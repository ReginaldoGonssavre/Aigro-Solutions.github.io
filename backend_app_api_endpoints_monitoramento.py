from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

class SinaisVitais(BaseModel):
    paciente_id: str
    pressao_sistolica: float
    pressao_diastolica: float
    frequencia_cardiaca: float

@router.post("/sinais-vitais")
def receber_sinais_vitais(dados: SinaisVitais):
    # Aqui seria feita a ingestão e processamento dos dados
    return {"status": "ok", "dados_recebidos": dados}