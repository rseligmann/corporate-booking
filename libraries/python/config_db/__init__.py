from abc import ABC
from .base import BaseConfigDB
from .interfaces import (
    AddressDB, CompanyDB, UserDB, UserDB
)

class ConfigDB(BaseConfigDB, AddressDB, CompanyDB, 
    UserDB, ABC):
    """
    Combined interface for all database operations.
    This interface aggregates all domain-specific interfaces into a single interface.
    """
    pass