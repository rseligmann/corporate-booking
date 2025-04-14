from abc import ABC, abstractmethod
from typing import Optional, ContextManager
from sqlalchemy.orm import Session

class BaseConfigDB(ABC):
    
    def __init__(self):
        self._tenant_id = None
    
    @abstractmethod
    def connect(self):
        """Establish database connection"""
        pass
    
    @abstractmethod
    def disconnect(self):
        """Close database connection"""
        pass
    
    @abstractmethod
    def get_connection(self):
        """Get the current database connection"""
        pass

    @abstractmethod
    def set_tenant(self, tenant_id: str):
        """
        Set the tenant ID (company_id) for multi-tenancy
        
        This ID will be used for tenant isolation in database queries
        """
        pass
    
    @abstractmethod
    def tenantSession(self) -> ContextManager[Session]:
        """Create new session with tenant (company) context applied"""
        pass


    # def get_tenant(self) -> Optional[str]:
    #     """Get the current tenant ID"""
    #     return self._tenant_id
    
    # def clear_tenant(self):
    #     """Clear the tenant ID"""
    #     self._tenant_id = None