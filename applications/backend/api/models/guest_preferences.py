from pydantic import BaseModel, Field
from typing import Optional
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

class HotelRatingEnum(str, Enum):
    ONE_STAR = "ONE_STAR"
    TWO_STAR = "TWO_STAR"
    THREE_STAR = "THREE_STAR"
    FOUR_STAR = "FOUR_STAR"
    FIVE_STAR = "FIVE_STAR"

class TransportServiceEnum(str, Enum):
    UBER = "UBER"
    LYFT = "LYFT"

# Flight Preferences Models 
class FlightPreferencesBase(BaseModel):
    cabin_class_id: str
    max_stops_id: str
    refundable_ticket: bool = Field(default=False)

class FlightPreferencesCreate(FlightPreferencesBase):
    pass

class FlightPreferencesUpdate(BaseModel):
    cabin_class_id: Optional[str] = None
    max_stops_id: Optional[str] = None
    refundable_ticket: Optional[bool] = None

class FlightPreferencesResponse(FlightPreferencesBase):
    preferences_id: str

    class Config:
        orm_mode = True

# Hotel Preferences Models
class HotelPreferencesBase(BaseModel):
    minimum_rating_id: str

class HotelPreferencesCreate(HotelPreferencesBase):
    pass

class HotelPreferencesUpdate(BaseModel):
    minimum_rating_id: Optional[str] = None

class HotelPreferencesResponse(HotelPreferencesBase):
    preferences_id: str

    class Config:
        orm_mode = True

# Ground Transport Preferences Models
class GroundTransportPreferencesBase(BaseModel):
    preferred_services_id: str

class GroundTransportPreferencesCreate(GroundTransportPreferencesBase):
    pass

class GroundTransportPreferencesUpdate(BaseModel):
    preferred_services_id: Optional[str] = None

class GroundTransportPreferencesResponse(GroundTransportPreferencesBase):
    preferences_id: str

    class Config:
        orm_mode = True

# Guest Type Preferences Models
class GuestTypePreferencesBase(BaseModel):
    flight_preferences_id: str
    hotel_preferences_id: str
    ground_transport_preferences_id: str
    guest_type: str
    daily_per_diem: Optional[float] = None

class GuestTypePreferencesCreate(GuestTypePreferencesBase):
    pass

class GuestTypePreferencesUpdate(BaseModel):
    flight_preferences_id: Optional[str] = None
    hotel_preferences_id: Optional[str] = None
    ground_transport_preferences_id: Optional[str] = None
    daily_per_diem: Optional[float] = None

class GuestTypePreferencesResponse(GuestTypePreferencesBase):
    preferences_id: str

    class Config:
        orm_mode = True

# Combined Preferences Models for nested creation
class CombinedPreferencesCreate(BaseModel):
    flight_preferences: FlightPreferencesCreate
    hotel_preferences: HotelPreferencesCreate
    ground_transport_preferences: GroundTransportPreferencesCreate
    guest_type: str
    daily_per_diem: Optional[float] = None