from fastapi import APIRouter, HTTPException, Query, status
from typing import List, Optional

from api.dependencies import ConfigDBDependency, CurrentUserDependency
from api.models.trip import Trip, CreateTripResponse

router = APIRouter()

@router.get("/", response_model=List[Trip])
async def get_trips_by_company(
    current_user: CurrentUserDependency,
    config_db: ConfigDBDependency
):
    """ Get all trips for the current company(tenant) """
    try:
        # Can change to get trip by user in the future
        trips = await config_db.get_trips_by_company(current_user.company_id)
        return trips
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to retrieve guest type preferences: {str(e)}"
        )
    
@router.get("/guest/{guest_profile_id}", response_model=List[Trip])
async def get_trips_by_guest(
    guest_profile_id: str,
    # current_user: CurrentUserDependency,
    config_db: ConfigDBDependency
):
    """ Get detailed preferences for a specific guest type """
    try:
        trips = await config_db.get_trips_by_guest_profile(guest_profile_id)
        if not trips:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Trip not found for: {guest_profile_id}"
            )
        return trips
    
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to retrieve guest type preferences: {str(e)}"
        )

@router.get("/id/{trip_id}", response_model=Trip)
async def get_trip(
    trip_id: str,
    current_user: CurrentUserDependency,
    config_db: ConfigDBDependency
):
    """ Get specific trip by ID """
    try:
        trip = await config_db.get_trips_by_id(trip_id)
        if not trip:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Trip not found for: {trip_id}"
            )
        return Trip(**trip)
    
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to retrieve trip: {str(e)}"
        )
    

@router.post("/", response_model=CreateTripResponse)
async def insert_trip(
    trip_data: Trip,
    current_user: CurrentUserDependency,
    config_db: ConfigDBDependency
):
    """ Create a new trip for guest invite """
    try:
        trip_dict = trip_data.model_dump()
        new_Trip = await config_db.insert_trip(trip_dict)
        return CreateTripResponse(id=new_Trip)
    
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Failed to create trip: {str(e)}"
        )
    
# @router.put("/{guest_type_id}", response_model=GuestTypePreferences)
# async def update_guest_type_preferences(
#     guest_type_id: str,
#     preferences: dict,
#     current_user: CurrentUserDependency,
#     config_db: ConfigDBDependency
# ):
#     """ Update preferences for a guest type """
#     try:
#         updated_preferences = await config_db.update_guest_type_preferences(guest_type_id, preferences)
#         if not updated_preferences:
#             raise HTTPException(
#                 status_code=status.HTTP_404_NOT_FOUND,
#                 detail=f"Guest type not found for: {guest_type_id}"
#             )
#         return updated_preferences
    
#     except Exception as e:
#         raise HTTPException(
#             status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
#             detail=f"Failed to update guest type preferences: {str(e)}"
#         )

@router.delete("/{trip_id}", response_model=bool)
async def delete_trip(
    trip_id: str,
    current_user: CurrentUserDependency,
    config_db: ConfigDBDependency
):
    """ Delete a Trip by ID """
    try:
        # Get the preferences to verify existence and get related IDs
        trip = await config_db.delete_trip(trip_id)
        if not trip:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Trip not found"
            )
        return True
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to delete trip: {str(e)}"
        )