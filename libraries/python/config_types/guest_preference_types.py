from abc import ABC
from enum import Enum
from datetime import datetime
from typing import Optional

class GuestTypes(ABC):
    def __init__(self,
                guest_type_id: str,
                name: str,
                company_id: str,
                user_id: str,
                date_created: datetime,
                date_updated: datetime):
        self.guest_type_id = guest_type_id
        self.name = name
        self.company_id = company_id
        self.user_id = user_id
        self.date_created = date_created
        self.date_updated = date_updated
    
    def __str__(self) -> str:
        return f"""Guest Type Details:
                   ID: {self.guest_type_id}
                   Name: {self.name}
                   CompanyID: {self.company_id}
                   UserID: {self.user_id}
                   Created: {self.date_created}
                   Updated: {self.date_updated}"""

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
                flight_preferences_id: str,
                guest_type_id: str,
                cabin_class: CabinClass,
                max_stops: MaxStops,
                refundable_ticket: bool,
                date_created: datetime,
                date_updated: datetime):
        self.flight_preferences_id = flight_preferences_id
        self.guest_type_id = guest_type_id
        self.cabin_class = cabin_class
        self.max_stops = max_stops
        self.refundable_ticket = refundable_ticket
        self.date_created = date_created
        self.date_updated = date_updated
    
    def __str__(self) -> str:
        return f"""Flight Preferences:
                   ID: {self.flight_preferences_id}
                   GuestTypeID: {self.guest_type_id}
                   Cabin Class: {self.cabin_class}
                   Max Stops: {self.max_stops}
                   Refundable Ticket: {'Yes' if self.refundable_ticket else 'No'}
                   Created: {self.date_created}
                   Updated: {self.date_updated}"""

class HotelPreferences(ABC):
    def __init__(self,
                hotel_preferences_id: str,
                guest_type_id: str,
                minimum_rating: int,
                date_created: datetime,
                date_updated: datetime):
        self.hotel_preferences_id = hotel_preferences_id
        self.guest_type_id = guest_type_id
        self.minimum_rating = minimum_rating
        self.date_created = date_created
        self.date_updated = date_updated
        
    
    def __str__(self) -> str:
        return f"""Hotel Preferences:
                   ID: {self.hotel_preferences_id}
                   GuestTypeID: {self.guest_type_id}
                   Minimum Rating: {self.minimum_rating}
                   Created: {self.date_created}
                   Updated: {self.date_updated}"""

class TransportService(Enum):
    UBER = "UBER"
    LYFT = "LYFT"

class GroundTransportPreferences(ABC):
    def __init__(self,
                ground_preferences_id: str,
                guest_type_id: str,
                preferred_services: TransportService,
                date_created: datetime,
                date_updated: datetime):
        self.ground_preferences_id = ground_preferences_id
        self.guest_type_id = guest_type_id
        self.preferred_services = preferred_services
        self.date_created = date_created
        self.date_updated = date_updated
    
    def __str__(self) -> str:
        return f"""Ground Transport Preferences:
                   ID: {self.ground_preferences_id}
                   GuestTypeID: {self.guest_type_id}
                   Preferred Service: {self.preferred_services}
                   Created: {self.date_created}
                   Updated: {self.date_updated}"""
    
class PerDiemPreferences(ABC):
    def __init__(self,
                per_diem_id: str,
                guest_type_id: str,
                daily_amount: int,
                date_created: datetime,
                date_updated: datetime):
        self.per_diem_id = per_diem_id
        self.guest_type_id = guest_type_id
        self.daily_amount = daily_amount
        self.date_created = date_created
        self.date_updated = date_updated

    def __str__(self) -> str:
        return f""" Per Diem Preferences:
                   ID: {self.per_diem_id}
                   GuestTypeID: {self.guest_type_id}
                   DailyAmount: {self.daily_amount}
                   Created: {self.date_created}
                   Updated: {self.date_updated}"""