from dataclasses import dataclass
from sqlalchemy import create_engine, select
from sqlalchemy.orm import sessionmaker
from pydantic_core import MultiHostUrl
from datetime import datetime
from typing import Optional, List

from ConfigDB import ConfigDB
from database.postgresql.models import Admin, Guest, PendingBooking, ActiveBooking, Hotel, Flight

@dataclass
class PostgresConfigDBReaderConfig:
    db_name: str
    db_user: str
    db_password: str
    db_host: str
    db_port: int

class PSQLConfigDB(ConfigDB):
    def __init__(self, db_name, db_user, db_password, db_host, db_port):
        self.db_name = db_name
        self.db_user = db_user
        self.db_password = db_password
        self.db_host = db_host
        self.db_port = db_port
        
        self.uri = MultiHostUrl.build(
            scheme="postgresql+psycopg2",
            username=db_user,
            password=db_password,
            path=db_name,
            host=db_host,
            port=db_port
        )
        
        self.engine = create_engine(str(self.uri))
        self.Session = sessionmaker(bind=self.engine)

    @classmethod
    def connect(cls, config: PostgresConfigDBReaderConfig):
        return cls(
            config.db_name,
            config.db_user,
            config.db_password,
            config.db_host,
            config.db_port
        )

    async def get_admin(self, user_id: str) -> Optional[Admin]:
        with self.Session() as session:
            stmt = select(Admin).where(
                Admin.id == user_id,
            )
            result = session.execute(stmt)
            user = result.scalar_one_or_none()
            
            if user:
                return Admin(
                    id=user.id,
                    email=user.email,
                    first_name=user.first_name,
                    last_name=user.last_name
                )
            return None
    
    async def get_admin_by_email(self, email: str) -> Optional[Admin]:
        with self.Session() as session:
            stmt = select(Admin).where(Admin.email == email)
            result = session.execute(stmt)
            db_user = result.scalar_one_or_none()

            if not db_user:
                return None

            return Admin(
                id=db_user.id,
                email=db_user.email,
                first_name=db_user.first_name,
                last_name=db_user.last_name
            )

    async def get_guest(self, user_id: str) -> Optional[Guest]:
        with self.Session() as session:
            stmt = select(Guest).where(
                Guest.id == user_id,
            )
            result = session.execute(stmt)
            user = result.scalar_one_or_none()
            
            if user:
                return Guest(
                    id=user.id,
                    email=user.email,
                    first_name=user.first_name,
                    last_name=user.last_name,
                    admin_id=user.admin_id
                )
            return None

    async def get_admin_guests(self, admin_id: str) -> List[Guest]:
        with self.Session() as session:
            stmt = select(Guest).where(
                Guest.admin_id == admin_id,
            )
            result = session.execute(stmt)
            users = result.scalars().all()
            
            return [Guest(
                id=user.id,
                email=user.email,
                first_name=user.first_name,
                last_name=user.last_name,
                admin_id=user.admin_id
            ) for user in users]

    async def insert_admin(self, email: str, first_name: str, last_name: str) -> Admin:
        with self.Session() as session:
            user = Admin(
                email=email,
                first_name=first_name,
                last_name=last_name,
            )
            session.add(user)
            session.commit()
            
            return Admin(
                id=user.id,
                email=user.email,
                first_name=user.first_name,
                last_name=user.last_name
            )

    async def insert_guest(self, email: str, first_name: str, last_name: str, admin_id: str) -> Guest:
        with self.Session() as session:
            user = Guest(
                email=email,
                first_name=first_name,
                last_name=last_name,
                admin_id=admin_id
            )
            session.add(user)
            session.commit()
            
            return Guest(
                id=user.id,
                email=user.email,
                first_name=user.first_name,
                last_name=user.last_name,
                admin_id=user.admin_id
            )

    async def get_booking(self, booking_id: str) -> Optional[PendingBooking]:
        # Implement based on your database schema
        pass

    async def get_guest_booking(self, booking_id: str) -> Optional[ActiveBooking]:
        # Implement based on your database schema
        pass

    async def insert_booking(
        self,
        admin_id: str,
        guest_id: str,
        total_price: float,
        flight_id: Optional[str] = None,
        hotel_id: Optional[str] = None
    ) -> PendingBooking:
        # Implement based on your database schema
        pass

    async def insert_guest_booking(
        self,
        inviter_id: str,
        guest_email: str,
        flight_id: Optional[str] = None,
        hotel_id: Optional[str] = None
    ) -> ActiveBooking:
        # Implement based on your database schema
        pass

    async def update_booking(self, booking: PendingBooking) -> PendingBooking:
        # Implement based on your database schema
        pass

    async def update_guest_booking(self, booking: ActiveBooking) -> ActiveBooking:
        # Implement based on your database schema
        pass

    async def get_flight(self, flight_id: str) -> Optional[Flight]:
        # Implement based on your database schema
        pass

    async def insert_flight(
        self,
        flight_number: str,
        airline: str,
        departure: datetime,
        arrival: datetime,
        origin: str,
        destination: str,
        price: float
    ) -> Flight:
        # Implement based on your database schema
        pass

    async def update_flight(self, flight: Flight) -> Flight:
        # Implement based on your database schema
        pass

    async def get_hotel(self, hotel_id: str) -> Optional[Hotel]:
        # Implement based on your database schema
        pass

    async def insert_hotel(
        self,
        name: str,
        location: str,
        check_in: datetime,
        check_out: datetime,
        room_type: str,
        price: float
    ) -> Hotel:
        # Implement based on your database schema
        pass

    async def update_hotel(self, hotel: Hotel) -> Hotel:
        # Implement based on your database schema
        pass