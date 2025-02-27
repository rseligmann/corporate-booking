from abc import ABC, abstractmethod
from typing import Optional, List
from datetime import datetime

from config_types.flight_types import FlightItinerary, FlightLeg

class FlightDB(ABC):
    """Interface for flight-related database operations."""
    
    @abstractmethod
    async def get_flight_itinerary(self, itinerary_id: str) -> Optional[FlightItinerary]:
        """Retrieve a flight itinerary by ID"""
        pass

    @abstractmethod
    async def get_flight_itineraries_by_trip(self, trip_id: str) -> List[FlightItinerary]:
        """Retrieve all flight itineraries for a trip"""
        pass

    @abstractmethod
    async def insert_flight_itinerary(
        self,
        trip_id: str,
        booking_status_id: str,
        is_direct: bool,
        booking_reference: Optional[str] = None,
        price: Optional[float] = None,
        itinerary_type: Optional[str] = None
    ) -> FlightItinerary:
        """Insert a new flight itinerary"""
        pass

    @abstractmethod
    async def update_flight_itinerary(self, itinerary: FlightItinerary) -> FlightItinerary:
        """Update an existing flight itinerary"""
        pass
    
    @abstractmethod
    async def get_flight_leg(self, leg_id: str) -> Optional[FlightLeg]:
        """Retrieve a flight leg by ID"""
        pass
    
    @abstractmethod
    async def get_flight_legs_by_itinerary(self, itinerary_id: str) -> List[FlightLeg]:
        """Retrieve all flight legs for a flight itinerary"""
        pass
    
    @abstractmethod
    async def insert_flight_leg(
        self,
        flight_itinerary_id: str,
        leg_sequence: str,
        flight_number: str,
        airline_code: str,
        flight_status_id: str,
        departure_time: datetime,
        departure_airport: str,
        arrival_time: datetime,
        arrival_airport: str,
        departure_terminal: Optional[str] = None,
        departure_gate: Optional[str] = None,
        arrival_terminal: Optional[str] = None,
        arrival_gate: Optional[str] = None
    ) -> FlightLeg:
        """Insert a new flight leg"""
        pass
    
    @abstractmethod
    async def update_flight_leg(self, leg: FlightLeg) -> FlightLeg:
        """Update an existing flight leg"""
        pass