#Temporary bridge file to maintain backward compatibility 
#while transitioning to the new modular structure.

# Import the new ConfigDB interface and implementations
from config_db import ConfigDB, get_postgresql_config_db


__all__ = ['ConfigDB']
