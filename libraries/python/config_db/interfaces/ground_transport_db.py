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