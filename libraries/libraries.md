# python/config_db/__init__.py

```py
from abc import ABC
from .base import BaseConfigDB
from .interfaces import (
    AddressDB, CompanyDB, FlightDB, GroundTransportDB, UserDB, GuestDB,
    GuestPreferenceDB, HotelDB, PerDiemDB, TripDB, UserDB
)

class ConfigDB(BaseConfigDB, AddressDB, CompanyDB, FlightDB, GroundTransportDB, GuestDB,
    GuestPreferenceDB, HotelDB, PerDiemDB, TripDB, UserDB, ABC):
    """
    Combined interface for all database operations.
    This interface aggregates all domain-specific interfaces into a single interface.
    """
    pass
```

# python/config_db/base.py

```py
from abc import ABC, abstractmethod
from typing import Optional

class BaseConfigDB(ABC):
    
    def __init__(self):
        self._tenant_id = None
    
    @abstractmethod
    def connect(self):
        """Establish database connection"""
        pass
    
    @abstractmethod
    def disconnect(self):
        """Close database connection"""
        pass
    
    @abstractmethod
    def get_connection(self):
        """Get the current database connection"""
        pass

    def set_tenant(self, tenant_id: str):
        """
        Set the tenant ID (company_id) for multi-tenancy
        
        This ID will be used for tenant isolation in database queries
        """
        self._tenant_id = tenant_id
    
    def get_tenant(self) -> Optional[str]:
        """Get the current tenant ID"""
        return self._tenant_id
    
    def clear_tenant(self):
        """Clear the tenant ID"""
        self._tenant_id = None
```

# python/config_db/interfaces/__init__.py

```py
from .address_db import AddressDB
from .company_db import CompanyDB
from .flight_db import FlightDB
from .ground_transport_db import GroundTransportDB
from .guest_db import GuestDB
from .guest_preference_db import GuestPreferenceDB
from .hotel_db import HotelDB
from .perdiem_db import PerDiemDB
from .trip_db import TripDB
from .user_db import UserDB
```

# python/config_db/interfaces/address_db.py

```py
from abc import ABC, abstractmethod
from typing import Optional, List

from config_types.address_types import Address

class AddressDB(ABC):
    """Interface for address-related database operations."""

    @abstractmethod
    async def get_address(self, address_id: str) -> Optional[Address]:
        """Retrieve an address by ID"""
        pass
    
    @abstractmethod
    async def insert_address(
        self,
        street: str,
        city: str,
        state: str,
        country: str,
        postal_code: str
    ) -> Address:
        """Insert a new address"""
        pass
    
    @abstractmethod
    async def update_address(self, address: Address) -> Address:
        """Update an existing address"""
        pass
```

# python/config_db/interfaces/company_db.py

```py
from abc import ABC, abstractmethod
from typing import Optional, List

from config_types.company_types import Company

class CompanyDB(ABC):
    """Interface for company-related database operations."""
    
    @abstractmethod
    async def get_company(self, company_id: str) -> Optional[Company]:
        """Retrieve a company by ID"""
        pass
    
    @abstractmethod
    async def get_all_companies(self) -> List[Company]:
        """Retrieve all companies"""
        pass
    
    @abstractmethod
    async def insert_company(self, name: str, location: str, address_id: str) -> Company:
        """Insert a new company"""
        pass
    
    @abstractmethod
    async def update_company(self, company: Company) -> Company:
        """Update an existing company"""
        pass
    
    @abstractmethod
    async def delete_company(self, company_id: str) -> bool:
        """Delete a company by ID"""
        pass
```

# python/config_db/interfaces/flight_db.py

```py
from abc import ABC, abstractmethod
from typing import Optional, List
from datetime import datetime

from config_types.flight_types import FlightItinerary, FlightLeg

class FlightDB(ABC):
    """Interface for flight-related database operations."""
    
    @abstractmethod
    async def get_flight_itinerary(self, itinerary_id: str) -> Optional[FlightItinerary]:
        """Retrieve a flight itinerary by ID"""
        pass

    @abstractmethod
    async def get_flight_itineraries_by_trip(self, trip_id: str) -> List[FlightItinerary]:
        """Retrieve all flight itineraries for a trip"""
        pass

    @abstractmethod
    async def insert_flight_itinerary(
        self,
        trip_id: str,
        booking_status_id: str,
        is_direct: bool,
        booking_reference: Optional[str] = None,
        price: Optional[float] = None,
        itinerary_type: Optional[str] = None
    ) -> FlightItinerary:
        """Insert a new flight itinerary"""
        pass

    @abstractmethod
    async def update_flight_itinerary(self, itinerary: FlightItinerary) -> FlightItinerary:
        """Update an existing flight itinerary"""
        pass
    
    @abstractmethod
    async def get_flight_leg(self, leg_id: str) -> Optional[FlightLeg]:
        """Retrieve a flight leg by ID"""
        pass
    
    @abstractmethod
    async def get_flight_legs_by_itinerary(self, itinerary_id: str) -> List[FlightLeg]:
        """Retrieve all flight legs for a flight itinerary"""
        pass
    
    @abstractmethod
    async def insert_flight_leg(
        self,
        flight_itinerary_id: str,
        leg_sequence: str,
        flight_number: str,
        airline_code: str,
        flight_status_id: str,
        departure_time: datetime,
        departure_airport: str,
        arrival_time: datetime,
        arrival_airport: str,
        departure_terminal: Optional[str] = None,
        departure_gate: Optional[str] = None,
        arrival_terminal: Optional[str] = None,
        arrival_gate: Optional[str] = None
    ) -> FlightLeg:
        """Insert a new flight leg"""
        pass
    
    @abstractmethod
    async def update_flight_leg(self, leg: FlightLeg) -> FlightLeg:
        """Update an existing flight leg"""
        pass
```

# python/config_db/interfaces/ground_transport_db.py

```py
from abc import ABC, abstractmethod
from typing import Optional, List

from config_types.ground_transport_types import GroundTransport

class GroundTransportDB(ABC):
    """Interface for ground transport-related database operations."""
    
    @abstractmethod
    async def get_ground_transport(self, transport_id: str) -> Optional[GroundTransport]:
        """Retrieve a ground transport by ID"""
        pass
    
    @abstractmethod
    async def get_ground_transports_by_trip(self, trip_id: str) -> List[GroundTransport]:
        """Retrieve all ground transports for a trip"""
        pass
    
    @abstractmethod
    async def get_ground_transports_by_service_type(self, service_type_id: str) -> List[GroundTransport]:
        """Retrieve ground transports by service type"""
        pass
    
    @abstractmethod
    async def insert_ground_transport(
        self,
        trip_id: str,
        pickup_address_id: str,
        dropoff_address_id: str,
        type_id: str,
        status_id: str,
        voucher_id: Optional[str] = None,
        estimated_price: Optional[float] = None,
        actual_price: Optional[float] = None
    ) -> GroundTransport:
        """Insert a new ground transport"""
        pass
    
    @abstractmethod
    async def update_ground_transport(self, transport: GroundTransport) -> GroundTransport:
        """Update an existing ground transport"""
        pass
    
    @abstractmethod
    async def update_ground_transport_status(self, transport_id: str, status_id: str) -> GroundTransport:
        """Update a ground transport's status"""
        pass
    
    @abstractmethod
    async def update_ground_transport_actual_price(
        self, transport_id: str, actual_price: float
    ) -> GroundTransport:
        """Update the actual price of a ground transport"""
        pass
    
    @abstractmethod
    async def delete_ground_transport(self, transport_id: str) -> bool:
        """Delete a ground transport by ID"""
        pass
```

# python/config_db/interfaces/guest_db.py

