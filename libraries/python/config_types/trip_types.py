# from abc import ABC
# from datetime import date, datetime
# from typing import Optional

# class Trip(ABC):
#     def __init__(self,
#                 trip_id: str,
#                 admin_id: str,
#                 guest_profile_id: str,
#                 guest_type: str,
#                 status_id: str,
#                 guest_type_preferences_id: str,
#                 meeting_id: str,
#                 hotel_id: Optional[str],
#                 per_diem_id: Optional[str],
#                 created: date,
#                 modified: date,
#                 created_by: str,
#                 total_budget: Optional[float],
#                 actual_spend: Optional[float]):
#         self.trip_id                  = trip_id
#         self.admin_id                 = admin_id
#         self.guest_profile_id         = guest_profile_id
#         self.guest_type               = guest_type
#         self.status_id                   = status_id
#         self.guest_type_preferences_id = guest_type_preferences_id
#         self.meeting_id               = meeting_id
#         self.hotel_id                 = hotel_id
#         self.per_diem_id              = per_diem_id
#         self.created                  = created
#         self.modified                 = modified
#         self.created_by               = created_by
#         self.total_budget             = total_budget
#         self.actual_spend             = actual_spend
    
#     def __str__(self) -> str:
#         return f"""Trip:
#                    ID: {self.trip_id}
#                    Guest Profile: {self.guest_profile_id}
#                    Guest Type: {self.guest_type}
#                    Status: {self.status}
#                    Meeting: {self.meeting_id}
#                    Hotel: {self.hotel_id or 'Not booked'}
#                    Per Diem: {self.per_diem_id or 'Not set'}
#                    Budget: ${self.total_budget:.2f if self.total_budget else 'N/A'}
#                    Actual Spend: ${self.actual_spend:.2f if self.actual_spend else 'N/A'}
#                    Created: {self.created} by {self.created_by}
#                    Last Modified: {self.modified}
#                    Admin: {self.admin_id}"""
    
# class Meeting(ABC):
#     def __init__(self,
#                 meeting_id: str,
#                 address_id: str,
#                 location: str,
#                 start_date: datetime,
#                 end_date: datetime):
#         self.meeting_id = meeting_id
#         self.address_id = address_id
#         self.location   = location
#         self.start_date = start_date
#         self.end_date   = end_date
    
#     def __str__(self) -> str:
#         return f"""Meeting:
#                    Location: {self.location}
#                    Dates: {self.start_date} to {self.end_date}"""