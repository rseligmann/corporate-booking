from abc import ABC, abstractmethod
from typing import Optional, List

from config_types.user_types import Admin

class UserDB(ABC):
    """Interface for user-related database operations."""
    
    @abstractmethod
    async def get_admin(self, user_id: str) -> Optional[Admin]:
        """Retrieve an admin by ID"""
        pass
    
    @abstractmethod
    async def get_admin_by_email(self, email: str) -> Optional[Admin]:
        """Retrieve an admin by email"""
        pass
    
    @abstractmethod
    async def get_admins_by_company(self, company_id: str) -> List[Admin]:
        """Retrieve all admins for a company"""
        pass
    
    @abstractmethod
    async def insert_admin(self, email: str, first_name: str, last_name: str, company_id: str) -> Admin:
        """Insert a new admin"""
        pass
    
    @abstractmethod
    async def update_admin(self, admin: Admin) -> Admin:
        """Update an existing admin"""
        pass
    
    @abstractmethod
    async def delete_admin(self, user_id: str) -> bool:
        """Delete an admin by ID"""
        pass