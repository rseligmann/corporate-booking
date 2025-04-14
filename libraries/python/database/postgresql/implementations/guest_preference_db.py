from typing import List, Optional, Dict, Any
from sqlalchemy import select, and_
from uuid import uuid4

from config_types import (
    GuestTypes, FlightPreferences, HotelPreferences, GroundTransportPreferences, PerDiemPreferences
)
from config_db.interfaces import GuestPreferenceDB
from database.postgresql.models import (
    GuestTypes as DBGuestTypes,
    FlightPreferences as DBFlightPreferences,
    HotelPreferences as DBHotelPreferences,
    GroundTransportPreferences as DBGroundTransportPreferences,
    PerDiemPreferences as DBPerDiemPreferences
)

class PostgreSQLGuestPreferenceDB(GuestPreferenceDB):
    """PostgreSQL implementation of GuestPreferenceDB."""
    
    # Guest Type Preferences
    async def get_all_guest_types(self, company_id) -> List[GuestTypes]:
        with self.tenantSession() as session:
            stmt = select(DBGuestTypes).where(DBGuestTypes.company_id == company_id)
            result = session.execute(stmt)
            db_guest_types = result.scalars().all()

            return [
                GuestTypes(
                    guest_type_id=db_guest_type.id,
                    name=db_guest_type.name,
                    company_id=db_guest_type.company_id,
                    user_id=db_guest_type.user_id,
                    date_created=db_guest_type.created_at,
                    date_updated=db_guest_type.updated_at
                )
                for db_guest_type in db_guest_types
            ]
    
    async def get_guest_type_preferences(self, guest_type_id: str) -> Optional[Dict[str, Any]]:
        with self.tenantSession() as session:
            stmt = select(DBGuestTypes).where(DBGuestTypes.id == guest_type_id)
            result = session.execute(stmt)
            db_guest_type = result.scalar_one_or_none()
            
            if not db_guest_type:
                return None
                
            return {
                'id': db_guest_type.id,
                'guestType': db_guest_type.name,
                'flight':{
                    'cabinClass': db_guest_type.flight_preferences.cabin_class,
                    'maxStops': db_guest_type.flight_preferences.max_stops,
                    'refundableTickets': db_guest_type.flight_preferences.refundable_ticket
                },
                'hotel': {
                    'minimumRating': db_guest_type.hotel_preferences.minimum_rating
                },
                'groundTransport': {
                    'preferredServices': db_guest_type.ground_transport_preferences.preferred_services
                },
                'dailyPerDiem': float(db_guest_type.per_diem_preferences.daily_amount)
            }
    
    async def insert_guest_type_preferences(self, name: str, company_id: str, user_id: str) -> Dict[str, Any]:
        with self.tenantSession() as session:

            # Check if preferences for this guest type already exist
            existing = session.execute(
                select(DBGuestTypes).where(and_(DBGuestTypes.name == name, DBGuestTypes.company_id == company_id))
            ).scalar_one_or_none()
            
            if existing:
                raise ValueError(f"Preferences for guest type '{name}' already exist")
            
            db_guest_type = DBGuestTypes(
                id=str(uuid4()),
                name=name,
                company_id = company_id,
                user_id=user_id
                )
            session.add(db_guest_type)
            session.flush()

            flight_pref = DBFlightPreferences(id=str(uuid4()), guest_type_id=db_guest_type.id)
            hotel_pref = DBHotelPreferences(id=str(uuid4()), guest_type_id=db_guest_type.id)
            ground_pref = DBGroundTransportPreferences(id=str(uuid4()), guest_type_id=db_guest_type.id)
            per_diem = DBPerDiemPreferences(id=str(uuid4()), guest_type_id=db_guest_type.id)

            session.add_all([flight_pref, hotel_pref, ground_pref, per_diem])
            session.commit()

            return {
                'id': db_guest_type.id,
                'guestType': db_guest_type.name,
                'flight':{
                    'cabinClass': flight_pref.cabin_class,
                    'maxStops': flight_pref.max_stops,
                    'refundableTickets': flight_pref.refundable_ticket
                },
                'hotel': {
                    'minimumRating': hotel_pref.minimum_rating
                },
                'groundTransport': {
                    'preferredServices': ground_pref.preferred_services
                },
                'dailyPerDiem': float(per_diem.daily_amount)
            }
            
    
    async def update_guest_type_preferences(self, guest_type_id: str, preferences: Dict[str,Any]) -> Optional[Dict[str,Any]]:
        with self.tenantSession() as session:
            # Verify that the preferences exist
            stmt = select(DBGuestTypes).where(DBGuestTypes.id == guest_type_id)
            result = session.execute(stmt)
            db_guest_type= result.scalar_one_or_none()
            
            if not db_guest_type:
                raise ValueError(f"Guest type preferences with ID {guest_type_id} not found")
            
            # Update flight preferences
            if 'flight' in preferences:
                flight_data = preferences['flight']
                if not db_guest_type.flight_preferences:
                    db_guest_type.flight_preferences = DBFlightPreferences(guest_type_id=db_guest_type.id)
                if 'cabinClass' in flight_data:
                    db_guest_type.flight_preferences.cabin_class = flight_data['cabinClass']
                if 'maxStops' in flight_data:
                    db_guest_type.flight_preferences.max_stops = flight_data['maxStops']
                if 'refundableTicket' in flight_data:
                    db_guest_type.flight_preferences.refundable_ticket = flight_data['refundableTicket']

            # Update hotel preferences
            if 'hotel' in preferences:
                hotel_data = preferences['hotel']
                if not db_guest_type.hotel_preferences:
                    db_guest_type.hotel_preferences = DBHotelPreferences(guest_type_id=db_guest_type.id)   
                if 'minimumRating' in hotel_data:
                    db_guest_type.hotel_preferences.minimum_rating = hotel_data['minimumRating']

            # Update ground transport preferences 
            if 'groundTransport' in preferences:
                transport_data = preferences['groundTransport']
                if not db_guest_type.ground_transport_preferences:
                    db_guest_type.ground_transport_preferences = DBGroundTransportPreferences(guest_type_id=db_guest_type.id)
                if 'preferredServices' in transport_data:
                    db_guest_type.ground_transport_preferences.preferred_services = transport_data['preferredServices']
                
            # Update per diem preferences
            if 'dailyPerDiem' in preferences:
                if not db_guest_type.per_diem_preferences:
                    db_guest_type.per_diem_preferences = DBPerDiemPreferences(guest_type_id=db_guest_type.id)
                db_guest_type.per_diem_preferences.daily_amount = preferences['dailyPerDiem']

            session.commit()
            
            return await self.get_guest_type_preferences(guest_type_id)
    
    async def delete_guest_type_preferences(self, guest_type_id: str) -> bool:
        with self.tenantSession() as session:
            # Verify that the preferences exist
            stmt = select(DBGuestTypes).where(DBGuestTypes.id == guest_type_id)
            result = session.execute(stmt)
            db_guest_type = result.scalar_one_or_none()
            
            if not db_guest_type:
                return False
            
            # Check if it's used by any trips
            # from database.postgresql.models import Trip
            # trip = session.execute(
            #     select(Trip).where(Trip.guest_type_preferences_id == preferences_id)
            # ).scalar_one_or_none()
            
            # if trip:
            #     raise ValueError(
            #         f"Cannot delete guest type preferences with ID {preferences_id} "
            #         f"because it is being used by trip with ID {trip.id}"
            #     )
            
            # Delete the preferences
            session.delete(db_guest_type)
            session.commit()
            
            return True