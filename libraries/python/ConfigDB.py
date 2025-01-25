from abc import ABC, abstractmethod
from datetime import datetime
from typing import Optional

from config_types.types import User, Admin, Guest, Booking, GuestBooking, Flight, Hotel

class ConfigDB(ABC):

    @abstractmethod
    async def get_admin(self, user_id: str) -> Optional[Admin]:
        """Retrieve an admin by ID"""
        pass

    @abstractmethod
    async def get_guest(self, user_id: str) -> Optional[Guest]:
        """Retrieve a guest by ID"""
        pass

    @abstractmethod
    async def insert_admin(self, email: str, first_name: str, last_name: str) -> Admin:
        """Insert a new admin"""
        pass

    @abstractmethod
    async def insert_guest(self, email: str, first_name: str, last_name: str) -> Guest:
        """Insert a new guest"""
        pass

    @abstractmethod
    async def get_booking(self, booking_id: str) -> Optional[Booking]:
        """Retrieve a booking by ID"""
        pass

    @abstractmethod
    async def get_guest_booking(self, booking_id: str) -> Optional[GuestBooking]:
        """Retrieve a guest booking by ID"""
        pass

    @abstractmethod
    async def insert_booking(
        self,
        user_id: str,
        total_price: float,
        flight_id: Optional[str] = None,
        hotel_id: Optional[str] = None
    ) -> Booking:
        """Insert a new booking"""
        pass

    @abstractmethod
    async def insert_guest_booking(
        self,
        inviter_id: str,
        guest_email: str,
        flight_id: Optional[str] = None,
        hotel_id: Optional[str] = None
    ) -> GuestBooking:
        """Insert a new guest booking"""
        pass

    @abstractmethod
    async def update_booking(self, booking: Booking) -> Booking:
        """Update an existing booking"""
        pass

    @abstractmethod
    async def update_guest_booking(self, booking: GuestBooking) -> GuestBooking:
        """Update an existing guest booking"""
        pass

    @abstractmethod
    async def get_flight(self, flight_id: str) -> Optional[Flight]:
        """Retrieve a flight by ID"""
        pass

    @abstractmethod
    async def insert_flight(
        self,
        flight_number: str,
        airline: str,
        departure: datetime,
        arrival: datetime,
        origin: str,
        destination: str,
        price: float
    ) -> Flight:
        """Insert a new flight"""
        pass

    @abstractmethod
    async def update_flight(self, flight: Flight) -> Flight:
        """Update an existing flight"""
        pass

    @abstractmethod
    async def get_hotel(self, hotel_id: str) -> Optional[Hotel]:
        """Retrieve a hotel by ID"""
        pass

    @abstractmethod
    async def insert_hotel(
        self,
        name: str,
        location: str,
        check_in: datetime,
        check_out: datetime,
        room_type: str,
        price: float
    ) -> Hotel:
        """Insert a new hotel"""
        pass

    @abstractmethod
    async def update_hotel(self, hotel: Hotel) -> Hotel:
        """Update an existing hotel"""
        pass