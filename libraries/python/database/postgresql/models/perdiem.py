# from sqlalchemy import Boolean, Column, Date, Float, ForeignKey, Integer, String
# from sqlalchemy.orm import relationship

# from ..base import Base

# class PerDiem(Base):
#     __tablename__ = 'per_diems'

#     id = Column(String, primary_key=True)
#     daily_rate = Column(Float, nullable=False)
#     start_date = Column(Date, nullable=False)
#     end_date = Column(Date, nullable=False)
#     total_amount = Column(Float, nullable=False)
#     per_diem_status_id = Column(String, ForeignKey('per_diem_statuses.id'), nullable=False)

#     #Relationships
#     status = relationship("PerDiemStatus", back_populates="per_diems")
#     expenses = relationship("Expense", back_populates="per_diem")
#     trips = relationship("Trip", back_populates="per_diem")

#     def __repr__(self):
#         return f"<PerDiem(id='{self.id}', daily_rate='{self.daily_rate}', start_date='{self.start_date}', end_date='{self.end_date}', total_amount='{self.total_amount}', per_diem_status_id='{self.per_diem_status_id}')>"

# class PerDiemStatus(Base):
#     __tablename__ = 'per_diem_statuses'

#     id = Column(String, primary_key=True)
#     code = Column(String, nullable=False)
#     description = Column(String, nullable=False)
#     is_active = Column(Boolean, nullable=False, default=True)
#     display_order = Column(Integer, nullable=False)

#     #Relationships
#     per_diems = relationship("PerDiem", back_populates="status")

#     def __repr__(self):
#         return f"<PerDiemStatus(id='{self.id}', code='{self.code}', description='{self.description}')>"

# class Expense(Base):
#     __tablename__ = 'expenses'

#     id = Column(String, primary_key=True)
#     per_diem_id = Column(String, ForeignKey('per_diems.id'), nullable=False)
#     category = Column(String, nullable=False)
#     amount = Column(Float, nullable=False)
#     date = Column(Date, nullable=False)
#     receipt = Column(String, nullable=True)
#     status_id = Column(String, ForeignKey('expense_statuses.id'), nullable=False)
#     notes = Column(String, nullable=True)

#     #Relationships
#     per_diem = relationship("PerDiem", back_populates="expenses")
#     status = relationship("ExpenseStatus", back_populates="expenses")

#     def __repr__(self):
#         return f"<Expense(id='{self.id}', per_diem_id='{self.per_diem_id}', category='{self.category}', amount='{self.amount}', date='{self.date}', receipt='{self.receipt}', status_id='{self.status_id}', notes='{self.notes}')>"

# class ExpenseStatus(Base):
#     __tablename__ = 'expense_statuses'

#     id = Column(String, primary_key=True)
#     code = Column(String, nullable=False)
#     description = Column(String, nullable=False)
#     is_active = Column(Boolean, nullable=False, default=True)
#     display_order = Column(Integer, nullable=False)

#     #Relationships
#     expenses = relationship("Expense", back_populates="status")

#     def __repr__(self):
#         return f"<ExpenseStatus(id='{self.id}', code='{self.code}', description='{self.description}')>"