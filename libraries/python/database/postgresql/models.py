from datetime import datetime, timezone
from sqlmodel import SQLModel, Field

class User(SQLModel, table=True):
    __tablename__ = "test_users"

    id              : int = Field(primary_key=True)
    email           : str
    first_name      : str
    last_name       : str
    created_at      : datetime = datetime.now(timezone.utc)