```py
from abc import ABC, abstractmethod
from typing import Optional, List
from datetime import date

from config_types.guest_types import GuestProfile, EmergencyContact, LoyaltyProgram

class GuestDB(ABC):
    """Interface for guest-related database operations."""

    @abstractmethod
    async def get_guest_profile(self, profile_id: str) -> Optional[GuestProfile]:
        """Retrieve a guest profile by ID"""
        pass
    
    @abstractmethod
    async def get_guest_profiles_by_admin(self, admin_id: str) -> List[GuestProfile]:
        """Retrieve all guest profiles for an admin"""
        pass
    
    @abstractmethod
    async def insert_guest_profile(
        self,
        first_name: str,
        last_name: str,
        email: str,
        admin_id: str,
        phone: Optional[str] = None,
        date_of_birth: Optional[date] = None,
        gender: Optional[str] = None,
        nationality: Optional[str] = None,
        passport_number: Optional[str] = None,
        passport_expiry_date: Optional[date] = None,
        dietary_restrictions: Optional[List[str]] = None,
        accessibility_needs: Optional[List[str]] = None,
        address_id: Optional[str] = None
    ) -> GuestProfile:
        """Insert a new guest profile"""
        pass
    
    @abstractmethod
    async def update_guest_profile(self, profile: GuestProfile) -> GuestProfile:
        """Update an existing guest profile"""
        pass

    # Emergency Contact methods
    @abstractmethod
    async def get_emergency_contact(self, contact_id: str) -> Optional[EmergencyContact]:
        """Retrieve an emergency contact by ID"""
        pass
    
    @abstractmethod
    async def get_emergency_contacts_by_profile(self, profile_id: str) -> List[EmergencyContact]:
        """Retrieve all emergency contacts for a guest profile"""
        pass
    
    @abstractmethod
    async def insert_emergency_contact(
        self,
        guest_profile_id: str,
        name: str,
        relation: str,
        phone: str
    ) -> EmergencyContact:
        """Insert a new emergency contact"""
        pass
    
    @abstractmethod
    async def update_emergency_contact(self, contact: EmergencyContact) -> EmergencyContact:
        """Update an existing emergency contact"""
        pass

    # Loyalty Program methods
    @abstractmethod
    async def get_loyalty_program(self, program_id: str) -> Optional[LoyaltyProgram]:
        """Retrieve a loyalty program by ID"""
        pass
    
    @abstractmethod
    async def get_loyalty_programs_by_profile(self, profile_id: str) -> List[LoyaltyProgram]:
        """Retrieve all loyalty programs for a guest profile"""
        pass
    
    @abstractmethod
    async def insert_loyalty_program(
        self,
        guest_profile_id: str,
        provider: str,
        program_name: str,
        member_number: str,
        status: Optional[str] = None
    ) -> LoyaltyProgram:
        """Insert a new loyalty program"""
        pass
    
    @abstractmethod
    async def update_loyalty_program(self, program: LoyaltyProgram) -> LoyaltyProgram:
        """Update an existing loyalty program"""
        pass
```

# python/config_db/interfaces/guest_preference_db.py

```py
from abc import ABC, abstractmethod
from typing import Optional

from config_types.guest_preference_types import GuestTypePreferences, FlightPreferences, HotelPreferences, GroundTransportPreferences

class GuestPreferenceDB(ABC):
    """Interface for guest preference-related database operations."""

    # Flight Preferences
    @abstractmethod
    async def get_flight_preferences(self, preferences_id: str) -> Optional[FlightPreferences]:
        """Retrieve flight preferences by ID"""
        pass
    
    @abstractmethod
    async def insert_flight_preferences(
        self,
        cabin_class_id: str,
        max_stops_id: str,
        refundable_ticket: bool
    ) -> FlightPreferences:
        """Insert new flight preferences"""
        pass
    
    @abstractmethod
    async def update_flight_preferences(self, preferences: FlightPreferences) -> FlightPreferences:
        """Update existing flight preferences"""
        pass
    
    @abstractmethod
    async def delete_flight_preferences(self, preferences_id: str) -> bool:
        """Delete flight preferences by ID"""
        pass
    
    # Hotel Preferences
    @abstractmethod
    async def get_hotel_preferences(self, preferences_id: str) -> Optional[HotelPreferences]:
        """Retrieve hotel preferences by ID"""
        pass
    
    @abstractmethod
    async def insert_hotel_preferences(
        self,
        minimum_rating_id: str
    ) -> HotelPreferences:
        """Insert new hotel preferences"""
        pass
    
    @abstractmethod
    async def update_hotel_preferences(self, preferences: HotelPreferences) -> HotelPreferences:
        """Update existing hotel preferences"""
        pass
    
    @abstractmethod
    async def delete_hotel_preferences(self, preferences_id: str) -> bool:
        """Delete hotel preferences by ID"""
        pass
    
    # Ground Transport Preferences
    @abstractmethod
    async def get_ground_transport_preferences(self, preferences_id: str) -> Optional[GroundTransportPreferences]:
        """Retrieve ground transport preferences by ID"""
        pass
    
    @abstractmethod
    async def insert_ground_transport_preferences(
        self,
        preferred_services_id: str
    ) -> GroundTransportPreferences:
        """Insert new ground transport preferences"""
        pass
    
    @abstractmethod
    async def update_ground_transport_preferences(self, preferences: GroundTransportPreferences) -> GroundTransportPreferences:
        """Update existing ground transport preferences"""
        pass
    
    @abstractmethod
    async def delete_ground_transport_preferences(self, preferences_id: str) -> bool:
        """Delete ground transport preferences by ID"""
        pass
    
    # Guest Type Preferences
    @abstractmethod
    async def get_guest_type_preferences(self, preferences_id: str) -> Optional[GuestTypePreferences]:
        """Retrieve guest type preferences by ID"""
        pass
    
    @abstractmethod
    async def get_guest_type_preferences_by_type(self, guest_type: str) -> Optional[GuestTypePreferences]:
        """Retrieve guest type preferences by guest type"""
        pass
    
    @abstractmethod
    async def insert_guest_type_preferences(
        self,
        flight_preferences_id: str,
        hotel_preferences_id: str,
        ground_transport_preferences_id: str,
        guest_type: str,
        daily_per_diem: Optional[float] = None
    ) -> GuestTypePreferences:
        """Insert new guest type preferences"""
        pass
    
    @abstractmethod
    async def update_guest_type_preferences(self, preferences: GuestTypePreferences) -> GuestTypePreferences:
        """Update existing guest type preferences"""
        pass
    
    @abstractmethod
    async def delete_guest_type_preferences(self, preferences_id: str) -> bool:
        """Delete guest type preferences by ID"""
        pass
```

# python/config_db/interfaces/hotel_db.py

```py
from abc import ABC, abstractmethod
from typing import Optional, List
from datetime import datetime

from config_types.hotel_types import Hotel

class HotelDB(ABC):
    """Interface for accommodation-related database operations."""
    
    @abstractmethod
    async def get_hotel(self, hotel_id: str) -> Optional[Hotel]:
        """Retrieve a hotel by ID"""
        pass
    
    @abstractmethod
    async def get_hotels_by_trip(self, trip_id: str) -> List[Hotel]:
        """Retrieve all hotels associated with a trip"""
        pass
    
    @abstractmethod
    async def get_hotels_by_location(self, location: str) -> List[Hotel]:
        """Retrieve hotels by location"""
        pass
    
    @abstractmethod
    async def insert_hotel(
        self,
        address_id: str,
        rating_id: str,
        name: str,
        room_type: str,
        price: float,
        booking_status_id: str,
        check_in: datetime,
        check_out: datetime,
        booking_reference: Optional[str] = None
    ) -> Hotel:
        """Insert a new hotel"""
        pass
    
    @abstractmethod
    async def update_hotel(self, hotel: Hotel) -> Hotel:
        """Update an existing hotel"""
        pass
    
    @abstractmethod
    async def update_hotel_status(self, hotel_id: str, status_id: str) -> Hotel:
        """Update a hotel's booking status"""
        pass
    
    @abstractmethod
    async def delete_hotel(self, hotel_id: str) -> bool:
        """Delete a hotel by ID"""
        pass
```

# python/config_db/interfaces/perdiem_db.py

