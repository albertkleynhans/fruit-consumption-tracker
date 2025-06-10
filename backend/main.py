from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
import json
import os
import logging

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Data models
class FruitEntry(BaseModel):
    date: str
    fruit: str
    quantity: int

class FruitData(BaseModel):
    entries: List[FruitEntry]

# Data file path - using absolute path
current_dir = os.path.dirname(os.path.abspath(__file__))
DATA_FILE = os.path.join(os.path.dirname(current_dir), "data", "fruits.json")
logger.info(f"Data file path: {DATA_FILE}")

# Ensure data directory exists
os.makedirs(os.path.dirname(DATA_FILE), exist_ok=True)

def load_data() -> List[FruitEntry]:
    try:
        with open(DATA_FILE, 'r') as f:
            data = json.load(f)
            logger.info(f"Loaded data: {data}")
            return [FruitEntry(**entry) for entry in data.get('entries', [])]
    except FileNotFoundError:
        logger.warning(f"Data file not found at {DATA_FILE}")
        return []
    except Exception as e:
        logger.error(f"Error loading data: {str(e)}")
        return []

def save_data(entries: List[FruitEntry]):
    try:
        data = {'entries': [entry.dict() for entry in entries]}
        logger.info(f"Saving data: {data}")
        with open(DATA_FILE, 'w') as f:
            json.dump(data, f, indent=2)
        logger.info("Data saved successfully")
    except Exception as e:
        logger.error(f"Error saving data: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error saving data: {str(e)}")

@app.get("/api/fruits")
async def get_fruits():
    return {"fruits": ["Apple", "Banana", "Orange", "Mango", "Pear"]}

@app.get("/api/entries")
async def get_entries():
    entries = load_data()
    return {"entries": entries}

@app.post("/api/entries")
async def add_entry(entry: FruitEntry):
    logger.info(f"Received new entry: {entry}")
    entries = load_data()
    entries.append(entry)
    save_data(entries)
    return {"message": "Entry added successfully"}

@app.get("/api/summary")
async def get_summary():
    entries = load_data()
    summary = {}
    
    for entry in entries:
        date = entry.date
        fruit = entry.fruit
        if date not in summary:
            summary[date] = {}
        if fruit not in summary[date]:
            summary[date][fruit] = 0
        summary[date][fruit] += entry.quantity
    
    return {"summary": summary}