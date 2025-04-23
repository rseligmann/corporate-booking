from sqlalchemy import Column,String, DateTime, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship

from ..base import Base

class Company(Base):
    __tablename__ = 'companies'

    # primary key
    id = Column(String, primary_key=True)

    # basic info
    name = Column(String, nullable=False)

    # subscription details
    status = Column(String, nullable=False, default="ACTIVE")
    subscription_tier = Column(String, nullable=False, default="FREE")

    # timestamps
    created_at = Column(DateTime, default=func.now(), nullable=False)
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now(), nullable=False)

    #Relationships
    users = relationship("User", back_populates="company")
    address = relationship("Address", back_populates="company")
    guest_types = relationship("GuestTypes", back_populates="company")
    guest_profiles = relationship("GuestProfile", back_populates="company")
    trips = relationship("Trip", back_populates="company")
    #company_locations = relationship("CompanyLocation", back_populates="company")

    def __repr__(self):
        return f"<Company id={self.id} name={self.name}>"
    

# class CompanyLocation(Base):
#     __tablename__ = 'company_locations'

#     # primary key
#     id = Column(String, primary_key=True)

#     company_id = Column(String, ForeignKey('companies.id'), nullable=False)

#     name = Column(String, nullable=False)

#     # timestamps
#     created_at = Column(DateTime, default=func.now(), nullable=False)
#     updated_at = Column(DateTime, default=func.now(), onupdate=func.now(), nullable=False)

#     #Relationships
#     company = relationship("Company", back_populates="company_locations")
#     address = relationship("Address", back_populates="company_location")
#     meetings = relationship("Meeting", back_populates="company_location")

#     def __repr__(self):
#         return f"<Company Locations id={self.id} name={self.name}>"