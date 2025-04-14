from pydantic import BaseModel
from typing import Optional

class Token(BaseModel):
    access_token: str
    token_type: str
    refresh_token: Optional[str] = None
    id_token: Optional[str] = None
    expires_in: Optional[int] = None

class UserResponse(BaseModel):
    email: str
    first_name: str
    last_name: str
    user_id: str
    company_id: str

class RefreshTokenRequest(BaseModel):
    refresh_token: str