```py
from abc import ABC, abstractmethod
from typing import Optional, List
from datetime import date

from config_types.perdiem_types import PerDiem, Expense

class PerDiemDB(ABC):
    """Interface for per diem and expense-related database operations."""
    
    # Per Diem methods
    @abstractmethod
    async def get_per_diem(self, per_diem_id: str) -> Optional[PerDiem]:
        """Retrieve a per diem by ID"""
        pass
    
    @abstractmethod
    async def get_per_diem_by_trip(self, trip_id: str) -> Optional[PerDiem]:
        """Retrieve a per diem associated with a trip"""
        pass
    
    @abstractmethod
    async def insert_per_diem(
        self,
        daily_rate: float,
        start_date: date,
        end_date: date,
        total_amount: float,
        per_diem_status_id: str
    ) -> PerDiem:
        """Insert a new per diem"""
        pass
    
    @abstractmethod
    async def update_per_diem(self, per_diem: PerDiem) -> PerDiem:
        """Update an existing per diem"""
        pass
    
    @abstractmethod
    async def update_per_diem_status(self, per_diem_id: str, status_id: str) -> PerDiem:
        """Update a per diem's status"""
        pass
    
    @abstractmethod
    async def delete_per_diem(self, per_diem_id: str) -> bool:
        """Delete a per diem by ID"""
        pass
    
    # Expense methods
    @abstractmethod
    async def get_expense(self, expense_id: str) -> Optional[Expense]:
        """Retrieve an expense by ID"""
        pass
    
    @abstractmethod
    async def get_expenses_by_per_diem(self, per_diem_id: str) -> List[Expense]:
        """Retrieve all expenses for a per diem"""
        pass
    
    @abstractmethod
    async def get_expenses_by_status(self, status_id: str) -> List[Expense]:
        """Retrieve expenses by status"""
        pass
    
    @abstractmethod
    async def get_expenses_by_category(self, category: str) -> List[Expense]:
        """Retrieve expenses by category"""
        pass
    
    @abstractmethod
    async def insert_expense(
        self,
        per_diem_id: str,
        category: str,
        amount: float,
        expense_date: date,
        status_id: str,
        receipt: Optional[str] = None,
        notes: Optional[str] = None
    ) -> Expense:
        """Insert a new expense"""
        pass
    
    @abstractmethod
    async def update_expense(self, expense: Expense) -> Expense:
        """Update an existing expense"""
        pass
    
    @abstractmethod
    async def update_expense_status(self, expense_id: str, status_id: str) -> Expense:
        """Update an expense's status"""
        pass
    
    @abstractmethod
    async def delete_expense(self, expense_id: str) -> bool:
        """Delete an expense by ID"""
        pass
```

# python/config_db/interfaces/trip_db.py

```py
from abc import ABC, abstractmethod
from typing import Optional, List
from datetime import date

from config_types.trip_types import Trip, Meeting

class TripDB(ABC):
    """Interface for trip-related database operations."""
    
    # Trip methods
    @abstractmethod
    async def get_trip(self, trip_id: str) -> Optional[Trip]:
        """Retrieve a trip by ID"""
        pass
    
    @abstractmethod
    async def get_trips_by_admin(self, admin_id: str) -> List[Trip]:
        """Retrieve all trips for an admin"""
        pass
    
    @abstractmethod
    async def get_trips_by_guest_profile(self, profile_id: str) -> List[Trip]:
        """Retrieve all trips for a guest profile"""
        pass
    
    @abstractmethod
    async def insert_trip(
        self,
        guest_profile_id: str,
        guest_type: str,
        status: str,
        guest_type_preferences_id: str,
        meeting_id: str,
        admin_id: str,
        created_by: str,
        hotel_id: Optional[str] = None,
        per_diem_id: Optional[str] = None,
        total_budget: Optional[float] = None,
        actual_spend: Optional[float] = None
    ) -> Trip:
        """Insert a new trip"""
        pass
    
    @abstractmethod
    async def update_trip(self, trip: Trip) -> Trip:
        """Update an existing trip"""
        pass
    
    @abstractmethod
    async def delete_trip(self, trip_id: str) -> bool:
        """Delete a trip by ID"""
        pass
    
    # Meeting methods
    @abstractmethod
    async def get_meeting(self, meeting_id: str) -> Optional[Meeting]:
        """Retrieve a meeting by ID"""
        pass
    
    @abstractmethod
    async def get_meetings_by_date_range(
        self, 
        start_date: date, 
        end_date: date
    ) -> List[Meeting]:
        """Retrieve all meetings within a date range"""
        pass
    
    @abstractmethod
    async def insert_meeting(
        self,
        address_id: str,
        location: str,
        start_date: date,
        end_date: date
    ) -> Meeting:
        """Insert a new meeting"""
        pass
    
    @abstractmethod
    async def update_meeting(self, meeting: Meeting) -> Meeting:
        """Update an existing meeting"""
        pass
    
    @abstractmethod
    async def delete_meeting(self, meeting_id: str) -> bool:
        """Delete a meeting by ID"""
        pass
```

# python/config_db/interfaces/user_db.py

```py
from abc import ABC, abstractmethod
from typing import Optional, List

from config_types.user_types import Admin

class UserDB(ABC):
    """Interface for user-related database operations."""
    
    @abstractmethod
    async def get_admin(self, user_id: str) -> Optional[Admin]:
        """Retrieve an admin by ID"""
        pass
    
    @abstractmethod
    async def get_admin_by_email(self, email: str) -> Optional[Admin]:
        """Retrieve an admin by email"""
        pass
    
    @abstractmethod
    async def get_admins_by_company(self, company_id: str) -> List[Admin]:
        """Retrieve all admins for a company"""
        pass
    
    @abstractmethod
    async def insert_admin(self, user_id: str, email: str, first_name: str, last_name: str, company_id: str, role: str) -> Admin:
        """Insert a new admin"""
        pass
    
    @abstractmethod
    async def update_admin(self, admin: Admin) -> Admin:
        """Update an existing admin"""
        pass
    
    @abstractmethod
    async def delete_admin(self, user_id: str) -> bool:
        """Delete an admin by ID"""
        pass
```

# python/config_types/__init__.py

```py
from .base import (
    Role, BookingStatus, FlightStatus, HotelStatus, TransportStatus, ExpenseStatus
)
from .address_types import Address
from .company_types import Company
from .flight_types import FlightItinerary, FlightLeg
from .ground_transport_types import GroundTransport
from .guest_preference_types import (
    GuestTypePreferences, CabinClass, MaxStops, FlightPreferences, HotelRating, 
    HotelPreferences, TransportService, GroundTransportPreferences
)
from .guest_types import GuestProfile, EmergencyContact, LoyaltyProgram
from .hotel_types import Hotel
from .perdiem_types import PerDiem, Expense
from .trip_types import Trip, Meeting
from .user_types import User, Admin
```

# python/config_types/address_types.py

```py
from abc import ABC

class Address(ABC):
    def __init__(self,
                address_id: str,
                street: str,
                city: str,
                state: str,
                country: str,
                postal_code: str):
        self.address_id  = address_id
        self.street      = street
        self.city        = city
        self.state       = state
        self.country     = country
        self.postal_code = postal_code
    
    def __str__(self) -> str:
        return f"""{self.street}, {self.city}, {self.state}, {self.country}, {self.postal_code}"""
    
    def get_formatted_address(self) -> str:
        """Returns a nicely formatted address string"""
        return f"{self.street}\n{self.city}, {self.state} {self.postal_code}\n{self.country}"
```

# python/config_types/base.py

```py
from abc import ABC
from enum import Enum

# Common enumerations used across multiple domain types
class Role(Enum):
    ADMIN = "ADMIN"
    USER = "USER"
    GUEST = "GUEST"

class BookingStatus(Enum):
    PENDING = "PENDING"
    CONFIRMED = "CONFIRMED"
    CANCELLED = "CANCELLED"
    COMPLETED = "COMPLETED"

class FlightStatus(Enum):
    SCHEDULED = "SCHEDULED"
    DELAYED = "DELAYED"
    DEPARTED = "DEPARTED"
    ARRIVED = "ARRIVED"
    CANCELLED = "CANCELLED"

class HotelStatus(Enum):
    REQUESTED = "REQUESTED"
    CONFIRMED = "CONFIRMED"
    CHECKED_IN = "CHECKED_IN"
    CHECKED_OUT = "CHECKED_OUT"
    CANCELLED = "CANCELLED"

class TransportStatus(Enum):
    REQUESTED = "REQUESTED"
    CONFIRMED = "CONFIRMED"
    COMPLETED = "COMPLETED"
    CANCELLED = "CANCELLED"

class ExpenseStatus(Enum):
    SUBMITTED = "SUBMITTED"
    APPROVED = "APPROVED"
    REJECTED = "REJECTED"
    PAID = "PAID"
```

# python/config_types/company_types.py

```py
from abc import ABC
from datetime import datetime

class Company(ABC):
    def __init__(self,
                company_id: str,
                name: str,
                location: str,
                address_id: str):
        self.company_id = company_id
        self.name = name
        self.location = location
        self.address_id = address_id
    
    def __str__(self) -> str:
        return f"""Company:
                   ID: {self.company_id}
                   Name: {self.name}
                   Location: {self.location}"""
```

# python/config_types/flight_types.py

