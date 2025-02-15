from fastapi                import Depends
from typing                 import Annotated

from core.config.settings   import get_config

from database.connections    import get_psql_reader_from_key_file
from database.postgresql     import PSQLConfigDB

def get_psql_reader():
    config = get_config()
    return get_psql_reader_from_key_file(config.psql_key_file)

PSQLReaderDependency = Annotated[PSQLConfigDB, Depends(get_psql_reader)]



