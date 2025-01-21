import json

from database.constants import (
    PROD_PSQL_KEY_FILE,
    DEV_PSQL_KEY_FILE
)

from database.postgresql import PostgresConfigDBReaderConfig
from libraries.python.database.postgresql import PSQLConfigDB

def get_db_from_connnection_params(connection_params):
    return PSQLConfigDB.connect(PostgresConfigDBReaderConfig(
        db_name     = connection_params["db_name"],
        db_user     = connection_params["db_user"],
        db_password = connection_params["db_password"],
        db_host     = connection_params["db_host"],
        db_port     = connection_params["db_port"]
    ))

def get_psql_reader_from_key_file(key_file):
    with open(key_file) as f:
        db_config = json.load(f)
        return get_db_from_connnection_params(db_config)

def get_prod_psql_reader_connection():
    with open(PROD_PSQL_KEY_FILE) as f:
        db_config = json.load(f)
        return get_db_from_connnection_params(db_config)

def get_dev_psql_reader_connection():
    with open(DEV_PSQL_KEY_FILE) as f:
        db_config = json.load(f)
        return get_db_from_connnection_params(db_config)