```py
from abc import ABC
from datetime import datetime
from typing import Optional


class FlightItinerary(ABC):
    def __init__(self,
                itinerary_id: str,
                trip_id: str,
                booking_reference: Optional[str],
                price: Optional[float],
                booking_status_id: str,
                itinerary_type: Optional[str],
                is_direct: bool):
        self.itinerary_id      = itinerary_id
        self.trip_id           = trip_id
        self.booking_reference = booking_reference
        self.price             = price
        self.booking_status_id = booking_status_id
        self.itinerary_type    = itinerary_type
        self.is_direct         = is_direct
    
    def __str__(self) -> str:
        return f"""Flight Itinerary:
                   Booking Reference: {self.booking_reference or 'N/A'}
                   Price: ${self.price:.2f if self.price else 'N/A'}
                   Status: {self.booking_status_id}
                   Type: {self.itinerary_type or 'N/A'}
                   Direct Flight: {'Yes' if self.is_direct else 'No'}"""
    
class FlightLeg(ABC):
    def __init__(self,
                leg_id: str,
                flight_itinerary_id: str,
                leg_sequence: str,
                flight_number: str,
                airline_code: str,
                flight_status_id: str,
                departure_time: datetime,
                departure_airport: str,
                departure_terminal: Optional[str],
                departure_gate: Optional[str],
                arrival_time: datetime,
                arrival_airport: str,
                arrival_terminal: Optional[str],
                arrival_gate: Optional[str]):
        self.leg_id               = leg_id
        self.flight_itinerary_id  = flight_itinerary_id
        self.leg_sequence         = leg_sequence
        self.flight_number        = flight_number
        self.airline_code         = airline_code
        self.flight_status_id     = flight_status_id
        self.departure_time       = departure_time
        self.departure_airport    = departure_airport
        self.departure_terminal   = departure_terminal
        self.departure_gate       = departure_gate
        self.arrival_time         = arrival_time
        self.arrival_airport      = arrival_airport
        self.arrival_terminal     = arrival_terminal
        self.arrival_gate         = arrival_gate
    
    def __str__(self) -> str:
        return f"""Flight Leg:
                   Flight: {self.airline_code} {self.flight_number}
                   From: {self.departure_airport} ({self.departure_terminal or 'N/A'}, Gate {self.departure_gate or 'N/A'})
                   To: {self.arrival_airport} ({self.arrival_terminal or 'N/A'}, Gate {self.arrival_gate or 'N/A'})
                   Departure: {self.departure_time}
                   Arrival: {self.arrival_time}
                   Status: {self.flight_status_id}"""
```

# python/config_types/ground_transport_types.py

```py
from abc import ABC
from typing import Optional

class GroundTransport(ABC):
    def __init__(self,
                transport_id: str,
                trip_id: str,
                pickup_address_id: str,
                dropoff_address_id: str,
                type_id: str,
                voucher_id: Optional[str],
                estimated_price: Optional[float],
                actual_price: Optional[float],
                status_id: str):
        self.transport_id       = transport_id
        self.trip_id            = trip_id
        self.pickup_address_id  = pickup_address_id
        self.dropoff_address_id = dropoff_address_id
        self.type_id            = type_id
        self.voucher_id         = voucher_id
        self.estimated_price    = estimated_price
        self.actual_price       = actual_price
        self.status_id          = status_id
    
    def __str__(self) -> str:
        return f"""Ground Transport:
                   Type: {self.type_id}
                   Voucher: {self.voucher_id or 'N/A'}
                   Estimated Price: ${self.estimated_price:.2f if self.estimated_price else 'N/A'}
                   Actual Price: ${self.actual_price:.2f if self.actual_price else 'N/A'}
                   Status: {self.status_id}"""
```

# python/config_types/guest_preference_types.py

```py
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



```

# python/config_types/guest_types.py

```py
from abc import ABC
from datetime import date
from typing import List, Optional


class GuestProfile(ABC):
    def __init__(self,
                profile_id: str,
                first_name: str,
                last_name: str,
                email: str,
                phone: Optional[str],
                date_of_birth: Optional[date],
                gender: Optional[str],
                nationality: Optional[str],
                passport_number: Optional[str],
                passport_expiry_date: Optional[date],
                dietary_restrictions: Optional[List[str]],
                accessibility_needs: Optional[List[str]],
                admin_id: str,
                address_id: Optional[str]):
        self.profile_id           = profile_id
        self.first_name           = first_name
        self.last_name            = last_name
        self.email                = email
        self.phone                = phone
        self.date_of_birth        = date_of_birth
        self.gender               = gender
        self.nationality          = nationality
        self.passport_number      = passport_number
        self.passport_expiry_date = passport_expiry_date
        self.dietary_restrictions = dietary_restrictions or []
        self.accessibility_needs  = accessibility_needs or []
        self.admin_id             = admin_id
        self.address_id           = address_id
    
    def __str__(self) -> str:
        return f"""Guest Profile:
                   ID: {self.profile_id}
                   Name: {self.first_name} {self.last_name}
                   Email: {self.email}
                   Phone: {self.phone or 'N/A'}
                   Admin: {self.admin_id}"""

class EmergencyContact(ABC):
    def __init__(self,
                contact_id: str,
                guest_profile_id: str,
                name: str,
                relation: str,
                phone: str):
        self.contact_id       = contact_id
        self.guest_profile_id = guest_profile_id
        self.name             = name
        self.relation     = relation
        self.phone            = phone
    
    def __str__(self) -> str:
        return f"""Emergency Contact:
                   Name: {self.name}
                   Relationship: {self.relationship}
                   Phone: {self.phone}"""

class LoyaltyProgram(ABC):
    def __init__(self,
                program_id: str,
                guest_profile_id: str,
                provider: str,
                program_name: str,
                member_number: str,
                status: Optional[str]):
        self.program_id       = program_id
        self.guest_profile_id = guest_profile_id
        self.provider         = provider
        self.program_name     = program_name
        self.member_number    = member_number
        self.status           = status
    
    def __str__(self) -> str:
        return f"""Loyalty Program:
                   Provider: {self.provider}
                   Program: {self.program_name}
                   Member Number: {self.member_number}
                   Status: {self.status or 'N/A'}"""
```

# python/config_types/hotel_types.py

```py
from abc import ABC
from datetime import datetime
from typing import Optional

class Hotel(ABC):
    def __init__(self,
                hotel_id: str,
                address_id: str,
                rating_id: str,
                booking_reference: Optional[str],
                name: str,
                room_type: str,
                price: float,
                booking_status_id: str,
                check_in: datetime,
                check_out: datetime):
        self.hotel_id          = hotel_id
        self.address_id        = address_id
        self.rating_id         = rating_id
        self.booking_reference = booking_reference
        self.name              = name
        self.room_type         = room_type
        self.price             = price
        self.booking_status_id = booking_status_id
        self.check_in          = check_in
        self.check_out         = check_out
    
    def __str__(self) -> str:
        return f"""Hotel:
                   Name: {self.name}
                   Room Type: {self.room_type}
                   Rating: {self.rating_id}
                   Booking Reference: {self.booking_reference or 'N/A'}
                   Price: ${self.price:.2f}
                   Status: {self.booking_status_id}
                   Check-in: {self.check_in}
                   Check-out: {self.check_out}"""
```

# python/config_types/perdiem_types.py

```py
from abc import ABC
from datetime import date
from typing import Optional

class PerDiem(ABC):
    def __init__(self,
                per_diem_id: str,
                daily_rate: float,
                start_date: date,
                end_date: date,
                total_amount: float,
                per_diem_status_id: str):
        self.per_diem_id       = per_diem_id
        self.daily_rate        = daily_rate
        self.start_date        = start_date
        self.end_date          = end_date
        self.total_amount      = total_amount
        self.per_diem_status_id = per_diem_status_id
    
    def __str__(self) -> str:
        return f"""Per Diem:
                   Daily Rate: ${self.daily_rate:.2f}
                   Dates: {self.start_date} to {self.end_date}
                   Total Amount: ${self.total_amount:.2f}
                   Status: {self.per_diem_status_id}"""

class Expense(ABC):
    def __init__(self,
                expense_id: str,
                per_diem_id: str,
                category: str,
                amount: float,
                date: date,
                receipt: Optional[str],
                status_id: str,
                notes: Optional[str]):
        self.expense_id  = expense_id
        self.per_diem_id = per_diem_id
        self.category    = category
        self.amount      = amount
        self.date        = date
        self.receipt     = receipt
        self.status_id   = status_id
        self.notes       = notes
    
    def __str__(self) -> str:
        return f"""Expense:
                   Category: {self.category}
                   Amount: ${self.amount:.2f}
                   Date: {self.date}
                   Receipt: {'Available' if self.receipt else 'N/A'}
                   Status: {self.status_id}
                   Notes: {self.notes or 'N/A'}"""
```

