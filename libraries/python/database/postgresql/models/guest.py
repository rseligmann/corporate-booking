# from sqlalchemy import Column, DateTime, ForeignKey, String
# from sqlalchemy.dialects.postgresql import ARRAY as PG_ARRAY
# from sqlalchemy.orm import relationship
# from sqlalchemy.sql import func

# from ..base import Base

# class GuestProfile(Base):
#     __tablename__ = 'guest_profiles'

#     # primary key
#     id = Column(String, primary_key=True)

#     # Multi-tenant tags
#     company_id = Column(String, ForeignKey('companies.id'), nullable=False)
#     user_id = Column(String, ForeignKey('users.id'), nullable=False)

#     # profile infor
#     first_name = Column(String, nullable=False)
#     last_name = Column(String, nullable=False)
#     email = Column(String, nullable=False)
#     phone = Column(String, nullable=True)

#     # timestamps
#     created_at = Column(DateTime, default=func.now(), nullable=False)
#     updated_at = Column(DateTime, default=func.now(), onupdate=func.now(), nullable=False)


#     # date_of_birth = Column(Date, nullable=True)
#     # gender = Column(String, nullable=True)
#     # nationality = Column(String, nullable=True)
#     # passport_number = Column(String, nullable=True)
#     # passport_expiry_date = Column(Date, nullable=True)
#     # dietary_restrictions = Column(PG_ARRAY(String), nullable=True)
#     # accessibility_needs = Column(PG_ARRAY(String), nullable=True)
#     # admin_id = Column(String, ForeignKey('admins.id'), nullable=False)
#     # address_id = Column(String, ForeignKey('addresses.id'), nullable=True)

#     #Relationships
#     company = relationship("Company", back_populates="guest_profiles")
#     user = relationship("User", back_populates="guest_profiles")
#     # address = relationship("Address", back_populates="guest_profiles")
#     trips = relationship("Trip", back_populates="guest_profile")
#     # emergency_contacts = relationship("EmergencyContact", back_populates="guest_profile")
#     # loyalty_programs = relationship("LoyaltyProgram", back_populates="guest_profile")
    

#     def __repr__(self):
#         return f"<Guest(id='{self.id}', first_name='{self.first_name}', last_name='{self.last_name}', email='{self.email}', phone='{self.phone}, admin_id='{self.admin_id}')>"

# # class EmergencyContact(Base):
# #     __tablename__ = 'emergency_contacts'

# #     id = Column(String, primary_key=True)
# #     guest_profile_id = Column(String, ForeignKey('guest_profiles.id'), nullable=False)
# #     name = Column(String, nullable=False)
# #     relation = Column(String, nullable=False)
# #     phone = Column(String, nullable=False)

# #     #Relationships
# #     guest_profile = relationship("GuestProfile", back_populates="emergency_contacts")

# #     def __repr__(self):
# #         return f"<EmergencyContact(id='{self.id}', first_name='{self.first_name}', last_name='{self.last_name}', phone='{self.phone}', relationship='{self.relationship}', guest_profile_id='{self.guest_profile_id}')>" 
    
# # class LoyaltyProgram(Base):
# #     __tablename__ = 'loyalty_programs'
# #     id = Column(String, primary_key=True)
# #     guest_profile_id = Column(String, ForeignKey('guest_profiles.id'), nullable=False)
# #     provider = Column(String, nullable=False)
# #     program_name = Column(String, nullable=False)
# #     membership_number = Column(String, nullable=False)
# #     status = Column(String, nullable=False)

# #     #Relationships
# #     guest_profile = relationship("GuestProfile", back_populates="loyalty_programs")