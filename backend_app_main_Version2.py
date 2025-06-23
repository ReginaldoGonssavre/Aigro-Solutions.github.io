from fastapi import FastAPI
from app.api.endpoints import monitoramento, telemedicina, saude_preventiva, quantum

app = FastAPI(
    title="HealthTech Quantum API"
)

app.include_router(monitoramento.router, prefix="/monitoramento", tags=["Monitoramento"])
app.include_router(telemedicina.router, prefix="/telemedicina", tags=["Telemedicina"])
app.include_router(saude_preventiva.router, prefix="/saude-preventiva", tags=["Saúde Preventiva"])
app.include_router(quantum.router, prefix="/quantum", tags=["Quantum"])