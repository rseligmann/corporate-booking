# from abc import ABC
# from datetime import date
# from typing import Optional

# class PerDiem(ABC):
#     def __init__(self,
#                 per_diem_id: str,
#                 daily_rate: float,
#                 start_date: date,
#                 end_date: date,
#                 total_amount: float,
#                 per_diem_status_id: str):
#         self.per_diem_id       = per_diem_id
#         self.daily_rate        = daily_rate
#         self.start_date        = start_date
#         self.end_date          = end_date
#         self.total_amount      = total_amount
#         self.per_diem_status_id = per_diem_status_id
    
#     def __str__(self) -> str:
#         return f"""Per Diem:
#                    Daily Rate: ${self.daily_rate:.2f}
#                    Dates: {self.start_date} to {self.end_date}
#                    Total Amount: ${self.total_amount:.2f}
#                    Status: {self.per_diem_status_id}"""

# class Expense(ABC):
#     def __init__(self,
#                 expense_id: str,
#                 per_diem_id: str,
#                 category: str,
#                 amount: float,
#                 date: date,
#                 receipt: Optional[str],
#                 status_id: str,
#                 notes: Optional[str]):
#         self.expense_id  = expense_id
#         self.per_diem_id = per_diem_id
#         self.category    = category
#         self.amount      = amount
#         self.date        = date
#         self.receipt     = receipt
#         self.status_id   = status_id
#         self.notes       = notes
    
#     def __str__(self) -> str:
#         return f"""Expense:
#                    Category: {self.category}
#                    Amount: ${self.amount:.2f}
#                    Date: {self.date}
#                    Receipt: {'Available' if self.receipt else 'N/A'}
#                    Status: {self.status_id}
#                    Notes: {self.notes or 'N/A'}"""