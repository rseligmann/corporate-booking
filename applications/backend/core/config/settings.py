import os
import json

from pydantic_settings      import BaseSettings
from dotenv                 import find_dotenv

class Config:
    
    def __init__(self, environment: str):
        self.environment = environment
        self.load_config()
        
    def load_config(self):
        config_file = f"{self.environment}.json"
        with open(os.path.join(os.path.dirname(__file__), config_file)) as f:
            config_json = json.load(f)
            
        self.app_host       = config_json["HOST"]
        self.app_port       = config_json["PORT"]
        self.workers        = config_json["WORKERS"]
        self.psql_key_file  = config_json["PSQL_KEY_FILE"]
        self.cognito_key_file   = config_json["COGNITO_KEY_FILE"]
        self.module_name    = config_json["MODULE_NAME"]
        self.app_name       = config_json["APP_NAME"]

class Settings(BaseSettings):
    ENVIRONMENT: str

def get_config():
    settings    = Settings()
    config      = Config(settings.ENVIRONMENT)
    return config