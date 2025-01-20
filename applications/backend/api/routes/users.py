from fastapi            import APIRouter

from api.dependencies   import PSQLReaderDependency

router = APIRouter()

@router.get("/")
async def get_users():
    return {"users": "users"}

@router.get("/{email}")
async def get_user(config_reader: PSQLReaderDependency, email: str):
    user = config_reader.get_user_by_email(email)
    return user
