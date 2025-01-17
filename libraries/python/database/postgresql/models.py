from datetime import datetime, timezone
from sqlmodel import SQLModel, Field

from enum import Enum

class Role(Enum):
    ADMIN = "ADMIN"
    USER = "USER"
    GUEST = "GUEST"

class User(SQLModel, table=True):
    __tablename__ = "test_users"

    user_id         : int = Field(primary_key=True)
    email           : str
    first_name      : str
    last_name       : str
    created_at      : datetime = datetime.now(timezone.utc)
    role            : Role

    def __str__(self) -> str:
        return f"""User Details:
                   ID: {self.user_id}
                   Name: {self.first_name} {self.last_name}
                   Email: {self.email}
                   Role: {self.role.value}
                   Created: {self.created_at}"""