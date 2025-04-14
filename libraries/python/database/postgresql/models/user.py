from sqlalchemy import Column, DateTime, String, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship

from ..base import Base

class User(Base):
    __tablename__= 'users'

    # primary key
    id = Column(String, primary_key=True)

    # company relationship
    company_id = Column(String, ForeignKey('companies.id'), nullable=False)

    # profile info
    email = Column(String, unique=True, nullable=False)
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    role = Column(String, nullable=False, default="ADMIN")
    status = Column(String, nullable=False, default="ACTIVE")
    
    # timestamps
    created_at = Column(DateTime, default=func.now(), nullable=False)
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now(), nullable=False)

    #Relationships
    company = relationship("Company", back_populates="users")
    guest_types = relationship("GuestTypes", back_populates="user")
    #trips = relationship("Trip", back_populates="user")
    #guest_profiles = relationship("GuestProfile", back_populates="user")

    def __repr__(self):
        return f"<User id={self.id} email={self.email} first_name={self.first_name} last_name={self.last_name}>"