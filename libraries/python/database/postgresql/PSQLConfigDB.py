from dataclasses import dataclass
from sqlalchemy import create_engine, select
from sqlalchemy.orm import sessionmaker
from pydantic_core import MultiHostUrl
from datetime import datetime
from typing import Optional

from database import Database
from types import User, Admin, Guest, Booking, GuestBooking, Flight, Hotel
from models import User as DBUser, UserRole

@dataclass
class PostgresConfigDBReaderConfig:
    db_name: str
    db_user: str
    db_password: str
    db_host: str
    db_port: int

class PSQLConfigDB(Database):
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
            stmt = select(DBUser).where(
                DBUser.id == user_id,
                DBUser.role == UserRole.ADMIN
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

    async def get_guest(self, user_id: str) -> Optional[Guest]:
        with self.Session() as session:
            stmt = select(DBUser).where(
                DBUser.id == user_id,
                DBUser.role == UserRole.GUEST
            )
            result = session.execute(stmt)
            user = result.scalar_one_or_none()
            
            if user:
                return Guest(
                    id=user.id,
                    email=user.email,
                    first_name=user.first_name,
                    last_name=user.last_name
                )
            return None

    async def insert_admin(self, email: str, first_name: str, last_name: str) -> Admin:
        with self.Session() as session:
            user = DBUser(
                email=email,
                first_name=first_name,
                last_name=last_name,
                role=UserRole.ADMIN
            )
            session.add(user)
            session.commit()
            
            return Admin(
                id=user.id,
                email=user.email,
                first_name=user.first_name,
                last_name=user.last_name
            )

    async def insert_guest(self, email: str, first_name: str, last_name: str) -> Guest:
        with self.Session() as session:
            user = DBUser(
                email=email,
                first_name=first_name,
                last_name=last_name,
                role=UserRole.GUEST
            )
            session.add(user)
            session.commit()
            
            return Guest(
                id=user.id,
                email=user.email,
                first_name=user.first_name,
                last_name=user.last_name
            )

    async def update_user(self, user: User) -> User:
        with self.Session() as session:
            stmt = select(DBUser).where(DBUser.id == user.id)
            result = session.execute(stmt)
            db_user = result.scalar_one_or_none()
            
            if not db_user:
                raise ValueError(f"User with id {user.id} not found")
            
            db_user.email = user.email
            db_user.first_name = user.first_name
            db_user.last_name = user.last_name
            session.commit()
            
            if db_user.role == UserRole.ADMIN:
                return Admin(
                    id=db_user.id,
                    email=db_user.email,
                    first_name=db_user.first_name,
                    last_name=db_user.last_name
                )
            return Guest(
                id=db_user.id,
                email=db_user.email,
                first_name=db_user.first_name,
                last_name=db_user.last_name
            )

    async def get_booking(self, booking_id: str) -> Optional[Booking]:
        # Implement based on your database schema
        pass

    async def get_guest_booking(self, booking_id: str) -> Optional[GuestBooking]:
        # Implement based on your database schema
        pass

    async def insert_booking(
        self,
        user_id: str,
        total_price: float,
        flight_id: Optional[str] = None,
        hotel_id: Optional[str] = None
    ) -> Booking:
        # Implement based on your database schema
        pass

    async def insert_guest_booking(
        self,
        inviter_id: str,
        guest_email: str,
        flight_id: Optional[str] = None,
        hotel_id: Optional[str] = None
    ) -> GuestBooking:
        # Implement based on your database schema
        pass

    async def update_booking(self, booking: Booking) -> Booking:
        # Implement based on your database schema
        pass

    async def update_guest_booking(self, booking: GuestBooking) -> GuestBooking:
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

    def get_user_by_email(self, email):
        with self.Session() as session:
            stmt = select(DBUser).where(DBUser.email == email)
            result = session.execute(stmt)
            return result.scalar_one_or_none()