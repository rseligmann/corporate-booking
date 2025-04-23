from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime
from .guest_preferences import GuestTypePreferences
from .guest import GuestProfile

class City(BaseModel):
    id: str
    name: str
    state_id: str
    lat: float
    lng: float
    ranking: int

class Origin(BaseModel):
    city: City
    searchedAirports: List[str]

class Destination(BaseModel):
    city: City
    searchedAirports: List[str]

class Itinerary(BaseModel):
    id: str
    origin: Origin
    destination: Destination
    startDate: datetime
    endDate: datetime

    class Config:
        json_encoders = {
            datetime: lambda dt: dt.isoformat() if dt else None
        }

class Trip(BaseModel):
    id: str
    guest: GuestProfile
    guestType: str
    status: str
    travelPreferences: GuestTypePreferences
    itinerary: Itinerary
    userId: str
    companyId: str
    estimatedBudget: float
    bookedBudget: Optional[float] = None
    actualSpend: Optional[float] = None

class CreateTripResponse(BaseModel):
    id: str