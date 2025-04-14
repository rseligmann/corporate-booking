# from typing import List, Optional
# from sqlalchemy import select
# from uuid import uuid4
# from datetime import date

# from config_types.guest_types import GuestProfile, EmergencyContact, LoyaltyProgram
# from config_db.interfaces.guest_db import GuestDB
# from database.postgresql.models import GuestProfile as DBGuestProfile
# from database.postgresql.models import EmergencyContact as DBEmergencyContact
# from database.postgresql.models import LoyaltyProgram as DBLoyaltyProgram

# class PostgreSQLGuestDB(GuestDB):
#     """PostgreSQL implementation of GuestDB interface."""

#     async def get_guest_profile(self, profile_id: str) -> Optional[GuestProfile]:
#         with self.Session() as session:
#             stmt = select(DBGuestProfile).where(DBGuestProfile.id == profile_id)
#             result = session.execute(stmt)
#             db_profile = result.scalar_one_or_none()
            
#             if not db_profile:
#                 return None
                
#             return GuestProfile(
#                 profile_id=db_profile.id,
#                 first_name=db_profile.first_name,
#                 last_name=db_profile.last_name,
#                 email=db_profile.email,
#                 phone=db_profile.phone,
#                 date_of_birth=db_profile.date_of_birth,
#                 gender=db_profile.gender,
#                 nationality=db_profile.nationality,
#                 passport_number=db_profile.passport_number,
#                 passport_expiry_date=db_profile.passport_expiry_date,
#                 dietary_restrictions=db_profile.dietary_restrictions,
#                 accessibility_needs=db_profile.accessibility_needs,
#                 admin_id=db_profile.admin_id,
#                 address_id=db_profile.address_id
#             )
    
#     async def get_guest_profiles_by_admin(self, admin_id: str) -> List[GuestProfile]:
#         with self.Session() as session:
#             stmt = select(DBGuestProfile).where(DBGuestProfile.admin_id == admin_id)
#             result = session.execute(stmt)
#             db_profiles = result.scalars().all()
            
#             return [
#                 GuestProfile(
#                     profile_id=db_profile.id,
#                     first_name=db_profile.first_name,
#                     last_name=db_profile.last_name,
#                     email=db_profile.email,
#                     phone=db_profile.phone,
#                     date_of_birth=db_profile.date_of_birth,
#                     gender=db_profile.gender,
#                     nationality=db_profile.nationality,
#                     passport_number=db_profile.passport_number,
#                     passport_expiry_date=db_profile.passport_expiry_date,
#                     dietary_restrictions=db_profile.dietary_restrictions,
#                     accessibility_needs=db_profile.accessibility_needs,
#                     admin_id=db_profile.admin_id,
#                     address_id=db_profile.address_id
#                 )
#                 for db_profile in db_profiles
#             ]
    
#     async def insert_guest_profile(
#         self,
#         first_name: str,
#         last_name: str,
#         email: str,
#         admin_id: str,
#         phone: Optional[str] = None,
#         date_of_birth: Optional[date] = None,
#         gender: Optional[str] = None,
#         nationality: Optional[str] = None,
#         passport_number: Optional[str] = None,
#         passport_expiry_date: Optional[date] = None,
#         dietary_restrictions: Optional[List[str]] = None,
#         accessibility_needs: Optional[List[str]] = None,
#         address_id: Optional[str] = None
#     ) -> GuestProfile:
#         with self.Session() as session:
#             db_profile = DBGuestProfile(
#                 id=str(uuid4()),
#                 first_name=first_name,
#                 last_name=last_name,
#                 email=email,
#                 phone=phone,
#                 date_of_birth=date_of_birth,
#                 gender=gender,
#                 nationality=nationality,
#                 passport_number=passport_number,
#                 passport_expiry_date=passport_expiry_date,
#                 dietary_restrictions=dietary_restrictions,
#                 accessibility_needs=accessibility_needs,
#                 admin_id=admin_id,
#                 address_id=address_id
#             )
#             session.add(db_profile)
#             session.commit()
            
#             return GuestProfile(
#                 profile_id=db_profile.id,
#                 first_name=db_profile.first_name,
#                 last_name=db_profile.last_name,
#                 email=db_profile.email,
#                 phone=db_profile.phone,
#                 date_of_birth=db_profile.date_of_birth,
#                 gender=db_profile.gender,
#                 nationality=db_profile.nationality,
#                 passport_number=db_profile.passport_number,
#                 passport_expiry_date=db_profile.passport_expiry_date,
#                 dietary_restrictions=db_profile.dietary_restrictions,
#                 accessibility_needs=db_profile.accessibility_needs,
#                 admin_id=db_profile.admin_id,
#                 address_id=db_profile.address_id
#             )
    
#     async def update_guest_profile(self, profile: GuestProfile) -> GuestProfile:
#         with self.Session() as session:
#             stmt = select(DBGuestProfile).where(DBGuestProfile.id == profile.profile_id)
#             result = session.execute(stmt)
#             db_profile = result.scalar_one_or_none()
            
#             if not db_profile:
#                 raise ValueError(f"Guest profile with ID {profile.profile_id} not found")
                
#             db_profile.first_name = profile.first_name
#             db_profile.last_name = profile.last_name
#             db_profile.email = profile.email
#             db_profile.phone = profile.phone
#             db_profile.date_of_birth = profile.date_of_birth
#             db_profile.gender = profile.gender
#             db_profile.nationality = profile.nationality
#             db_profile.passport_number = profile.passport_number
#             db_profile.passport_expiry_date = profile.passport_expiry_date
#             db_profile.dietary_restrictions = profile.dietary_restrictions
#             db_profile.accessibility_needs = profile.accessibility_needs
#             db_profile.admin_id = profile.admin_id
#             db_profile.address_id = profile.address_id
#             session.commit()
            
