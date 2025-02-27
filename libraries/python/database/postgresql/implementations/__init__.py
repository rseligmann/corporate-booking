import json

from .base import PostgresConfigDBConfig
from .psql_config_db import PSQLConfigDB

def get_postgresql_config_db(config_file_path=None, config=None):
    """
    Factory function to create a PSQLConfigDB instance.
    
    Args:
        config_file_path: Path to a JSON config file with database connection parameters
        config: Direct configuration object (will override file if both are provided)
        
    Returns:
        A configured PSQLConfigDB instance
    """
    if config:
        db_config = PostgresConfigDBConfig(
            db_name=config["db_name"],
            db_user=config["db_user"],
            db_password=config["db_password"],
            db_host=config["db_host"],
            db_port=config["db_port"]
        )
    elif config_file_path:
        with open(config_file_path) as f:
            config_data = json.load(f)
            db_config = PostgresConfigDBConfig(
                db_name=config_data["db_name"],
                db_user=config_data["db_user"],
                db_password=config_data["db_password"],
                db_host=config_data["db_host"],
                db_port=config_data["db_port"]
            )
    else:
        raise ValueError("Either config_file_path or config must be provided")
    
    return PSQLConfigDB.connect(db_config)

# Export the PSQLConfigDB class for those who need direct access
__all__ = ['PSQLConfigDB', 'get_postgresql_config_db']