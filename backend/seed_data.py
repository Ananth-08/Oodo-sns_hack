"""Seed initial destination data into MongoDB"""

from motor.motor_asyncio import AsyncIOMotorClient
import os
import asyncio
from datetime import datetime
from dotenv import load_dotenv
from pathlib import Path

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Initial destinations data (from mock.js)
destinations_data = [
    {
        "name": "Palolem Beach",
        "location": "South Goa",
        "description": "A crescent-shaped paradise with calm waters, perfect for swimming and kayaking. Known for its serene ambiance and beachside huts.",
        "image": "https://images.pexels.com/photos/994605/pexels-photo-994605.jpeg",
        "rating": 4.8,
        "activities": ["Swimming", "Kayaking", "Sunset Views", "Beach Shacks"],
        "bestTime": "November to March",
        "price": "₹₹",
        "createdAt": datetime.utcnow(),
        "updatedAt": datetime.utcnow()
    },
    {
        "name": "Anjuna Beach",
        "location": "North Goa",
        "description": "Famous for its dramatic red cliffs, flea market, and vibrant nightlife. A haven for artists and free spirits.",
        "image": "https://images.pexels.com/photos/88212/pexels-photo-88212.jpeg",
        "rating": 4.6,
        "activities": ["Flea Market", "Water Sports", "Beach Parties", "Cliff Views"],
        "bestTime": "October to March",
        "price": "₹₹₹",
        "createdAt": datetime.utcnow(),
        "updatedAt": datetime.utcnow()
    },
    {
        "name": "Agonda Beach",
        "location": "South Goa",
        "description": "A pristine, untouched stretch of coastline. Perfect for those seeking solitude and natural beauty.",
        "image": "https://images.pexels.com/photos/240526/pexels-photo-240526.jpeg",
        "rating": 4.9,
        "activities": ["Yoga", "Dolphin Watching", "Beach Walks", "Meditation"],
        "bestTime": "November to February",
        "price": "₹₹",
        "createdAt": datetime.utcnow(),
        "updatedAt": datetime.utcnow()
    },
    {
        "name": "Candolim Beach",
        "location": "North Goa",
        "description": "A peaceful beach with luxury resorts, water sports, and Portuguese heritage sites nearby.",
        "image": "https://images.pexels.com/photos/1591373/pexels-photo-1591373.jpeg",
        "rating": 4.5,
        "activities": ["Parasailing", "Jet Skiing", "Beach Dining", "Fort Exploration"],
        "bestTime": "December to February",
        "price": "₹₹₹",
        "createdAt": datetime.utcnow(),
        "updatedAt": datetime.utcnow()
    },
    {
        "name": "Morjim Beach",
        "location": "North Goa",
        "description": "Known as 'Little Russia' and home to Olive Ridley turtles. A tranquil escape with pristine sands.",
        "image": "https://images.pexels.com/photos/2565222/pexels-photo-2565222.jpeg",
        "rating": 4.7,
        "activities": ["Turtle Spotting", "Bird Watching", "Beach Dining", "Quiet Walks"],
        "bestTime": "November to March",
        "price": "₹₹",
        "createdAt": datetime.utcnow(),
        "updatedAt": datetime.utcnow()
    },
    {
        "name": "Cola Beach",
        "location": "South Goa",
        "description": "A hidden gem with a freshwater lagoon meeting the sea. Accessible through coconut groves.",
        "image": "https://images.pexels.com/photos/35429732/pexels-photo-35429732.jpeg",
        "rating": 4.9,
        "activities": ["Lagoon Swimming", "Camping", "Photography", "Nature Walks"],
        "bestTime": "October to March",
        "price": "₹",
        "createdAt": datetime.utcnow(),
        "updatedAt": datetime.utcnow()
    }
]


async def seed_destinations():
    """Seed destinations into MongoDB"""
    mongo_url = os.environ['MONGO_URL']
    client = AsyncIOMotorClient(mongo_url)
    db = client[os.environ['DB_NAME']]
    
    try:
        # Clear existing destinations
        await db.destinations.delete_many({})
        print("Cleared existing destinations")
        
        # Insert new destinations
        result = await db.destinations.insert_many(destinations_data)
        print(f"Inserted {len(result.inserted_ids)} destinations")
        
        # Verify
        count = await db.destinations.count_documents({})
        print(f"Total destinations in database: {count}")
        
    except Exception as e:
        print(f"Error seeding data: {e}")
    finally:
        client.close()


if __name__ == "__main__":
    asyncio.run(seed_destinations())
