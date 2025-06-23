from pydantic import BaseModel
from typing import List, Optional

class SinaisVitais(BaseModel):
    paciente_id: str
    pressao_sistolica: float
    pressao_diastolica: float
    frequencia_cardiaca: float

class ConsultaRequest(BaseModel):
    paciente_id: str
    especialidade: str
    preferencia_idioma: str = "pt"

class PerfilSaude(BaseModel):
    paciente_id: str
    idade: int
    sexo: str
    historico: List[str]

class OptimizationRequest(BaseModel):
    problem: str
    constraints: List[str]