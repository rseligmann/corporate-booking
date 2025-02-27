from sqlalchemy import Boolean, Column, Float, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from ..base import Base

class GuestTypePreferences(Base):
    __tablename__ = 'guest_type_preferences'

    id = Column(String, primary_key=True)
    flight_preferences_id = Column(String, ForeignKey('flight_preferences.id'), nullable=False)
    hotel_preferences_id = Column(String, ForeignKey('hotel_preferences.id'), nullable=False)
    ground_transport_preferences_id = Column(String, ForeignKey('ground_transport_preferences.id'), nullable=False)
    guest_type = Column(String, nullable=False)
    daily_per_diem = Column(Float, nullable=False)

    #Relationships
    flight_preferences = relationship("FlightPreferences", back_populates="guest_type_preferences")
    hotel_preferences = relationship("HotelPreferences", back_populates="guest_type_preferences")
    ground_transport_preferences = relationship("GroundTransportPreferences", back_populates="guest_type_preferences")
    trips = relationship("Trip", back_populates="guest_type_preferences")

    def __repr__(self):
        return f"<GuestTypePreferences(id='{self.id}', flight_preferences_id='{self.flight_preferences_id}', hotel_preferences_id='{self.hotel_preferences_id}', ground_transport_preferences_id='{self.ground_transport_preferences_id}', guest_type='{self.guest_type}', daily_per_diem='{self.daily_per_diem}')>"

class FlightPreferences(Base):
    __tablename__ = 'flight_preferences'

    id = Column(String, primary_key=True)
    cabin_class_id = Column(String, ForeignKey('flight_preferences_cabin_classes.id'), nullable=False)
    max_stops_id = Column(String, ForeignKey('flight_preferences_max_stops.id'), nullable=False)
    refundable_ticket = Column(Boolean, nullable=False, default=False)

    #Relationships
    cabin_class = relationship("FlightPreferencesCabinClass", back_populates="preferences")
    max_stops = relationship("FlightPreferencesMaxStops", back_populates="preferences")
    guest_type_preferences = relationship("GuestTypePreferences", back_populates="flight_preferences")

    def __repr__(self):
        return f"<FlightPreferences(id='{self.id}', cabin_class_id='{self.cabin_class_id}', max_stops_id='{self.max_stops_id}', refundable_ticket='{self.refundable_ticket}')>"

class FlightPreferencesCabinClass(Base):
    __tablename__ = 'flight_preferences_cabin_classes'

    id = Column(String, primary_key=True)
    code = Column(String, nullable=False)
    description = Column(String, nullable=False)
    is_active = Column(Boolean, nullable=False, default=True)
    display_order = Column(Integer, nullable=False)

    #Relationships
    preferences = relationship("FlightPreferences", back_populates="cabin_class")
    

    def __repr__(self):
        return f"<FlightPReferencesCabinClass(id='{self.id}', code='{self.code}', description='{self.description}')>"

class FlightPreferencesMaxStops(Base):
    __tablename__ = 'flight_preferences_max_stops'

    id = Column(String, primary_key=True)
    code = Column(String, nullable=False)
    description = Column(String, nullable=False)
    is_active = Column(Boolean, nullable=False, default=True)
    display_order = Column(Integer, nullable=False)

    #Relationships
    preferences = relationship("FlightPreferences", back_populates="max_stops")
    
    def __repr__(self):
        return f"<FlightPreferencesMaxStops(id='{self.id}', code='{self.code}', description='{self.description}')>"

class HotelPreferences(Base):
    __tablename__ = 'hotel_preferences'

    id = Column(String, primary_key=True)
    minimum_rating_id = Column(String, ForeignKey('hotel_ratings.id'), nullable=False)

    #Relationships
    minimum_rating = relationship("HotelRating", back_populates="hotel_preferences")
    guest_type_preferences = relationship("GuestTypePreferences", back_populates="hotel_preferences")

    def __repr__(self):
        return f"<HotelPreferences(id='{self.id}', minimum_rating_id='{self.minimum_rating_id}')>"
    
class HotelRating(Base):
    __tablename__ = 'hotel_ratings'

    id = Column(String, primary_key=True)
    code = Column(String, nullable=False)
    description = Column(String, nullable=False)
    is_active = Column(Boolean, nullable=False, default=True)
    display_order = Column(Integer, nullable=False)

    #Relationships
    hotels = relationship("Hotel", back_populates="rating")
    hotel_preferences = relationship("HotelPreferences", back_populates="minimum_rating")

    def __repr__(self):
        return f"<HotelRating(id='{self.id}', code='{self.code}', description='{self.description}')>"

class GroundTransportPreferences(Base):
    __tablename__ = 'ground_transport_preferences'

    id = Column(String, primary_key=True)
    preferred_services_id = Column(String, ForeignKey('ground_transport_services.id'), nullable=False)

    #Relationships
    preferred_services = relationship("GroundTransportServices", back_populates="ground_transport_preferences")
    guest_type_preferences = relationship("GuestTypePreferences", back_populates="ground_transport_preferences")

    def __repr__(self):
        return f"<GroundTransportPreferences(id='{self.id}', vpreferred_services_id='{self.vpreferred_services_id}')>"
class GroundTransportServices(Base):
    __tablename__ = 'ground_transport_services'

    id = Column(String, primary_key=True)
    code = Column(String, nullable=False)
    description = Column(String, nullable=False)
    is_active = Column(Boolean, nullable=False, default=True)
    display_order = Column(Integer, nullable=False)

    #Relationships
    ground_transport_preferences = relationship("GroundTransportPreferences", back_populates="preferred_services")
    ground_transports = relationship("GroundTransport", back_populates="service_type")

    def __repr__(self):
        return f"<GroundTransportServices(id='{self.id}', code='{self.code}', description='{self.description}')>"
