from pydantic import BaseModel

class CompanyCreate(BaseModel):
    name: str
    location: str
    street: str
    city: str
    state: str
    country: str
    postal_code: str

class CompanyResponse(BaseModel):
    id: str
    name: str
    location: str

class CompanyDetailResponse(CompanyResponse):
    street: str
    city: str
    state: str
    country: str
    postal_code: str

class JoinCompanyRequest(BaseModel):
    company_id: str