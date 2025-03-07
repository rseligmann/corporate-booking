from sqlalchemy import Boolean, Column, Date, DateTime, Float, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from ..base import Base

class Trip(Base):
    __tablename__ = 'trips'

    id = Column(String, primary_key=True)
    admin_id = Column(String, ForeignKey('admins.id'), nullable=False)
    guest_profile_id = Column(String, ForeignKey('guest_profiles.id'), nullable=False)
    guest_type = Column(String, nullable=False)
    status_id = Column(String, ForeignKey('trip_statuses.id'), nullable=False)
    guest_type_preferences_id = Column(String, ForeignKey('guest_type_preferences.id'), nullable=False)
    meeting_id = Column(String, ForeignKey('meetings.id'), nullable=False)
    hotel_id = Column(String, ForeignKey('hotels.id'), nullable=False)
    per_diem_id = Column(String, ForeignKey('per_diems.id'), nullable=True)
    created = Column(Date, nullable=False)
    modified = Column(Date, nullable=False)
    created_by = Column(String, nullable=False)
    total_budget = Column(Float, nullable=True)
    actual_spend = Column(Float, nullable=True)

    #Relationships
    guest_profile = relationship("GuestProfile", back_populates="trips")
    guest_type_preferences = relationship("GuestTypePreferences", back_populates="trips")
    meeting = relationship("Meeting", back_populates="trips")
    hotel = relationship("Hotel", back_populates="trips")
    per_diem = relationship("PerDiem", back_populates="trips")
    admin = relationship("Admin", back_populates="trips")
    flight_itinerary = relationship("FlightItinerary", back_populates="trip")
    ground_transports = relationship("GroundTransport", back_populates="trip")
    status = relationship("TripStatus", back_populates="trips")

    def __repr__(self):
        return f"<Trip(id='{self.id}', guest_profile_id='{self.guest_profile_id}', guest_type='{self.guest_type}', status='{self.status}', meeting_id='{self.meeting_id}', hotel_id='{self.hotel_id}', per_diem_id='{self.per_diem_id}', created='{self.created}', modified='{self.modified}', created_by='{self.created_by}', total_budget='{self.total_budget}', actual_spend='{self.actual_spend}')>"
    
class TripStatus(Base):
    __tablename__ = 'trip_statuses'

    id = Column(String, primary_key=True)
    code = Column(String, nullable=False)
    description = Column(String, nullable=False)
    is_active = Column(Boolean, nullable=False, default=True)
    display_order = Column(Integer, nullable=False)

    #Relationships
    trips = relationship("Trip", back_populates="status")

    def __repr__(self):
        return f"<TripStatus(id='{self.id}', code='{self.code}', description='{self.description}')>"
    
class Meeting(Base):
    __tablename__ = 'meetings'

    id = Column(String, primary_key=True)
    address_id = Column(String, ForeignKey('addresses.id'), nullable=False)
    location = Column(String, nullable=False)
    start_date = Column(DateTime, nullable=False)
    end_date = Column(DateTime, nullable=False)

    #relationships
    address = relationship("Address", back_populates="meetings")
    trips = relationship("Trip", back_populates="meeting")

    def __repr__(self):
        return f"<Meeting(id='{self.id}', address_id='{self.address_id}', location='{self.location}', start_date='{self.start_date}', end_date='{self.end_date}')>"

