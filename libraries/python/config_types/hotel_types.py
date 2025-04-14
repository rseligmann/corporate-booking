# from abc import ABC
# from datetime import datetime
# from typing import Optional

# class Hotel(ABC):
#     def __init__(self,
#                 hotel_id: str,
#                 address_id: str,
#                 rating_id: str,
#                 booking_reference: Optional[str],
#                 name: str,
#                 room_type: str,
#                 price: float,
#                 booking_status_id: str,
#                 check_in: datetime,
#                 check_out: datetime):
#         self.hotel_id          = hotel_id
#         self.address_id        = address_id
#         self.rating_id         = rating_id
#         self.booking_reference = booking_reference
#         self.name              = name
#         self.room_type         = room_type
#         self.price             = price
#         self.booking_status_id = booking_status_id
#         self.check_in          = check_in
#         self.check_out         = check_out
    
#     def __str__(self) -> str:
#         return f"""Hotel:
#                    Name: {self.name}
#                    Room Type: {self.room_type}
#                    Rating: {self.rating_id}
#                    Booking Reference: {self.booking_reference or 'N/A'}
#                    Price: ${self.price:.2f}
#                    Status: {self.booking_status_id}
#                    Check-in: {self.check_in}
#                    Check-out: {self.check_out}"""