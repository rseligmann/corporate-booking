from fastapi        import APIRouter
from api.routes     import auth, health,signup, guest_preferences, city_airport, trips
from api.routes.amadeus import amadeus_router

api = APIRouter()

# health check routes
api.include_router(health.router, prefix="/health")

api.include_router(auth.router, prefix="/auth")
api.include_router(signup.router, prefix="/signup")
api.include_router(guest_preferences.router, prefix="/guest-types")
api.include_router(city_airport.router, prefix="/search")
api.include_router(amadeus_router,prefix="/amadeus")
api.include_router(trips.router, prefix='/trip')

@api.get("/")
async def root():
    return {"message": "Corporate Travel Booking System API"}