from sqlalchemy import Column, Integer, String, Float
from database import Base

class Product(Base):
    __tablename__ = "products"   # 🔥 REQUIRED

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    desc = Column(String)
    price = Column(Float)
    quantity = Column(Integer)
