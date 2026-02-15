from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import SessionLocal
import crud
import schemas
from fastapi import Query
from fastapi import HTTPException


router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/", response_model=schemas.TransactionResponse)
def add_transaction(
    transaction: schemas.TransactionCreate,
    db: Session = Depends(get_db)
):
    return crud.create_transaction(db, transaction)


@router.get("/", response_model=list[schemas.TransactionResponse])
def read_transactions(
    db: Session = Depends(get_db)
):
    return crud.get_transaction(db)

@router.get("/summary")
def monthly_summary(
    month: int = Query(..., ge=1, le=12),
    year: int = Query(..., ge=2000, le=2100),
    db: Session = Depends(get_db)
):
    return crud.get_monthly_summary(db, month, year)


@router.delete("/{transaction_id}")
def delete_transaction(transaction_id: int, db: Session = Depends(get_db)):
    deleted = crud.delete_transaction(db, transaction_id)

    if not deleted:
        raise HTTPException(status_code=404, detail="Transaction not found")

    return {"message": "Transaction deleted successfully"}