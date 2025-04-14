from fastapi import APIRouter, HTTPException, Query, status
from typing import List, Optional

from api.dependencies import ConfigDBDependency, CurrentUserDependency
from api.models.city_airport import CityBase, AirportServiceability

router = APIRouter()

@router.get("/cities", response_model=List[CityBase])
async def autocomplete_cities(
        current_user: CurrentUserDependency,
        config_db: ConfigDBDependency,
        q: str = Query(..., description="Search term for city name", min_length=1),
        limit: int = Query(5, description="Maximimum number of results to return", ge=1,le=10),
        threshold: float = Query(.3, description="Minimum similarity threshold (0.0-1.0)", ge=0, le=1.0),
):
    """Search for cities using fuzzy matching"""

    if len(q) < 1:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Search term must be at lease 1 charcter long"
        )
    try:
        cities = await config_db.fuzzy_search_cities(
            search_term=q,
            limit=limit,
            threshold=threshold
        )
        return cities
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail = f"Failed to retrieve cities: {str(e)}"
        )
    
@router.get("/airport_serviceability", response_model=List[AirportServiceability])
async def get_serviceable_airports_by_city(
    current_user: CurrentUserDependency,
    config_db: ConfigDBDependency,
    hubs: list[str] = Query(None),
    city_id: str = Query(..., min_length=1),
    max_distance: int = Query(100, ge=1, le=200)
):
    """Get all airports within a set max distance of a city"""

    try:
        airports = await config_db.servicable_airports_by_city(
            city_id = city_id,
            max_distance = max_distance,
            hubs = hubs
        )
        return airports
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail = f"Failed to retrieve airports: {str(e)}"
        )


