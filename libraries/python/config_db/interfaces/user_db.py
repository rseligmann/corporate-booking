from abc import ABC, abstractmethod
from typing import Optional, List

from config_types.user_types import User
from config_types.base import Role, AccountStatus

class UserDB(ABC):
    """Interface for user-related database operations."""
    
    @abstractmethod
    async def get_user(self, user_id: str) -> Optional[User]:
        """Retrieve an user by ID"""
        pass
    
    @abstractmethod
    async def get_user_by_email(self, email: str) -> Optional[User]:
        """Retrieve an admin by email"""
        pass
    
    @abstractmethod
    async def get_users_by_company(self, company_id: str) -> List[User]:
        """Retrieve all users for a company"""
        pass
    
    @abstractmethod
    async def insert_user(
        self, 
        user_id: str, 
        email: str, 
        first_name: str, 
        last_name: str, 
        company_id: str, 
        role: Role,
        status: AccountStatus
        ) -> User:
        """Insert a new user"""
        pass
    
    @abstractmethod
    async def update_user(self, user: User) -> User:
        """Update an existing user"""
        pass
    
    @abstractmethod
    async def delete_user(self, user_id: str) -> bool:
        """Delete a user by ID"""
        pass