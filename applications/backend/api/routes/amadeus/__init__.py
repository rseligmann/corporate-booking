from fastapi import APIRouter
from api.routes.amadeus import flight_search, hotel_search

amadeus_router = APIRouter()

amadeus_router.include_router(flight_search.router, prefix="/flights")
amadeus_router.include_router(hotel_search.router, prefix="/hotels")