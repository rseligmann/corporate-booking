from pydantic import BaseModel, Field
from typing import Optional, List
from enum import Enum

class CabinClassEnum(str, Enum):
    ECONOMY= "ECONOMY"
    PREMIUM_ECONOMY = "PREMIUM_ECONOMY"
    BUSINESS = "BUSINESS"
    FIRST = "FIRST"

class MaxStopsEnum(str, Enum):
    DIRECT = "DIRECT"
    ONE_STOP = "ONE_STOP"
    TWO_STOPS = "TWO_STOPS"
    ANY = "ANY"

# class HotelRatingEnum(str, Enum):
#     ONE_STAR = "ONE_STAR"
#     TWO_STAR = "TWO_STAR"
#     THREE_STAR = "THREE_STAR"
#     FOUR_STAR = "FOUR_STAR"
#     FIVE_STAR = "FIVE_STAR"

class TransportServiceEnum(str, Enum):
    UBER = "UBER"
    LYFT = "LYFT"

# Flight Preferences Models 
class FlightPreferencesBase(BaseModel):
    cabinClass: CabinClassEnum
    maxStops: MaxStopsEnum
    refundableTickets: bool

# Hotel Preferences Models
class HotelPreferencesBase(BaseModel):
    minimumRating: int

# Ground Transport Preferences Models
class GroundTransportPreferencesBase(BaseModel):
    preferredServices: TransportServiceEnum

# Guest Type with preferences
class GuestTypePreferences(BaseModel):
    id: str
    guestType: str
    flight: FlightPreferencesBase
    hotel: HotelPreferencesBase
    groundTransport: GroundTransportPreferencesBase
    dailyPerDiem: float

# Guest Type Preferences Models
class GuestTypesBase(BaseModel):
    guest_type_id: str
    name: str
    company_id: str
    user_id: str
    
class CreateGuestTypeResponse(BaseModel):
    id: str
    guestType: str
    flight: FlightPreferencesBase
    hotel: HotelPreferencesBase
    groundTransport: GroundTransportPreferencesBase
    dailyPerDiem: float

class CreateGuestType(BaseModel):
    name: str
    company_id: str
    user_id: str

class DeleteGuestType(BaseModel):
    guest_type_id: str