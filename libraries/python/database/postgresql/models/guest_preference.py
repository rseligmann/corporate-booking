from sqlalchemy import Boolean, Column, Numeric, ForeignKey, Integer, String, DateTime
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship

from ..base import Base

class GuestTypes(Base):
    __tablename__ = 'guest_types'

    id = Column(String, primary_key=True)
    name = Column(String, nullable=False)

    # Multi-tenant tags
    company_id = Column(String, ForeignKey('companies.id'), nullable=False)
    user_id = Column(String, ForeignKey('users.id'), nullable=False)

    # timestamps
    created_at = Column(DateTime, default=func.now(), nullable=False)
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now(), nullable=False)

    #Relationships
    company = relationship("Company", back_populates="guest_types")
    user = relationship("User", back_populates="guest_types")
    flight_preferences = relationship("FlightPreferences", back_populates="guest_type", uselist=False, cascade = "all, delete-orphan")
    hotel_preferences = relationship("HotelPreferences", back_populates="guest_type", uselist=False, cascade = "all, delete-orphan")
    ground_transport_preferences = relationship("GroundTransportPreferences", back_populates="guest_type", uselist=False, cascade = "all, delete-orphan")
    per_diem_preferences = relationship("PerDiemPreferences", back_populates="guest_type", uselist=False, cascade = "all, delete-orphan")
    #trips = relationship("Trip", back_populates="guest_types")

    def __repr__(self):
        return f"<GuestTypes(id='{self.id}', name='{self.name}')>"

class FlightPreferences(Base):
    __tablename__ = 'flight_preferences'

    id = Column(String, primary_key=True)

    # link to guest_type
    guest_type_id = Column(String, ForeignKey('guest_types.id'), nullable = False)

    cabin_class = Column(String, nullable=False, default='ECONOMY')
    max_stops = Column(String, nullable=False, default='ANY')
    refundable_ticket = Column(Boolean, nullable=False, default=False)

    # timestamps
    created_at = Column(DateTime, default=func.now(), nullable=False)
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now(), nullable=False)

    #Relationships
    guest_type = relationship("GuestTypes", back_populates="flight_preferences")

    def __repr__(self):
        return f"<FlightPreferences(id='{self.id}', cabin_class='{self.cabin_class}', max_stops='{self.max_stops}', refundable_ticket='{self.refundable_ticket}')>"

class HotelPreferences(Base):
    __tablename__ = 'hotel_preferences'

    id = Column(String, primary_key=True)

    # link to guest_type
    guest_type_id = Column(String, ForeignKey('guest_types.id'), nullable = False)

    minimum_rating = Column(Integer, nullable=False, default=1)

    # timestamps
    created_at = Column(DateTime, default=func.now(), nullable=False)
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now(), nullable=False)

    #Relationships
    guest_type = relationship("GuestTypes", back_populates="hotel_preferences")

    def __repr__(self):
        return f"<HotelPreferences(id='{self.id}', minimum_rating='{self.minimum_rating}')>"

class GroundTransportPreferences(Base):
    __tablename__ = 'ground_transport_preferences'

    id = Column(String, primary_key=True)

    # link to guest_type
    guest_type_id = Column(String, ForeignKey('guest_types.id'), nullable = False)

    preferred_services = Column(String, nullable=False, default="UBER")

    # timestamps
    created_at = Column(DateTime, default=func.now(), nullable=False)
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now(), nullable=False)

    #Relationships
    guest_type = relationship("GuestTypes", back_populates="ground_transport_preferences")

    def __repr__(self):
        return f"<GroundTransportPreferences(id='{self.id}', preferred_services='{self.preferred_services}')>"
    
class PerDiemPreferences(Base):
    __tablename__ = 'per_diem_preferences'

    id = Column(String, primary_key=True)

    # link to guest_type
    guest_type_id = Column(String, ForeignKey('guest_types.id'), nullable = False)

    daily_amount = Column(Numeric(10, 2), nullable=False, default=0.00)

    # timestamps
    created_at = Column(DateTime, default=func.now(), nullable=False)
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now(), nullable=False)

    #Relationships
    guest_type = relationship("GuestTypes", back_populates="per_diem_preferences")

