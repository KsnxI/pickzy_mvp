from sqlalchemy import Column, Float, Integer, String, Text

from app.db.database import Base


class Place(Base):
    __tablename__ = "places"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(150), nullable=False, index=True)
    description = Column(Text, nullable=True)
    category = Column(String(80), nullable=False, index=True)
    rating = Column(Float, nullable=True, index=True)
    price = Column(String(10), nullable=True, index=True)
    address = Column(String(255), nullable=False)
    image = Column(String(500), nullable=True)