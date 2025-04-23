import asyncio
import sys
import os

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '../python')))

from sqlalchemy import text
from sqlalchemy.schema import CreateTable
from database.connections import get_dev_psql_reader_connection
from database.postgresql.base import Base
from database.postgresql.models import (
    GuestProfile, Itinerary, GuestTypesOnTrip, Trip, 
    FlightPreferences, HotelPreferences, GroundTransportPreferences, 
    PerDiemPreferences, GuestTypes, Company, User
)

async def db_update():
    """Update database with changes needed for Trip"""
    print("Updating database schema...")

    # Get database connection
    db = get_dev_psql_reader_connection()

    models = [GuestProfile, Itinerary, GuestTypesOnTrip, Trip]

    try:
        # # Create Models
        # print("Creating new tables...")
        # with db.engine.begin() as conn:
        #     for model in models:
        #         conn.execute(CreateTable(model.__table__))
            

        # # Enable RLS for the specified tables
        # print("Enabling Row-Level Security...")
        # with db.engine.begin() as conn:
        #     # Enable RLS on tables
        #     conn.execute(text("ALTER TABLE guest_profiles ENABLE ROW LEVEL SECURITY"))
        #     conn.execute(text("ALTER TABLE trips ENABLE ROW LEVEL SECURITY"))

        #     # Create policies for guest_profiles table
        #     conn.execute(text("""
        #         CREATE POLICY tenant_isolation_policy ON guest_profiles 
        #         FOR ALL 
        #         TO public 
        #         USING (company_id = current_setting('app.current_tenant_id')::TEXT)
        #     """))

        #     # Create policies for trips table
        #     conn.execute(text("""
        #         CREATE POLICY tenant_isolation_insert ON trips
        #         FOR ALL
        #         TO public 
        #         USING (company_id = current_setting('app.current_tenant_id')::TEXT)
        #         """))
        
        # print("New Database tables created successfully with RLS enabled")

        # Update existing tables
        print("Adding new columns to existing tables")
        with db.engine.begin() as conn:
            conn.execute(text("""
                ALTER TABLE flight_preferences
                ADD COLUMN guest_type_on_trip_id VARCHAR      
                """))
            conn.execute(text("""
                ALTER TABLE flight_preferences
                ADD CONSTRAINT flight_guest_type_on_trip_fkey FOREIGN KEY(guest_type_on_trip_id) REFERENCES guest_types_on_trip(id)         
                """))
            conn.execute(text("""
                ALTER TABLE flight_preferences
                ALTER COLUMN guest_type_id DROP NOT NULL     
                """))
            
            conn.execute(text("""
                ALTER TABLE hotel_preferences
                ADD COLUMN guest_type_on_trip_id VARCHAR     
                """))
            conn.execute(text("""
                ALTER TABLE hotel_preferences
                ADD CONSTRAINT hotel_guest_type_on_trip_fkey FOREIGN KEY(guest_type_on_trip_id) REFERENCES guest_types_on_trip(id)         
                """))
            conn.execute(text("""
                ALTER TABLE hotel_preferences
                ALTER COLUMN guest_type_id DROP NOT NULL     
                """))
            
            conn.execute(text("""
                ALTER TABLE ground_transport_preferences
                ADD COLUMN guest_type_on_trip_id VARCHAR    
                """))
            conn.execute(text("""
                ALTER TABLE ground_transport_preferences
                ADD CONSTRAINT ground_transport_guest_type_on_trip_fkey FOREIGN KEY(guest_type_on_trip_id) REFERENCES guest_types_on_trip(id)         
                """))
            conn.execute(text("""
                ALTER TABLE ground_transport_preferences
                ALTER COLUMN guest_type_id DROP NOT NULL     
                """))
            
            conn.execute(text("""
                ALTER TABLE per_diem_preferences
                ADD COLUMN guest_type_on_trip_id VARCHAR   
                """))
            conn.execute(text("""
                ALTER TABLE per_diem_preferences
                ADD CONSTRAINT per_diem_guest_type_on_trip_fkey FOREIGN KEY(guest_type_on_trip_id) REFERENCES guest_types_on_trip(id)         
                """))
            conn.execute(text("""
                ALTER TABLE per_diem_preferences
                ALTER COLUMN guest_type_id DROP NOT NULL     
                """))
    
    except Exception as e:
        print(f"Error recreating database schema: {e}")
        raise
    finally:
        # Close the connection
        if hasattr(db, 'disconnect'):
            db.disconnect()

if __name__ == "__main__":
    asyncio.run(db_update())