# python/config_types/trip_types.py

```py
from abc import ABC
from datetime import date, datetime
from typing import Optional

class Trip(ABC):
    def __init__(self,
                trip_id: str,
                admin_id: str,
                guest_profile_id: str,
                guest_type: str,
                status_id: str,
                guest_type_preferences_id: str,
                meeting_id: str,
                hotel_id: Optional[str],
                per_diem_id: Optional[str],
                created: date,
                modified: date,
                created_by: str,
                total_budget: Optional[float],
                actual_spend: Optional[float]):
        self.trip_id                  = trip_id
        self.admin_id                 = admin_id
        self.guest_profile_id         = guest_profile_id
        self.guest_type               = guest_type
        self.status_id                   = status_id
        self.guest_type_preferences_id = guest_type_preferences_id
        self.meeting_id               = meeting_id
        self.hotel_id                 = hotel_id
        self.per_diem_id              = per_diem_id
        self.created                  = created
        self.modified                 = modified
        self.created_by               = created_by
        self.total_budget             = total_budget
        self.actual_spend             = actual_spend
    
    def __str__(self) -> str:
        return f"""Trip:
                   ID: {self.trip_id}
                   Guest Profile: {self.guest_profile_id}
                   Guest Type: {self.guest_type}
                   Status: {self.status}
                   Meeting: {self.meeting_id}
                   Hotel: {self.hotel_id or 'Not booked'}
                   Per Diem: {self.per_diem_id or 'Not set'}
                   Budget: ${self.total_budget:.2f if self.total_budget else 'N/A'}
                   Actual Spend: ${self.actual_spend:.2f if self.actual_spend else 'N/A'}
                   Created: {self.created} by {self.created_by}
                   Last Modified: {self.modified}
                   Admin: {self.admin_id}"""
    
class Meeting(ABC):
    def __init__(self,
                meeting_id: str,
                address_id: str,
                location: str,
                start_date: datetime,
                end_date: datetime):
        self.meeting_id = meeting_id
        self.address_id = address_id
        self.location   = location
        self.start_date = start_date
        self.end_date   = end_date
    
    def __str__(self) -> str:
        return f"""Meeting:
                   Location: {self.location}
                   Dates: {self.start_date} to {self.end_date}"""
```

# python/config_types/user_types.py

```py
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
                role: Role,
                date_created: datetime,
                date_updated: datetime):
        super().__init__(
            user_id=user_id,
            email=email,
            first_name=first_name,
            last_name=last_name,
            role=role,
            date_created=date_created,
            date_updated=date_updated
        )
        self.company_id = company_id
```

# python/database/__init__.py

```py

```

# python/database/connections.py

```py
import json

from database.constants import (
    PROD_PSQL_KEY_FILE,
    DEV_PSQL_KEY_FILE
)
from .postgresql.implementations.base import PostgresConfigDBConfig
from .postgresql.implementations.psql_config_db import PSQLConfigDB

def get_db_from_connnection_params(connection_params):
    if connection_params:
        db_config = PostgresConfigDBConfig(
            db_name=connection_params["db_name"],
            db_user=connection_params["db_user"],
            db_password=connection_params["db_password"],
            db_host=connection_params["db_host"],
            db_port=connection_params["db_port"]
        )
    else:
        raise ValueError("Either config_file_path or config must be provided")
    
    return PSQLConfigDB.connect(db_config)

def get_psql_reader_from_key_file(key_file):
    with open(key_file) as f:
        db_config = json.load(f)
        return get_db_from_connnection_params(db_config)

def get_prod_psql_reader_connection():
    with open(PROD_PSQL_KEY_FILE) as f:
        db_config = json.load(f)
        return get_db_from_connnection_params(db_config)

def get_dev_psql_reader_connection():
    with open(DEV_PSQL_KEY_FILE) as f:
        db_config = json.load(f)
        return get_db_from_connnection_params(db_config)
```

# python/database/constants.py

```py
PROD_PSQL_KEY_FILE  = "/deploy/keys/ProdPSQL.json"
DEV_PSQL_KEY_FILE   = "/Users/deploy/keys/DevPSQL.json"
```

# python/database/postgresql/__init__.py

```py

```

# python/database/postgresql/base.py

```py
from sqlalchemy.orm import declarative_base

Base = declarative_base()
```

# python/database/postgresql/implementations/__init__.py

```py

```

# python/database/postgresql/implementations/address_db.py

```py

```

# python/database/postgresql/implementations/base.py

```py
from dataclasses import dataclass
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from pydantic_core import MultiHostUrl

from config_db.base import BaseConfigDB

@dataclass
class PostgresConfigDBConfig:
    db_name: str
    db_user: str
    db_password: str
    db_host: str
    db_port: int

class BasePostgreSQLConfigDB(BaseConfigDB):
    def __init__(self, config: PostgresConfigDBConfig):
        self.db_name = config.db_name
        self.db_user = config.db_user
        self.db_password = config.db_password
        self.db_host = config.db_host
        self.db_port = config.db_port
        
        self.uri = MultiHostUrl.build(
            scheme="postgresql+psycopg2",
            username=config.db_user,
            password=config.db_password,
            path=config.db_name,
            host=config.db_host,
            port=config.db_port
        )
        
        self.engine = None
        self.Session = None
        self.init_connection()
    
    def init_connection(self):
        """Establish database connection"""
        self.engine = create_engine(str(self.uri))
        self.Session = sessionmaker(bind=self.engine)
    
    def disconnect(self):
        """Close database connection"""
        if self.engine:
            self.engine.dispose()
    
    def get_connection(self):
        """Get the current database connection"""
        return self.engine
```

# python/database/postgresql/implementations/company_db.py

```py

```

# python/database/postgresql/implementations/flight_db.py

```py

```

# python/database/postgresql/implementations/ground_transport_db.py

```py

```

# python/database/postgresql/implementations/guest_db.py

```py

```

# python/database/postgresql/implementations/guest_preference_db.py

```py

```

# python/database/postgresql/implementations/hotel_db.py

```py

```

# python/database/postgresql/implementations/perdiem_db.py

```py

```

# python/database/postgresql/implementations/psql_config_db.py

```py
from config_db import ConfigDB
from .base import BasePostgreSQLConfigDB, PostgresConfigDBConfig
from .address_db import PostgreSQLAddressDB
from .company_db import PostgreSQLCompanyDB
from .flight_db import PostgreSQLFlightDB
from .ground_transport_db import PostgreSQLTransportDB
from .guest_db import PostgreSQLGuestDB
from .guest_preference_db import PostgreSQLGuestPreferenceDB
from .hotel_db import PostgreSQLHotelDB
from .perdiem_db import PostgreSQLPerDiemDB
from .trip_db import PostgreSQLTripDB
from .user_db import PostgreSQLUserDB


class PSQLConfigDB(BasePostgreSQLConfigDB,
                  PostgreSQLAddressDB,
                  PostgreSQLCompanyDB,
                  PostgreSQLFlightDB,
                  PostgreSQLTransportDB,
                  PostgreSQLGuestDB,
                  PostgreSQLGuestPreferenceDB,
                  PostgreSQLHotelDB,
                  PostgreSQLPerDiemDB,
                  PostgreSQLTripDB,
                  PostgreSQLUserDB,
                  ConfigDB):
    """
    PostgreSQL implementation of the ConfigDB interface.
    This class combines all PostgreSQL implementations of the domain-specific interfaces.
    """
    
    @classmethod
    def connect(cls, config: PostgresConfigDBConfig):
        """Factory method to create a new PSQLConfigDB instance"""
        return cls(config)
```

# python/database/postgresql/implementations/trip_db.py

```py

```

# python/database/postgresql/implementations/user_db.py

```py

```

# python/database/postgresql/models/__init__.py

