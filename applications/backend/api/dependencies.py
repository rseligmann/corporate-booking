from fastapi                import Depends
from typing                 import Annotated

from core.config.settings   import get_config

#from database.connections    import get_psql_reader_from_key_file
#from database.postgresql     import PSQLConfigDB
from config_db import ConfigDB, get_postgresql_config_db

def get_config_db() -> ConfigDB:
    config = get_config()
    #return get_psql_reader_from_key_file(config.psql_key_file)
    return get_postgresql_config_db(config_file_path=config.psql_key_file)

ConfigDBDependency = Annotated[ConfigDB, Depends(get_config_db)]



