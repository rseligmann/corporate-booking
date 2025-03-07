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