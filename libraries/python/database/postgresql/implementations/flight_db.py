from typing import Optional, List
from sqlalchemy import select
from uuid import uuid4
from datetime import datetime

from config_types.flight_types import FlightItinerary, FlightLeg
from config_db.interfaces.flight_db import FlightDB
from database.postgresql.models import FlightItinerary as DBFlightItinerary
from database.postgresql.models import FlightLeg as DBFlightLeg

class PostgreSQLFlightDB(FlightDB):
    """PostgreSQL implementation of FlightDB interface.""" 

    async def get_flight_itinerary(self, itinerary_id: str) -> Optional[FlightItinerary]:
        with self.Session() as session:
            stmt = select(DBFlightItinerary).where(DBFlightItinerary.id == itinerary_id)
            result = session.execute(stmt)
            db_itinerary = result.scalar_one_or_none()
            
            if not db_itinerary:
                return None
                
            return FlightItinerary(
                itinerary_id=db_itinerary.id,
                trip_id=db_itinerary.trip_id,
                booking_status_id=db_itinerary.booking_status_id,
                is_direct=db_itinerary.is_direct,
                booking_reference=db_itinerary.booking_reference,
                price=db_itinerary.price,
                itinerary_type=db_itinerary.itinerary_type
            )
    async def get_flight_itineraries_by_trip(self, trip_id: str) -> List[FlightItinerary]:
        with self.Session() as session:
            stmt = select(DBFlightItinerary).where(DBFlightItinerary.trip_id == trip_id)
            result = session.execute(stmt)
            db_itineraries = result.scalars().all()
            
            return [
                FlightItinerary(
                    itinerary_id=db_itinerary.id,
                    trip_id=db_itinerary.trip_id,
                    booking_status_id=db_itinerary.booking_status_id,
                    is_direct=db_itinerary.is_direct,
                    booking_reference=db_itinerary.booking_reference,
                    price=db_itinerary.price,
                    itinerary_type=db_itinerary.itinerary_type
                ) for db_itinerary in db_itineraries
            ]
    
    async def insert_flight_itinerary(
        self,
        trip_id: str,
        booking_status_id: str,
        is_direct: bool,
        booking_reference: Optional[str] = None,
        price: Optional[float] = None,
        itinerary_type: Optional[str] = None
    ) -> FlightItinerary:
        with self.Session() as session:
            db_itinerary = DBFlightItinerary(
                id=str(uuid4()),
                trip_id=trip_id,
                booking_status_id=booking_status_id,
                is_direct=is_direct,
                booking_reference=booking_reference,
                price=price,
                itinerary_type=itinerary_type
            )
            session.add(db_itinerary)
            session.commit()
            
            return FlightItinerary(
                itinerary_id=db_itinerary.id,
                trip_id=db_itinerary.trip_id,
                booking_status_id=db_itinerary.booking_status_id,
                is_direct=db_itinerary.is_direct,
                booking_reference=db_itinerary.booking_reference,
                price=db_itinerary.price,
                itinerary_type=db_itinerary.itinerary_type
            )
    
    async def update_flight_itinerary(self, itinerary: FlightItinerary) -> FlightItinerary:
        with self.Session() as session:
            stmt = select(DBFlightItinerary).where(DBFlightItinerary.id == itinerary.itinerary_id)
            result = session.execute(stmt)
            db_itinerary = result.scalar_one()
            
            db_itinerary.trip_id = itinerary.trip_id
            db_itinerary.booking_status_id = itinerary.booking_status_id
            db_itinerary.is_direct = itinerary.is_direct
            db_itinerary.booking_reference = itinerary.booking_reference
            db_itinerary.price = itinerary.price
            db_itinerary.itinerary_type = itinerary.itinerary_type
            
            session.commit()
            
            return FlightItinerary(
                itinerary_id=db_itinerary.id,
                trip_id=db_itinerary.trip_id,
                booking_status_id=db_itinerary.booking_status_id,
                is_direct=db_itinerary.is_direct,
                booking_reference=db_itinerary.booking_reference,
                price=db_itinerary.price,
                itinerary_type=db_itinerary.itinerary_type
            )
    
    async def get_flight_leg(self, leg_id: str) -> Optional[FlightLeg]:
        with self.Session() as session:
            stmt = select(DBFlightLeg).where(DBFlightLeg.id == leg_id)
            result = session.execute(stmt)
            db_leg = result.scalar_one_or_none()
            
            if not db_leg:
                return None
                
            return FlightLeg(
                leg_id=db_leg.id,
                flight_itinerary_id=db_leg.flight_itinerary_id,
                leg_sequence=db_leg.leg_sequence,
                flight_number=db_leg.flight_number,
                airline_code=db_leg.airline_code,
                flight_status_id=db_leg.flight_status_id,
                departure_time=db_leg.departure_time,
                departure_airport=db_leg.departure_airport,
                departure_terminal=db_leg.departure_terminal,
                departure_gate=db_leg.departure_gate,
                arrival_time=db_leg.arrival_time,
                arrival_airport=db_leg.arrival_airport,
                arrival_terminal=db_leg.arrival_terminal,
                arrival_gate=db_leg.arrival_gate
            )
        
    async def get_flight_legs_by_itinerary(self, itinerary_id: str) -> List[FlightLeg]:
        with self.Session() as session:
            stmt = select(DBFlightLeg).where(DBFlightLeg.flight_itinerary_id == itinerary_id)
            result = session.execute(stmt)
            db_legs = result.scalars().all()
            
            return [
                FlightLeg(
                    leg_id=db_leg.id,
                    flight_itinerary_id=db_leg.flight_itinerary_id,
                    leg_sequence=db_leg.leg_sequence,
                    flight_number=db_leg.flight_number,
                    airline_code=db_leg.airline_code,
                    flight_status_id=db_leg.flight_status_id,
                    departure_time=db_leg.departure_time,
                    departure_airport=db_leg.departure_airport,
                    departure_terminal=db_leg.departure_terminal,
                    departure_gate=db_leg.departure_gate,
                    arrival_time=db_leg.arrival_time,
                    arrival_airport=db_leg.arrival_airport,
                    arrival_terminal=db_leg.arrival_terminal,
                    arrival_gate=db_leg.arrival_gate
                ) for db_leg in db_legs
            ]
    
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
        with self.Session() as session:
            db_leg = DBFlightLeg(
                id=str(uuid4()),
                flight_itinerary_id=flight_itinerary_id,
                leg_sequence=leg_sequence,
                flight_number=flight_number,
                airline_code=airline_code,
                flight_status_id=flight_status_id,
                departure_time=departure_time,
                departure_airport=departure_airport,
                departure_terminal=departure_terminal,
                departure_gate=departure_gate,
                arrival_time=arrival_time,
                arrival_airport=arrival_airport,
                arrival_terminal=arrival_terminal,
                arrival_gate=arrival_gate
            )
            session.add(db_leg)
            session.commit()
            
            return FlightLeg(
                leg_id=db_leg.id,
                flight_itinerary_id=db_leg.flight_itinerary_id,
                leg_sequence=db_leg.leg_sequence,
                flight_number=db_leg.flight_number,
                airline_code=db_leg.airline_code,
                flight_status_id=db_leg.flight_status_id,
                departure_time=db_leg.departure_time,
                departure_airport=db_leg.departure_airport,
                departure_terminal=db_leg.departure_terminal,
                departure_gate=db_leg.departure_gate,
                arrival_time=db_leg.arrival_time,
                arrival_airport=db_leg.arrival_airport,
                arrival_terminal=db_leg.arrival_terminal,
                arrival_gate=db_leg.arrival_gate
            )
    
    async def update_flight_leg(self, leg: FlightLeg) -> FlightLeg:
        with self.Session() as session:
            stmt = select(DBFlightLeg).where(DBFlightLeg.id == leg.leg_id)
            result = session.execute(stmt)
            db_leg = result.scalar_one()
            
            db_leg.flight_itinerary_id = leg.flight_itinerary_id
            db_leg.leg_sequence = leg.leg_sequence
            db_leg.flight_number = leg.flight_number
            db_leg.airline_code = leg.airline_code
            db_leg.flight_status_id = leg.flight_status_id
            db_leg.departure_time = leg.departure_time
            db_leg.departure_airport = leg.departure_airport
            db_leg.departure_terminal = leg.departure_terminal
            db_leg.departure_gate = leg.departure_gate
            db_leg.arrival_time = leg.arrival_time
            db_leg.arrival_airport = leg.arrival_airport
            db_leg.arrival_terminal = leg.arrival_terminal
            db_leg.arrival_gate = leg.arrival_gate
            
            session.commit()
            
            return FlightLeg(
                leg_id=db_leg.id,
                flight_itinerary_id=db_leg.flight_itinerary_id,
                leg_sequence=db_leg.leg_sequence,
                flight_number=db_leg.flight_number,
                airline_code=db_leg.airline_code,
                flight_status_id=db_leg.flight_status_id,
                departure_time=db_leg.departure_time,
                departure_airport=db_leg.departure_airport,
                departure_terminal=db_leg.departure_terminal,
                departure_gate=db_leg.departure_gate,
                arrival_time=db_leg.arrival_time,
                arrival_airport=db_leg.arrival_airport,
                arrival_terminal=db_leg.arrival_terminal,
                arrival_gate=db_leg.arrival_gate
            )