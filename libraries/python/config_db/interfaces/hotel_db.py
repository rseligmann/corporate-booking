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