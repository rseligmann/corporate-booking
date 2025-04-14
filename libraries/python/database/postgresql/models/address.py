from sqlalchemy import Column, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from ..base import Base

class Address(Base):
    __tablename__ = 'addresses'

    id = Column(String, primary_key=True)

    # company relationship
    company_id = Column(String, ForeignKey('companies.id'), nullable=False)

    street = Column(String, nullable=False)
    city = Column(String, nullable=False)
    state = Column(String, nullable=False)
    country = Column(String, nullable=False)
    postal_code = Column(String, nullable=False)

    # timestamps
    # created_at = Column(DateTime, default=func.now(), nullable=False)
    # updated_at = Column(DateTime, default=func.now(), onupdate=func.now(), nullable=False)

    #Relationships
    company = relationship("Company", back_populates="address")
    #company_location = relationship("CompanyLocation", back_populates="address")
    # guest_profiles = relationship("GuestProfile", back_populates="address")
    # ground_transport_pickups = relationship("GroundTransport", foreign_keys="GroundTransport.pickup_address_id", back_populates="pickup_address")
    # ground_transport_dropoffs = relationship("GroundTransport", foreign_keys="GroundTransport.dropoff_address_id", back_populates="dropoff_address")
    
    def __repr__(self):
        return f"<Address(id='{self.id}', city='{self.city}', country='{self.country}')>"