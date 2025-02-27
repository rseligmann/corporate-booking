#!/usr/bin/env python3
import asyncio
import sys
import os

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '../python')))

from sqlalchemy import text
from database.connections import get_dev_psql_reader_connection
from database.postgresql.base import Base

async def recreate_database():
    """Drop all tables and recreate them from the new models"""
    print("Recreating database schema...")

    # Get database connection
    db = get_dev_psql_reader_connection()

    try:
        # Drop all tables
        print("Dropping all existing tables...")
        with db.engine.begin() as conn:
            conn.execute(text("DROP SCHEMA public CASCADE"))
            conn.execute(text("CREATE SCHEMA public"))
            conn.execute(text("GRANT ALL ON SCHEMA public TO postgres_dev"))
            conn.execute(text("GRANT ALL ON SCHEMA public TO public"))

        # Create all tables based on the new models
        print("Creating new tables...")
        Base.metadata.create_all(db.engine)

        print("Database schema recreated successfully.")
    
    except Exception as e:
        print(f"Error recreating database schema: {e}")
        raise
    finally:
        # Close the connection
        if hasattr(db, 'disconnect'):
            db.disconnect()

if __name__ == "__main__":
    asyncio.run(recreate_database())



