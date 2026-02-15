#  Personal Expenditure Tracker – Full Stack SaaS Dashboard

A modern full-stack Personal Expense Tracking Web Application built with React + FastAPI.

This project helps users track expenses, analyze spending patterns, and visualize financial data using dynamic charts.

---

#  Project Overview

The Personal Expenditure Tracker is a SaaS-style dashboard that allows users to:

- Add income and expense transactions
- Categorize expenses
- Track monthly spending
- Analyze financial behavior using interactive charts
- View categorized analytics
- Maintain structured financial records

The system is divided into two major parts:

Frontend → React + Tailwind + Recharts  
Backend → FastAPI + SQLAlchemy + SQLite  

---


---

#  Frontend Tech Stack

- React (Component-based architecture)
- Vite (Fast development server)
- Tailwind CSS (Utility-first styling)
- Recharts (Bar & Pie charts)
- Axios / Fetch API (HTTP requests)

### Key Frontend Features

- Dynamic Dashboard
- Category Dropdown UI
- Monthly Bar Chart Visualization
- Category Pie Chart
- Monthly Category Pie Chart
- Transaction List View
- Responsive SaaS Layout

---

#  Backend Tech Stack

- FastAPI (High performance Python API framework)
- SQLAlchemy (ORM for database operations)
- Pydantic (Data validation)
- SQLite (Lightweight relational database)
- Uvicorn (ASGI server)

---

#  Database Design

### Transaction Table

| Field | Type | Description |
|-------|------|-------------|
| id | Integer | Primary Key |
| title | String | Transaction name |
| amount | Float | Transaction amount |
| category | String | Expense category |
| date | Date | Transaction date |
| type | String | income / expense |

---


---

#  API Endpoints

### Get All Transactions
GET `/transactions`

### Create Transaction
POST `/transactions`

### Delete Transaction
DELETE `/transactions/{id}`

---

#  Backend Setup Guide

```bash
cd backend
python -m venv venv
source venv/bin/activate     # Linux / Mac
# venv\Scripts\activate      # Windows

pip install -r requirements.txt
uvicorn main:app --reload

#backend runs at:
http://127.0.0.1:8000

#Swagger Documentation
http://127.0.0.1:8000/docs

#frontend setup 
cd frontend
npm install
npm run dev

#Frontend runs at:
http://localhost:5173