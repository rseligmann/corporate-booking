# from typing import Optional, List
# from datetime import datetime
# from sqlalchemy import select, and_
# from uuid import uuid4

# from config_types.hotel_types import Hotel
# from config_db.interfaces.hotel_db import HotelDB
# from database.postgresql.models import Hotel as DBHotel
# from database.postgresql.models import Trip as DBTrip

# class PostgreSQLHotelDB(HotelDB):
#     """PostgreSQL implementation of AccommodationDB interface."""
    
#     async def get_hotel(self, hotel_id: str) -> Optional[Hotel]:
#         with self.Session() as session:
#             stmt = select(DBHotel).where(DBHotel.id == hotel_id)
#             result = session.execute(stmt)
#             db_hotel = result.scalar_one_or_none()
            
#             if not db_hotel:
#                 return None
                
#             return Hotel(
#                 hotel_id=db_hotel.id,
#                 address_id=db_hotel.address_id,
#                 rating_id=db_hotel.rating_id,
#                 booking_reference=db_hotel.booking_reference,
#                 name=db_hotel.name,
#                 room_type=db_hotel.room_type,
#                 price=db_hotel.price,
#                 booking_status_id=db_hotel.booking_status_id,
#                 check_in=db_hotel.check_in,
#                 check_out=db_hotel.check_out
#             )
    
#     async def get_hotels_by_trip(self, trip_id: str) -> List[Hotel]:
#         with self.Session() as session:
#             # Find the hotel_id from the trip first
#             trip_stmt = select(DBTrip.hotel_id).where(DBTrip.id == trip_id)
#             result = session.execute(trip_stmt)
#             hotel_id = result.scalar_one_or_none()
            
#             if not hotel_id:
#                 return []
            
#             # Then get the hotel
#             hotel_stmt = select(DBHotel).where(DBHotel.id == hotel_id)
#             result = session.execute(hotel_stmt)
#             db_hotel = result.scalar_one_or_none()
            
#             if not db_hotel:
#                 return []
                
#             return [Hotel(
#                 hotel_id=db_hotel.id,
#                 address_id=db_hotel.address_id,
#                 rating_id=db_hotel.rating_id,
#                 booking_reference=db_hotel.booking_reference,
#                 name=db_hotel.name,
#                 room_type=db_hotel.room_type,
#                 price=db_hotel.price,
#                 booking_status_id=db_hotel.booking_status_id,
#                 check_in=db_hotel.check_in,
#                 check_out=db_hotel.check_out
#             )]
    
#     async def get_hotels_by_location(self, location: str) -> List[Hotel]:
#         with self.Session() as session:
#             # Join with Address to filter by location
#             stmt = select(DBHotel).join(
#                 DBHotel.address
#             ).where(
#                 DBHotel.address.has(city=location)
#             )
            
#             result = session.execute(stmt)
#             db_hotels = result.scalars().all()
            
#             return [
#                 Hotel(
#                     hotel_id=db_hotel.id,
#                     address_id=db_hotel.address_id,
#                     rating_id=db_hotel.rating_id,
#                     booking_reference=db_hotel.booking_reference,
#                     name=db_hotel.name,
#                     room_type=db_hotel.room_type,
#                     price=db_hotel.price,
#                     booking_status_id=db_hotel.booking_status_id,
#                     check_in=db_hotel.check_in,
#                     check_out=db_hotel.check_out
#                 )
#                 for db_hotel in db_hotels
#             ]
    
#     async def insert_hotel(
#         self,
#         address_id: str,
#         rating_id: str,
#         name: str,
#         room_type: str,
#         price: float,
#         booking_status_id: str,
#         check_in: datetime,
#         check_out: datetime,
#         booking_reference: Optional[str] = None
#     ) -> Hotel:
#         with self.Session() as session:
#             db_hotel = DBHotel(
#                 id=str(uuid4()),
#                 address_id=address_id,
#                 rating_id=rating_id,
#                 booking_reference=booking_reference,
#                 name=name,
#                 room_type=room_type,
#                 price=price,
#                 booking_status_id=booking_status_id,
#                 check_in=check_in,
#                 check_out=check_out
#             )
#             session.add(db_hotel)
#             session.commit()
            
#             return Hotel(
#                 hotel_id=db_hotel.id,
#                 address_id=db_hotel.address_id,
#                 rating_id=db_hotel.rating_id,
#                 booking_reference=db_hotel.booking_reference,
#                 name=db_hotel.name,
#                 room_type=db_hotel.room_type,
#                 price=db_hotel.price,
#                 booking_status_id=db_hotel.booking_status_id,
#                 check_in=db_hotel.check_in,
#                 check_out=db_hotel.check_out
#             )
    
#     async def update_hotel(self, hotel: Hotel) -> Hotel:
#         with self.Session() as session:
#             stmt = select(DBHotel).where(DBHotel.id == hotel.hotel_id)
#             result = session.execute(stmt)
#             db_hotel = result.scalar_one_or_none()
            
#             if not db_hotel:
#                 raise ValueError(f"Hotel with ID {hotel.hotel_id} not found")
                
#             db_hotel.address_id = hotel.address_id
#             db_hotel.rating_id = hotel.rating_id
#             db_hotel.booking_reference = hotel.booking_reference
#             db_hotel.name = hotel.name
#             db_hotel.room_type = hotel.room_type
#             db_hotel.price = hotel.price
#             db_hotel.booking_status_id = hotel.booking_status_id
#             db_hotel.check_in = hotel.check_in
#             db_hotel.check_out = hotel.check_out
            
#             session.commit()
            
#             return hotel
    
#     async def update_hotel_status(self, hotel_id: str, status_id: str) -> Hotel:
#         with self.Session() as session:
#             stmt = select(DBHotel).where(DBHotel.id == hotel_id)
#             result = session.execute(stmt)
#             db_hotel = result.scalar_one_or_none()
            
#             if not db_hotel:
#                 raise ValueError(f"Hotel with ID {hotel_id} not found")
                
#             db_hotel.booking_status_id = status_id
#             session.commit()
            
#             return Hotel(
#                 hotel_id=db_hotel.id,
#                 address_id=db_hotel.address_id,
#                 rating_id=db_hotel.rating_id,
#                 booking_reference=db_hotel.booking_reference,
#                 name=db_hotel.name,
#                 room_type=db_hotel.room_type,
#                 price=db_hotel.price,
#                 booking_status_id=db_hotel.booking_status_id,
#                 check_in=db_hotel.check_in,
#                 check_out=db_hotel.check_out
#             )
    
#     async def delete_hotel(self, hotel_id: str) -> bool:
#         with self.Session() as session:
#             stmt = select(DBHotel).where(DBHotel.id == hotel_id)
#             result = session.execute(stmt)
#             db_hotel = result.scalar_one_or_none()
            
#             if not db_hotel:
#                 return False
                
#             session.delete(db_hotel)
#             session.commit()
            
#             return True