#!/usr/bin/env python3
import asyncio
import subprocess
import sys
import os

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '../python')))

async def setup_database():
    """
    Complete database setup process:
    1. Recreate database schema
    2. Create lookup data
    3. Run test script to verify functionality
    """
    print("Starting database setup...")
    
    try:
        # Step 1: Recreate database schema
        print("\n=== STEP 1: RECREATING DATABASE SCHEMA ===")
        subprocess.run([sys.executable, "recreate_db.py"], check=True)
        
        # Step 2: Create lookup data
        print("\n=== STEP 2: CREATING LOOKUP DATA ===")
        subprocess.run([sys.executable, "create_lookup_data.py"], check=True)
        
        # Step 3: Run test script
        print("\n=== STEP 3: TESTING DATABASE FUNCTIONALITY ===")
        subprocess.run([sys.executable, "test_config_db.py"], check=True)
        
        print("\n=== DATABASE SETUP COMPLETED SUCCESSFULLY ===")
        print("You can now start the FastAPI application with: cd backend && ./start_app.py --env dev")
        
    except subprocess.CalledProcessError as e:
        print(f"\nERROR: A script failed with exit code {e.returncode}")
        sys.exit(1)
    except Exception as e:
        print(f"\nERROR: {e}")
        sys.exit(1)

if __name__ == "__main__":
    asyncio.run(setup_database())