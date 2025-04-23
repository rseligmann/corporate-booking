from typing import Optional, List, Dict, Any
from sqlalchemy import select
from uuid import uuid4

from config_types.trip_types import Trip
from config_db.interfaces.trip_db import TripDB
from database.postgresql.models import (
    Trip as DBTrip, FlightPreferences as DBFlightPreferences,
    HotelPreferences as DBHotelPreferenes, GroundTransportPreferences as DBGroundTransportPreferences,
    PerDiemPreferences as DBPerDiemPreferences, GuestTypesOnTrip as DBGuestTypesOnTrip,
    Itinerary as DBItinerary, GuestProfile as DBGuestProfile
)

class PostgreSQLTripDB(TripDB):
    """PostgreSQL implementation of TripDB interface."""
    
    # Trip methods
    async def get_trips_by_company(self, company_id: str) -> Optional[List[Dict[str, Any]]]:
        """Retrieve all trips for a company"""
        with self.tenantSession() as session:
            stmt = select(DBTrip).where(DBTrip.company_id == company_id)
            result = session.execute(stmt)
            db_trips = result.scalars().all()
            
            return [self._format_trip_for_frontend(db_trip) for db_trip in db_trips]

    async def get_trips_by_user(self, user_id: str) -> Optional[List[Dict[str, Any]]]:
        """Retrieve all trips for a company"""
        with self.tenantSession() as session:
            stmt = select(DBTrip).where(DBTrip.user_id == user_id)
            result = session.execute(stmt)
            db_trips = result.scalars().all()
            
            return [self._format_trip_for_frontend(db_trip) for db_trip in db_trips]
    
    async def get_trips_by_guest_profile(self, guest_profile_id: str) -> Optional[List[Dict[str, Any]]]:
        """Retrieve all trips for a guest profile"""
        with self.tenantSession() as session:
            stmt = select(DBTrip).where(DBTrip.guest_profile_id == guest_profile_id)
            result = session.execute(stmt)
            db_trips = result.scalars().all()
            
            return [self._format_trip_for_frontend(db_trip) for db_trip in db_trips]
    
    async def get_trips_by_id(self, trip_id: str) -> Optional[Dict[str, Any]]:
        """Retrieve a trip by ID"""
        with self.tenantSession() as session:
            stmt = select(DBTrip).where(DBTrip.id== trip_id)
            result = session.execute(stmt)
            db_trip = result.scalar_one_or_none()
            
            return self._format_trip_for_frontend(db_trip)
    
    async def insert_trip(self, trip_data: Dict[str, Any]) -> str:
        """Insert a new trip, returns ID of the newly created trip"""
        with self.tenantSession() as session:
            trip_id = str(uuid4())
            itinerary_id = str(uuid4())
            guest_type_on_trip_id = str(uuid4())
            flight_prefs_id = str(uuid4())
            hotel_prefs_id = str(uuid4())
            ground_prefs_id = str(uuid4())
            per_diem_prefs_id = str(uuid4())
            guest_id = str(uuid4())

            flight_prefs = DBFlightPreferences(
                id=flight_prefs_id,
                guest_type_on_trip_id=guest_type_on_trip_id,
                cabin_class=trip_data['travelPreferences']['flight'].get('cabinClass'),
                max_stops=trip_data['travelPreferences']['flight'].get('maxStops'),
                refundable_ticket=trip_data['travelPreferences']['flight'].get('refundableTickets')
            )
            session.add(flight_prefs)

            hotel_prefs = DBHotelPreferenes(
                id=hotel_prefs_id,
                guest_type_on_trip_id=guest_type_on_trip_id,
                minimum_rating=trip_data['travelPreferences']['hotel'].get('minimumRating')
            )
            session.add(hotel_prefs)
            
            ground_prefs = DBGroundTransportPreferences(
                id=ground_prefs_id,
                guest_type_on_trip_id=guest_type_on_trip_id,
                preferred_services=trip_data['travelPreferences']['groundTransport'].get('preferredServices')
            )
            session.add(ground_prefs)

            per_diem_prefs = DBPerDiemPreferences(
                id=per_diem_prefs_id,
                guest_type_on_trip_id=guest_type_on_trip_id,
                daily_amount=trip_data['travelPreferences'].get('dailyPerDiem')
            )
            session.add(per_diem_prefs)

            guest_type_on_trip = DBGuestTypesOnTrip(
                id=guest_type_on_trip_id,
                name=trip_data['travelPreferences'].get('guestType', 'N/A')
            )
            session.add(guest_type_on_trip)

            itinerary = DBItinerary(
                id=itinerary_id,
                origin_city_id=trip_data['itinerary']['origin']['city']['id'],
                origin_searched_airports=trip_data['itinerary']['origin'].get('searchedAirports', []),
                destination_city_id=trip_data['itinerary']['destination']['city']['id'],
                destination_searched_airports=trip_data['itinerary']['destination'].get('searchedAirports', []),
                start_date=trip_data['itinerary'].get('startDate'),
                end_date=trip_data['itinerary'].get('endDate')
            )
            session.add(itinerary)

            guest_profile = DBGuestProfile(
                id=guest_id,
                company_id=trip_data.get('companyId'),
                user_id=trip_data.get('userId'),
                first_name=trip_data['guest'].get('firstName'),
                last_name=trip_data['guest'].get('lastName'),
                email=trip_data['guest'].get('email'),
                phone = trip_data['guest'].get('phone')
            )
            session.add(guest_profile)

            trip = DBTrip(
                id=trip_id,
                company_id=trip_data.get('companyId'),
                user_id=trip_data.get('userId'),
                guest_profile_id=guest_id,
                guest_type_on_trip_id=guest_type_on_trip_id,
                itinerary_id = itinerary_id,
                status=trip_data.get('status'),
                estimated_budget=trip_data.get('estimatedBudget'),
                booked_budget=trip_data.get('bookedBudget'),
                actual_spend=trip_data.get('actualSpend')
            )  
            session.add(trip)
            session.commit()
            
            return trip_id
    
    # async def update_trip(self, trip_id: str, trip_data: Dict[str, Any]) -> Optional[Dict[str,Any]]:
    #     """Update an existing trip"""
    #     with self.tenantSession() as session:
    #         stmt = select(DBTrip).where(DBTrip.id == trip_id)
    #         result = session.execute(stmt)
    #         db_trip = result.scalar_one_or_none()
            
    #         if not db_trip:
    #             raise ValueError(f"Trip with ID {trip_id} not found")
                
    #         # Update the DB trip with values from the domain trip
    #         db_trip.guest_profile_id = trip.guest_profile_id
    #         db_trip.guest_type = trip.guest_type
    #         db_trip.status = trip.status
    #         db_trip.guest_type_preferences_id = trip.guest_type_preferences_id
    #         db_trip.meeting_id = trip.meeting_id
    #         db_trip.hotel_id = trip.hotel_id
    #         db_trip.per_diem_id = trip.per_diem_id
    #         db_trip.modified = datetime.now().date()
    #         db_trip.total_budget = trip.total_budget
    #         db_trip.actual_spend = trip.actual_spend
    #         db_trip.admin_id = trip.admin_id
            
    #         session.commit()
            
    #         return trip
    
    async def delete_trip(self, trip_id: str) -> bool:
        """Delete a trip by ID"""
        with self.tenantSession() as session:
            stmt = select(DBTrip).where(DBTrip.id == trip_id)
            result = session.execute(stmt)
            db_trip = result.scalar_one_or_none()
            
            if not db_trip:
                return False
                
            session.delete(db_trip)
            session.commit()
            
            return True
        
    # Helper methods
    def _format_trip_for_frontend(self, db_trip) -> Dict[str, Any]:
        """Format a database Trip object for the frontend."""
        return {
            'id': db_trip.id,
                'guest':{
                    'id': db_trip.guest_profile.id,
                    'firstName': db_trip.guest_profile.first_name,
                    'lastName': db_trip.guest_profile.last_name,
                    'email': db_trip.guest_profile.email,
                    'phone': db_trip.guest_profile.phone
                },
                'guestType': db_trip.guest_type_on_trip.name,
                'status': db_trip.status,
                'travelPreferences':{ 
                    'id': db_trip.guest_type_on_trip.id,
                    'guestType': db_trip.guest_type_on_trip.name,
                    'flight':{
                        'cabinClass': db_trip.guest_type_on_trip.flight_preferences.cabin_class,
                        'maxStops': db_trip.guest_type_on_trip.flight_preferences.max_stops,
                        'refundableTickets': db_trip.guest_type_on_trip.flight_preferences.refundable_ticket
                    },
                    'hotel': {
                        'minimumRating': db_trip.guest_type_on_trip.hotel_preferences.minimum_rating
                    },
                    'groundTransport': {
                        'preferredServices': db_trip.guest_type_on_trip.ground_transport_preferences.preferred_services
                    },
                    'dailyPerDiem': float(db_trip.guest_type_on_trip.per_diem_preferences.daily_amount)          
                },
                'itinerary':{
                    'id': db_trip.itinerary.id,
                    'origin':{
                        'city':{
                            'id': db_trip.itinerary.origin_city.id,
                            'name': db_trip.itinerary.origin_city.city, #in cities tables, 'name' column is 'city'
                            'state_id': db_trip.itinerary.origin_city.state_id,
                            'lat': float(db_trip.itinerary.origin_city.lat),
                            'lng': float(db_trip.itinerary.origin_city.lng),
                            'ranking': int(db_trip.itinerary.origin_city.ranking),
                        },
                        'searchedAirports': db_trip.itinerary.origin_searched_airports,
                    },
                    'destination':{
                        'city':{
                            'id': db_trip.itinerary.destination_city.id,
                            'name': db_trip.itinerary.destination_city.city, #in cities tables, 'name' column is 'city'
                            'state_id': db_trip.itinerary.destination_city.state_id,
                            'lat': float(db_trip.itinerary.destination_city.lat),
                            'lng': float(db_trip.itinerary.destination_city.lng),
                            'ranking': int(db_trip.itinerary.destination_city.ranking),
                        },
                        'searchedAirports': db_trip.itinerary.destination_searched_airports,
                    },
                    'startDate': db_trip.itinerary.start_date,
                    'endDate': db_trip.itinerary.end_date
                },
                'created': db_trip.created_at,
                'modified': db_trip.updated_at,
                'userId': db_trip.user_id,
                'companyId': db_trip.company_id,
                'estimatedBudget': db_trip.estimated_budget,
                'bookedBudget': db_trip.booked_budget,
                'actualSpend': db_trip.actual_spend
        }
    
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

    
#     def _convert_db_meeting_to_domain(self, db_meeting: DBMeeting) -> Meeting:
#         """Convert a database Meeting model to a domain Meeting model"""
#         return Meeting(
#             meeting_id=db_meeting.id,
#             address_id=db_meeting.address_id,
#             location=db_meeting.location,
#             start_date=db_meeting.start_date,
#             end_date=db_meeting.end_date
#         )