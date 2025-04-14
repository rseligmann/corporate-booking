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

        # Enable RLS for the specified tables
        print("Enabling Row-Level Security...")
        with db.engine.begin() as conn:
            # Enable RLS on tables
            conn.execute(text("ALTER TABLE companies ENABLE ROW LEVEL SECURITY"))
            conn.execute(text("ALTER TABLE users ENABLE ROW LEVEL SECURITY"))
            conn.execute(text("ALTER TABLE addresses ENABLE ROW LEVEL SECURITY"))
            conn.execute(text("ALTER TABLE guest_types ENABLE ROW LEVEL SECURITY"))

            # Create policies for companies table
            conn.execute(text("""
                CREATE POLICY tenant_isolation_policy ON companies 
                FOR ALL 
                TO public 
                USING (id = current_setting('app.current_tenant_id')::TEXT)
            """))

            conn.execute(text("""
                CREATE POLICY tenant_isolation_insert ON companies 
                FOR INSERT
                TO public 
                WITH CHECK (true);  -- Allow inserts without tenant check
                """))

            # Create policies for users table
            conn.execute(text("""
                CREATE POLICY tenant_isolation_policy ON users
                FOR ALL 
                TO public 
                USING (company_id = current_setting('app.current_tenant_id')::TEXT)
            """)) # "TO pulic" is there by default if no user specified. So what I have is redundant
            
            # Create policies for addresses table
            conn.execute(text("""
                CREATE POLICY tenant_isolation_policy ON addresses 
                FOR ALL 
                TO public 
                USING (company_id = current_setting('app.current_tenant_id')::TEXT)
            """))

            # Create policies for guest_types table
            conn.execute(text("""
                CREATE POLICY tenant_isolation_policy ON guest_types
                FOR ALL
                TO public
                USING (company_id = current_setting('app.current_tenant_id')::TEXT)
            """))
        
        print("Database schema recreated successfully. with RLS enabled")
    
    except Exception as e:
        print(f"Error recreating database schema: {e}")
        raise
    finally:
        # Close the connection
        if hasattr(db, 'disconnect'):
            db.disconnect()

if __name__ == "__main__":
    asyncio.run(recreate_database())



