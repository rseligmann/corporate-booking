from fastapi import APIRouter, HTTPException, Path, Query, Depends
from typing import List, Optional

from api.dependencies import ConfigDBDependency
from api.models.guest_preferences import(
    FlightPreferencesCreate, FlightPreferencesUpdate, FlightPreferencesResponse,
    HotelPreferencesCreate, HotelPreferencesUpdate, HotelPreferencesResponse,
    GroundTransportPreferencesCreate, GroundTransportPreferencesUpdate, GroundTransportPreferencesResponse,
    GuestTypePreferencesCreate, GuestTypePreferencesUpdate, GuestTypePreferencesResponse,
    CombinedPreferencesCreate, CabinClassEnum, MaxStopsEnum, HotelRatingEnum, TransportServiceEnum
)

router = APIRouter()

# Guest Type Preferences endpoints
@router.get("/guest-type", response_model=List[GuestTypePreferencesResponse])
async def get_all_guest_type_preferences(
    config_db: ConfigDBDependency,
    guest_type: Optional[str] = Query(None, description="Filter by guest type"),
):
    """Get all guest type preferences with optional filtering by guest type"""
    if guest_type:
        preferences = await config_db.get_guest_type_preferences_by_type(guest_type)
        if preferences:
            return [preferences]
        return []
    # Implementation would need to be added to fetch all preferences
    return []

@router.post("/guest-type", response_model=GuestTypePreferencesResponse, status_code=201)
async def create_guest_type_preferences(
    preferences: GuestTypePreferencesCreate,
    config_db: ConfigDBDependency
):
    """Create new guest type preferences"""
    return await config_db.insert_guest_type_preferences(**preferences.model_dump())