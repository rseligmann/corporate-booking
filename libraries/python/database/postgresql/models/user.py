from sqlalchemy import Column, DateTime, String, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship

from ..base import Base

class Admin(Base):
    __tablename__= 'admins'

    id = Column(String, primary_key=True)
    email = Column(String, unique=True, nullable=False)
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    company_id = Column(String, ForeignKey('companies.id'), nullable=False)
    role = Column(String, nullable=False)
    created_at = Column(DateTime, default=func.now(), nullable=False)
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now(), nullable=False)


    #Relationships
    company = relationship("Company", back_populates="admins")
    trips = relationship("Trip", back_populates="admin")
    guest_profiles = relationship("GuestProfile", back_populates="admin")

    def __repr__(self):
        return f"<Admin id={self.id} email={self.email} first_name={self.first_name} last_name={self.last_name}>"