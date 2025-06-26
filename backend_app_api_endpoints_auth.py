from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from pydantic import BaseModel
from sqlalchemy.orm import Session
from app.core.security import verify_password, get_password_hash, create_access_token, decode_access_token
from app.database import get_db
from app.models.user import User
from app.models.license import License

router = APIRouter()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/token")

class UserIn(BaseModel):
    username: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

class UserOut(BaseModel):
    username: str
    license_type: str

# Dependência para obter o usuário atual
def get_current_user(db: Session = Depends(get_db), token: str = Depends(oauth2_scheme)):
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
    user = db.query(User).filter(User.username == username).first()
    if user is None:
        raise credentials_exception
    return user

@router.post("/register", response_model=Token)
async def register_user(user_in: UserIn, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.username == user_in.username).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Username already registered")
    
    hashed_password = get_password_hash(user_in.password)
    db_user = User(username=user_in.username, hashed_password=hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    
    # Atribuir licença freemium por padrão
    db_license = License(user_id=db_user.id, license_type="freemium")
    db.add(db_license)
    db.commit()
    db.refresh(db_license)

    access_token = create_access_token(data={"sub": db_user.username}, user_id=db_user.id, license_type=db_license.license_type)
    return {"access_token": access_token, "token_type": "bearer"}

@router.post("/token", response_model=Token)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(User).filter(User.username == form_data.username).first()
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Obter a licença ativa do usuário (assumindo uma por enquanto)
    active_license = db.query(License).filter(License.user_id == user.id, License.is_active == True).first()
    license_type = active_license.license_type if active_license else "none"

    access_token = create_access_token(data={"sub": user.username}, user_id=user.id, license_type=license_type)
    return {"access_token": access_token, "token_type": "bearer"}

@router.get("/users/me", response_model=UserOut)
async def read_users_me(current_user: User = Depends(get_current_user)):
    # Retorna informações básicas do usuário e seu tipo de licença
    active_license = current_user.licenses[0] if current_user.licenses else None # Simplificado, assumindo uma licença
    license_type = active_license.license_type if active_license else "none"
    return {"username": current_user.username, "license_type": license_type}
