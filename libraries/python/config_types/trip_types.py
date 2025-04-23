from abc import ABC
from datetime import date, datetime
from typing import Optional, List

class Trip(ABC):
    def __init__(self,
                trip_id: str,
                company_id: str,
                user_id: str,
                guest_profile_id: str,
                guest_type_on_trip_id: str,
                itinerary_id: str,
                status: str,
                # meeting_id: str,
                # hotel_id: Optional[str],
                # per_diem_id: Optional[str],
                estimated_budget: Optional[float],
                booked_budget: Optional[float],
                actual_spend: Optional[float],
                date_created: datetime,
                date_updated: datetime):
        self.trip_id                  = trip_id
        self.company_id               = company_id
        self.user_id                  = user_id
        self.guest_profile_id         = guest_profile_id
        self.guest_type_on_trip_id    = guest_type_on_trip_id
        self.itinerary_id             = itinerary_id
        self.status                   = status
        self.estimated_budget         = estimated_budget
        self.booked_budget            = booked_budget
        self.actual_spend             = actual_spend
        self.date_created             = date_created
        self.date_updated             = date_updated
        
    
    def __str__(self) -> str:
        return f"""Trip:
                   ID: {self.trip_id}
                   Guest Profile: {self.guest_profile_id}
                   Guest Type: {self.guest_type_on_trip_id}
                   Status: {self.status}
                   Estimated Budget: ${self.estimated_budget or 'N/A'}
                   Booked Budget: ${self.booked_budget or 'N/A'}
                   Actual Spend: ${self.actual_spend or 'N/A'}
                   Created: {self.date_created}
                   Last Modified: {self.date_updated}
                   User: {self.user_id}
                   Company: {self.company_id}"""
    
class Itinerary(ABC):
    def __init__(self,
                 itinerary_id: str,
                 origin_city_id: str,
                 origin_searched_airports: List[str],
                 destination_city_id: str,
                 destination_searched_airports: List[str],
                 start_date: datetime,
                 end_date: datetime,
                 date_created: datetime,
                 date_updated: datetime):
        self.itinerary_id = itinerary_id
        self.origin_city_id = origin_city_id
        self.origin_searched_airports = origin_searched_airports
        self.destination_city_id = destination_city_id
        self.destination_searched_airports = destination_searched_airports
        self.start_date = start_date,
        self.end_date = end_date,
        self.date_created = date_created
        self.date_updated = date_updated

    def __str__(self) -> str:
        return f"""Itinerary Details:
                       ID: {self.itinerary_id}
                       Origin City ID: {self.origin_city_id}
                       Origin Searched Airports {self.origin_searched_airports}
                       Destination City ID: {self.destination_city_id}
                       Destination Searched Airports {self.destination_searched_airports}
                       Start Date: {self.start_date}
                       End Date: {self.end_date}
                       Created: {self.date_created}
                       Updated: {self.date_updated}
                       """
    
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