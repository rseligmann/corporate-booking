from fastapi                import Depends
from typing                 import Annotated

from core.database          import psql_reader

from database.postgresql    import PSQLConfigDBReader

def get_psql_reader():
    return psql_reader

PSQLReaderDependency = Annotated[PSQLConfigDBReader, Depends(get_psql_reader)]



