from fastapi        import APIRouter
from api.routes     import users, auth

api = APIRouter()

api.include_router(users.router, prefix="/users")
api.include_router(auth.router, prefix="/auth")

@api.get("/")
async def root():
    return {"message": "Corporate Travel Booking System API"}