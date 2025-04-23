from sqlalchemy import Boolean, Column, Date, DateTime, Float, ForeignKey, Integer, String, ARRAY
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from ..base import Base

class Trip(Base):
    __tablename__ = 'trips'

    # primary key
    id = Column(String, primary_key=True)

    # Multi-tenant tags
    company_id = Column(String, ForeignKey('companies.id'), nullable=False)
    user_id = Column(String, ForeignKey('users.id'), nullable=False)

    # linked info
    guest_profile_id = Column(String, ForeignKey('guest_profiles.id'), nullable=False)
    guest_type_on_trip_id = Column(String, ForeignKey('guest_types_on_trip.id'), nullable=False)
    itinerary_id = Column(String, ForeignKey('itineraries.id'), nullable=False)
    #meeting_id = Column(String, ForeignKey('meetings.id'), nullable=False)

    # flight_itinerary_id = Column(String, ForeignKey('flight_itinerary.id'), nullable=False)
    # hotel_ininerary_id = Column(String, ForeignKey('hotels.id'), nullable=False)
    # ground_itinerary_id = Column(String, ForeignKey('flight_itinerary.id'), nullable=False)
    # per_diem_itinerary_id = Column(String, ForeignKey('per_diems.id'), nullable=True)

    status = Column(String, nullable=False)
    estimated_budget = Column(Float, nullable=True)
    booked_budget = Column(Float, nullable=True)
    actual_spend = Column(Float, nullable=True)

    # timestamps
    created_at = Column(DateTime, default=func.now(), nullable=False)
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now(), nullable=False)

    #Relationships
    company = relationship("Company", back_populates="trips")
    user = relationship("User", back_populates="trips")
    guest_profile = relationship("GuestProfile", back_populates="trips")
    guest_type_on_trip = relationship("GuestTypesOnTrip", back_populates="trips")
    itinerary = relationship("Itinerary", back_populates='trip')
    # meeting = relationship("Meeting", back_populates="trips")

    # hotel = relationship("Hotel", back_populates="trips")
    # per_diem = relationship("PerDiem", back_populates="trips")
    # flight_itinerary = relationship("FlightItinerary", back_populates="trip")
    # ground_transports = relationship("GroundTransport", back_populates="trip")

    def __repr__(self):
        return f"""
            <Trip(id='{self.id}', 
            guest_profile_id='{self.guest_profile_id}', status='{self.status}', hotel_id='{self.hotel_id}', 
            per_diem_id='{self.per_diem_id}', created='{self.created_at}', modified='{self.modified_at}', 
            user_id='{self.user_id}', total_budget='{self.total_budget}', actual_spend='{self.actual_spend}')>"""
    
class Itinerary(Base):
    __tablename__ = 'itineraries'

    # primary key
    id = Column(String, primary_key=True)

    origin_city_id = Column(String, ForeignKey('cities.id'), nullable=False)
    origin_searched_airports = Column(ARRAY(String))
    destination_city_id = Column(String, ForeignKey('cities.id'), nullable=False)
    destination_searched_airports = Column(ARRAY(String))
    start_date = Column(DateTime)
    end_date = Column(DateTime)

    # timestamps
    created_at = Column(DateTime, default=func.now(), nullable=False)
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now(), nullable=False)

    #relationships
    trip = relationship("Trip", back_populates="itinerary")
    origin_city = relationship("City", foreign_keys=[origin_city_id])
    destination_city = relationship("City", foreign_keys=[destination_city_id])

    def __repr__(self):
        return f"""<Itinerary(id='{self.id}, origin_city_id={self.origin_city_id}, destination_city_id={self.destination_city_id}, 
        origin_searched_airports={self.origin_searched_airports}, destination_searched_airports={self.destination_searched_airports},
        start_date={self.start_date}. end_date={self.end_date})"""
    
    
    
# class Meeting(Base):
#     __tablename__ = 'meetings'

#     # primary key
#     id = Column(String, primary_key=True)

#     company_location_id = Column(String, ForeignKey('company_locations.id'), nullable=False)
#     start_date = Column(DateTime, nullable=False)
#     end_date = Column(DateTime, nullable=False)

#     # timestamps
#     created_at = Column(DateTime, default=func.now(), nullable=False)
#     updated_at = Column(DateTime, default=func.now(), onupdate=func.now(), nullable=False)

#     #relationships
#     trips = relationship("Trip", back_populates="meeting")
#     company_location = relationship("CompanyLocation", back_populates="meetings")

#     def __repr__(self):
#         return f"<Meeting(id='{self.id}', location_id='{self.company_location_id}', start_date='{self.start_date}', end_date='{self.end_date}')>"

