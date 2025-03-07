from fastapi        import APIRouter
from api.routes     import users, auth, health, companies, signup

api = APIRouter()

# health check routes
api.include_router(health.router, prefix="/health")

api.include_router(users.router, prefix="/users")
api.include_router(auth.router, prefix="/auth")
api.include_router(companies.router, prefix="/companies")
api.include_router(signup.router, prefix="/signup")

@api.get("/")
async def root():
    return {"message": "Corporate Travel Booking System API"}