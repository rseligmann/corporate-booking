from abc import ABC
from datetime import datetime

from .base import Role

class User(ABC):
    def __init__(self,
                user_id: str,
                email: str,
                first_name: str,
                last_name: str,
                role: Role,
                date_created: datetime,
                date_updated: datetime):
        self.user_id      = user_id
        self.email        = email
        self.first_name   = first_name
        self.last_name    = last_name
        self.role         = role
        self.date_created = date_created
        self.date_updated = date_updated
    
    def __str__(self) -> str:
        return f"""User Details:
                   ID: {self.user_id}
                   Name: {self.first_name} {self.last_name}
                   Email: {self.email}
                   Role: {self.role.value}
                   Created: {self.date_created}
                   Updated: {self.date_updated}"""

class Admin(User):
    def __init__(self,
                user_id: str,
                email: str,
                first_name: str,
                last_name: str,
                company_id: str,
                date_created: datetime,
                date_updated: datetime):
        super().__init__(
            user_id=user_id,
            email=email,
            first_name=first_name,
            last_name=last_name,
            role=Role.ADMIN,
            date_created=date_created,
            date_updated=date_updated
        )
        self.company_id = company_id