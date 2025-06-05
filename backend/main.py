from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
import json
import os

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

# Data file path
DATA_FILE = "../data/fruits.json"

# Ensure data directory exists
os.makedirs(os.path.dirname(DATA_FILE), exist_ok=True)

def load_data() -> List[FruitEntry]:
    try:
        with open(DATA_FILE, 'r') as f:
            data = json.load(f)
            return [FruitEntry(**entry) for entry in data.get('entries', [])]
    except FileNotFoundError:
        return []

def save_data(entries: List[FruitEntry]):
    with open(DATA_FILE, 'w') as f:
        json.dump({'entries': [entry.dict() for entry in entries]}, f, indent=2)

@app.get("/api/fruits")
async def get_fruits():
    return {"fruits": ["Apple", "Banana", "Orange", "Mango", "Pear"]}

@app.get("/api/entries")
async def get_entries():
    entries = load_data()
    return {"entries": entries}

@app.post("/api/entries")
async def add_entry(entry: FruitEntry):
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