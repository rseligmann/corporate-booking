from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy import text

from api.dependencies import ConfigDBDependency

router = APIRouter()

@router.get("/")
async def health_check():
    """Basic health check to verify the API is running"""
    return {"status": "ok", "message": "API is running"}

@router.get("/db")
async def db_health_check(config_db: ConfigDBDependency):
    """Health check to verify database connection"""
    try:
        # Try to make a simple database query
        # We'll use a direct connection to avoid any ORM issues
        connection = config_db.get_connection()
        with connection.connect() as conn:
            result = conn.execute(text("SELECT 1"))
            assert result.scalar() == 1
            
        return {
            "status": "ok", 
            "message": "Database connection successful",
            "database": config_db.db_name,
            "host": config_db.db_host
        }
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Database connection failed: {str(e)}"
        )