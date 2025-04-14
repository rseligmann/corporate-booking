# from abc import ABC, abstractmethod
# from typing import Optional, List
# from datetime import date

# from config_types.guest_types import GuestProfile, EmergencyContact, LoyaltyProgram

# class GuestDB(ABC):
#     """Interface for guest-related database operations."""

#     @abstractmethod
#     async def get_guest_profile(self, profile_id: str) -> Optional[GuestProfile]:
#         """Retrieve a guest profile by ID"""
#         pass
    
#     @abstractmethod
#     async def get_guest_profiles_by_admin(self, admin_id: str) -> List[GuestProfile]:
#         """Retrieve all guest profiles for an admin"""
#         pass
    
#     @abstractmethod
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
#         """Insert a new guest profile"""
#         pass
    
#     @abstractmethod
#     async def update_guest_profile(self, profile: GuestProfile) -> GuestProfile:
#         """Update an existing guest profile"""
#         pass

#     # Emergency Contact methods
#     @abstractmethod
#     async def get_emergency_contact(self, contact_id: str) -> Optional[EmergencyContact]:
#         """Retrieve an emergency contact by ID"""
#         pass
    
#     @abstractmethod
#     async def get_emergency_contacts_by_profile(self, profile_id: str) -> List[EmergencyContact]:
#         """Retrieve all emergency contacts for a guest profile"""
#         pass
    
#     @abstractmethod
#     async def insert_emergency_contact(
#         self,
#         guest_profile_id: str,
#         name: str,
#         relation: str,
#         phone: str
#     ) -> EmergencyContact:
#         """Insert a new emergency contact"""
#         pass
    
#     @abstractmethod
#     async def update_emergency_contact(self, contact: EmergencyContact) -> EmergencyContact:
#         """Update an existing emergency contact"""
#         pass

#     # Loyalty Program methods
#     @abstractmethod
#     async def get_loyalty_program(self, program_id: str) -> Optional[LoyaltyProgram]:
#         """Retrieve a loyalty program by ID"""
#         pass
    
#     @abstractmethod
#     async def get_loyalty_programs_by_profile(self, profile_id: str) -> List[LoyaltyProgram]:
#         """Retrieve all loyalty programs for a guest profile"""
#         pass
    
#     @abstractmethod
#     async def insert_loyalty_program(
#         self,
#         guest_profile_id: str,
#         provider: str,
#         program_name: str,
#         member_number: str,
#         status: Optional[str] = None
#     ) -> LoyaltyProgram:
#         """Insert a new loyalty program"""
#         pass
    
#     @abstractmethod
#     async def update_loyalty_program(self, program: LoyaltyProgram) -> LoyaltyProgram:
#         """Update an existing loyalty program"""
#         pass