```py
from .address import Address
from .company import Company
from .flight import FlightItinerary, FlightItineraryStatus, FlightLeg, FlightLegStatus
from .ground_transport import GroundTransport, GroundTransportStatus
from .guest_preference import (
    GuestTypePreferences, FlightPreferences, FlightPreferencesCabinClass,
    FlightPreferencesMaxStops, HotelPreferences, HotelRating, GroundTransportPreferences, 
    GroundTransportServices
)
from .guest import GuestProfile, EmergencyContact, LoyaltyProgram
from .hotel import Hotel, HotelStatus
from .perdiem import PerDiem, PerDiemStatus, Expense, ExpenseStatus
from .trip import Trip, TripStatus, Meeting
from .user import Admin


```

# python/database/postgresql/models/address.py

```py
from sqlalchemy import Column, String
from sqlalchemy.orm import relationship

from ..base import Base

class Address(Base):
    __tablename__ = 'addresses'

    id = Column(String, primary_key=True)
    street = Column(String, nullable=False)
    city = Column(String, nullable=False)
    state = Column(String, nullable=False)
    country = Column(String, nullable=False)
    postal_code = Column(String, nullable=False)

    #Relationships
    companies = relationship("Company", back_populates="address")
    guest_profiles = relationship("GuestProfile", back_populates="address")
    hotels = relationship("Hotel", back_populates="address")
    meetings = relationship("Meeting", back_populates="address")
    ground_transport_pickups = relationship("GroundTransport", foreign_keys="GroundTransport.pickup_address_id", back_populates="pickup_address")
    ground_transport_dropoffs = relationship("GroundTransport", foreign_keys="GroundTransport.dropoff_address_id", back_populates="dropoff_address")
    
    def __repr__(self):
        return f"<Address(id='{self.id}', city='{self.city}', country='{self.country}')>"
```

# python/database/postgresql/models/company.py

```py
from sqlalchemy import Column, ForeignKey, String
from sqlalchemy.orm import relationship

from ..base import Base

class Company(Base):
    __tablename__ = 'companies'

    id= Column(String, primary_key=True)
    name = Column(String, nullable=False)
    location = Column(String, nullable=False)
    address_id = Column(String, ForeignKey('addresses.id'), nullable=False)

    #Relationships
    admins = relationship("Admin", back_populates="company")
    address = relationship("Address", back_populates="companies")

    def __repr__(self):
        return f"<Company id={self.id} name={self.name}>"
```

# python/database/postgresql/models/flight.py

```py
from sqlalchemy import Boolean, Column, DateTime, Float, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from ..base import Base

class FlightItinerary(Base):
    __tablename__ = 'flight_itineraries'

    id = Column(String, primary_key=True)
    trip_id = Column(String, ForeignKey('trips.id'), nullable=False)
    booking_reference = Column(String, nullable=True)
    price = Column(Float, nullable=True)
    booking_status_id = Column(String, ForeignKey('flight_itinerary_statuses.id'), nullable=False)
    itinerary_type = Column(String, nullable=True)
    is_direct = Column(Boolean, nullable=False, default=False)

    #Relationships
    trip = relationship("Trip", back_populates="flight_itinerary")
    status = relationship("FlightItineraryStatus", back_populates="flight_itineraries")
    legs = relationship("FlightLeg", back_populates="flight_itinerary")

    def __repr__(self):
        return f"<FlightItinerary(id='{self.id}', trip_id='{self.trip_id}', booking_reference='{self.booking_reference}', price='{self.price}', booking_status_id='{self.booking_status_id}', itinerary_type='{self.itinerary_type}', is_direct='{self.is_direct}')>"
    
class FlightItineraryStatus(Base):
    __tablename__ = 'flight_itinerary_statuses'

    id = Column(String, primary_key=True)
    code = Column(String, nullable=False)
    description = Column(String, nullable=False)
    is_active = Column(Boolean, nullable=False, default=True)
    display_order = Column(Integer, nullable=False)

    #Relationships
    flight_itineraries = relationship("FlightItinerary", back_populates="status")

    def __repr__(self):
        return f"<FlightItineraryStatus(id='{self.id}', code='{self.code}', description='{self.description}')>"

class FlightLeg(Base):
    __tablename__ = 'flight_legs'

    id = Column(String, primary_key=True)
    flight_itinerary_id = Column(String, ForeignKey('flight_itineraries.id'), nullable=False)
    leg_sequence = Column(String, nullable=False)
    flight_number = Column(String, nullable=False)
    airline_code = Column(String, nullable=False)
    flight_status_id = Column(String, ForeignKey('flight_leg_statuses.id'), nullable=False)
    departure_time = Column(DateTime, nullable=False)
    departure_airport = Column(String, nullable=False)
    departure_terminal = Column(String, nullable=True)
    departure_gate = Column(String, nullable=True)
    arrival_time = Column(DateTime, nullable=False)
    arrival_airport = Column(String, nullable=False)
    arrival_terminal = Column(String, nullable=True)
    arrival_gate = Column(String, nullable=True)

    #Relationships
    flight_itinerary = relationship("FlightItinerary", back_populates="legs")
    status = relationship("FlightLegStatus", back_populates="legs")

    def __repr__(self):
        return f"<FlightLeg(id='{self.id}', flight_itinerary_id='{self.flight_itinerary_id}', leg_sequence='{self.leg_sequence}', flight_number='{self.flight_number}', airline_code='{self.airline_code}', flight_status_id='{self.flight_status_id}', departure_time='{self.departure_time}', departure_airport='{self.departure_airport}', departure_terminal='{self.departure_terminal}', departure_gate='{self.departure_gate}', arrival_time='{self.arrival_time}', arrival_airport='{self.arrival_airport}', arrival_terminal='{self.arrival_terminal}', arrival_gate='{self.arrival_gate}')>"

class FlightLegStatus(Base):
    __tablename__ = 'flight_leg_statuses'

    id = Column(String, primary_key=True)
    code = Column(String, nullable=False)
    description = Column(String, nullable=False)
    is_active = Column(Boolean, nullable=False, default=True)
    display_order = Column(Integer, nullable=False)

    #Relationships
    legs = relationship("FlightLeg", back_populates="status")
```

# python/database/postgresql/models/ground_transport.py

```py
from sqlalchemy import Boolean, Column, Float, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from ..base import Base

class GroundTransport(Base):
    __tablename__ = 'ground_transports'

    id = Column(String, primary_key=True)
    trip_id = Column(String, ForeignKey('trips.id'), nullable=False)
    pickup_address_id = Column(String, ForeignKey('addresses.id'), nullable=False)
    dropoff_address_id = Column(String, ForeignKey('addresses.id'), nullable=False)
    type_id = Column(String, ForeignKey('ground_transport_services.id'), nullable=False)
    voucher_id = Column(String, nullable=True)
    estimated_price = Column(Float, nullable=True)
    actual_price = Column(Float, nullable=True)
    status_id = Column(String, ForeignKey('ground_transport_statuses.id'), nullable=False)

    #Relationships
    trip = relationship("Trip", back_populates="ground_transports")
    pickup_address = relationship("Address", foreign_keys=[pickup_address_id], back_populates="ground_transport_pickups")
    dropoff_address = relationship("Address", foreign_keys=[dropoff_address_id], back_populates="ground_transport_dropoffs")
    service_type = relationship("GroundTransportServices", back_populates="ground_transports")
    status = relationship("GroundTransportStatus", back_populates="ground_transports")

    def __repr__(self):
        return f"<GroundTransport(id='{self.id}', trip_id='{self.trip_id}', pickup_address_id='{self.pickup_address_id}', dropoff_address_id='{self.dropoff_address_id}', type_id='{self.type_id}', voucher_id='{self.voucher_id}', estimated_price='{self.estimated_price}', actual_price='{self.actual_price}', status_id='{self.status_id}')>"

class GroundTransportStatus(Base):
    __tablename__ = 'ground_transport_statuses'

    id = Column(String, primary_key=True)
    code = Column(String, nullable=False)
    description = Column(String, nullable=False)
    is_active = Column(Boolean, nullable=False, default=True)
    display_order = Column(Integer, nullable=False)

    #Relationships
    ground_transports = relationship("GroundTransport", back_populates="status")

    def __repr__(self):
        return f"<GroundTransportStatus(id='{self.id}', code='{self.code}', description='{self.description}')>"
```

# python/database/postgresql/models/guest_preference.py

