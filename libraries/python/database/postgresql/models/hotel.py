from sqlalchemy import Boolean, Column, DateTime, Float, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from ..base import Base

class Hotel(Base):
    __tablename__ = 'hotels'   

    id = Column(String, primary_key=True)
    address_id = Column(String, ForeignKey('addresses.id'), nullable=False)
    rating_id = Column(String, ForeignKey('hotel_ratings.id'), nullable=False)
    booking_reference = Column(String, nullable=True)
    name = Column(String, nullable=False)
    room_type = Column(String, nullable=False)
    price = Column(Float, nullable=False)
    booking_status_id = Column(String, ForeignKey('hotel_statuses.id'), nullable=False)
    check_in = Column(DateTime, nullable=False)
    check_out = Column(DateTime, nullable=False)
    
    #Relationships
    address = relationship("Address", back_populates="hotels")
    rating = relationship("HotelRating", back_populates="hotels")
    status = relationship("HotelStatus", back_populates="hotels")
    trips = relationship("Trip", back_populates="hotel")

    def __repr__(self):
        return f"<Hotel(id='{self.id}', address_id='{self.address_id}', rating_id='{self.rating_id}', booking_reference='{self.booking_reference}', name='{self.name}', room_type='{self.room_type}', price='{self.price}', booking_status_id='{self.booking_status_id}', check_in='{self.check_in}', check_out='{self.check_out}')>"

class HotelStatus(Base):
    __tablename__ = 'hotel_statuses'

    id = Column(String, primary_key=True)
    code = Column(String, nullable=False)
    description = Column(String, nullable=False)
    is_active = Column(Boolean, nullable=False, default=True)
    display_order = Column(Integer, nullable=False)

    #Relationships
    hotels = relationship("Hotel", back_populates="status")

    def __repr__(self):
        return f"<HotelStatus(id='{self.id}', code='{self.code}', description='{self.description}')>"