from fastapi import APIRouter, HTTPException
from typing import List
from bson import ObjectId
from models import Itinerary, ItineraryCreate, ItineraryWithDestinations, Destination
from datetime import datetime
import logging

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/itineraries", tags=["itineraries"])


def get_db():
    from server import db
    return db


def calculate_duration(start_date: str, end_date: str) -> str:
    """Calculate duration between two dates"""
    try:
        start = datetime.fromisoformat(start_date.replace('Z', '+00:00'))
        end = datetime.fromisoformat(end_date.replace('Z', '+00:00'))
        days = (end - start).days + 1
        return f"{days} day{'s' if days != 1 else ''}"
    except:
        return ""


@router.get("", response_model=List[Itinerary])
async def get_itineraries():
    """
    Get all itineraries
    """
    try:
        db = get_db()
        itineraries = await db.itineraries.find().sort("createdAt", -1).to_list(100)
        
        for itinerary in itineraries:
            itinerary["_id"] = str(itinerary["_id"])
            # Convert destination ObjectIds to strings
            itinerary["destinations"] = [str(d) for d in itinerary.get("destinations", [])]
        
        return itineraries
    
    except Exception as e:
        logger.error(f"Error fetching itineraries: {e}")
        raise HTTPException(status_code=500, detail="Error fetching itineraries")


@router.get("/{itinerary_id}", response_model=ItineraryWithDestinations)
async def get_itinerary(itinerary_id: str):
    """
    Get a single itinerary with populated destination details
    """
    try:
        db = get_db()
        
        if not ObjectId.is_valid(itinerary_id):
            raise HTTPException(status_code=400, detail="Invalid itinerary ID")
        
        itinerary = await db.itineraries.find_one({"_id": ObjectId(itinerary_id)})
        
        if not itinerary:
            raise HTTPException(status_code=404, detail="Itinerary not found")
        
        # Fetch full destination details
        destination_ids = [ObjectId(d) for d in itinerary.get("destinations", [])]
        destinations = await db.destinations.find({"_id": {"$in": destination_ids}}).to_list(100)
        
        # Convert ObjectIds to strings
        for dest in destinations:
            dest["_id"] = str(dest["_id"])
        
        itinerary["_id"] = str(itinerary["_id"])
        itinerary["destinations"] = destinations
        
        return itinerary
    
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error fetching itinerary: {e}")
        raise HTTPException(status_code=500, detail="Error fetching itinerary")


@router.post("", response_model=Itinerary)
async def create_itinerary(itinerary: ItineraryCreate):
    """
    Create a new itinerary
    """
    try:
        db = get_db()
        
        # Validate that all destination IDs exist
        destination_ids = [ObjectId(d) for d in itinerary.destinations if ObjectId.is_valid(d)]
        
        if len(destination_ids) != len(itinerary.destinations):
            raise HTTPException(status_code=400, detail="Invalid destination ID(s)")
        
        existing_count = await db.destinations.count_documents({"_id": {"$in": destination_ids}})
        if existing_count != len(destination_ids):
            raise HTTPException(status_code=400, detail="One or more destinations not found")
        
        # Prepare itinerary data
        itinerary_dict = itinerary.dict()
        itinerary_dict["createdAt"] = datetime.utcnow()
        itinerary_dict["duration"] = calculate_duration(itinerary.startDate, itinerary.endDate)
        
        # Insert itinerary
        result = await db.itineraries.insert_one(itinerary_dict)
        
        # Fetch created itinerary
        created_itinerary = await db.itineraries.find_one({"_id": result.inserted_id})
        created_itinerary["_id"] = str(created_itinerary["_id"])
        created_itinerary["destinations"] = [str(d) for d in created_itinerary["destinations"]]
        
        return created_itinerary
    
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error creating itinerary: {e}")
        raise HTTPException(status_code=500, detail=f"Error creating itinerary: {str(e)}")


@router.delete("/{itinerary_id}")
async def delete_itinerary(itinerary_id: str):
    """
    Delete an itinerary
    """
    try:
        db = get_db()
        
        if not ObjectId.is_valid(itinerary_id):
            raise HTTPException(status_code=400, detail="Invalid itinerary ID")
        
        result = await db.itineraries.delete_one({"_id": ObjectId(itinerary_id)})
        
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Itinerary not found")
        
        return {"message": "Itinerary deleted successfully"}
    
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error deleting itinerary: {e}")
        raise HTTPException(status_code=500, detail="Error deleting itinerary")
