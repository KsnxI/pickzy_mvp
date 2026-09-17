from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from jose import JWTError
from sqlalchemy.orm import Session

from app.core.security import (
    create_access_token,
    decode_access_token,
    hash_password,
    verify_password
)
from app.db.database import SessionLocal
from app.models.user import User
from app.schemas.auth import (
    Token,
    UserLogin,
    UserRegister,
    UserResponse
)


router = APIRouter(
    prefix="/auth",
    tags=["Auth"]
)

bearer_scheme = HTTPBearer()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post(
    "/register",
    response_model=UserResponse,
    status_code=status.HTTP_201_CREATED
)
def register(
        user_data: UserRegister,
        db: Session = Depends(get_db)
):
    existing_user = (
        db.query(User)
        .filter(User.email == user_data.email)
        .first()
    )

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="User with this email already exists"
        )

    user = User(
        email=user_data.email,
        password=hash_password(user_data.password)
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    return user


@router.post("/login", response_model=Token)
def login(
        user_data: UserLogin,
        db: Session = Depends(get_db)
):
    user = (
        db.query(User)
        .filter(User.email == user_data.email)
        .first()
    )

    if not user:
        raise HTTPException(
            status_code=401,
            detail="Incorrect email or password"
        )

    if not verify_password(
            user_data.password,
            user.password
    ):
        raise HTTPException(
            status_code=401,
            detail="Incorrect email or password"
        )

    if not user.is_active:
        raise HTTPException(
            status_code=403,
            detail="User is inactive"
        )

    access_token = create_access_token(
        data={"sub": str(user.id)}
    )

    return {
        "access_token": access_token,
        "token_type": "bearer"
    }


def get_current_user(
        credentials: HTTPAuthorizationCredentials = Depends(
            bearer_scheme
        ),
        db: Session = Depends(get_db)
):
    credentials_exception = HTTPException(
        status_code=401,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"}
    )

    token = credentials.credentials

    try:
        payload = decode_access_token(token)

        user_id = payload.get("sub")

        if user_id is None:
            raise credentials_exception

        user_id = int(user_id)

    except (JWTError, ValueError):
        raise credentials_exception

    user = (
        db.query(User)
        .filter(User.id == user_id)
        .first()
    )

    if user is None:
        raise credentials_exception

    if not user.is_active:
        raise HTTPException(
            status_code=403,
            detail="User is inactive"
        )

    return user


@router.get("/me", response_model=UserResponse)
def get_me(
        current_user: User = Depends(get_current_user)
):
    return current_user