from typing import Optional
from sqlalchemy import select
from uuid import uuid4

from config_types.address_types import Address
from config_db.interfaces.address_db import AddressDB
from database.postgresql.models import Address as DBAddress

class PostgreSQLAddressDB(AddressDB):
    """PostgreSQL implementation of AddressDB interface."""

    async def get_address(self, address_id: str) -> Optional[Address]:
        with self.tenantSession() as session:
            stmt = select(DBAddress).where(DBAddress.id == address_id)
            result = session.execute(stmt)
            db_address = result.scalar_one_or_none()
            
            if not db_address:
                return None
                
            return Address(
                address_id=db_address.id,
                company_id=db_address.company_id,
                street=db_address.street,
                city=db_address.city,
                state=db_address.state,
                country=db_address.country,
                postal_code=db_address.postal_code
            )
    
    async def insert_address(
        self,
        company_id: str,
        street: str,
        city: str,
        state: str,
        country: str,
        postal_code: str
    ) -> Address:
        with self.tenantSession() as session:
            db_address = DBAddress(
                id=str(uuid4()),
                company_id=company_id,
                street=street,
                city=city,
                state=state,
                country=country,
                postal_code=postal_code
            )
            session.add(db_address)
            session.commit()
            
            return Address(
                address_id=db_address.id,
                company_id=db_address.company_id,
                street=db_address.street,
                city=db_address.city,
                state=db_address.state,
                country=db_address.country,
                postal_code=db_address.postal_code
            )
    
    async def update_address(self, address: Address) -> Address:
        with self.tenantSession() as session:
            stmt = select(DBAddress).where(DBAddress.id == address.address_id)
            result = session.execute(stmt)
            db_address = result.scalar_one_or_none()
            
            if not db_address:
                raise ValueError(f"Address with ID {address.address_id} not found")
                
            db_address.street = address.street
            db_address.city = address.city
            db_address.state = address.state
            db_address.country = address.country
            db_address.postal_code = address.postal_code
            session.commit()
            
            return address