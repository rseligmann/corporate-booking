# from sqlalchemy import Boolean, Column, Date, DateTime, Float, ForeignKey, Integer, String
# from sqlalchemy.orm import relationship
# from sqlalchemy.sql import func

# from ..base import Base

# class Trip(Base):
#     __tablename__ = 'trips'

#     # primary key
#     id = Column(String, primary_key=True)

#     # Multi-tenant tags
#     company_id = Column(String, ForeignKey('companies.id'), nullable=False)
#     user_id = Column(String, ForeignKey('users.id'), nullable=False)

#     # linked info
#     guest_profile_id = Column(String, ForeignKey('guest_profiles.id'), nullable=False)
#     guest_type_id = Column(String, nullable=False)
#     meeting_id = Column(String, ForeignKey('meetings.id'), nullable=False)

#     # flight_itinerary_id = Column(String, ForeignKey('flight_itinerary.id'), nullable=False)
#     # hotel_ininerary_id = Column(String, ForeignKey('hotels.id'), nullable=False)
#     # ground_itinerary_id = Column(String, ForeignKey('flight_itinerary.id'), nullable=False)
#     # per_diem_itinerary_id = Column(String, ForeignKey('per_diems.id'), nullable=True)

#     status = Column(String, ForeignKey('trip_statuses.id'), nullable=False)
#     total_budget = Column(Float, nullable=True)
#     actual_spend = Column(Float, nullable=True)

#     # timestamps
#     created_at = Column(DateTime, default=func.now(), nullable=False)
#     updated_at = Column(DateTime, default=func.now(), onupdate=func.now(), nullable=False)

#     #Relationships
#     company = relationship("Company", back_populates="trips")
#     user = relationship("User", back_populates="trips")
#     guest_profile = relationship("GuestProfile", back_populates="trips")
#     guest_type = relationship("GuestTypes", back_populates="trips")
#     meeting = relationship("Meeting", back_populates="trips")

#     # hotel = relationship("Hotel", back_populates="trips")
#     # per_diem = relationship("PerDiem", back_populates="trips")
#     # flight_itinerary = relationship("FlightItinerary", back_populates="trip")
#     # ground_transports = relationship("GroundTransport", back_populates="trip")

#     def __repr__(self):
#         return f"<Trip(id='{self.id}', guest_profile_id='{self.guest_profile_id}', guest_type='{self.guest_type}', status='{self.status}', meeting_id='{self.meeting_id}', hotel_id='{self.hotel_id}', per_diem_id='{self.per_diem_id}', created='{self.created}', modified='{self.modified}', created_by='{self.created_by}', total_budget='{self.total_budget}', actual_spend='{self.actual_spend}')>"
    
    
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

