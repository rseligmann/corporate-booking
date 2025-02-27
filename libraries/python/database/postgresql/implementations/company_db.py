from typing import Optional, List
from sqlalchemy import select
from uuid import uuid4

from config_types.company_types import Company
from config_db.interfaces.company_db import CompanyDB
from database.postgresql.models import Company as DBCompany

class PostgreSQLCompanyDB(CompanyDB):
    """PostgreSQL implementation of CompanyDB interface."""
    
    async def get_company(self, company_id: str) -> Optional[Company]:
        with self.Session() as session:
            stmt = select(DBCompany).where(DBCompany.id == company_id)
            result = session.execute(stmt)
            db_company = result.scalar_one_or_none()
            
            if not db_company:
                return None
                
            return Company(
                company_id=db_company.id,
                name=db_company.name,
                location=db_company.location,
                address_id=db_company.address_id
            )
    
    async def get_all_companies(self) -> List[Company]:
        with self.Session() as session:
            stmt = select(DBCompany)
            result = session.execute(stmt)
            db_companies = result.scalars().all()
            
            return [
                Company(
                    company_id=db_company.id,
                    name=db_company.name,
                    location=db_company.location,
                    address_id=db_company.address_id
                )
                for db_company in db_companies
            ]
    
    async def insert_company(self, name: str, location: str, address_id: str) -> Company:
        with self.Session() as session:
            db_company = DBCompany(
                id=str(uuid4()),
                name=name,
                location=location,
                address_id=address_id
            )
            session.add(db_company)
            session.commit()
            
            return Company(
                company_id=db_company.id,
                name=db_company.name,
                location=db_company.location,
                address_id=db_company.address_id
            )
    
    async def update_company(self, company: Company) -> Company:
        with self.Session() as session:
            stmt = select(DBCompany).where(DBCompany.id == company.company_id)
            result = session.execute(stmt)
            db_company = result.scalar_one_or_none()
            
            if not db_company:
                raise ValueError(f"Company with ID {company.company_id} not found")
                
            db_company.name = company.name
            db_company.location = company.location
            db_company.address_id = company.address_id
            session.commit()
            
            return company
    
    async def delete_company(self, company_id: str) -> bool:
        with self.Session() as session:
            stmt = select(DBCompany).where(DBCompany.id == company_id)
            result = session.execute(stmt)
            db_company = result.scalar_one_or_none()
            
            if not db_company:
                return False
                
            session.delete(db_company)
            session.commit()
            
            return True