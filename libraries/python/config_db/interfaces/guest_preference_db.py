from abc import ABC, abstractmethod
from typing import Optional, Dict, Any

from config_types.guest_preference_types import GuestTypes

class GuestPreferenceDB(ABC):
    """Interface for guest preference-related database operations."""
    
    # Guest Type Preferences
    @abstractmethod
    async def get_all_guest_types(self, company_id: str) -> list[GuestTypes]:
        """Retrieve all guest type preferences for the current tenant"""
        pass
    
    @abstractmethod
    async def get_guest_type_preferences(self, guest_type_id: str) -> Optional[Dict[str, Any]]:
        """Retrieve guest type preferences by ID"""
        pass
    
    @abstractmethod
    async def insert_guest_type_preferences(self, name: str, company_id: str, user_id: str) -> Dict[str,Any]:
        """Insert new guest type preferences"""
        pass
    
    
    @abstractmethod
    async def update_guest_type_preferences(self, guest_type_id: str, preferences: Dict[str,Any]) -> Optional[Dict[str, Any]]:
        """Update existing guest type preferences"""
        pass
    
    @abstractmethod
    async def delete_guest_type_preferences(self, guest_type_id: str) -> bool:
        """Delete guest type preferences by ID"""
        pass