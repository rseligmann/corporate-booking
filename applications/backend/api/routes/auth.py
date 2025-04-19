from fastapi import APIRouter, HTTPException, Depends, status
from fastapi.security import OAuth2PasswordRequestForm

#from auth.service import CognitoService
from api.dependencies import ConfigDBDependency, CognitoConfigDependency, CurrentUserDependency
from api.models.auth import Token, UserResponse, RefreshTokenRequest

router = APIRouter()

@router.post("/token", response_model=Token)
async def login_for_access_token(
    cognito: CognitoConfigDependency,
    config_db: ConfigDBDependency,
    form_data: OAuth2PasswordRequestForm = Depends()
):
    """
    Authenticate user and return access token
    """
    try:
        # Authenticate with Cognito
        auth_response = await cognito.initiate_auth(form_data.username, form_data.password)
        
        # Check if user exists in our database
        user = await config_db.get_user_by_email(form_data.username)
        if not user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="User not registered in application database",
            )
        
        # Extract tokens
        auth_result = auth_response.get('AuthenticationResult', {})
        
        return {
            "access_token": auth_result.get('AccessToken', ''),
            "token_type": "bearer",
            "refresh_token": auth_result.get('RefreshToken', ''),
            "id_token": auth_result.get('IdToken', ''),
            "expires_in": auth_result.get('ExpiresIn', 3600)
        }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Authentication failed: {str(e)}",
            headers={"WWW-Authenticate": "Bearer"},
        )

@router.get("/me", response_model=UserResponse)
async def read_users_me(current_user: CurrentUserDependency):
    """
    Get current authenticated user info
    """
    return {
        "email": current_user.email,
        "first_name": current_user.first_name,
        "last_name": current_user.last_name,
        "user_id": current_user.user_id,
        "company_id": current_user.company_id
    }

@router.post("/refresh")
async def refresh_access_token(cognito: CognitoConfigDependency,refresh_request: RefreshTokenRequest):
    """
    Get a new access token using a refresh token
    """

    try:
        auth_response = await cognito.refresh_auth(
            refresh_request.user_Id,
            refresh_request.refresh_token
        )
        # Extract tokens
        auth_result = auth_response.get('AuthenticationResult', {})
        return {
            "access_token": auth_result.get('AccessToken', ''),
            "token_type": "bearer",
            "refresh_token": refresh_request.refresh_token,
            "id_token": auth_result.get('IdToken', ''),
            "expires_in": auth_result.get('ExpiresIn', 3600)
        }
    
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Token refresh failed: {str(e)}",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    