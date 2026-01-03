from fastapi import APIRouter, HTTPException, Query
from typing import List, Optional
from motor.motor_asyncio import AsyncIOMotorClient
import os
from bson import ObjectId
from models import Destination, DestinationCreate
import logging

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/destinations", tags=["destinations"])

# Database will be injected via app state
def get_db():
    from server import db
    return db


@router.get("", response_model=List[Destination])
async def get_destinations(
    location: Optional[str] = Query(None, description="Filter by location: 'North Goa' or 'South Goa'"),
    search: Optional[str] = Query(None, description="Search in name, location, or description")
):
    """
    Get all destinations with optional filtering
    """
    try:
        db = get_db()
        query = {}
        
        # Apply location filter
        if location:
            query["location"] = location
        
        # Apply search filter
        if search:
            query["$or"] = [
                {"name": {"$regex": search, "$options": "i"}},
                {"location": {"$regex": search, "$options": "i"}},
                {"description": {"$regex": search, "$options": "i"}}
            ]
        
        destinations = await db.destinations.find(query).to_list(100)
        
        # Convert ObjectId to string for each destination
        for dest in destinations:
            dest["_id"] = str(dest["_id"])
        
        return destinations
    
    except Exception as e:
        logger.error(f"Error fetching destinations: {e}")
        raise HTTPException(status_code=500, detail="Error fetching destinations")


@router.get("/{destination_id}", response_model=Destination)
async def get_destination(destination_id: str):
    """
    Get a single destination by ID
    """
    try:
        db = get_db()
        
        if not ObjectId.is_valid(destination_id):
            raise HTTPException(status_code=400, detail="Invalid destination ID")
        
        destination = await db.destinations.find_one({"_id": ObjectId(destination_id)})
        
        if not destination:
            raise HTTPException(status_code=404, detail="Destination not found")
        
        destination["_id"] = str(destination["_id"])
        return destination
    
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error fetching destination: {e}")
        raise HTTPException(status_code=500, detail="Error fetching destination")


@router.post("", response_model=Destination)
async def create_destination(destination: DestinationCreate):
    """
    Create a new destination (Admin function)
    """
    try:
        db = get_db()
        from datetime import datetime
        
        destination_dict = destination.dict()
        destination_dict["createdAt"] = datetime.utcnow()
        destination_dict["updatedAt"] = datetime.utcnow()
        
        result = await db.destinations.insert_one(destination_dict)
        
        created_destination = await db.destinations.find_one({"_id": result.inserted_id})
        created_destination["_id"] = str(created_destination["_id"])
        
        return created_destination
    
    except Exception as e:
        logger.error(f"Error creating destination: {e}")
        raise HTTPException(status_code=500, detail="Error creating destination")
