from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List
import uuid
from datetime import datetime, timezone
import sqlite3
import json

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# SQLite connection
DB_PATH = ROOT_DIR / "travel.db"

# Initialize database
def init_db():
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS status_checks
                 (id TEXT PRIMARY KEY, 
                  client_name TEXT, 
                  timestamp TEXT)''')
    c.execute('''CREATE TABLE IF NOT EXISTS destinations
                 (id INTEGER PRIMARY KEY AUTOINCREMENT,
                  name TEXT,
                  description TEXT,
                  country TEXT,
                  best_time_to_visit TEXT,
                  image_url TEXT)''')
    c.execute('''CREATE TABLE IF NOT EXISTS itineraries
                 (id INTEGER PRIMARY KEY AUTOINCREMENT,
                  destination_id INTEGER,
                  day_number INTEGER,
                  activity TEXT,
                  description TEXT)''')
    conn.commit()
    conn.close()

# Initialize database on startup
init_db()

# Create the main app
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

# Routes
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

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
    
    status_checks = []
    for row in rows:
        status_checks.append(StatusCheck(
            id=row[0],
            client_name=row[1],
            timestamp=datetime.fromisoformat(row[2])
        ))
    
    return status_checks

# Import and include route modules
try:
    from routes.destinations import router as destinations_router
    from routes.itineraries import router as itineraries_router
    app.include_router(destinations_router)
    app.include_router(itineraries_router)
except ImportError as e:
    print(f"Note: Some routes not available: {e}")

# Include the base api_router
app.include_router(api_router)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)