```py
from sqlalchemy import Boolean, Column, Float, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from ..base import Base

class GuestTypePreferences(Base):
    __tablename__ = 'guest_type_preferences'

    id = Column(String, primary_key=True)
    flight_preferences_id = Column(String, ForeignKey('flight_preferences.id'), nullable=False)
    hotel_preferences_id = Column(String, ForeignKey('hotel_preferences.id'), nullable=False)
    ground_transport_preferences_id = Column(String, ForeignKey('ground_transport_preferences.id'), nullable=False)
    guest_type = Column(String, nullable=False)
    daily_per_diem = Column(Float, nullable=False)

    #Relationships
    flight_preferences = relationship("FlightPreferences", back_populates="guest_type_preferences")
    hotel_preferences = relationship("HotelPreferences", back_populates="guest_type_preferences")
    ground_transport_preferences = relationship("GroundTransportPreferences", back_populates="guest_type_preferences")
    trips = relationship("Trip", back_populates="guest_type_preferences")

    def __repr__(self):
        return f"<GuestTypePreferences(id='{self.id}', flight_preferences_id='{self.flight_preferences_id}', hotel_preferences_id='{self.hotel_preferences_id}', ground_transport_preferences_id='{self.ground_transport_preferences_id}', guest_type='{self.guest_type}', daily_per_diem='{self.daily_per_diem}')>"

class FlightPreferences(Base):
    __tablename__ = 'flight_preferences'

    id = Column(String, primary_key=True)
    cabin_class_id = Column(String, ForeignKey('flight_preferences_cabin_classes.id'), nullable=False)
    max_stops_id = Column(String, ForeignKey('flight_preferences_max_stops.id'), nullable=False)
    refundable_ticket = Column(Boolean, nullable=False, default=False)

    #Relationships
    cabin_class = relationship("FlightPreferencesCabinClass", back_populates="preferences")
    max_stops = relationship("FlightPreferencesMaxStops", back_populates="preferences")
    guest_type_preferences = relationship("GuestTypePreferences", back_populates="flight_preferences")

    def __repr__(self):
        return f"<FlightPreferences(id='{self.id}', cabin_class_id='{self.cabin_class_id}', max_stops_id='{self.max_stops_id}', refundable_ticket='{self.refundable_ticket}')>"

class FlightPreferencesCabinClass(Base):
    __tablename__ = 'flight_preferences_cabin_classes'

    id = Column(String, primary_key=True)
    code = Column(String, nullable=False)
    description = Column(String, nullable=False)
    is_active = Column(Boolean, nullable=False, default=True)
    display_order = Column(Integer, nullable=False)

    #Relationships
    preferences = relationship("FlightPreferences", back_populates="cabin_class")
    

    def __repr__(self):
        return f"<FlightPReferencesCabinClass(id='{self.id}', code='{self.code}', description='{self.description}')>"

class FlightPreferencesMaxStops(Base):
    __tablename__ = 'flight_preferences_max_stops'

    id = Column(String, primary_key=True)
    code = Column(String, nullable=False)
    description = Column(String, nullable=False)
    is_active = Column(Boolean, nullable=False, default=True)
    display_order = Column(Integer, nullable=False)

    #Relationships
    preferences = relationship("FlightPreferences", back_populates="max_stops")
    
    def __repr__(self):
        return f"<FlightPreferencesMaxStops(id='{self.id}', code='{self.code}', description='{self.description}')>"

class HotelPreferences(Base):
    __tablename__ = 'hotel_preferences'

    id = Column(String, primary_key=True)
    minimum_rating_id = Column(String, ForeignKey('hotel_ratings.id'), nullable=False)

    #Relationships
    minimum_rating = relationship("HotelRating", back_populates="hotel_preferences")
    guest_type_preferences = relationship("GuestTypePreferences", back_populates="hotel_preferences")

    def __repr__(self):
        return f"<HotelPreferences(id='{self.id}', minimum_rating_id='{self.minimum_rating_id}')>"
    
class HotelRating(Base):
    __tablename__ = 'hotel_ratings'

    id = Column(String, primary_key=True)
    code = Column(String, nullable=False)
    description = Column(String, nullable=False)
    is_active = Column(Boolean, nullable=False, default=True)
    display_order = Column(Integer, nullable=False)

    #Relationships
    hotels = relationship("Hotel", back_populates="rating")
    hotel_preferences = relationship("HotelPreferences", back_populates="minimum_rating")

    def __repr__(self):
        return f"<HotelRating(id='{self.id}', code='{self.code}', description='{self.description}')>"

class GroundTransportPreferences(Base):
    __tablename__ = 'ground_transport_preferences'

    id = Column(String, primary_key=True)
    preferred_services_id = Column(String, ForeignKey('ground_transport_services.id'), nullable=False)

    #Relationships
    preferred_services = relationship("GroundTransportServices", back_populates="ground_transport_preferences")
    guest_type_preferences = relationship("GuestTypePreferences", back_populates="ground_transport_preferences")

    def __repr__(self):
        return f"<GroundTransportPreferences(id='{self.id}', vpreferred_services_id='{self.vpreferred_services_id}')>"
class GroundTransportServices(Base):
    __tablename__ = 'ground_transport_services'

    id = Column(String, primary_key=True)
    code = Column(String, nullable=False)
    description = Column(String, nullable=False)
    is_active = Column(Boolean, nullable=False, default=True)
    display_order = Column(Integer, nullable=False)

    #Relationships
    ground_transport_preferences = relationship("GroundTransportPreferences", back_populates="preferred_services")
    ground_transports = relationship("GroundTransport", back_populates="service_type")

    def __repr__(self):
        return f"<GroundTransportServices(id='{self.id}', code='{self.code}', description='{self.description}')>"

```

# python/database/postgresql/models/guest.py

```py
from sqlalchemy import Column, Date, ForeignKey, String
from sqlalchemy.dialects.postgresql import ARRAY as PG_ARRAY
from sqlalchemy.orm import relationship

from ..base import Base

class GuestProfile(Base):
    __tablename__ = 'guest_profiles'

    id = Column(String, primary_key=True)
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    email = Column(String, nullable=False)
    phone = Column(String, nullable=True)
    date_of_birth = Column(Date, nullable=True)
    gender = Column(String, nullable=True)
    nationality = Column(String, nullable=True)
    passport_number = Column(String, nullable=True)
    passport_expiry_date = Column(Date, nullable=True)
    dietary_restrictions = Column(PG_ARRAY(String), nullable=True)
    accessibility_needs = Column(PG_ARRAY(String), nullable=True)
    admin_id = Column(String, ForeignKey('admins.id'), nullable=False)
    address_id = Column(String, ForeignKey('addresses.id'), nullable=True)

    #Relationships
    admin = relationship("Admin", back_populates="guest_profiles")
    address = relationship("Address", back_populates="guest_profiles")
    trips = relationship("Trip", back_populates="guest_profile")
    emergency_contacts = relationship("EmergencyContact", back_populates="guest_profile")
    loyalty_programs = relationship("LoyaltyProgram", back_populates="guest_profile")
    

    def __repr__(self):
        return f"<Guest(id='{self.id}', first_name='{self.first_name}', last_name='{self.last_name}', email='{self.email}', phone='{self.phone}, admin_id='{self.admin_id}')>"

class EmergencyContact(Base):
    __tablename__ = 'emergency_contacts'

    id = Column(String, primary_key=True)
    guest_profile_id = Column(String, ForeignKey('guest_profiles.id'), nullable=False)
    name = Column(String, nullable=False)
    relation = Column(String, nullable=False)
    phone = Column(String, nullable=False)

    #Relationships
    guest_profile = relationship("GuestProfile", back_populates="emergency_contacts")

    def __repr__(self):
        return f"<EmergencyContact(id='{self.id}', first_name='{self.first_name}', last_name='{self.last_name}', phone='{self.phone}', relationship='{self.relationship}', guest_profile_id='{self.guest_profile_id}')>" 
    
class LoyaltyProgram(Base):
    __tablename__ = 'loyalty_programs'
    id = Column(String, primary_key=True)
    guest_profile_id = Column(String, ForeignKey('guest_profiles.id'), nullable=False)
    provider = Column(String, nullable=False)
    program_name = Column(String, nullable=False)
    membership_number = Column(String, nullable=False)
    status = Column(String, nullable=False)

    #Relationships
    guest_profile = relationship("GuestProfile", back_populates="loyalty_programs")
```

# python/database/postgresql/models/hotel.py

