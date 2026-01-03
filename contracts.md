# GlobeTrotter API Contracts & Integration Plan

## Overview
This document outlines the API contracts, mock data replacement strategy, and backend implementation plan for the GlobeTrotter Goa travel planning application.

## Mock Data to Replace

### From `/app/frontend/src/mock.js`:
1. **destinations** - Array of 6 Goa beach destinations
2. **sampleItineraries** - Pre-made trip itineraries
3. **activities** - Activity categories
4. **testimonials** - User testimonials (can remain static/mock)

### Frontend Storage:
- **localStorage['goaTrips']** - User-created trips (currently browser-only)

## API Endpoints to Implement

### 1. Destinations API

#### GET `/api/destinations`
- **Purpose**: Get all destinations with optional filtering
- **Query Params**: 
  - `location` (optional): "North Goa" | "South Goa"
  - `search` (optional): search term
- **Response**: Array of destination objects
```json
[
  {
    "id": "string",
    "name": "string",
    "location": "string",
    "description": "string",
    "image": "string",
    "rating": number,
    "activities": ["string"],
    "bestTime": "string",
    "price": "string"
  }
]
```

#### GET `/api/destinations/:id`
- **Purpose**: Get single destination details
- **Response**: Single destination object

#### POST `/api/destinations` (Admin - Optional for MVP)
- **Purpose**: Add new destination
- **Request Body**: Destination object
- **Response**: Created destination

### 2. Itineraries API

#### GET `/api/itineraries`
- **Purpose**: Get all user-created itineraries
- **Response**: Array of itinerary objects

#### POST `/api/itineraries`
- **Purpose**: Create new itinerary
- **Request Body**:
```json
{
  "tripName": "string",
  "startDate": "date",
  "endDate": "date",
  "destinations": ["destinationId"],
  "budget": "string"
}
```
- **Response**: Created itinerary object

#### GET `/api/itineraries/:id`
- **Purpose**: Get single itinerary
- **Response**: Itinerary object with populated destination details

#### DELETE `/api/itineraries/:id`
- **Purpose**: Delete an itinerary
- **Response**: Success message

### 3. Sample Itineraries API (Optional - can remain static)

#### GET `/api/sample-itineraries`
- **Purpose**: Get curated sample itineraries
- **Response**: Array of sample itinerary objects

## MongoDB Models

### Destination Model
```python
{
  "_id": ObjectId,
  "name": str,
  "location": str,  # "North Goa" or "South Goa"
  "description": str,
  "image": str,  # URL
  "rating": float,
  "activities": [str],
  "bestTime": str,
  "price": str,
  "createdAt": datetime,
  "updatedAt": datetime
}
```

### Itinerary Model
```python
{
  "_id": ObjectId,
  "tripName": str,
  "startDate": datetime,
  "endDate": datetime,
  "destinations": [ObjectId],  # References to Destination
  "budget": str,
  "duration": str,  # Calculated field
  "createdAt": datetime,
  "updatedAt": datetime
}
```

## Frontend Integration Plan

### Files to Update:

1. **HomePage.jsx**
   - Replace `import { destinations, sampleItineraries } from '../mock'`
   - Add API call to fetch featured destinations
   - Keep sample itineraries as static (optional API)

2. **Destinations.jsx**
   - Replace mock destinations with API call
   - Add loading states
   - Handle errors gracefully

3. **TripPlanner.jsx**
   - Replace localStorage save with API POST to `/api/itineraries`
   - Fetch destinations from API
   - Add success/error handling

4. **DestinationDetail.jsx**
   - Fetch single destination from API by ID
   - Handle loading and error states

### New Files to Create:

1. **`/app/frontend/src/api/api.js`**
   - Centralized API service
   - Axios instance with base URL
   - All API call functions

## Implementation Steps

### Backend (Priority 1):
1. Create MongoDB models for Destinations and Itineraries
2. Implement destination CRUD endpoints
3. Implement itinerary CRUD endpoints
4. Seed database with mock destination data
5. Add error handling and validation

### Frontend Integration (Priority 2):
1. Create API service layer
2. Update HomePage to fetch destinations
3. Update Destinations page with API integration
4. Update TripPlanner to save to backend
5. Update DestinationDetail with API
6. Add loading skeletons
7. Add error boundaries

## Data Flow

### View Destinations:
1. User visits `/destinations`
2. Frontend calls `GET /api/destinations`
3. Backend queries MongoDB
4. Returns destination array
5. Frontend displays cards

### Create Itinerary:
1. User fills trip form and selects destinations
2. User clicks "Save Itinerary"
3. Frontend calls `POST /api/itineraries` with trip data
4. Backend validates and saves to MongoDB
5. Returns created itinerary
6. Frontend shows success toast

### View Destination Details:
1. User clicks on destination card
2. Navigate to `/destination/:id`
3. Frontend calls `GET /api/destinations/:id`
4. Backend returns full destination details
5. Frontend displays detail page

## Notes
- No authentication required for MVP
- All itineraries are public (no user ownership)
- Testimonials can remain as static mock data
- Activities list can remain as static mock data
- Focus on core CRUD operations for destinations and itineraries
