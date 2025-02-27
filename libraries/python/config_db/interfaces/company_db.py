from abc import ABC, abstractmethod
from typing import Optional, List

from config_types.company_types import Company

class CompanyDB(ABC):
    """Interface for company-related database operations."""
    
    @abstractmethod
    async def get_company(self, company_id: str) -> Optional[Company]:
        """Retrieve a company by ID"""
        pass
    
    @abstractmethod
    async def get_all_companies(self) -> List[Company]:
        """Retrieve all companies"""
        pass
    
    @abstractmethod
    async def insert_company(self, name: str, location: str, address_id: str) -> Company:
        """Insert a new company"""
        pass
    
    @abstractmethod
    async def update_company(self, company: Company) -> Company:
        """Update an existing company"""
        pass
    
    @abstractmethod
    async def delete_company(self, company_id: str) -> bool:
        """Delete a company by ID"""
        pass