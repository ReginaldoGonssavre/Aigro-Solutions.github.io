from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db
from app.models.user import User
from app.models.license import License
from app.api.endpoints.auth import get_current_user # Importar a dependência de auth

router = APIRouter()

class UserWithLicense(User):
    licenses: List[License] = []

    class Config:
        orm_mode = True

@router.get("/users", response_model=List[UserWithLicense])
async def get_all_users(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    # Em um cenário real, você verificaria se o current_user tem permissões de administrador
    # Por enquanto, qualquer usuário autenticado pode listar.
    users = db.query(User).all()
    return users
