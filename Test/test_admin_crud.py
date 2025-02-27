import asyncio
from database.connections import get_dev_psql_reader_connection

async def main():
    # Connect to the database
    db = get_dev_psql_reader_connection()
    
    # Create and insert an admin
    admin = await db.insert_admin(
        email="test.admin@example.com",
        first_name="Test",
        last_name="Admin"
    )
    print(f"Created admin: {admin.id}, {admin.email}, {admin.first_name}, {admin.last_name}")
    
    # Retrieve the admin
    retrieved_admin = await db.get_admin(admin.id)
    if retrieved_admin:
        print(f"Retrieved admin: {retrieved_admin.id}, {retrieved_admin.email}, "
                f"{retrieved_admin.first_name}, {retrieved_admin.last_name}")
    else:
        print("Failed to retrieve admin")
        

if __name__ == "__main__":
    asyncio.run(main())     