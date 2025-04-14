from fastapi import APIRouter, HTTPException, Query, status
from typing import List, Optional

from api.dependencies import ConfigDBDependency, CurrentUserDependency
from api.models.guest_preferences import(
    CreateGuestType, CreateGuestTypeResponse, GuestTypesBase, GuestTypePreferences
)

router = APIRouter()

@router.get("/", response_model=List[GuestTypesBase])
async def get_all_guest_types(
    company_id: str,
    current_user: CurrentUserDependency,
    config_db: ConfigDBDependency
):
    """ Get all guest types for the current company(tenant) """
    try:
        # The tenant context is already set by the dependency
        guest_types = await config_db.get_all_guest_types(company_id)
        return guest_types
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to retrieve guest type preferences: {str(e)}"
        )

@router.post("/", response_model=CreateGuestTypeResponse)
async def insert_guest_type_preferences(
    guest_type_data: CreateGuestType,
    current_user: CurrentUserDependency,
    config_db: ConfigDBDependency
):
    """ Create a new guest type with default preferences """
    try:
        new_guest_type = await config_db.insert_guest_type_preferences(
            guest_type_data.name, 
            guest_type_data.company_id, 
            guest_type_data.user_id
        )
        return new_guest_type
    
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Failed to create guest type preferences: {str(e)}"
        )
    
@router.get("/{guest_type_id}", response_model=GuestTypePreferences)
async def get_get_type_preferences(
    guest_type_id: str,
    current_user: CurrentUserDependency,
    config_db: ConfigDBDependency
):
    """ Get detailed preferences for a specific guest type """
    try:
        guest_type_preferences = await config_db.get_guest_type_preferences(guest_type_id)
        if not guest_type_preferences:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Guest type preferences not found for: {guest_type_id}"
            )
        return guest_type_preferences
    
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to retrieve guest type preferences: {str(e)}"
        )
    
@router.put("/{guest_type_id}", response_model=GuestTypePreferences)
async def update_guest_type_preferences(
    guest_type_id: str,
    preferences: dict,
    current_user: CurrentUserDependency,
    config_db: ConfigDBDependency
):
    """ Update preferences for a guest type """
    try:
        updated_preferences = await config_db.update_guest_type_preferences(guest_type_id, preferences)
        if not updated_preferences:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Guest type not found for: {guest_type_id}"
            )
        return updated_preferences
    
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to update guest type preferences: {str(e)}"
        )

@router.delete("/{guest_type_id}", response_model=bool)
async def delete_guest_type_preferences(
    guest_type_id: str,
    current_user: CurrentUserDependency,
    config_db: ConfigDBDependency
):
    """ Delete a guest type and all associated preferences (cascading delete of related entities """
    try:
        # Get the preferences to verify existence and get related IDs
        preferences = await config_db.delete_guest_type_preferences(guest_type_id)
        if not preferences:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Guest type preferences not found"
            )
        return True
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to delete guest type preferences: {str(e)}"
        )