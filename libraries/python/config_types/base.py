from abc import ABC
from enum import Enum

# Common enumerations used across multiple domain types
class Role(Enum):
    ADMIN = "ADMIN"
    USER = "USER"
    GUEST = "GUEST"

class AccountStatus(Enum):
    ACTIVE = "ACTIVE"
    INACTIVE = "INACTIVE"

class SubscriptionTier(Enum):
    FREE = "FREE"
    PAID = "PAID"

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