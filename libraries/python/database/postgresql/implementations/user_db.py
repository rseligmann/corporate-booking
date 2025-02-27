from typing import Optional, List
from sqlalchemy import select
from uuid import uuid4
from datetime import datetime

from config_types.user_types import Admin
from config_db.interfaces.user_db import UserDB
from database.postgresql.models import Admin as DBAdmin

class PostgreSQLUserDB(UserDB):
    """PostgreSQL implementation of UserDB interface."""

    async def get_admin(self, user_id: str) -> Optional[Admin]:
        with self.Session() as session:
            stmt = select(DBAdmin).where(DBAdmin.id == user_id)
            result = session.execute(stmt)
            db_admin = result.scalar_one_or_none()
            
            if not db_admin:
                return None
                
            return Admin(
                user_id=db_admin.id,
                email=db_admin.email,
                first_name=db_admin.first_name,
                last_name=db_admin.last_name,
                company_id=db_admin.company_id,
                role=db_admin.role,
                date_created=db_admin.created_at,
                date_updated=db_admin.updated_at
            )
    
    async def get_admin_by_email(self, email: str) -> Optional[Admin]:
        with self.Session() as session:
            stmt = select(DBAdmin).where(DBAdmin.email == email)
            result = session.execute(stmt)
            db_admin = result.scalar_one_or_none()

            if not db_admin:
                return None

            return Admin(
                user_id=db_admin.id,
                email=db_admin.email,
                first_name=db_admin.first_name,
                last_name=db_admin.last_name,
                company_id=db_admin.company_id,
                role=db_admin.role,
                date_created=db_admin.created_at,
                date_updated=db_admin.updated_at
            )
        
    async def get_admins_by_company(self, company_id: str) -> List[Admin]:
        with self.Session() as session:
            stmt = select(DBAdmin).where(DBAdmin.company_id == company_id)
            result = session.execute(stmt)
            db_admins = result.scalars().all()
            
            return [
                Admin(
                    user_id=db_admin.id,
                    email=db_admin.email,
                    first_name=db_admin.first_name,
                    last_name=db_admin.last_name,
                    company_id=db_admin.company_id,
                    role=db_admin.role,
                    date_created=db_admin.created_at,
                    date_updated=db_admin.updated_at
                )
                for db_admin in db_admins
            ]

    async def insert_admin(self, email: str, first_name: str, last_name: str, company_id: str) -> Admin:
        with self.Session() as session:
            db_admin = DBAdmin(
                id=str(uuid4()),
                email=email,
                first_name=first_name,
                last_name=last_name,
                company_id=company_id
            )
            session.add(db_admin)
            session.commit()
            
            return Admin(
                user_id=db_admin.id,
                email=db_admin.email,
                first_name=db_admin.first_name,
                last_name=db_admin.last_name,
                company_id=db_admin.company_id,
                role=db_admin.role,
                date_created=db_admin.created_at,
                date_updated=db_admin.updated_at
            )
    
    async def update_admin(self, admin: Admin) -> Admin:
        with self.Session() as session:
            stmt = select(DBAdmin).where(DBAdmin.id == admin.user_id)
            result = session.execute(stmt)
            db_admin = result.scalar_one_or_none()
            
            if not db_admin:
                raise ValueError(f"Admin with ID {admin.user_id} not found")
                
            db_admin.email = admin.email
            db_admin.first_name = admin.first_name
            db_admin.last_name = admin.last_name
            db_admin.company_id = admin.company_id
            session.commit()
            
            return admin
   
    async def delete_admin(self, user_id: str) -> bool:
        with self.Session() as session:
            stmt = select(DBAdmin).where(DBAdmin.id == user_id)
            result = session.execute(stmt)
            db_admin = result.scalar_one_or_none()
            
            if not db_admin:
                return False
                
            session.delete(db_admin)
            session.commit()
            
            return True