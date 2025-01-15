from datetime import datetime
from abc import ABC
from enum import Enum

class Role(Enum):
    ADMIN = "ADMIN"
    USER = "USER"
    GUEST = "GUEST"

class BookingStatus(Enum):
    PENDING = "PENDING"
    CONFIRMED = "CONFIRMED"
    CANCELLED = "CANCELLED"

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
                date_created: datetime,
                date_updated: datetime):
        super().__init__(
            user_id=user_id,
            email=email,
            first_name=first_name,
            last_name=last_name,
            role=Role.ADMIN,
            date_created=date_created,
            date_updated=date_updated
        )

class Guest(User):
    def __init__(self,
                user_id: str,
                email: str,
                first_name: str,
                last_name: str,
                date_created: datetime,
                date_updated: datetime):
        super().__init__(
            user_id=user_id,
            email=email,
            first_name=first_name,
            last_name=last_name,
            role=Role.GUEST,
            date_created=date_created,
            date_updated=date_updated
        )

class Booking(ABC):
    def __init__(self,
                booking_id: str,
                user_id: str,
                status: BookingStatus,
                total_price: float,
                flight_id: str | None,
                hotel_id: str | None,
                date_created: datetime,
                date_updated: datetime):
        self.booking_id   = booking_id
        self.user_id      = user_id
        self.status       = status
        self.total_price  = total_price
        self.flight_id    = flight_id
        self.hotel_id     = hotel_id
        self.date_created = date_created
        self.date_updated = date_updated

    def __str__(self) -> str:
        return f"""Booking Details:
                   Booking ID: {self.booking_id}
                   User ID: {self.user_id}
                   Status: {self.status.value}
                   Total Price: ${self.total_price:.2f}
                   Flight ID: {self.flight_id if self.flight_id else 'Not booked'}
                   Hotel ID: {self.hotel_id if self.hotel_id else 'Not booked'}
                   Created: {self.date_created}
                   Updated: {self.date_updated}"""

class GuestBooking(ABC):
    def __init__(self,
                booking_id: str,
                inviter_id: str,
                guest_email: str,
                status: BookingStatus,
                flight_id: str | None,
                hotel_id: str | None,
                date_created: datetime,
                date_updated: datetime):
        self.booking_id   = booking_id
        self.inviter_id   = inviter_id
        self.guest_email  = guest_email
        self.status       = status
        self.flight_id    = flight_id
        self.hotel_id     = hotel_id
        self.date_created = date_created
        self.date_updated = date_updated

    def __str__(self) -> str:
        return f"""Guest Booking Details:
                   Booking ID: {self.booking_id}
                   Inviter ID: {self.inviter_id}
                   Guest Email: {self.guest_email}
                   Status: {self.status.value}
                   Flight ID: {self.flight_id if self.flight_id else 'Not booked'}
                   Hotel ID: {self.hotel_id if self.hotel_id else 'Not booked'}
                   Created: {self.date_created}
                   Updated: {self.date_updated}"""

class Flight(ABC):
    def __init__(self,
                flight_id: str,
                flight_number: str,
                airline: str,
                departure: datetime,
                arrival: datetime,
                origin: str,
                destination: str,
                price: float,
                date_created: datetime,
                date_updated: datetime):
        self.flight_id    = flight_id
        self.flight_number = flight_number
        self.airline      = airline
        self.departure    = departure
        self.arrival      = arrival
        self.origin       = origin
        self.destination  = destination
        self.price        = price
        self.date_created = date_created
        self.date_updated = date_updated

    def __str__(self) -> str:
        return f"""Flight Details:
                   Flight ID: {self.flight_id}
                   Flight Number: {self.flight_number}
                   Airline: {self.airline}
                   Route: {self.origin} → {self.destination}
                   Departure: {self.departure}
                   Arrival: {self.arrival}
                   Price: ${self.price:.2f}
                   Created: {self.date_created}
                   Updated: {self.date_updated}"""

class Hotel(ABC):
    def __init__(self,
                hotel_id: str,
                name: str,
                location: str,
                check_in: datetime,
                check_out: datetime,
                room_type: str,
                price: float,
                date_created: datetime,
                date_updated: datetime):
        self.hotel_id     = hotel_id
        self.name         = name
        self.location     = location
        self.check_in     = check_in
        self.check_out    = check_out
        self.room_type    = room_type
        self.price        = price
        self.date_created = date_created
        self.date_updated = date_updated

    def __str__(self) -> str:
        return f"""Hotel Details:
                   Hotel ID: {self.hotel_id}
                   Name: {self.name}
                   Location: {self.location}
                   Room Type: {self.room_type}
                   Check-in: {self.check_in}
                   Check-out: {self.check_out}
                   Price per Night: ${self.price:.2f}
                   Created: {self.date_created}
                   Updated: {self.date_updated}"""