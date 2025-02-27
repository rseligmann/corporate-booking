from abc import ABC, abstractmethod
from typing import Optional, List
from datetime import date

from config_types.perdiem_types import PerDiem, Expense

class PerDiemDB(ABC):
    """Interface for per diem and expense-related database operations."""
    
    # Per Diem methods
    @abstractmethod
    async def get_per_diem(self, per_diem_id: str) -> Optional[PerDiem]:
        """Retrieve a per diem by ID"""
        pass
    
    @abstractmethod
    async def get_per_diem_by_trip(self, trip_id: str) -> Optional[PerDiem]:
        """Retrieve a per diem associated with a trip"""
        pass
    
    @abstractmethod
    async def insert_per_diem(
        self,
        daily_rate: float,
        start_date: date,
        end_date: date,
        total_amount: float,
        per_diem_status_id: str
    ) -> PerDiem:
        """Insert a new per diem"""
        pass
    
    @abstractmethod
    async def update_per_diem(self, per_diem: PerDiem) -> PerDiem:
        """Update an existing per diem"""
        pass
    
    @abstractmethod
    async def update_per_diem_status(self, per_diem_id: str, status_id: str) -> PerDiem:
        """Update a per diem's status"""
        pass
    
    @abstractmethod
    async def delete_per_diem(self, per_diem_id: str) -> bool:
        """Delete a per diem by ID"""
        pass
    
    # Expense methods
    @abstractmethod
    async def get_expense(self, expense_id: str) -> Optional[Expense]:
        """Retrieve an expense by ID"""
        pass
    
    @abstractmethod
    async def get_expenses_by_per_diem(self, per_diem_id: str) -> List[Expense]:
        """Retrieve all expenses for a per diem"""
        pass
    
    @abstractmethod
    async def get_expenses_by_status(self, status_id: str) -> List[Expense]:
        """Retrieve expenses by status"""
        pass
    
    @abstractmethod
    async def get_expenses_by_category(self, category: str) -> List[Expense]:
        """Retrieve expenses by category"""
        pass
    
    @abstractmethod
    async def insert_expense(
        self,
        per_diem_id: str,
        category: str,
        amount: float,
        expense_date: date,
        status_id: str,
        receipt: Optional[str] = None,
        notes: Optional[str] = None
    ) -> Expense:
        """Insert a new expense"""
        pass
    
    @abstractmethod
    async def update_expense(self, expense: Expense) -> Expense:
        """Update an existing expense"""
        pass
    
    @abstractmethod
    async def update_expense_status(self, expense_id: str, status_id: str) -> Expense:
        """Update an expense's status"""
        pass
    
    @abstractmethod
    async def delete_expense(self, expense_id: str) -> bool:
        """Delete an expense by ID"""
        pass