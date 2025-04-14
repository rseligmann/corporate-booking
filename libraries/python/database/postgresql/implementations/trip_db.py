# from typing import Optional, List
# from sqlalchemy import select, and_
# from uuid import uuid4
# from datetime import date, datetime

# from config_types.trip_types import Trip, Meeting
# from config_db.interfaces.trip_db import TripDB
# from database.postgresql.models import Trip as DBTrip, Meeting as DBMeeting

# class PostgreSQLTripDB(TripDB):
#     """PostgreSQL implementation of TripDB interface."""
    
#     # Trip methods
#     async def get_trip(self, trip_id: str) -> Optional[Trip]:
#         """Retrieve a trip by ID"""
#         with self.Session() as session:
#             stmt = select(DBTrip).where(DBTrip.id == trip_id)
#             result = session.execute(stmt)
#             db_trip = result.scalar_one_or_none()
            
#             if not db_trip:
#                 return None
                
#             return self._convert_db_trip_to_domain(db_trip)
    
#     async def get_trips_by_admin(self, admin_id: str) -> List[Trip]:
#         """Retrieve all trips for an admin"""
#         with self.Session() as session:
#             stmt = select(DBTrip).where(DBTrip.admin_id == admin_id)
#             result = session.execute(stmt)
#             db_trips = result.scalars().all()
            
#             return [self._convert_db_trip_to_domain(db_trip) for db_trip in db_trips]
    
#     async def get_trips_by_guest_profile(self, profile_id: str) -> List[Trip]:
#         """Retrieve all trips for a guest profile"""
#         with self.Session() as session:
#             stmt = select(DBTrip).where(DBTrip.guest_profile_id == profile_id)
#             result = session.execute(stmt)
#             db_trips = result.scalars().all()
            
#             return [self._convert_db_trip_to_domain(db_trip) for db_trip in db_trips]
    
#     async def insert_trip(
#         self,
#         guest_profile_id: str,
#         guest_type: str,
#         status: str,
#         guest_type_preferences_id: str,
#         meeting_id: str,
#         admin_id: str,
#         created_by: str,
#         hotel_id: Optional[str] = None,
#         per_diem_id: Optional[str] = None,
#         total_budget: Optional[float] = None,
#         actual_spend: Optional[float] = None
#     ) -> Trip:
#         """Insert a new trip"""
#         with self.Session() as session:
#             trip_id = str(uuid4())
#             now = datetime.now().date()
            
#             db_trip = DBTrip(
#                 id=trip_id,
#                 guest_profile_id=guest_profile_id,
#                 guest_type=guest_type,
#                 status=status,
#                 guest_type_preferences_id=guest_type_preferences_id,
#                 meeting_id=meeting_id,
#                 hotel_id=hotel_id,
#                 per_diem_id=per_diem_id,
#                 created=now,
#                 modified=now,
#                 created_by=created_by,
#                 total_budget=total_budget,
#                 actual_spend=actual_spend,
#                 admin_id=admin_id
#             )
            
#             session.add(db_trip)
#             session.commit()
            
#             return self._convert_db_trip_to_domain(db_trip)
    
#     async def update_trip(self, trip: Trip) -> Trip:
#         """Update an existing trip"""
#         with self.Session() as session:
#             stmt = select(DBTrip).where(DBTrip.id == trip.trip_id)
#             result = session.execute(stmt)
#             db_trip = result.scalar_one_or_none()
            
#             if not db_trip:
#                 raise ValueError(f"Trip with ID {trip.trip_id} not found")
                
#             # Update the DB trip with values from the domain trip
#             db_trip.guest_profile_id = trip.guest_profile_id
#             db_trip.guest_type = trip.guest_type
#             db_trip.status = trip.status
#             db_trip.guest_type_preferences_id = trip.guest_type_preferences_id
#             db_trip.meeting_id = trip.meeting_id
#             db_trip.hotel_id = trip.hotel_id
#             db_trip.per_diem_id = trip.per_diem_id
#             db_trip.modified = datetime.now().date()
#             db_trip.total_budget = trip.total_budget
#             db_trip.actual_spend = trip.actual_spend
#             db_trip.admin_id = trip.admin_id
            
#             session.commit()
            
#             return trip
    
#     async def delete_trip(self, trip_id: str) -> bool:
#         """Delete a trip by ID"""
#         with self.Session() as session:
#             stmt = select(DBTrip).where(DBTrip.id == trip_id)
#             result = session.execute(stmt)
#             db_trip = result.scalar_one_or_none()
            
