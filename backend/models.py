from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime
from bson import ObjectId


class PyObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid ObjectId")
        return ObjectId(v)

    @classmethod
    def __modify_schema__(cls, field_schema):
        field_schema.update(type="string")


class DestinationBase(BaseModel):
    name: str
    location: str
    description: str
    image: str
    rating: float
    activities: List[str]
    bestTime: str
    price: str


class DestinationCreate(DestinationBase):
    pass


class Destination(DestinationBase):
    id: str = Field(alias="_id")
    createdAt: Optional[datetime] = None
    updatedAt: Optional[datetime] = None

    class Config:
        populate_by_name = True
        json_encoders = {ObjectId: str}


class ItineraryBase(BaseModel):
    tripName: str
    startDate: str
    endDate: str
    destinations: List[str]
    budget: Optional[str] = ""


class ItineraryCreate(ItineraryBase):
    pass


class Itinerary(ItineraryBase):
    id: str = Field(alias="_id")
    duration: Optional[str] = None
    createdAt: Optional[datetime] = None

    class Config:
        populate_by_name = True
        json_encoders = {ObjectId: str}


class ItineraryWithDestinations(BaseModel):
    id: str = Field(alias="_id")
    tripName: str
    startDate: str
    endDate: str
    destinations: List[Destination]
    budget: Optional[str] = ""
    duration: Optional[str] = None
    createdAt: Optional[datetime] = None

    class Config:
        populate_by_name = True
        json_encoders = {ObjectId: str}
