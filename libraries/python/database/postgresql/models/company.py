from sqlalchemy import Column, ForeignKey, String
from sqlalchemy.orm import relationship

from ..base import Base

class Company(Base):
    __tablename__ = 'companies'

    id= Column(String, primary_key=True)
    name = Column(String, nullable=False)
    location = Column(String, nullable=False)
    address_id = Column(String, ForeignKey('addresses.id'), nullable=False)

    #Relationships
    admins = relationship("Admin", back_populates="company")
    address = relationship("Address", back_populates="companies")

    def __repr__(self):
        return f"<Company id={self.id} name={self.name}>"