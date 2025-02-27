from abc import ABC
from enum import Enum
from typing import Optional

class GuestTypePreferences(ABC):
    def __init__(self,
                preferences_id: str,
                flight_preferences_id: str,
                hotel_preferences_id: str,
                ground_transport_preferences_id: str,
                guest_type: str,
                daily_per_diem: Optional[float]):
        self.preferences_id                 = preferences_id
        self.flight_preferences_id          = flight_preferences_id
        self.hotel_preferences_id           = hotel_preferences_id
        self.ground_transport_preferences_id = ground_transport_preferences_id
        self.guest_type                     = guest_type
        self.daily_per_diem                 = daily_per_diem
    
    def __str__(self) -> str:
        return f"""Guest Type Preferences for {self.guest_type}:
                   Flight Preferences: {self.flight_preferences_id}
                   Hotel Preferences: {self.hotel_preferences_id}
                   Ground Transport Preferences: {self.ground_transport_preferences_id}
                   Daily Per Diem: ${self.daily_per_diem:.2f if self.daily_per_diem else 'N/A'}"""

class CabinClass(Enum):
    ECONOMY = "ECONOMY"
    PREMIUM_ECONOMY = "PREMIUM_ECONOMY"
    BUSINESS = "BUSINESS"
    FIRST = "FIRST"

class MaxStops(Enum):
    DIRECT = "DIRECT"
    ONE_STOP = "ONE_STOP"
    TWO_STOPS = "TWO_STOPS"
    ANY = "ANY"

class FlightPreferences(ABC):
    def __init__(self,
                preferences_id: str,
                cabin_class_id: str,
                max_stops_id: str,
                refundable_ticket: bool):
        self.preferences_id    = preferences_id
        self.cabin_class_id    = cabin_class_id
        self.max_stops_id      = max_stops_id
        self.refundable_ticket = refundable_ticket
    
    def __str__(self) -> str:
        return f"""Flight Preferences:
                   Cabin Class: {self.cabin_class_id}
                   Max Stops: {self.max_stops_id}
                   Refundable Ticket: {'Yes' if self.refundable_ticket else 'No'}"""

class HotelRating(Enum):
    ONE_STAR = "ONE_STAR"
    TWO_STAR = "TWO_STAR"
    THREE_STAR = "THREE_STAR"
    FOUR_STAR = "FOUR_STAR"
    FIVE_STAR = "FIVE_STAR"

class HotelPreferences(ABC):
    def __init__(self,
                preferences_id: str,
                minimum_rating_id: str):
        self.preferences_id   = preferences_id
        self.minimum_rating_id = minimum_rating_id
    
    def __str__(self) -> str:
        return f"""Hotel Preferences:
                   Minimum Rating: {self.minimum_rating_id}"""

class TransportService(Enum):
    UBER = "UBER"
    LYFT = "LYFT"

class GroundTransportPreferences(ABC):
    def __init__(self,
                preferences_id: str,
                preferred_services_id: str):
        self.preferences_id       = preferences_id
        self.preferred_services_id = preferred_services_id
    
    def __str__(self) -> str:
        return f"""Ground Transport Preferences:
                   Preferred Service: {self.preferred_services_id}"""


