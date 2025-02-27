from abc import ABC
from datetime import date
from typing import List, Optional


class GuestProfile(ABC):
    def __init__(self,
                profile_id: str,
                first_name: str,
                last_name: str,
                email: str,
                phone: Optional[str],
                date_of_birth: Optional[date],
                gender: Optional[str],
                nationality: Optional[str],
                passport_number: Optional[str],
                passport_expiry_date: Optional[date],
                dietary_restrictions: Optional[List[str]],
                accessibility_needs: Optional[List[str]],
                admin_id: str,
                address_id: Optional[str]):
        self.profile_id           = profile_id
        self.first_name           = first_name
        self.last_name            = last_name
        self.email                = email
        self.phone                = phone
        self.date_of_birth        = date_of_birth
        self.gender               = gender
        self.nationality          = nationality
        self.passport_number      = passport_number
        self.passport_expiry_date = passport_expiry_date
        self.dietary_restrictions = dietary_restrictions or []
        self.accessibility_needs  = accessibility_needs or []
        self.admin_id             = admin_id
        self.address_id           = address_id
    
    def __str__(self) -> str:
        return f"""Guest Profile:
                   ID: {self.profile_id}
                   Name: {self.first_name} {self.last_name}
                   Email: {self.email}
                   Phone: {self.phone or 'N/A'}
                   Admin: {self.admin_id}"""

class EmergencyContact(ABC):
    def __init__(self,
                contact_id: str,
                guest_profile_id: str,
                name: str,
                relation: str,
                phone: str):
        self.contact_id       = contact_id
        self.guest_profile_id = guest_profile_id
        self.name             = name
        self.relation     = relation
        self.phone            = phone
    
    def __str__(self) -> str:
        return f"""Emergency Contact:
                   Name: {self.name}
                   Relationship: {self.relationship}
                   Phone: {self.phone}"""

class LoyaltyProgram(ABC):
    def __init__(self,
                program_id: str,
                guest_profile_id: str,
                provider: str,
                program_name: str,
                member_number: str,
                status: Optional[str]):
        self.program_id       = program_id
        self.guest_profile_id = guest_profile_id
        self.provider         = provider
        self.program_name     = program_name
        self.member_number    = member_number
        self.status           = status
    
    def __str__(self) -> str:
        return f"""Loyalty Program:
                   Provider: {self.provider}
                   Program: {self.program_name}
                   Member Number: {self.member_number}
                   Status: {self.status or 'N/A'}"""