```py
from sqlalchemy import Boolean, Column, DateTime, Float, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from ..base import Base

class Hotel(Base):
    __tablename__ = 'hotels'   

    id = Column(String, primary_key=True)
    address_id = Column(String, ForeignKey('addresses.id'), nullable=False)
    rating_id = Column(String, ForeignKey('hotel_ratings.id'), nullable=False)
    booking_reference = Column(String, nullable=True)
    name = Column(String, nullable=False)
    room_type = Column(String, nullable=False)
    price = Column(Float, nullable=False)
    booking_status_id = Column(String, ForeignKey('hotel_statuses.id'), nullable=False)
    check_in = Column(DateTime, nullable=False)
    check_out = Column(DateTime, nullable=False)
    
    #Relationships
    address = relationship("Address", back_populates="hotels")
    rating = relationship("HotelRating", back_populates="hotels")
    status = relationship("HotelStatus", back_populates="hotels")
    trips = relationship("Trip", back_populates="hotel")

    def __repr__(self):
        return f"<Hotel(id='{self.id}', address_id='{self.address_id}', rating_id='{self.rating_id}', booking_reference='{self.booking_reference}', name='{self.name}', room_type='{self.room_type}', price='{self.price}', booking_status_id='{self.booking_status_id}', check_in='{self.check_in}', check_out='{self.check_out}')>"

class HotelStatus(Base):
    __tablename__ = 'hotel_statuses'

    id = Column(String, primary_key=True)
    code = Column(String, nullable=False)
    description = Column(String, nullable=False)
    is_active = Column(Boolean, nullable=False, default=True)
    display_order = Column(Integer, nullable=False)

    #Relationships
    hotels = relationship("Hotel", back_populates="status")

    def __repr__(self):
        return f"<HotelStatus(id='{self.id}', code='{self.code}', description='{self.description}')>"
```

# python/database/postgresql/models/perdiem.py

```py
from sqlalchemy import Boolean, Column, Date, Float, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from ..base import Base

class PerDiem(Base):
    __tablename__ = 'per_diems'

    id = Column(String, primary_key=True)
    daily_rate = Column(Float, nullable=False)
    start_date = Column(Date, nullable=False)
    end_date = Column(Date, nullable=False)
    total_amount = Column(Float, nullable=False)
    per_diem_status_id = Column(String, ForeignKey('per_diem_statuses.id'), nullable=False)

    #Relationships
    status = relationship("PerDiemStatus", back_populates="per_diems")
    expenses = relationship("Expense", back_populates="per_diem")
    trips = relationship("Trip", back_populates="per_diem")

    def __repr__(self):
        return f"<PerDiem(id='{self.id}', daily_rate='{self.daily_rate}', start_date='{self.start_date}', end_date='{self.end_date}', total_amount='{self.total_amount}', per_diem_status_id='{self.per_diem_status_id}')>"

class PerDiemStatus(Base):
    __tablename__ = 'per_diem_statuses'

    id = Column(String, primary_key=True)
    code = Column(String, nullable=False)
    description = Column(String, nullable=False)
    is_active = Column(Boolean, nullable=False, default=True)
    display_order = Column(Integer, nullable=False)

    #Relationships
    per_diems = relationship("PerDiem", back_populates="status")

    def __repr__(self):
        return f"<PerDiemStatus(id='{self.id}', code='{self.code}', description='{self.description}')>"

class Expense(Base):
    __tablename__ = 'expenses'

    id = Column(String, primary_key=True)
    per_diem_id = Column(String, ForeignKey('per_diems.id'), nullable=False)
    category = Column(String, nullable=False)
    amount = Column(Float, nullable=False)
    date = Column(Date, nullable=False)
    receipt = Column(String, nullable=True)
    status_id = Column(String, ForeignKey('expense_statuses.id'), nullable=False)
    notes = Column(String, nullable=True)

    #Relationships
    per_diem = relationship("PerDiem", back_populates="expenses")
    status = relationship("ExpenseStatus", back_populates="expenses")

    def __repr__(self):
        return f"<Expense(id='{self.id}', per_diem_id='{self.per_diem_id}', category='{self.category}', amount='{self.amount}', date='{self.date}', receipt='{self.receipt}', status_id='{self.status_id}', notes='{self.notes}')>"

class ExpenseStatus(Base):
    __tablename__ = 'expense_statuses'

    id = Column(String, primary_key=True)
    code = Column(String, nullable=False)
    description = Column(String, nullable=False)
    is_active = Column(Boolean, nullable=False, default=True)
    display_order = Column(Integer, nullable=False)

    #Relationships
    expenses = relationship("Expense", back_populates="status")

    def __repr__(self):
        return f"<ExpenseStatus(id='{self.id}', code='{self.code}', description='{self.description}')>"
```

# python/database/postgresql/models/trip.py

```py
from sqlalchemy import Boolean, Column, Date, DateTime, Float, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from ..base import Base

class Trip(Base):
    __tablename__ = 'trips'

    id = Column(String, primary_key=True)
    admin_id = Column(String, ForeignKey('admins.id'), nullable=False)
    guest_profile_id = Column(String, ForeignKey('guest_profiles.id'), nullable=False)
    guest_type = Column(String, nullable=False)
    status_id = Column(String, ForeignKey('trip_statuses.id'), nullable=False)
    guest_type_preferences_id = Column(String, ForeignKey('guest_type_preferences.id'), nullable=False)
    meeting_id = Column(String, ForeignKey('meetings.id'), nullable=False)
    hotel_id = Column(String, ForeignKey('hotels.id'), nullable=False)
    per_diem_id = Column(String, ForeignKey('per_diems.id'), nullable=True)
    created = Column(Date, nullable=False)
    modified = Column(Date, nullable=False)
    created_by = Column(String, nullable=False)
    total_budget = Column(Float, nullable=True)
    actual_spend = Column(Float, nullable=True)

    #Relationships
    guest_profile = relationship("GuestProfile", back_populates="trips")
    guest_type_preferences = relationship("GuestTypePreferences", back_populates="trips")
    meeting = relationship("Meeting", back_populates="trips")
    hotel = relationship("Hotel", back_populates="trips")
    per_diem = relationship("PerDiem", back_populates="trips")
    admin = relationship("Admin", back_populates="trips")
    flight_itinerary = relationship("FlightItinerary", back_populates="trip")
    ground_transports = relationship("GroundTransport", back_populates="trip")
    status = relationship("TripStatus", back_populates="trips")

    def __repr__(self):
        return f"<Trip(id='{self.id}', guest_profile_id='{self.guest_profile_id}', guest_type='{self.guest_type}', status='{self.status}', meeting_id='{self.meeting_id}', hotel_id='{self.hotel_id}', per_diem_id='{self.per_diem_id}', created='{self.created}', modified='{self.modified}', created_by='{self.created_by}', total_budget='{self.total_budget}', actual_spend='{self.actual_spend}')>"
    
class TripStatus(Base):
    __tablename__ = 'trip_statuses'

    id = Column(String, primary_key=True)
    code = Column(String, nullable=False)
    description = Column(String, nullable=False)
    is_active = Column(Boolean, nullable=False, default=True)
    display_order = Column(Integer, nullable=False)

    #Relationships
    trips = relationship("Trip", back_populates="status")

    def __repr__(self):
        return f"<TripStatus(id='{self.id}', code='{self.code}', description='{self.description}')>"
    
class Meeting(Base):
    __tablename__ = 'meetings'

    id = Column(String, primary_key=True)
    address_id = Column(String, ForeignKey('addresses.id'), nullable=False)
    location = Column(String, nullable=False)
    start_date = Column(DateTime, nullable=False)
    end_date = Column(DateTime, nullable=False)

    #relationships
    address = relationship("Address", back_populates="meetings")
    trips = relationship("Trip", back_populates="meeting")

    def __repr__(self):
        return f"<Meeting(id='{self.id}', address_id='{self.address_id}', location='{self.location}', start_date='{self.start_date}', end_date='{self.end_date}')>"


```

# python/database/postgresql/models/user.py

```py
from sqlalchemy import Column, DateTime, String, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship

from ..base import Base

class Admin(Base):
    __tablename__= 'admins'

    id = Column(String, primary_key=True)
    email = Column(String, unique=True, nullable=False)
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    company_id = Column(String, ForeignKey('companies.id'), nullable=False)
    role = Column(String, nullable=False)
    created_at = Column(DateTime, default=func.now(), nullable=False)
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now(), nullable=False)


    #Relationships
    company = relationship("Company", back_populates="admins")
    trips = relationship("Trip", back_populates="admin")
    guest_profiles = relationship("GuestProfile", back_populates="admin")

    def __repr__(self):
        return f"<Admin id={self.id} email={self.email} first_name={self.first_name} last_name={self.last_name}>"
```

