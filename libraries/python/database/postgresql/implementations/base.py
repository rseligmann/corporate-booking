from dataclasses import dataclass
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from pydantic_core import MultiHostUrl

from config_db.base import BaseConfigDB

@dataclass
class PostgresConfigDBConfig:
    db_name: str
    db_user: str
    db_password: str
    db_host: str
    db_port: int

class BasePostgreSQLConfigDB(BaseConfigDB):
    def __init__(self, config: PostgresConfigDBConfig):
        self.db_name = config.db_name
        self.db_user = config.db_user
        self.db_password = config.db_password
        self.db_host = config.db_host
        self.db_port = config.db_port
        
        self.uri = MultiHostUrl.build(
            scheme="postgresql+psycopg2",
            username=config.db_user,
            password=config.db_password,
            path=config.db_name,
            host=config.db_host,
            port=config.db_port
        )
        
        self.engine = None
        self.Session = None
        self.init_connection()
    
    def init_connection(self):
        """Establish database connection"""
        self.engine = create_engine(str(self.uri))
        self.Session = sessionmaker(bind=self.engine)
    
    def disconnect(self):
        """Close database connection"""
        if self.engine:
            self.engine.dispose()
    
    def get_connection(self):
        """Get the current database connection"""
        return self.engine