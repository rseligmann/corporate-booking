from api.dependencies           import PSQLReaderDependency
from fastapi                    import APIRouter

from database.postgresql.models import Admin

router = APIRouter()

class Token:
    access_token: str
    token_type: str

async def get_admin(config_reader: PSQLReaderDependency, email: str) -> Admin:
    user = config_reader.get_admin_by_email(email)
    return user

@router.post("/token")
async def login_for_access_token(config_reader: PSQLReaderDependency, email: str, password: str):
    pass