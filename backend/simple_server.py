from fastapi import FastAPI, APIRouter
from fastapi.middleware.cors import CORSMiddleware
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List
import uuid
from datetime import datetime, timezone
import sqlite3

ROOT_DIR = Path(__file__).parent

# SQLite database
DB_PATH = ROOT_DIR / "travel.db"

# Initialize database
def init_db():
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS status_checks
                 (id TEXT PRIMARY KEY, client_name TEXT, timestamp TEXT)''')
    conn.commit()
    conn.close()

init_db()

app = FastAPI()
api_router = APIRouter(prefix="/api")

# Models
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

# Routes
@api_router.get("/")
async def root():
    return {"message": "Travel App API is working!"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_obj = StatusCheck(**input.model_dump())
    
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute("INSERT INTO status_checks (id, client_name, timestamp) VALUES (?, ?, ?)",
              (status_obj.id, status_obj.client_name, status_obj.timestamp.isoformat()))
    conn.commit()
    conn.close()
    
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute("SELECT id, client_name, timestamp FROM status_checks")
    rows = c.fetchall()
    conn.close()
    
    return [StatusCheck(id=r[0], client_name=r[1], timestamp=datetime.fromisoformat(r[2])) 
            for r in rows]

# Include routers
try:
    from routes.destinations import router as destinations_router
    from routes.itineraries import router as itineraries_router
    app.include_router(destinations_router)
    app.include_router(itineraries_router)
except ImportError:
    print("Note: Destination and itinerary routes not loaded")

app.include_router(api_router)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)