#             return profile

#     # Emergency Contact methods
#     async def get_emergency_contact(self, contact_id: str) -> Optional[EmergencyContact]:
#         with self.Session() as session:
#             stmt = select(DBEmergencyContact).where(DBEmergencyContact.id == contact_id)
#             result = session.execute(stmt)
#             db_contact = result.scalar_one_or_none()
            
#             if not db_contact:
#                 return None
                
#             return EmergencyContact(
#                 contact_id=db_contact.id,
#                 guest_profile_id=db_contact.guest_profile_id,
#                 name=db_contact.name,
#                 relation=db_contact.relation,
#                 phone=db_contact.phone
#             )
        
#     async def get_emergency_contacts_by_profile(self, profile_id: str) -> List[EmergencyContact]:
#         with self.Session() as session:
#             stmt = select(DBEmergencyContact).where(DBEmergencyContact.guest_profile_id == profile_id)
#             result = session.execute(stmt)
#             db_contacts = result.scalars().all()
            
#             return [
#                 EmergencyContact(
#                     contact_id=db_contact.id,
#                     guest_profile_id=db_contact.guest_profile_id,
#                     name=db_contact.name,
#                     relation=db_contact.relation,
#                     phone=db_contact.phone
#                 )
#                 for db_contact in db_contacts
#             ]
    
#     async def insert_emergency_contact(
#         self,
#         guest_profile_id: str,
#         name: str,
#         relation: str,
#         phone: str
#     ) -> EmergencyContact:
#         with self.Session() as session:
#             db_contact = DBEmergencyContact(
#                 id=str(uuid4()),
#                 guest_profile_id=guest_profile_id,
#                 name=name,
#                 relation=relation,
#                 phone=phone
#             )
#             session.add(db_contact)
#             session.commit()
            
#             return EmergencyContact(
#                 contact_id=db_contact.id,
#                 guest_profile_id=db_contact.guest_profile_id,
#                 name=db_contact.name,
#                 relation=db_contact.relation,
#                 phone=db_contact.phone
#             )
    
#     async def update_emergency_contact(self, contact: EmergencyContact) -> EmergencyContact:
#         with self.Session() as session:
#             stmt = select(DBEmergencyContact).where(DBEmergencyContact.id == contact.contact_id)
#             result = session.execute(stmt)
#             db_contact = result.scalar_one_or_none()
            
#             if not db_contact:
#                 raise ValueError(f"Emergency contact with ID {contact.contact_id} not found")
                
#             db_contact.guest_profile_id = contact.guest_profile_id
#             db_contact.name = contact.name
#             db_contact.relation = contact.relation
#             db_contact.phone = contact.phone
#             session.commit()
            
#             return contact
        
#     # Loyalty Program methods
#     async def get_loyalty_program(self, program_id: str) -> Optional[LoyaltyProgram]:
#         with self.Session() as session:
#             stmt = select(DBLoyaltyProgram).where(DBLoyaltyProgram.id == program_id)
#             result = session.execute(stmt)
#             db_program = result.scalar_one_or_none()
            
#             if not db_program:
#                 return None
                
#             return LoyaltyProgram(
#                 program_id=db_program.id,
#                 guest_profile_id=db_program.guest_profile_id,
#                 provider=db_program.provider,
#                 program_name=db_program.program_name,
#                 member_number=db_program.member_number,
#                 status=db_program.status
#             )
    
#     async def get_loyalty_programs_by_profile(self, profile_id: str) -> List[LoyaltyProgram]:
#         with self.Session() as session:
#             stmt = select(DBLoyaltyProgram).where(DBLoyaltyProgram.guest_profile_id == profile_id)
#             result = session.execute(stmt)
#             db_programs = result.scalars().all()
            
#             return [
#                 LoyaltyProgram(
#                     program_id=db_program.id,
#                     guest_profile_id=db_program.guest_profile_id,
#                     provider=db_program.provider,
#                     program_name=db_program.program_name,
#                     member_number=db_program.member_number,
#                     status=db_program.status
#                 )
#                 for db_program in db_programs
#             ]
    
#     async def insert_loyalty_program(
#         self,
#         guest_profile_id: str,
#         provider: str,
#         program_name: str,
#         member_number: str,
#         status: Optional[str] = None
#     ) -> LoyaltyProgram:
#         with self.Session() as session:
#             db_program = DBLoyaltyProgram(
#                 id=str(uuid4()),
#                 guest_profile_id=guest_profile_id,
#                 provider=provider,
#                 program_name=program_name,
#                 member_number=member_number,
#                 status=status
#             )
#             session.add(db_program)
#             session.commit()
            
#             return LoyaltyProgram(
#                 program_id=db_program.id,
#                 guest_profile_id=db_program.guest_profile_id,
#                 provider=db_program.provider,
#                 program_name=db_program.program_name,
#                 member_number=db_program.member_number,
#                 status=db_program.status
#             )
        
#     async def update_loyalty_program(self, program: LoyaltyProgram) -> LoyaltyProgram:
#         with self.Session() as session:
#             stmt = select(DBLoyaltyProgram).where(DBLoyaltyProgram.id == program.program_id)
#             result = session.execute(stmt)
#             db_program = result.scalar_one_or_none()
            
#             if not db_program:
#                 raise ValueError(f"Loyalty program with ID {program.program_id} not found")
                
#             db_program.guest_profile_id = program.guest_profile_id
#             db_program.provider = program.provider
#             db_program.program_name = program.program_name
#             db_program.member_number = program.member_number
#             db_program.status = program.status
#             session.commit()
            
#             return program