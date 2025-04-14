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
        company_id: str,
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