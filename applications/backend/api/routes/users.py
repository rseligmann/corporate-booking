from fastapi            import APIRouter

from api.dependencies   import ConfigDBDependency

router = APIRouter()

@router.get("/")
async def get_users():
    return {"users": "users"}

@router.get("/{email}")
async def get_admin(config_reader: ConfigDBDependency, email: str):
    user = await config_reader.get_admin_by_email(email)
    return user
