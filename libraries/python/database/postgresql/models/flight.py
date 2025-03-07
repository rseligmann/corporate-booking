from sqlalchemy import Boolean, Column, DateTime, Float, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from ..base import Base

class FlightItinerary(Base):
    __tablename__ = 'flight_itineraries'

    id = Column(String, primary_key=True)
    trip_id = Column(String, ForeignKey('trips.id'), nullable=False)
    booking_reference = Column(String, nullable=True)
    price = Column(Float, nullable=True)
    booking_status_id = Column(String, ForeignKey('flight_itinerary_statuses.id'), nullable=False)
    itinerary_type = Column(String, nullable=True)
    is_direct = Column(Boolean, nullable=False, default=False)

    #Relationships
    trip = relationship("Trip", back_populates="flight_itinerary")
    status = relationship("FlightItineraryStatus", back_populates="flight_itineraries")
    legs = relationship("FlightLeg", back_populates="flight_itinerary")

    def __repr__(self):
        return f"<FlightItinerary(id='{self.id}', trip_id='{self.trip_id}', booking_reference='{self.booking_reference}', price='{self.price}', booking_status_id='{self.booking_status_id}', itinerary_type='{self.itinerary_type}', is_direct='{self.is_direct}')>"
    
class FlightItineraryStatus(Base):
    __tablename__ = 'flight_itinerary_statuses'

    id = Column(String, primary_key=True)
    code = Column(String, nullable=False)
    description = Column(String, nullable=False)
    is_active = Column(Boolean, nullable=False, default=True)
    display_order = Column(Integer, nullable=False)

    #Relationships
    flight_itineraries = relationship("FlightItinerary", back_populates="status")

    def __repr__(self):
        return f"<FlightItineraryStatus(id='{self.id}', code='{self.code}', description='{self.description}')>"

class FlightLeg(Base):
    __tablename__ = 'flight_legs'

    id = Column(String, primary_key=True)
    flight_itinerary_id = Column(String, ForeignKey('flight_itineraries.id'), nullable=False)
    leg_sequence = Column(String, nullable=False)
    flight_number = Column(String, nullable=False)
    airline_code = Column(String, nullable=False)
    flight_status_id = Column(String, ForeignKey('flight_leg_statuses.id'), nullable=False)
    departure_time = Column(DateTime, nullable=False)
    departure_airport = Column(String, nullable=False)
    departure_terminal = Column(String, nullable=True)
    departure_gate = Column(String, nullable=True)
    arrival_time = Column(DateTime, nullable=False)
    arrival_airport = Column(String, nullable=False)
    arrival_terminal = Column(String, nullable=True)
    arrival_gate = Column(String, nullable=True)

    #Relationships
    flight_itinerary = relationship("FlightItinerary", back_populates="legs")
    status = relationship("FlightLegStatus", back_populates="legs")

    def __repr__(self):
        return f"<FlightLeg(id='{self.id}', flight_itinerary_id='{self.flight_itinerary_id}', leg_sequence='{self.leg_sequence}', flight_number='{self.flight_number}', airline_code='{self.airline_code}', flight_status_id='{self.flight_status_id}', departure_time='{self.departure_time}', departure_airport='{self.departure_airport}', departure_terminal='{self.departure_terminal}', departure_gate='{self.departure_gate}', arrival_time='{self.arrival_time}', arrival_airport='{self.arrival_airport}', arrival_terminal='{self.arrival_terminal}', arrival_gate='{self.arrival_gate}')>"

class FlightLegStatus(Base):
    __tablename__ = 'flight_leg_statuses'

    id = Column(String, primary_key=True)
    code = Column(String, nullable=False)
    description = Column(String, nullable=False)
    is_active = Column(Boolean, nullable=False, default=True)
    display_order = Column(Integer, nullable=False)

    #Relationships
    legs = relationship("FlightLeg", back_populates="status")