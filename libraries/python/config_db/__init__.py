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

# Deferred import of the PostgreSQL implementation
def get_postgresql_config_db(config_file_path=None, config=None):
    # Factory function that returns a new PSQLConfigDB implementation

    from database.postgresql.implementations import get_postgresql_config_db as psql_impl
    return psql_impl(config_file_path=config_file_path, config=config)