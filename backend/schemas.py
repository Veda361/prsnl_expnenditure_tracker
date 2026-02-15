from pydantic import BaseModel
from datetime import date


class TransactionCreate(BaseModel):
    amount: float
    category: str
    type: str
    note: str | None = None
    date: date
    

class TransactionResponse(TransactionCreate):
    id: int
    
    class Config:
        from_attributes = True 
        