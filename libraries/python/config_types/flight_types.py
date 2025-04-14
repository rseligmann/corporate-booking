# from abc import ABC
# from datetime import datetime
# from typing import Optional


# class FlightItinerary(ABC):
#     def __init__(self,
#                 itinerary_id: str,
#                 trip_id: str,
#                 booking_reference: Optional[str],
#                 price: Optional[float],
#                 booking_status_id: str,
#                 itinerary_type: Optional[str],
#                 is_direct: bool):
#         self.itinerary_id      = itinerary_id
#         self.trip_id           = trip_id
#         self.booking_reference = booking_reference
#         self.price             = price
#         self.booking_status_id = booking_status_id
#         self.itinerary_type    = itinerary_type
#         self.is_direct         = is_direct
    
#     def __str__(self) -> str:
#         return f"""Flight Itinerary:
#                    Booking Reference: {self.booking_reference or 'N/A'}
#                    Price: ${self.price:.2f if self.price else 'N/A'}
#                    Status: {self.booking_status_id}
#                    Type: {self.itinerary_type or 'N/A'}
#                    Direct Flight: {'Yes' if self.is_direct else 'No'}"""
    
# class FlightLeg(ABC):
#     def __init__(self,
#                 leg_id: str,
#                 flight_itinerary_id: str,
#                 leg_sequence: str,
#                 flight_number: str,
#                 airline_code: str,
#                 flight_status_id: str,
#                 departure_time: datetime,
#                 departure_airport: str,
#                 departure_terminal: Optional[str],
#                 departure_gate: Optional[str],
#                 arrival_time: datetime,
#                 arrival_airport: str,
#                 arrival_terminal: Optional[str],
#                 arrival_gate: Optional[str]):
#         self.leg_id               = leg_id
#         self.flight_itinerary_id  = flight_itinerary_id
#         self.leg_sequence         = leg_sequence
#         self.flight_number        = flight_number
#         self.airline_code         = airline_code
#         self.flight_status_id     = flight_status_id
#         self.departure_time       = departure_time
#         self.departure_airport    = departure_airport
#         self.departure_terminal   = departure_terminal
#         self.departure_gate       = departure_gate
#         self.arrival_time         = arrival_time
#         self.arrival_airport      = arrival_airport
#         self.arrival_terminal     = arrival_terminal
#         self.arrival_gate         = arrival_gate
    
#     def __str__(self) -> str:
#         return f"""Flight Leg:
#                    Flight: {self.airline_code} {self.flight_number}
#                    From: {self.departure_airport} ({self.departure_terminal or 'N/A'}, Gate {self.departure_gate or 'N/A'})
#                    To: {self.arrival_airport} ({self.arrival_terminal or 'N/A'}, Gate {self.arrival_gate or 'N/A'})
#                    Departure: {self.departure_time}
#                    Arrival: {self.arrival_time}
#                    Status: {self.flight_status_id}"""