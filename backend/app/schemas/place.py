from pydantic import BaseModel, ConfigDict, Field


class PlaceCreate(BaseModel):
    name: str = Field(min_length=2, max_length=150)
    description: str | None = None
    category: str = Field(min_length=2, max_length=80)
    rating: float | None = Field(default=None, ge=0, le=5)
    price: str | None = Field(default=None, max_length=10)
    address: str = Field(min_length=2, max_length=255)
    image: str | None = Field(default=None, max_length=500)


class PlaceResponse(BaseModel):
    id: int
    name: str
    description: str | None
    category: str
    rating: float | None
    price: str | None
    address: str
    image: str | None

    model_config = ConfigDict(from_attributes=True)