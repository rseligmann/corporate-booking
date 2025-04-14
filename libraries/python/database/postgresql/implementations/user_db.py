from typing import Optional, List
from sqlalchemy import select

from config_types.user_types import User
from config_db.interfaces.user_db import UserDB
from config_types.base import Role, AccountStatus
from database.postgresql.models import User as DBUser

class PostgreSQLUserDB(UserDB):
    """PostgreSQL implementation of UserDB interface."""

    async def get_user(self, user_id: str) -> Optional[User]:
        with self.tenantSession() as session:
            stmt = select(DBUser).where(DBUser.id == user_id)
            result = session.execute(stmt)
            db_user = result.scalar_one_or_none()
            
            if not db_user:
                return None
                
            return User(
                user_id=db_user.id,
                company_id=db_user.company_id,
                email=db_user.email,
                first_name=db_user.first_name,
                last_name=db_user.last_name,
                role=Role(db_user.role),
                status=AccountStatus(db_user.status),
                date_created=db_user.created_at,
                date_updated=db_user.updated_at
            )
    
    async def get_user_by_email(self, email: str) -> Optional[User]:
        with self.tenantSession() as session:
            stmt = select(DBUser).where(DBUser.email == email)
            result = session.execute(stmt)
            db_user = result.scalar_one_or_none()

            if not db_user:
                return None

            return User(
                    user_id=db_user.id,
                    company_id=db_user.company_id,
                    email=db_user.email,
                    first_name=db_user.first_name,
                    last_name=db_user.last_name,
                    role=Role(db_user.role),
                    status=AccountStatus(db_user.status),
                    date_created=db_user.created_at,
                    date_updated=db_user.updated_at
                )

    async def get_users_by_company(self, company_id: str) -> List[User]:
        with self.tenantSession() as session:
            stmt = select(DBUser).where(DBUser.company_id == company_id)
            result = session.execute(stmt)
            db_users = result.scalars().all()
            
            return [
                User(
                    user_id=db_user.id,
                    company_id=db_user.company_id,
                    email=db_user.email,
                    first_name=db_user.first_name,
                    last_name=db_user.last_name,
                    role=Role(db_user.role),
                    status=AccountStatus(db_user.status),
                    date_created=db_user.created_at,
                    date_updated=db_user.updated_at
                )
                for db_user in db_users
            ]

    async def insert_user(
            self, 
            user_id:str, 
            company_id: str, 
            email: str, 
            first_name: str, 
            last_name: str, 
            role: Role = Role.ADMIN,
            status: AccountStatus = AccountStatus.ACTIVE
            ) -> User:
        
        with self.tenantSession() as session:
            db_user = DBUser(
                id=user_id,
                company_id=company_id,
                email=email,
                first_name=first_name,
                last_name=last_name,
                role = role.value,
                status = status.value
            )
            session.add(db_user)
            session.commit()
            
            return User(
                user_id=db_user.id,
                company_id=db_user.company_id,
                email=db_user.email,
                first_name=db_user.first_name,
                last_name=db_user.last_name,
                role=Role(db_user.role),
                status=AccountStatus(db_user.status),
                date_created=db_user.created_at,
                date_updated=db_user.updated_at
            )
    
    async def update_user(self, user: User) -> User:
        with self.tenantSession() as session:
            stmt = select(DBUser).where(DBUser.id == user.user_id)
            result = session.execute(stmt)
            db_user = result.scalar_one_or_none()
            
            if not db_user:
                raise ValueError(f"User with ID {user.user_id} not found")
                
            db_user.company_id = user.company_id
            db_user.email = user.email
            db_user.first_name = user.first_name
            db_user.last_name = user.last_name
            db_user.role = user.role.value
            db_user.status = user.status.value
            
            session.commit()
            session.refresh(db_user) #refresh timestamps
            
            return User(
                user_id=db_user.id,
                company_id=db_user.company_id,
                email=db_user.email,
                first_name=db_user.first_name,
                last_name=db_user.last_name,
                role=Role(db_user.role),
                status=AccountStatus(db_user.status),
                date_created=db_user.created_at,
                date_updated=db_user.updated_at
            )
   
    async def delete_user(self, user_id: str) -> bool:
        with self.tenantSession() as session:
            stmt = select(DBUser).where(DBUser.id == user_id)
            result = session.execute(stmt)
            db_admin = result.scalar_one_or_none()
            
            if not db_admin:
                return False
                
            session.delete(db_admin)
            session.commit()
            
            return True