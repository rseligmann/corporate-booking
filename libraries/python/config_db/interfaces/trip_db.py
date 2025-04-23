from abc import ABC, abstractmethod
from typing import Optional, List, Dict, Any
from datetime import date

from config_types.trip_types import Trip

class TripDB(ABC):
    """Interface for trip-related database operations."""
    
    # Trip methods
    @abstractmethod
    async def get_trips_by_company(self, company_id: str) -> Optional[List[Dict[str, Any]]]:
        """Retrieve all trips for a company"""
        pass
    
    @abstractmethod
    async def get_trips_by_user(self, user_id: str) -> Optional[List[Dict[str, Any]]]:
        """Retrieve all trips for a company"""
        pass
    
    @abstractmethod
    async def get_trips_by_guest_profile(self, guest_profile_id: str) -> Optional[List[Dict[str, Any]]]:
        """Retrieve all trips for a guest profile"""
        pass

    async def get_trips_by_id(self, trip_id: str) -> Optional[Dict[str, Any]]:
        """Retrieve a trip by ID"""
        pass
    
    @abstractmethod
    async def insert_trip(self, trip_data: Dict[str, Any]) -> str:
        """Insert a new trip, returns ID of the newly created trip"""
        pass
    
    # @abstractmethod
    # async def update_trip(self, trip: Trip) -> Trip:
    #     """Update an existing trip"""
    #     pass
    
    @abstractmethod
    async def delete_trip(self, trip_id: str) -> bool:
        """Delete a trip by ID"""
        pass
    
#     # Meeting methods
#     @abstractmethod
#     async def get_meeting(self, meeting_id: str) -> Optional[Meeting]:
#         """Retrieve a meeting by ID"""
#         pass
    
#     @abstractmethod
#     async def get_meetings_by_date_range(
#         self, 
#         start_date: date, 
#         end_date: date
#     ) -> List[Meeting]:
#         """Retrieve all meetings within a date range"""
#         pass
    
#     @abstractmethod
#     async def insert_meeting(
#         self,
#         address_id: str,
#         location: str,
#         start_date: date,
#         end_date: date
#     ) -> Meeting:
#         """Insert a new meeting"""
#         pass
    
#     @abstractmethod
#     async def update_meeting(self, meeting: Meeting) -> Meeting:
#         """Update an existing meeting"""
#         pass
    
#     @abstractmethod
#     async def delete_meeting(self, meeting_id: str) -> bool:
#         """Delete a meeting by ID"""
#         pass