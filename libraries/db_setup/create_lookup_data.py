#!/usr/bin/env python3
import asyncio
import sys
import os
from uuid import uuid4
from sqlalchemy import text

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '../python')))

from database.connections import get_dev_psql_reader_connection

async def create_lookup_data():
    """Create reference/lookup data for the new tables"""
    print("Creating lookup data...")
    
    # Connect to the database
    db = get_dev_psql_reader_connection()
    
    try:
        # Flight Preferences Cabin Classes
        await insert_lookup_data(db, "flight_preferences_cabin_classes", [
            {"code": "ECONOMY", "description": "Economy Class", "is_active": True, "display_order": 1},
            {"code": "PREMIUM_ECONOMY", "description": "Premium Economy", "is_active": True, "display_order": 2},
            {"code": "BUSINESS", "description": "Business Class", "is_active": True, "display_order": 3},
            {"code": "FIRST", "description": "First Class", "is_active": True, "display_order": 4}
        ])
        
        # Flight Preferences Max Stops
        await insert_lookup_data(db, "flight_preferences_max_stops", [
            {"code": "DIRECT", "description": "Direct flights only", "is_active": True, "display_order": 1},
            {"code": "ONE_STOP", "description": "Maximum 1 stop", "is_active": True, "display_order": 2},
            {"code": "TWO_STOPS", "description": "Maximum 2 stops", "is_active": True, "display_order": 3},
            {"code": "ANY", "description": "Any number of stops", "is_active": True, "display_order": 4}
        ])
        
        # Hotel Ratings
        await insert_lookup_data(db, "hotel_ratings", [
            {"code": "ONE_STAR", "description": "1-Star", "is_active": True, "display_order": 1},
            {"code": "TWO_STAR", "description": "2-Star", "is_active": True, "display_order": 2},
            {"code": "THREE_STAR", "description": "3-Star", "is_active": True, "display_order": 3},
            {"code": "FOUR_STAR", "description": "4-Star", "is_active": True, "display_order": 4},
            {"code": "FIVE_STAR", "description": "5-Star", "is_active": True, "display_order": 5}
        ])
        
        # Ground Transport Services
        await insert_lookup_data(db, "ground_transport_services", [
            {"code": "STANDARD", "description": "Standard Transport", "is_active": True, "display_order": 1},
            {"code": "LUXURY", "description": "Luxury Transport", "is_active": True, "display_order": 2},
            {"code": "ACCESSIBLE", "description": "Accessible Transport", "is_active": True, "display_order": 3},
            {"code": "AIRPORT_SHUTTLE", "description": "Airport Shuttle", "is_active": True, "display_order": 4}
        ])
        
        # Flight Itinerary Statuses
        await insert_lookup_data(db, "flight_itinerary_statuses", [
            {"code": "REQUESTED", "description": "Booking Requested", "is_active": True, "display_order": 1},
            {"code": "CONFIRMED", "description": "Booking Confirmed", "is_active": True, "display_order": 2},
            {"code": "CANCELLED", "description": "Booking Cancelled", "is_active": True, "display_order": 3},
            {"code": "PENDING_CHANGES", "description": "Pending Changes", "is_active": True, "display_order": 4}
        ])
        
        # Flight Leg Statuses
        await insert_lookup_data(db, "flight_leg_statuses", [
            {"code": "SCHEDULED", "description": "Scheduled", "is_active": True, "display_order": 1},
            {"code": "DELAYED", "description": "Delayed", "is_active": True, "display_order": 2},
            {"code": "DEPARTED", "description": "Departed", "is_active": True, "display_order": 3},
            {"code": "ARRIVED", "description": "Arrived", "is_active": True, "display_order": 4},
            {"code": "CANCELLED", "description": "Cancelled", "is_active": True, "display_order": 5}
        ])
        
        # Hotel Statuses
        await insert_lookup_data(db, "hotel_statuses", [
            {"code": "REQUESTED", "description": "Booking Requested", "is_active": True, "display_order": 1},
            {"code": "CONFIRMED", "description": "Booking Confirmed", "is_active": True, "display_order": 2},
            {"code": "CHECKED_IN", "description": "Checked In", "is_active": True, "display_order": 3},
            {"code": "CHECKED_OUT", "description": "Checked Out", "is_active": True, "display_order": 4},
            {"code": "CANCELLED", "description": "Booking Cancelled", "is_active": True, "display_order": 5}
        ])
        
        # Ground Transport Statuses
        await insert_lookup_data(db, "ground_transport_statuses", [
            {"code": "REQUESTED", "description": "Booking Requested", "is_active": True, "display_order": 1},
            {"code": "CONFIRMED", "description": "Booking Confirmed", "is_active": True, "display_order": 2},
            {"code": "COMPLETED", "description": "Service Completed", "is_active": True, "display_order": 3},
            {"code": "CANCELLED", "description": "Booking Cancelled", "is_active": True, "display_order": 4}
        ])
        
        # Per Diem Statuses
        await insert_lookup_data(db, "per_diem_statuses", [
            {"code": "ALLOCATED", "description": "Funds Allocated", "is_active": True, "display_order": 1},
            {"code": "PENDING_REVIEW", "description": "Pending Review", "is_active": True, "display_order": 2},
            {"code": "APPROVED", "description": "Approved", "is_active": True, "display_order": 3},
            {"code": "PAID", "description": "Paid", "is_active": True, "display_order": 4},
            {"code": "CANCELLED", "description": "Cancelled", "is_active": True, "display_order": 5}
        ])
        
        # Expense Statuses
        await insert_lookup_data(db, "expense_statuses", [
            {"code": "SUBMITTED", "description": "Expense Submitted", "is_active": True, "display_order": 1},
            {"code": "APPROVED", "description": "Expense Approved", "is_active": True, "display_order": 2},
            {"code": "REJECTED", "description": "Expense Rejected", "is_active": True, "display_order": 3},
            {"code": "PAID", "description": "Expense Paid", "is_active": True, "display_order": 4}
        ])
        
        print("Lookup data created successfully!")
        
    except Exception as e:
        print(f"An error occurred: {e}")
        raise
    finally:
        # Close the database connection
        if hasattr(db, 'disconnect'):
            db.disconnect()

async def insert_lookup_data(db, table_name, items):
    """Insert multiple lookup data items into a table"""
    print(f"Creating {len(items)} items in {table_name}...")
    
    with db.Session() as session:
        for item in items:
            # Check if the record already exists
            query = text(f"SELECT id FROM {table_name} WHERE code = :code")
            result = session.execute(query, {"code": item["code"]})
            existing = result.scalar_one_or_none()
            
            if existing:
                # Update existing record
                set_clause = ", ".join([f"{key} = :{key}" for key in item.keys()])
                query = text(f"UPDATE {table_name} SET {set_clause} WHERE code = :code")
                session.execute(query, item)
                print(f"  Updated {item['code']}")
            else:
                # Insert new record
                item["id"] = str(uuid4())
                columns = ", ".join(item.keys())
                placeholders = ", ".join([f":{key}" for key in item.keys()])
                query = text(f"INSERT INTO {table_name} ({columns}) VALUES ({placeholders})")
                session.execute(query, item)
                print(f"  Created {item['code']}")
        
        session.commit()

if __name__ == "__main__":
    asyncio.run(create_lookup_data())