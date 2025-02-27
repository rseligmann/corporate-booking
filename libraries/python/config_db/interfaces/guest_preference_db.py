from abc import ABC, abstractmethod
from typing import Optional

from config_types.guest_preference_types import GuestTypePreferences, FlightPreferences, HotelPreferences, GroundTransportPreferences

class GuestPreferenceDB(ABC):
    """Interface for guest preference-related database operations."""

    # Flight Preferences
    @abstractmethod
    async def get_flight_preferences(self, preferences_id: str) -> Optional[FlightPreferences]:
        """Retrieve flight preferences by ID"""
        pass
    
    @abstractmethod
    async def insert_flight_preferences(
        self,
        cabin_class_id: str,
        max_stops_id: str,
        refundable_ticket: bool
    ) -> FlightPreferences:
        """Insert new flight preferences"""
        pass
    
    @abstractmethod
    async def update_flight_preferences(self, preferences: FlightPreferences) -> FlightPreferences:
        """Update existing flight preferences"""
        pass
    
    @abstractmethod
    async def delete_flight_preferences(self, preferences_id: str) -> bool:
        """Delete flight preferences by ID"""
        pass
    
    # Hotel Preferences
    @abstractmethod
    async def get_hotel_preferences(self, preferences_id: str) -> Optional[HotelPreferences]:
        """Retrieve hotel preferences by ID"""
        pass
    
    @abstractmethod
    async def insert_hotel_preferences(
        self,
        minimum_rating_id: str
    ) -> HotelPreferences:
        """Insert new hotel preferences"""
        pass
    
    @abstractmethod
    async def update_hotel_preferences(self, preferences: HotelPreferences) -> HotelPreferences:
        """Update existing hotel preferences"""
        pass
    
    @abstractmethod
    async def delete_hotel_preferences(self, preferences_id: str) -> bool:
        """Delete hotel preferences by ID"""
        pass
    
    # Ground Transport Preferences
    @abstractmethod
    async def get_ground_transport_preferences(self, preferences_id: str) -> Optional[GroundTransportPreferences]:
        """Retrieve ground transport preferences by ID"""
        pass
    
    @abstractmethod
    async def insert_ground_transport_preferences(
        self,
        preferred_services_id: str
    ) -> GroundTransportPreferences:
        """Insert new ground transport preferences"""
        pass
    
    @abstractmethod
    async def update_ground_transport_preferences(self, preferences: GroundTransportPreferences) -> GroundTransportPreferences:
        """Update existing ground transport preferences"""
        pass
    
    @abstractmethod
    async def delete_ground_transport_preferences(self, preferences_id: str) -> bool:
        """Delete ground transport preferences by ID"""
        pass
    
    # Guest Type Preferences
    @abstractmethod
    async def get_guest_type_preferences(self, preferences_id: str) -> Optional[GuestTypePreferences]:
        """Retrieve guest type preferences by ID"""
        pass
    
    @abstractmethod
    async def get_guest_type_preferences_by_type(self, guest_type: str) -> Optional[GuestTypePreferences]:
        """Retrieve guest type preferences by guest type"""
        pass
    
    @abstractmethod
    async def insert_guest_type_preferences(
        self,
        flight_preferences_id: str,
        hotel_preferences_id: str,
        ground_transport_preferences_id: str,
        guest_type: str,
        daily_per_diem: Optional[float] = None
    ) -> GuestTypePreferences:
        """Insert new guest type preferences"""
        pass
    
    @abstractmethod
    async def update_guest_type_preferences(self, preferences: GuestTypePreferences) -> GuestTypePreferences:
        """Update existing guest type preferences"""
        pass
    
    @abstractmethod
    async def delete_guest_type_preferences(self, preferences_id: str) -> bool:
        """Delete guest type preferences by ID"""
        pass