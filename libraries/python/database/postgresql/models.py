from sqlalchemy import Column, String, Float, DateTime, Integer, ForeignKey, Enum
from sqlalchemy.orm import declarative_base, relationship
import enum

Base = declarative_base()

class UserRole(enum.Enum):
    ADMIN = "admin"
    GUEST = "guest"

class User(Base):
    __tablename__ = 'users'

    id = Column(String, primary_key=True)
    email = Column(String, unique=True, nullable=False)
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    role = Column(Enum(UserRole), nullable=False)

    bookings = relationship("Booking", back_populates="user")
    guest_bookings = relationship("GuestBooking", back_populates="inviter")

class Booking(Base):
    __tablename__ = 'bookings'

    id = Column(String, primary_key=True)
    user_id = Column(String, ForeignKey('users.id'), nullable=False)
    flight_id = Column(String, ForeignKey('flights.id'), nullable=True)
    hotel_id = Column(String, ForeignKey('hotels.id'), nullable=True)
    total_price = Column(Float, nullable=False)

    user = relationship("User", back_populates="bookings")
    flight = relationship("Flight")
    hotel = relationship("Hotel")

class GuestBooking(Base):
    __tablename__ = 'guest_bookings'

    id = Column(String, primary_key=True)
    inviter_id = Column(String, ForeignKey('users.id'), nullable=False)
    guest_email = Column(String, nullable=False)
    flight_id = Column(String, ForeignKey('flights.id'), nullable=True)
    hotel_id = Column(String, ForeignKey('hotels.id'), nullable=True)

    inviter = relationship("User", back_populates="guest_bookings")
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