from abc import ABC, abstractmethod

class BaseConfigDB(ABC):
    
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