from passlib.context import CryptContext
from datetime import datetime, timedelta
from typing import Union, Any
from jose import jwt

# Configuração para hashing de senhas
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Chave secreta para JWT (MUDAR EM PRODUÇÃO!)
SECRET_KEY = "sua-super-secreta-chave-jwt"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)

def create_access_token(data: dict, expires_delta: Union[timedelta, None] = None, user_id: int = None, license_type: str = None) -> str:
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    if user_id is not None:
        to_encode.update({"user_id": user_id})
    if license_type is not None:
        to_encode.update({"license_type": license_type})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def decode_access_token(token: str) -> Union[dict, None]:
    try:
        decoded_token = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return decoded_token if decoded_token.get("exp") >= datetime.utcnow().timestamp() else None
    except Exception:
        return None
