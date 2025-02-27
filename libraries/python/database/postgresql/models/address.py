from sqlalchemy import Column, String
from sqlalchemy.orm import relationship

from ..base import Base

class Address(Base):
    __tablename__ = 'addresses'

    id = Column(String, primary_key=True)
    street = Column(String, nullable=False)
    city = Column(String, nullable=False)
    state = Column(String, nullable=False)
    country = Column(String, nullable=False)
    postal_code = Column(String, nullable=False)

    #Relationships
    companies = relationship("Company", back_populates="address")
    guest_profiles = relationship("GuestProfile", back_populates="address")
    hotels = relationship("Hotel", back_populates="address")
    meetings = relationship("Meeting", back_populates="address")
    ground_transport_pickups = relationship("GroundTransportPickup", foreign_keys="GroundTransport.pickup_address_id", back_populates="pickup_address")
    ground_transport_dropoffs = relationship("GroundTransportDropoff", foreign_keys="GroundTransport.dropoff_address_id", back_populates="dropoff_address")
    
    def __repr__(self):
        return f"<Address(id='{self.id}', city='{self.city}', country='{self.country}')>"