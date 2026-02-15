from sqlalchemy.orm import session
import models
import schemas
from sqlalchemy import extract, func


def create_transaction(db: session, transaction: schemas.TransactionCreate):
    db_transaction = models.Transaction(**transaction.dict())
    db.add(db_transaction)
    db.commit()
    db.refresh(db_transaction)
    return db_transaction


def get_transaction(db: session):
    return db.query(models.Transaction).all()


def get_monthly_summary(db, month: int, year: int):
    transactions = db.query(models.Transaction).filter(
        extract('month', models.Transaction.date) == month,
        extract('year', models.Transaction.date) == year
    ).all()

    total_income = sum(t.amount for t in transactions if t.type.lower() == "income")
    total_expense = sum(t.amount for t in transactions if t.type.lower() == "expense")

    return {
        "income": total_income,
        "expense": total_expense,
        "balance": total_income - total_expense
    }
    
    
def delete_transaction(db, transaction_id: int):
    transaction = db.query(models.Transaction).filter(
        models.Transaction.id == transaction_id
    ).first()

    if not transaction:
        return None

    db.delete(transaction)
    db.commit()
    return transaction