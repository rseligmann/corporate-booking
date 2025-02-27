from typing import List, Optional
from sqlalchemy import select
from uuid import uuid4
from datetime import date

from config_types.guest_preference_types import (
    GuestTypePreferences, FlightPreferences, HotelPreferences, GroundTransportPreferences,
)
from config_db.interfaces.guest_preference_db import GuestPreferenceDB
from database.postgresql.models import (
    FlightPreferences as DBFlightPreferences,
    FlightPreferencesCabinClass as DBCabinClass,
    FlightPreferencesMaxStops as DBMaxStops,
    HotelPreferences as DBHotelPreferences,
    HotelRating as DBHotelRating,
    GroundTransportPreferences as DBGroundTransportPreferences,
    GroundTransportServices as DBTransportService,
    GuestTypePreferences as DBGuestTypePreferences
)

class PostgreSQLGuestPreferenceDB(GuestPreferenceDB):
    """PostgreSQL implementation of GuestPreferenceDB."""
    
    # Flight Preferences
    async def get_flight_preferences(self, preferences_id: str) -> Optional[FlightPreferences]:
        with self.Session() as session:
            stmt = select(DBFlightPreferences).where(DBFlightPreferences.id == preferences_id)
            result = session.execute(stmt)
            db_prefs = result.scalar_one_or_none()
            
            if not db_prefs:
                return None
                
            return FlightPreferences(
                preferences_id=db_prefs.id,
                cabin_class_id=db_prefs.cabin_class_id,
                max_stops_id=db_prefs.max_stops_id,
                refundable_ticket=db_prefs.refundable_ticket
            )
    
    async def insert_flight_preferences(
        self,
        cabin_class_id: str,
        max_stops_id: str,
        refundable_ticket: bool
    ) -> FlightPreferences:
        with self.Session() as session:
            # Verify that cabin_class_id and max_stops_id exist
            cabin_class = session.execute(
                select(DBCabinClass).where(DBCabinClass.id == cabin_class_id)
            ).scalar_one_or_none()
            
            max_stops = session.execute(
                select(DBMaxStops).where(DBMaxStops.id == max_stops_id)
            ).scalar_one_or_none()
            
            if not cabin_class:
                raise ValueError(f"Cabin class with ID {cabin_class_id} not found")
                
            if not max_stops:
                raise ValueError(f"Max stops with ID {max_stops_id} not found")
            
            # Create new flight preferences
            db_prefs = DBFlightPreferences(
                id=str(uuid4()),
                cabin_class_id=cabin_class_id,
                max_stops_id=max_stops_id,
                refundable_ticket=refundable_ticket
            )
            session.add(db_prefs)
            session.commit()
            
            return FlightPreferences(
                preferences_id=db_prefs.id,
                cabin_class_id=db_prefs.cabin_class_id,
                max_stops_id=db_prefs.max_stops_id,
                refundable_ticket=db_prefs.refundable_ticket
            )
    
    async def update_flight_preferences(self, preferences: FlightPreferences) -> FlightPreferences:
        with self.Session() as session:
            # Verify that the preferences exist
            stmt = select(DBFlightPreferences).where(DBFlightPreferences.id == preferences.preferences_id)
            result = session.execute(stmt)
            db_prefs = result.scalar_one_or_none()
            
            if not db_prefs:
                raise ValueError(f"Flight preferences with ID {preferences.preferences_id} not found")
            
            # Verify that cabin_class_id and max_stops_id exist
            cabin_class = session.execute(
                select(DBCabinClass).where(DBCabinClass.id == preferences.cabin_class_id)
            ).scalar_one_or_none()
            
            max_stops = session.execute(
                select(DBMaxStops).where(DBMaxStops.id == preferences.max_stops_id)
            ).scalar_one_or_none()
            
            if not cabin_class:
                raise ValueError(f"Cabin class with ID {preferences.cabin_class_id} not found")
                
            if not max_stops:
                raise ValueError(f"Max stops with ID {preferences.max_stops_id} not found")
            
            # Update the preferences
            db_prefs.cabin_class_id = preferences.cabin_class_id
            db_prefs.max_stops_id = preferences.max_stops_id
            db_prefs.refundable_ticket = preferences.refundable_ticket
            session.commit()
            
            return preferences
    
    async def delete_flight_preferences(self, preferences_id: str) -> bool:
        with self.Session() as session:
            # Verify that the preferences exist
            stmt = select(DBFlightPreferences).where(DBFlightPreferences.id == preferences_id)
            result = session.execute(stmt)
            db_prefs = result.scalar_one_or_none()
            
            if not db_prefs:
                return False
            
            # Check if it's used by any guest type preferences
            guest_type_prefs = session.execute(
                select(DBGuestTypePreferences).where(
                    DBGuestTypePreferences.flight_preferences_id == preferences_id
                )
            ).scalar_one_or_none()
            
            if guest_type_prefs:
                raise ValueError(
                    f"Cannot delete flight preferences with ID {preferences_id} "
                    f"because it is being used by guest type preferences with ID {guest_type_prefs.id}"
                )
            
            # Delete the preferences
            session.delete(db_prefs)
            session.commit()
            
            return True
    
    # Hotel Preferences
    async def get_hotel_preferences(self, preferences_id: str) -> Optional[HotelPreferences]:
        with self.Session() as session:
            stmt = select(DBHotelPreferences).where(DBHotelPreferences.id == preferences_id)
            result = session.execute(stmt)
            db_prefs = result.scalar_one_or_none()
            
            if not db_prefs:
                return None
                
            return HotelPreferences(
                preferences_id=db_prefs.id,
                minimum_rating_id=db_prefs.minimum_rating_id
            )
    
    async def insert_hotel_preferences(
        self,
        minimum_rating_id: str
    ) -> HotelPreferences:
        with self.Session() as session:
            # Verify that minimum_rating_id exists
            rating = session.execute(
                select(DBHotelRating).where(DBHotelRating.id == minimum_rating_id)
            ).scalar_one_or_none()
            
            if not rating:
                raise ValueError(f"Hotel rating with ID {minimum_rating_id} not found")
            
            # Create new hotel preferences
            db_prefs = DBHotelPreferences(
                id=str(uuid4()),
                minimum_rating_id=minimum_rating_id
            )
            session.add(db_prefs)
            session.commit()
            
            return HotelPreferences(
                preferences_id=db_prefs.id,
                minimum_rating_id=db_prefs.minimum_rating_id
            )
    
    async def update_hotel_preferences(self, preferences: HotelPreferences) -> HotelPreferences:
        with self.Session() as session:
            # Verify that the preferences exist
            stmt = select(DBHotelPreferences).where(DBHotelPreferences.id == preferences.preferences_id)
            result = session.execute(stmt)
            db_prefs = result.scalar_one_or_none()
            
            if not db_prefs:
                raise ValueError(f"Hotel preferences with ID {preferences.preferences_id} not found")
            
            # Verify that minimum_rating_id exists
            rating = session.execute(
                select(DBHotelRating).where(DBHotelRating.id == preferences.minimum_rating_id)
            ).scalar_one_or_none()
            
            if not rating:
                raise ValueError(f"Hotel rating with ID {preferences.minimum_rating_id} not found")
            
            # Update the preferences
            db_prefs.minimum_rating_id = preferences.minimum_rating_id
            session.commit()
            
            return preferences
    
    async def delete_hotel_preferences(self, preferences_id: str) -> bool:
        with self.Session() as session:
            # Verify that the preferences exist
            stmt = select(DBHotelPreferences).where(DBHotelPreferences.id == preferences_id)
            result = session.execute(stmt)
            db_prefs = result.scalar_one_or_none()
            
            if not db_prefs:
                return False
            
            # Check if it's used by any guest type preferences
            guest_type_prefs = session.execute(
                select(DBGuestTypePreferences).where(
                    DBGuestTypePreferences.hotel_preferences_id == preferences_id
                )
            ).scalar_one_or_none()
            
            if guest_type_prefs:
                raise ValueError(
                    f"Cannot delete hotel preferences with ID {preferences_id} "
                    f"because it is being used by guest type preferences with ID {guest_type_prefs.id}"
                )
            
            # Delete the preferences
            session.delete(db_prefs)
            session.commit()
            
            return True
    
    # Ground Transport Preferences
    async def get_ground_transport_preferences(self, preferences_id: str) -> Optional[GroundTransportPreferences]:
        with self.Session() as session:
            stmt = select(DBGroundTransportPreferences).where(DBGroundTransportPreferences.id == preferences_id)
            result = session.execute(stmt)
            db_prefs = result.scalar_one_or_none()
            
            if not db_prefs:
                return None
                
            return GroundTransportPreferences(
                preferences_id=db_prefs.id,
                preferred_services_id=db_prefs.preferred_services_id
            )
    
    async def insert_ground_transport_preferences(
        self,
        preferred_services_id: str
    ) -> GroundTransportPreferences:
        with self.Session() as session:
            # Verify that preferred_services_id exists
            service = session.execute(
                select(DBTransportService).where(DBTransportService.id == preferred_services_id)
            ).scalar_one_or_none()
            
            if not service:
                raise ValueError(f"Transport service with ID {preferred_services_id} not found")
            
            # Create new ground transport preferences
            db_prefs = DBGroundTransportPreferences(
                id=str(uuid4()),
                preferred_services_id=preferred_services_id
            )
            session.add(db_prefs)
            session.commit()
            
            return GroundTransportPreferences(
                preferences_id=db_prefs.id,
                preferred_services_id=db_prefs.preferred_services_id
            )
    
    async def update_ground_transport_preferences(self, preferences: GroundTransportPreferences) -> GroundTransportPreferences:
        with self.Session() as session:
            # Verify that the preferences exist
            stmt = select(DBGroundTransportPreferences).where(DBGroundTransportPreferences.id == preferences.preferences_id)
            result = session.execute(stmt)
            db_prefs = result.scalar_one_or_none()
            
            if not db_prefs:
                raise ValueError(f"Ground transport preferences with ID {preferences.preferences_id} not found")
            
            # Verify that preferred_services_id exists
            service = session.execute(
                select(DBTransportService).where(DBTransportService.id == preferences.preferred_services_id)
            ).scalar_one_or_none()
            
            if not service:
                raise ValueError(f"Transport service with ID {preferences.preferred_services_id} not found")
            
            # Update the preferences
            db_prefs.preferred_services_id = preferences.preferred_services_id
            session.commit()
            
            return preferences
    
    async def delete_ground_transport_preferences(self, preferences_id: str) -> bool:
        with self.Session() as session:
            # Verify that the preferences exist
            stmt = select(DBGroundTransportPreferences).where(DBGroundTransportPreferences.id == preferences_id)
            result = session.execute(stmt)
            db_prefs = result.scalar_one_or_none()
            
            if not db_prefs:
                return False
            
            # Check if it's used by any guest type preferences
            guest_type_prefs = session.execute(
                select(DBGuestTypePreferences).where(
                    DBGuestTypePreferences.ground_transport_preferences_id == preferences_id
                )
            ).scalar_one_or_none()
            
            if guest_type_prefs:
                raise ValueError(
                    f"Cannot delete ground transport preferences with ID {preferences_id} "
                    f"because it is being used by guest type preferences with ID {guest_type_prefs.id}"
                )
            
            # Delete the preferences
            session.delete(db_prefs)
            session.commit()
            
            return True
    
    # Guest Type Preferences
    async def get_guest_type_preferences(self, preferences_id: str) -> Optional[GuestTypePreferences]:
        with self.Session() as session:
            stmt = select(DBGuestTypePreferences).where(DBGuestTypePreferences.id == preferences_id)
            result = session.execute(stmt)
            db_prefs = result.scalar_one_or_none()
            
            if not db_prefs:
                return None
                
            return GuestTypePreferences(
                preferences_id=db_prefs.id,
                flight_preferences_id=db_prefs.flight_preferences_id,
                hotel_preferences_id=db_prefs.hotel_preferences_id,
                ground_transport_preferences_id=db_prefs.ground_transport_preferences_id,
                guest_type=db_prefs.guest_type,
                daily_per_diem=db_prefs.daily_per_diem
            )
    
    async def get_guest_type_preferences_by_type(self, guest_type: str) -> Optional[GuestTypePreferences]:
        with self.Session() as session:
            stmt = select(DBGuestTypePreferences).where(DBGuestTypePreferences.guest_type == guest_type)
            result = session.execute(stmt)
            db_prefs = result.scalar_one_or_none()
            
            if not db_prefs:
                return None
                
            return GuestTypePreferences(
                preferences_id=db_prefs.id,
                flight_preferences_id=db_prefs.flight_preferences_id,
                hotel_preferences_id=db_prefs.hotel_preferences_id,
                ground_transport_preferences_id=db_prefs.ground_transport_preferences_id,
                guest_type=db_prefs.guest_type,
                daily_per_diem=db_prefs.daily_per_diem
            )
    
    async def insert_guest_type_preferences(
        self,
        flight_preferences_id: str,
        hotel_preferences_id: str,
        ground_transport_preferences_id: str,
        guest_type: str,
        daily_per_diem: Optional[float] = None
    ) -> GuestTypePreferences:
        with self.Session() as session:
            # Check if preferences for this guest type already exist
            existing = session.execute(
                select(DBGuestTypePreferences).where(DBGuestTypePreferences.guest_type == guest_type)
            ).scalar_one_or_none()
            
            if existing:
                raise ValueError(f"Preferences for guest type '{guest_type}' already exist")
            
            # Verify that flight_preferences_id exists
            flight_prefs = session.execute(
                select(DBFlightPreferences).where(DBFlightPreferences.id == flight_preferences_id)
            ).scalar_one_or_none()
            
            if not flight_prefs:
                raise ValueError(f"Flight preferences with ID {flight_preferences_id} not found")
            
            # Verify that hotel_preferences_id exists
            hotel_prefs = session.execute(
                select(DBHotelPreferences).where(DBHotelPreferences.id == hotel_preferences_id)
            ).scalar_one_or_none()
            
            if not hotel_prefs:
                raise ValueError(f"Hotel preferences with ID {hotel_preferences_id} not found")
            
            # Verify that ground_transport_preferences_id exists
            transport_prefs = session.execute(
                select(DBGroundTransportPreferences).where(DBGroundTransportPreferences.id == ground_transport_preferences_id)
            ).scalar_one_or_none()
            
            if not transport_prefs:
                raise ValueError(f"Ground transport preferences with ID {ground_transport_preferences_id} not found")
            
            # Create new guest type preferences
            db_prefs = DBGuestTypePreferences(
                id=str(uuid4()),
                flight_preferences_id=flight_preferences_id,
                hotel_preferences_id=hotel_preferences_id,
                ground_transport_preferences_id=ground_transport_preferences_id,
                guest_type=guest_type,
                daily_per_diem=daily_per_diem
            )
            session.add(db_prefs)
            session.commit()
            
            return GuestTypePreferences(
                preferences_id=db_prefs.id,
                flight_preferences_id=db_prefs.flight_preferences_id,
                hotel_preferences_id=db_prefs.hotel_preferences_id,
                ground_transport_preferences_id=db_prefs.ground_transport_preferences_id,
                guest_type=db_prefs.guest_type,
                daily_per_diem=db_prefs.daily_per_diem
            )
    
    async def update_guest_type_preferences(self, preferences: GuestTypePreferences) -> GuestTypePreferences:
        with self.Session() as session:
            # Verify that the preferences exist
            stmt = select(DBGuestTypePreferences).where(DBGuestTypePreferences.id == preferences.preferences_id)
            result = session.execute(stmt)
            db_prefs = result.scalar_one_or_none()
            
            if not db_prefs:
                raise ValueError(f"Guest type preferences with ID {preferences.preferences_id} not found")
            
            # Check if updating guest_type would create a duplicate
            if preferences.guest_type != db_prefs.guest_type:
                existing = session.execute(
                    select(DBGuestTypePreferences).where(
                        DBGuestTypePreferences.guest_type == preferences.guest_type,
                        DBGuestTypePreferences.id != preferences.preferences_id
                    )
                ).scalar_one_or_none()
                
                if existing:
                    raise ValueError(f"Preferences for guest type '{preferences.guest_type}' already exist")
            
            # Verify that flight_preferences_id exists
            flight_prefs = session.execute(
                select(DBFlightPreferences).where(DBFlightPreferences.id == preferences.flight_preferences_id)
            ).scalar_one_or_none()
            
            if not flight_prefs:
                raise ValueError(f"Flight preferences with ID {preferences.flight_preferences_id} not found")
            
            # Verify that hotel_preferences_id exists
            hotel_prefs = session.execute(
                select(DBHotelPreferences).where(DBHotelPreferences.id == preferences.hotel_preferences_id)
            ).scalar_one_or_none()
            
            if not hotel_prefs:
                raise ValueError(f"Hotel preferences with ID {preferences.hotel_preferences_id} not found")
            
            # Verify that ground_transport_preferences_id exists
            transport_prefs = session.execute(
                select(DBGroundTransportPreferences).where(DBGroundTransportPreferences.id == preferences.ground_transport_preferences_id)
            ).scalar_one_or_none()
            
            if not transport_prefs:
                raise ValueError(f"Ground transport preferences with ID {preferences.ground_transport_preferences_id} not found")
            
            # Update the preferences
            db_prefs.flight_preferences_id = preferences.flight_preferences_id
            db_prefs.hotel_preferences_id = preferences.hotel_preferences_id
            db_prefs.ground_transport_preferences_id = preferences.ground_transport_preferences_id
            db_prefs.guest_type = preferences.guest_type
            db_prefs.daily_per_diem = preferences.daily_per_diem
            session.commit()
            
            return preferences
    
    async def delete_guest_type_preferences(self, preferences_id: str) -> bool:
        with self.Session() as session:
            # Verify that the preferences exist
            stmt = select(DBGuestTypePreferences).where(DBGuestTypePreferences.id == preferences_id)
            result = session.execute(stmt)
            db_prefs = result.scalar_one_or_none()
            
            if not db_prefs:
                return False
            
            # Check if it's used by any trips
            from database.postgresql.models import Trip
            trip = session.execute(
                select(Trip).where(Trip.guest_type_preferences_id == preferences_id)
            ).scalar_one_or_none()
            
            if trip:
                raise ValueError(
                    f"Cannot delete guest type preferences with ID {preferences_id} "
                    f"because it is being used by trip with ID {trip.id}"
                )
            
            # Delete the preferences
            session.delete(db_prefs)
            session.commit()
            
            return True