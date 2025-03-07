from pydantic import BaseModel, EmailStr, field_validator, ValidationInfo

class CompanyCreate(BaseModel):
    name: str
    location: str
    street: str
    city: str
    state: str
    country: str
    postal_code: str

class UserCreate(BaseModel):
    email: EmailStr
    password: str
    first_name: str
    last_name: str
    company: CompanyCreate = None
    company_id: str = None
    role: str = "ADMIN"
    
    @field_validator('password')
    def password_strength(cls, v):
        if len(v) < 8:
            raise ValueError('Password must be at least 8 characters')
        if not any(c.isupper() for c in v):
            raise ValueError('Password must contain at least one uppercase letter')
        if not any(c.islower() for c in v):
            raise ValueError('Password must contain at least one lowercase letter')
        if not any(c.isdigit() for c in v):
            raise ValueError('Password must contain at least one number')
        return v
    
    @field_validator('company_id')
    def validate_company_selection(cls, v, info: ValidationInfo):
        # Either joining existing company or creating new one
        data = info.data
        if not v and not data.get('company'):
            raise ValueError('Must either specify company_id or provide company details')
        if v and data.get('company'):
            raise ValueError('Cannot specify both company_id and company details')
        return v

class SignupResponse(BaseModel):
    message: str
    user_id: str
    company_id: str
    requires_confirmation: bool = True

class ConfirmSignupRequest(BaseModel):
    email: EmailStr
    confirmation_code: str