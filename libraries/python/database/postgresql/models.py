from sqlalchemy import Column, String, Float, DateTime, Integer, ForeignKey, Enum
from sqlalchemy.orm import declarative_base, relationship
import enum

Base = declarative_base()

class Admin(Base):
    __tablename__ = 'admins'

    id = Column(String, primary_key=True)
    email = Column(String, unique=True, nullable=False)
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)

    pending_bookings = relationship("PendingBooking", back_populates="admins")
    active_bookings = relationship("ActiveBooking", back_populates="admins")
    guests = relationship("Guest", back_populates="admin")

class Guest(Base):
    __tablename__ = 'guests'

    id = Column(String, primary_key=True)
    email = Column(String, unique=True, nullable=False)
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    admin_id = Column(String, ForeignKey('admins.id'), nullable=False)

    admin = relationship("Admin", back_populates="guests")
    pending_bookings = relationship("PendingBooking", back_populates="guests")
    active_bookings = relationship("ActiveBooking", back_populates="guests")

class PendingBooking(Base):
    __tablename__ = 'pending_bookings'

    id = Column(String, primary_key=True)
    admin_id = Column(String, ForeignKey('admins.id'), nullable=False)
    guest_id = Column(String, ForeignKey('guests.id'), nullable=False)
    flight_id = Column(String, ForeignKey('flights.id'), nullable=True)
    hotel_id = Column(String, ForeignKey('hotels.id'), nullable=True)
    total_price = Column(Float, nullable=False)

    admin = relationship("Admin", back_populates="pending_bookings")
    guest = relationship("Guest", back_populates="pending_bookings")
    flight = relationship("Flight")
    hotel = relationship("Hotel")

class ActiveBooking(Base):
    __tablename__ = 'active_bookings'

    id = Column(String, primary_key=True)
    admin_id = Column(String, ForeignKey('admins.id'), nullable=False)
    guest_id = Column(String, ForeignKey('guests.id'), nullable=False)
    flight_id = Column(String, ForeignKey('flights.id'), nullable=True)
    hotel_id = Column(String, ForeignKey('hotels.id'), nullable=True)

    admin_id = relationship("Admin", back_populates="guest_bookings")
    guest_id = relationship("Guest", back_populates="guest_bookings")
    flight = relationship("Flight")
    hotel = relationship("Hotel")

class Flight(Base):
    __tablename__ = 'flights'

    id = Column(String, primary_key=True)
    flight_number = Column(String, nullable=False)
    airline = Column(String, nullable=False)
    departure = Column(DateTime, nullable=False)
    arrival = Column(DateTime, nullable=False)
    origin = Column(String, nullable=False)
    destination = Column(String, nullable=False)
    price = Column(Float, nullable=False)

class Hotel(Base):
    __tablename__ = 'hotels'

    id = Column(String, primary_key=True)
    name = Column(String, nullable=False)
    location = Column(String, nullable=False)
    check_in = Column(DateTime, nullable=False)
    check_out = Column(DateTime, nullable=False)
    room_type = Column(String, nullable=False)
    price = Column(Float, nullable=False)