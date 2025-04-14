from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError
from typing import Annotated

from core.config.settings   import get_config
from core.auth.cognito import CognitoConfig
from core.external.amadeus import AmadeusConfig

from config_db import ConfigDB
from database.connections import get_psql_reader_from_key_file

def get_config_db() -> ConfigDB:
    config = get_config()
    return get_psql_reader_from_key_file(config.psql_key_file)

ConfigDBDependency = Annotated[ConfigDB, Depends(get_config_db)]

def get_cognito_config() -> CognitoConfig:
    config = get_config()
    return CognitoConfig(config_file_path = config.cognito_key_file)

CognitoConfigDependency = Annotated[CognitoConfig, Depends(get_cognito_config)]

# OAuth2 scheme for token validation
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/v1/auth/token")

async def get_current_user_with_tenant(
    token: Annotated[str, Depends(oauth2_scheme)],
    cognito: CognitoConfigDependency,
    config_db: ConfigDBDependency
):
    """
    Get current user and set tenant context on the database connection
    """
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        # Verify token with Cognito
        claims = await cognito.verify_token(token)
        user_id = claims.get("username")
        if user_id is None:
            raise credentials_exception
        
        # Get user from database
        user = await config_db.get_user(user_id)
        if user is None:
            raise credentials_exception
        
        # Set tenant context on the database connection
        if user.company_id:
            config_db.set_tenant(user.company_id)
        
        return user
    except JWTError:
        raise credentials_exception

CurrentUserDependency = Annotated[dict, Depends(get_current_user_with_tenant)]

async def get_amadeus_config() -> AmadeusConfig:
    config = get_config()
    return AmadeusConfig(config_file_path=config.amadeus_key_file)

AmadeusConfigDependency = Annotated[AmadeusConfig, Depends(get_amadeus_config)]