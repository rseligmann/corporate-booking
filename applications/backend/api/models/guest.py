from pydantic import BaseModel
from typing import Optional

class GuestProfile(BaseModel):
    id: str
    firstName: str
    lastName: str
    email: str
    phone: Optional[str] = None