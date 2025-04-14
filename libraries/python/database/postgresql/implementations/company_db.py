from typing import Optional, List
from sqlalchemy import select
from uuid import uuid4

from config_types.company_types import Company
from config_types.base import AccountStatus, SubscriptionTier
from config_db.interfaces.company_db import CompanyDB
from database.postgresql.models import Company as DBCompany

class PostgreSQLCompanyDB(CompanyDB):
    """PostgreSQL implementation of CompanyDB interface."""
    
    async def get_company(self, company_id: str) -> Optional[Company]:
        with self.tenantSession() as session:
            stmt = select(DBCompany).where(DBCompany.id == company_id)
            result = session.execute(stmt)
            db_company = result.scalar_one_or_none()
            
            if not db_company:
                return None
                
            return Company(
                company_id=db_company.id,
                name=db_company.name,
                #address_id=db_company.address_id,
                status=AccountStatus(db_company.status),    
                subscription_tier=SubscriptionTier(db_company.subscription_tier), 
                date_created=db_company.created_at,
                date_updated=db_company.updated_at
            )
    
    # async def get_all_companies(self) -> List[Company]:
    #     with self.tenantSession() as session:
    #         stmt = select(DBCompany)
    #         result = session.execute(stmt)
    #         db_companies = result.scalars().all()
            
    #         return [
    #             Company(
    #                 company_id=db_company.id,
    #                 name=db_company.name,
    #                 address_id=db_company.address_id,
    #                 status=AccountStatus(db_company.status),    
    #                 subscription_tier=SubscriptionTier(db_company.subscription_tier), 
    #                 date_created=db_company.created_at,
    #                 date_updated=db_company.updated_at
    #             )
    #             for db_company in db_companies
    #         ]
    
    async def insert_company(
            self, 
            name: str,
            #address_id: Optional[str] = None,
            status: AccountStatus = AccountStatus.ACTIVE,
            subscription_tier: SubscriptionTier = SubscriptionTier.FREE
            ) -> Company:
        
        with self.tenantSession() as session:
            db_company = DBCompany(
                id=str(uuid4()),
                name=name,
                #address_id=address_id,
                status = status.value,
                subscription_tier = subscription_tier.value
            )
            session.add(db_company)
            session.commit()
            
            return Company(
                company_id=db_company.id,
                name=db_company.name,
                #address_id=db_company.address_id,
                status=AccountStatus(db_company.status),    
                subscription_tier=SubscriptionTier(db_company.subscription_tier), 
                date_created=db_company.created_at,
                date_updated=db_company.updated_at
            )
    
    async def update_company(self, company: Company) -> Company:
        with self.tenantSession() as session:
            stmt = select(DBCompany).where(DBCompany.id == company.company_id)
            result = session.execute(stmt)
            db_company = result.scalar_one_or_none()
            
            if not db_company:
                raise ValueError(f"Company with ID {company.company_id} not found")
                
            db_company.name = company.name
            #db_company.address_id = company.address_id
            db_company.status = company.status.value
            db_company.subscription_tier = company.subscription_tier.value

            session.commit()
            session.refresh(db_company) #refresh timestamps
            
            return Company(
                company_id=db_company.id,
                name=db_company.name,
                #address_id=db_company.address_id,
                status=AccountStatus(db_company.status),    
                subscription_tier=SubscriptionTier(db_company.subscription_tier), 
                date_created=db_company.created_at,
                date_updated=db_company.updated_at
            )
    
    async def delete_company(self, company_id: str) -> bool:
        with self.tenantSession() as session:
            stmt = select(DBCompany).where(DBCompany.id == company_id)
            result = session.execute(stmt)
            db_company = result.scalar_one_or_none()
            
            if not db_company:
                return False
                
            session.delete(db_company)
            session.commit()
            
            return True