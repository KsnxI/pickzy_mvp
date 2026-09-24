from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session

from app.api.routes.auth import get_db
from app.models.place import Place
from app.schemas.place import PlaceCreate, PlaceResponse


router = APIRouter(
    prefix="/places",
    tags=["Places"],
)


@router.get("", response_model=list[PlaceResponse])
def get_places(
    category: str | None = None,
    price: str | None = None,
    rating: float | None = Query(default=None, ge=0, le=5),
    db: Session = Depends(get_db),
):
    query = db.query(Place)

    if category:
        query = query.filter(Place.category == category)

    if price:
        query = query.filter(Place.price == price)

    if rating is not None:
        query = query.filter(Place.rating >= rating)

    return query.order_by(Place.rating.desc()).all()

@router.get("/{place_id}", response_model=PlaceResponse)
def get_place(
    place_id: int,
    db: Session = Depends(get_db),
):
    place = (
        db.query(Place)
        .filter(Place.id == place_id)
        .first()
    )

    if place is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Place not found",
        )

    return place

@router.post(
    "",
    response_model=PlaceResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_place(
    place_data: PlaceCreate,
    db: Session = Depends(get_db),
):
    place = Place(**place_data.model_dump())

    db.add(place)
    db.commit()
    db.refresh(place)

    return place

@router.delete("/{place_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_place(
        place_id: int,
        db: Session = Depends(get_db),
):
    place = (
        db.query(Place)
        .filter(Place.id == place_id)
        .first()
    )

    if place is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Place not found",
        )

    db.delete(place)
    db.commit()