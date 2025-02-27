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