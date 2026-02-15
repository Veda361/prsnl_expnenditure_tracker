from fastapi import FastAPI
from database import Base, engine
import models  # 🔥 IMPORTANT LINE
from fastapi.middleware.cors import CORSMiddleware
from routes import router


Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router, prefix="/transactions", tags=["Transactions"])

@app.get("/")
def root():
    return {"message": "backend is running"}