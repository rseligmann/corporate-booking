from typing import Optional, List
from datetime import date
from sqlalchemy import select
from uuid import uuid4

from config_types.perdiem_types import PerDiem, Expense
from config_db.interfaces.perdiem_db import PerDiemDB
from database.postgresql.models import PerDiem as DBPerDiem
from database.postgresql.models import Expense as DBExpense
from database.postgresql.models import Trip as DBTrip

class PostgreSQLPerDiemDB(PerDiemDB):
    """PostgreSQL implementation of ExpenseDB interface."""
    
    # Per Diem methods
    async def get_per_diem(self, per_diem_id: str) -> Optional[PerDiem]:
        with self.Session() as session:
            stmt = select(DBPerDiem).where(DBPerDiem.id == per_diem_id)
            result = session.execute(stmt)
            db_per_diem = result.scalar_one_or_none()
            
            if not db_per_diem:
                return None
                
            return PerDiem(
                per_diem_id=db_per_diem.id,
                daily_rate=db_per_diem.daily_rate,
                start_date=db_per_diem.start_date,
                end_date=db_per_diem.end_date,
                total_amount=db_per_diem.total_amount,
                per_diem_status_id=db_per_diem.per_diem_status_id
            )
    
    async def get_per_diem_by_trip(self, trip_id: str) -> Optional[PerDiem]:
        with self.Session() as session:
            # Find the per_diem_id from the trip first
            trip_stmt = select(DBTrip.per_diem_id).where(DBTrip.id == trip_id)
            result = session.execute(trip_stmt)
            per_diem_id = result.scalar_one_or_none()
            
            if not per_diem_id:
                return None
            
            # Then get the per diem
            per_diem_stmt = select(DBPerDiem).where(DBPerDiem.id == per_diem_id)
            result = session.execute(per_diem_stmt)
            db_per_diem = result.scalar_one_or_none()
            
            if not db_per_diem:
                return None
                
            return PerDiem(
                per_diem_id=db_per_diem.id,
                daily_rate=db_per_diem.daily_rate,
                start_date=db_per_diem.start_date,
                end_date=db_per_diem.end_date,
                total_amount=db_per_diem.total_amount,
                per_diem_status_id=db_per_diem.per_diem_status_id
            )
    
    async def insert_per_diem(
        self,
        daily_rate: float,
        start_date: date,
        end_date: date,
        total_amount: float,
        per_diem_status_id: str
    ) -> PerDiem:
        with self.Session() as session:
            db_per_diem = DBPerDiem(
                id=str(uuid4()),
                daily_rate=daily_rate,
                start_date=start_date,
                end_date=end_date,
                total_amount=total_amount,
                per_diem_status_id=per_diem_status_id
            )
            session.add(db_per_diem)
            session.commit()
            
            return PerDiem(
                per_diem_id=db_per_diem.id,
                daily_rate=db_per_diem.daily_rate,
                start_date=db_per_diem.start_date,
                end_date=db_per_diem.end_date,
                total_amount=db_per_diem.total_amount,
                per_diem_status_id=db_per_diem.per_diem_status_id
            )
    
    async def update_per_diem(self, per_diem: PerDiem) -> PerDiem:
        with self.Session() as session:
            stmt = select(DBPerDiem).where(DBPerDiem.id == per_diem.per_diem_id)
            result = session.execute(stmt)
            db_per_diem = result.scalar_one_or_none()
            
            if not db_per_diem:
                raise ValueError(f"Per diem with ID {per_diem.per_diem_id} not found")
                
            db_per_diem.daily_rate = per_diem.daily_rate
            db_per_diem.start_date = per_diem.start_date
            db_per_diem.end_date = per_diem.end_date
            db_per_diem.total_amount = per_diem.total_amount
            db_per_diem.per_diem_status_id = per_diem.per_diem_status_id
            
            session.commit()
            
            return per_diem
    
    async def update_per_diem_status(self, per_diem_id: str, status_id: str) -> PerDiem:
        with self.Session() as session:
            stmt = select(DBPerDiem).where(DBPerDiem.id == per_diem_id)
            result = session.execute(stmt)
            db_per_diem = result.scalar_one_or_none()
            
            if not db_per_diem:
                raise ValueError(f"Per diem with ID {per_diem_id} not found")
                
            db_per_diem.per_diem_status_id = status_id
            session.commit()
            
            return PerDiem(
                per_diem_id=db_per_diem.id,
                daily_rate=db_per_diem.daily_rate,
                start_date=db_per_diem.start_date,
                end_date=db_per_diem.end_date,
                total_amount=db_per_diem.total_amount,
                per_diem_status_id=db_per_diem.per_diem_status_id
            )
    
    async def delete_per_diem(self, per_diem_id: str) -> bool:
        with self.Session() as session:
            stmt = select(DBPerDiem).where(DBPerDiem.id == per_diem_id)
            result = session.execute(stmt)
            db_per_diem = result.scalar_one_or_none()
            
            if not db_per_diem:
                return False
                
            session.delete(db_per_diem)
            session.commit()
            
            return True
    
    # Expense methods
    async def get_expense(self, expense_id: str) -> Optional[Expense]:
        with self.Session() as session:
            stmt = select(DBExpense).where(DBExpense.id == expense_id)
            result = session.execute(stmt)
            db_expense = result.scalar_one_or_none()
            
            if not db_expense:
                return None
                
            return Expense(
                expense_id=db_expense.id,
                per_diem_id=db_expense.per_diem_id,
                category=db_expense.category,
                amount=db_expense.amount,
                date=db_expense.date,
                receipt=db_expense.receipt,
                status_id=db_expense.status_id,
                notes=db_expense.notes
            )
    
    async def get_expenses_by_per_diem(self, per_diem_id: str) -> List[Expense]:
        with self.Session() as session:
            stmt = select(DBExpense).where(DBExpense.per_diem_id == per_diem_id)
            result = session.execute(stmt)
            db_expenses = result.scalars().all()
            
            return [
                Expense(
                    expense_id=db_expense.id,
                    per_diem_id=db_expense.per_diem_id,
                    category=db_expense.category,
                    amount=db_expense.amount,
                    date=db_expense.date,
                    receipt=db_expense.receipt,
                    status_id=db_expense.status_id,
                    notes=db_expense.notes
                )
                for db_expense in db_expenses
            ]
    
    async def get_expenses_by_status(self, status_id: str) -> List[Expense]:
        with self.Session() as session:
            stmt = select(DBExpense).where(DBExpense.status_id == status_id)
            result = session.execute(stmt)
            db_expenses = result.scalars().all()
            
            return [
                Expense(
                    expense_id=db_expense.id,
                    per_diem_id=db_expense.per_diem_id,
                    category=db_expense.category,
                    amount=db_expense.amount,
                    date=db_expense.date,
                    receipt=db_expense.receipt,
                    status_id=db_expense.status_id,
                    notes=db_expense.notes
                )
                for db_expense in db_expenses
            ]
    
    async def get_expenses_by_category(self, category: str) -> List[Expense]:
        with self.Session() as session:
            stmt = select(DBExpense).where(DBExpense.category == category)
            result = session.execute(stmt)
            db_expenses = result.scalars().all()
            
            return [
                Expense(
                    expense_id=db_expense.id,
                    per_diem_id=db_expense.per_diem_id,
                    category=db_expense.category,
                    amount=db_expense.amount,
                    date=db_expense.date,
                    receipt=db_expense.receipt,
                    status_id=db_expense.status_id,
                    notes=db_expense.notes
                )
                for db_expense in db_expenses
            ]
    
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
        with self.Session() as session:
            db_expense = DBExpense(
                id=str(uuid4()),
                per_diem_id=per_diem_id,
                category=category,
                amount=amount,
                date=expense_date,
                receipt=receipt,
                status_id=status_id,
                notes=notes
            )
            session.add(db_expense)
            session.commit()
            
            return Expense(
                expense_id=db_expense.id,
                per_diem_id=db_expense.per_diem_id,
                category=db_expense.category,
                amount=db_expense.amount,
                date=db_expense.date,
                receipt=db_expense.receipt,
                status_id=db_expense.status_id,
                notes=db_expense.notes
            )
    
    async def update_expense(self, expense: Expense) -> Expense:
        with self.Session() as session:
            stmt = select(DBExpense).where(DBExpense.id == expense.expense_id)
            result = session.execute(stmt)
            db_expense = result.scalar_one_or_none()
            
            if not db_expense:
                raise ValueError(f"Expense with ID {expense.expense_id} not found")
                
            db_expense.per_diem_id = expense.per_diem_id
            db_expense.category = expense.category
            db_expense.amount = expense.amount
            db_expense.date = expense.date
            db_expense.receipt = expense.receipt
            db_expense.status_id = expense.status_id
            db_expense.notes = expense.notes
            
            session.commit()
            
            return expense
    
    async def update_expense_status(self, expense_id: str, status_id: str) -> Expense:
        with self.Session() as session:
            stmt = select(DBExpense).where(DBExpense.id == expense_id)
            result = session.execute(stmt)
            db_expense = result.scalar_one_or_none()
            
            if not db_expense:
                raise ValueError(f"Expense with ID {expense_id} not found")
                
            db_expense.status_id = status_id
            session.commit()
            
            return Expense(
                expense_id=db_expense.id,
                per_diem_id=db_expense.per_diem_id,
                category=db_expense.category,
                amount=db_expense.amount,
                date=db_expense.date,
                receipt=db_expense.receipt,
                status_id=db_expense.status_id,
                notes=db_expense.notes
            )
    
    async def delete_expense(self, expense_id: str) -> bool:
        with self.Session() as session:
            stmt = select(DBExpense).where(DBExpense.id == expense_id)
            result = session.execute(stmt)
            db_expense = result.scalar_one_or_none()
            
            if not db_expense:
                return False
                
            session.delete(db_expense)
            session.commit()
            
            return True