#             if not db_trip:
#                 return False
                
#             session.delete(db_trip)
#             session.commit()
            
#             return True
    
#     # Meeting methods
#     async def get_meeting(self, meeting_id: str) -> Optional[Meeting]:
#         """Retrieve a meeting by ID"""
#         with self.Session() as session:
#             stmt = select(DBMeeting).where(DBMeeting.id == meeting_id)
#             result = session.execute(stmt)
#             db_meeting = result.scalar_one_or_none()
            
#             if not db_meeting:
#                 return None
                
#             return self._convert_db_meeting_to_domain(db_meeting)
    
#     async def get_meetings_by_date_range(
#         self, 
#         start_date: date, 
#         end_date: date
#     ) -> List[Meeting]:
#         """Retrieve all meetings within a date range"""
#         with self.Session() as session:
#             # Find meetings that overlap with the date range
#             stmt = select(DBMeeting).where(
#                 and_(
#                     DBMeeting.end_date >= start_date,
#                     DBMeeting.start_date <= end_date
#                 )
#             )
#             result = session.execute(stmt)
#             db_meetings = result.scalars().all()
            
#             return [self._convert_db_meeting_to_domain(db_meeting) for db_meeting in db_meetings]
    
#     async def insert_meeting(
#         self,
#         address_id: str,
#         location: str,
#         start_date: date,
#         end_date: date
#     ) -> Meeting:
#         """Insert a new meeting"""
#         with self.Session() as session:
#             meeting_id = str(uuid4())
            
#             db_meeting = DBMeeting(
#                 id=meeting_id,
#                 address_id=address_id,
#                 location=location,
#                 start_date=start_date,
#                 end_date=end_date
#             )
            
#             session.add(db_meeting)
#             session.commit()
            
#             return self._convert_db_meeting_to_domain(db_meeting)
    
#     async def update_meeting(self, meeting: Meeting) -> Meeting:
#         """Update an existing meeting"""
#         with self.Session() as session:
#             stmt = select(DBMeeting).where(DBMeeting.id == meeting.meeting_id)
#             result = session.execute(stmt)
#             db_meeting = result.scalar_one_or_none()
            
#             if not db_meeting:
#                 raise ValueError(f"Meeting with ID {meeting.meeting_id} not found")
                
#             # Update the DB meeting with values from the domain meeting
#             db_meeting.address_id = meeting.address_id
#             db_meeting.location = meeting.location
#             db_meeting.start_date = meeting.start_date
#             db_meeting.end_date = meeting.end_date
            
#             session.commit()
            
#             return meeting
    
#     async def delete_meeting(self, meeting_id: str) -> bool:
#         """Delete a meeting by ID"""
#         with self.Session() as session:
#             stmt = select(DBMeeting).where(DBMeeting.id == meeting_id)
#             result = session.execute(stmt)
#             db_meeting = result.scalar_one_or_none()
            
#             if not db_meeting:
#                 return False
                
#             session.delete(db_meeting)
#             session.commit()
            
#             return True
    
#     # Helper methods
#     def _convert_db_trip_to_domain(self, db_trip: DBTrip) -> Trip:
#         """Convert a database Trip model to a domain Trip model"""
#         return Trip(
#             trip_id=db_trip.id,
#             guest_profile_id=db_trip.guest_profile_id,
#             guest_type=db_trip.guest_type,
#             status=db_trip.status,
#             guest_type_preferences_id=db_trip.guest_type_preferences_id,
#             meeting_id=db_trip.meeting_id,
#             hotel_id=db_trip.hotel_id,
#             per_diem_id=db_trip.per_diem_id,
#             created=db_trip.created,
#             modified=db_trip.modified,
#             created_by=db_trip.created_by,
#             total_budget=db_trip.total_budget,
#             actual_spend=db_trip.actual_spend,
#             admin_id=db_trip.admin_id
#         )
    
#     def _convert_db_meeting_to_domain(self, db_meeting: DBMeeting) -> Meeting:
#         """Convert a database Meeting model to a domain Meeting model"""
#         return Meeting(
#             meeting_id=db_meeting.id,
#             address_id=db_meeting.address_id,
#             location=db_meeting.location,
#             start_date=db_meeting.start_date,
#             end_date=db_meeting.end_date
#         )