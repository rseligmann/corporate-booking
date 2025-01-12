from fastapi        import APIRouter
from api.routes     import users

api = APIRouter()
api.include_router(users.router, prefix="/users")

@api.get("/")
async def root():
    return {"message": "Corporate Travel Booking System API"}