from pydantic import BaseModel

class ProductCreate(BaseModel):
    name: str
    desc: str
    price: float
    quantity: int

class ProductResponse(ProductCreate):
    id: int

    class Config:
        from_attributes = True   # SQLAlchemy → Pydantic
