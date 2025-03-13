# backend/api/api.py

```py
from fastapi        import APIRouter
from api.routes     import users, auth, health, companies, signup

api = APIRouter()

# health check routes
api.include_router(health.router, prefix="/health")

api.include_router(users.router, prefix="/users")
api.include_router(auth.router, prefix="/auth")
api.include_router(companies.router, prefix="/companies")
api.include_router(signup.router, prefix="/signup")

@api.get("/")
async def root():
    return {"message": "Corporate Travel Booking System API"}
```

# backend/api/dependencies.py

```py
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError
from typing import Annotated

from core.config.settings   import get_config
from auth.cognito import CognitoConfig

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

async def get_current_user(
    token: Annotated[str, Depends(oauth2_scheme)],
    cognito: CognitoConfigDependency,
    config_db: ConfigDBDependency
):
    
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
        user = await config_db.get_admin(user_id)
        if user is None:
            raise credentials_exception
        
        return user
    except JWTError:
        raise credentials_exception

CurrentUserDependency = Annotated[dict, Depends(get_current_user)]
```

# backend/api/models/auth.py

```py
from pydantic import BaseModel
from typing import Optional

class Token(BaseModel):
    access_token: str
    token_type: str
    refresh_token: Optional[str] = None
    id_token: Optional[str] = None
    expires_in: Optional[int] = None

class UserResponse(BaseModel):
    email: str
    first_name: str
    last_name: str
    company_id: str

class RefreshTokenRequest(BaseModel):
    refresh_token: str
```

# backend/api/models/companies.py

```py
from pydantic import BaseModel

class CompanyCreate(BaseModel):
    name: str
    location: str
    street: str
    city: str
    state: str
    country: str
    postal_code: str

class CompanyResponse(BaseModel):
    id: str
    name: str
    location: str

class CompanyDetailResponse(CompanyResponse):
    street: str
    city: str
    state: str
    country: str
    postal_code: str

class JoinCompanyRequest(BaseModel):
    company_id: str
```

# backend/api/models/guest_preferences.py

```py
from pydantic import BaseModel, Field
from typing import Optional
from enum import Enum

class CabinClassEnum(str, Enum):
    ECONOMY= "ECONOMY"
    PREMIUM_ECONOMY = "PREMIUM_ECONOMY"
    BUSINESS = "BUSINESS"
    FIRST = "FIRST"

class MaxStopsEnum(str, Enum):
    DIRECT = "DIRECT"
    ONE_STOP = "ONE_STOP"
    TWO_STOPS = "TWO_STOPS"
    ANY = "ANY"

class HotelRatingEnum(str, Enum):
    ONE_STAR = "ONE_STAR"
    TWO_STAR = "TWO_STAR"
    THREE_STAR = "THREE_STAR"
    FOUR_STAR = "FOUR_STAR"
    FIVE_STAR = "FIVE_STAR"

class TransportServiceEnum(str, Enum):
    UBER = "UBER"
    LYFT = "LYFT"

# Flight Preferences Models 
class FlightPreferencesBase(BaseModel):
    cabin_class_id: str
    max_stops_id: str
    refundable_ticket: bool = Field(default=False)

class FlightPreferencesCreate(FlightPreferencesBase):
    pass

class FlightPreferencesUpdate(BaseModel):
    cabin_class_id: Optional[str] = None
    max_stops_id: Optional[str] = None
    refundable_ticket: Optional[bool] = None

class FlightPreferencesResponse(FlightPreferencesBase):
    preferences_id: str

    class Config:
        orm_mode = True

# Hotel Preferences Models
class HotelPreferencesBase(BaseModel):
    minimum_rating_id: str

class HotelPreferencesCreate(HotelPreferencesBase):
    pass

class HotelPreferencesUpdate(BaseModel):
    minimum_rating_id: Optional[str] = None

class HotelPreferencesResponse(HotelPreferencesBase):
    preferences_id: str

    class Config:
        orm_mode = True

# Ground Transport Preferences Models
class GroundTransportPreferencesBase(BaseModel):
    preferred_services_id: str

class GroundTransportPreferencesCreate(GroundTransportPreferencesBase):
    pass

class GroundTransportPreferencesUpdate(BaseModel):
    preferred_services_id: Optional[str] = None

class GroundTransportPreferencesResponse(GroundTransportPreferencesBase):
    preferences_id: str

    class Config:
        orm_mode = True

# Guest Type Preferences Models
class GuestTypePreferencesBase(BaseModel):
    flight_preferences_id: str
    hotel_preferences_id: str
    ground_transport_preferences_id: str
    guest_type: str
    daily_per_diem: Optional[float] = None

class GuestTypePreferencesCreate(GuestTypePreferencesBase):
    pass

class GuestTypePreferencesUpdate(BaseModel):
    flight_preferences_id: Optional[str] = None
    hotel_preferences_id: Optional[str] = None
    ground_transport_preferences_id: Optional[str] = None
    daily_per_diem: Optional[float] = None

class GuestTypePreferencesResponse(GuestTypePreferencesBase):
    preferences_id: str

    class Config:
        orm_mode = True

# Combined Preferences Models for nested creation
class CombinedPreferencesCreate(BaseModel):
    flight_preferences: FlightPreferencesCreate
    hotel_preferences: HotelPreferencesCreate
    ground_transport_preferences: GroundTransportPreferencesCreate
    guest_type: str
    daily_per_diem: Optional[float] = None
```

# backend/api/models/signup.py

```py
from pydantic import BaseModel, EmailStr, field_validator, ValidationInfo

class CompanyCreate(BaseModel):
    name: str
    location: str
    street: str
    city: str
    state: str
    country: str
    postal_code: str

class UserCreate(BaseModel):
    email: EmailStr
    password: str
    first_name: str
    last_name: str
    company: CompanyCreate = None
    company_id: str = None
    role: str = "ADMIN"
    
    @field_validator('password')
    def password_strength(cls, v):
        if len(v) < 8:
            raise ValueError('Password must be at least 8 characters')
        if not any(c.isupper() for c in v):
            raise ValueError('Password must contain at least one uppercase letter')
        if not any(c.islower() for c in v):
            raise ValueError('Password must contain at least one lowercase letter')
        if not any(c.isdigit() for c in v):
            raise ValueError('Password must contain at least one number')
        return v
    
    @field_validator('company_id')
    def validate_company_selection(cls, v, info: ValidationInfo):
        # Either joining existing company or creating new one
        data = info.data
        if not v and not data.get('company'):
            raise ValueError('Must either specify company_id or provide company details')
        if v and data.get('company'):
            raise ValueError('Cannot specify both company_id and company details')
        return v

class SignupResponse(BaseModel):
    message: str
    user_id: str
    company_id: str
    requires_confirmation: bool = True

class ConfirmSignupRequest(BaseModel):
    email: EmailStr
    confirmation_code: str
```

# backend/api/routes/auth.py

```py
from fastapi import APIRouter, HTTPException, Depends, status
from fastapi.security import OAuth2PasswordRequestForm
from typing import Optional

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
        user = await config_db.get_admin_by_email(form_data.username)
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
        "company_id": current_user.company_id
    }

@router.post("/refresh")
async def refresh_access_token(refresh_data: RefreshTokenRequest):
    """
    Get a new access token using a refresh token
    """
    refresh_result = CognitoService.refresh_token(refresh_data.refresh_token)
    
    if not refresh_result['success']:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired refresh token"
        )
    
    return {
        "access_token": refresh_result['access_token'],
        "id_token": refresh_result['id_token'],
        "token_type": "bearer",
        "expires_in": refresh_result['expires_in']
    }
```

# backend/api/routes/companies.py

```py

```

# backend/api/routes/flights.py

```py

```

# backend/api/routes/ground_transport.py

```py

```

# backend/api/routes/guest_preferences.py

```py

```

# backend/api/routes/guest_profiles.py

```py

```

# backend/api/routes/health.py

```py
from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy import text

from api.dependencies import ConfigDBDependency

router = APIRouter()

@router.get("/")
async def health_check():
    """Basic health check to verify the API is running"""
    return {"status": "ok", "message": "API is running"}

@router.get("/db")
async def db_health_check(config_db: ConfigDBDependency):
    """Health check to verify database connection"""
    try:
        # Try to make a simple database query
        # We'll use a direct connection to avoid any ORM issues
        connection = config_db.get_connection()
        with connection.connect() as conn:
            result = conn.execute(text("SELECT 1"))
            assert result.scalar() == 1
            
        return {
            "status": "ok", 
            "message": "Database connection successful",
            "database": config_db.db_name,
            "host": config_db.db_host
        }
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Database connection failed: {str(e)}"
        )
```

# backend/api/routes/hotels.py

```py

```

# backend/api/routes/per_diems.py

```py

```

# backend/api/routes/signup.py

```py
from fastapi import APIRouter, HTTPException, status
import uuid

from api.models.signup import UserCreate, SignupResponse, ConfirmSignupRequest
from api.dependencies import ConfigDBDependency, CognitoConfigDependency

router = APIRouter()

@router.post("/register", response_model=SignupResponse)
async def register_user_and_company(
    user_data: UserCreate,
    cognito: CognitoConfigDependency,
    config_db: ConfigDBDependency
):
    """
    Register a new user and optionally a new company
    """
    try:
        company_id = user_data.company_id
        
        # If user is creating a new company, create it first
        if user_data.company:
            # Create address first
            address = await config_db.insert_address(
                street=user_data.company.street,
                city=user_data.company.city,
                state=user_data.company.state,
                country=user_data.company.country,
                postal_code=user_data.company.postal_code
            )
            
            # Create the company with the new address ID
            company_id = str(uuid.uuid4())
            company = await config_db.insert_company(
                name=user_data.company.name,
                location=user_data.company.location,
                address_id=address.address_id
            )
            company_id = company.company_id
            
            # Create a Cognito group for the company
            await cognito.admin_create_group(
                group_name=f"company_{company_id}",
                description=f"Members of company {user_data.company.name}"
            )
        
        # Verify company exists if joining existing
        elif user_data.company_id:
            company = await config_db.get_company(user_data.company_id)
            if not company:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail="Company not found"
                )
        
        # Register user in Cognito
        signup_response = await cognito.sign_up(
            email=user_data.email,
            password=user_data.password,
            first_name=user_data.first_name,
            last_name=user_data.last_name,
            company_id=company_id
        )

        # Extract the Cognito-generated user ID
        cognito_user_id = signup_response['UserSub']
        
        # Create user in our database
        admin = await config_db.insert_admin(
            user_id = cognito_user_id,
            email=user_data.email,
            first_name=user_data.first_name,
            last_name=user_data.last_name,
            company_id=company_id,
            role="ADMIN"
        )
        
        # Add user to company group in Cognito
        await cognito.admin_add_user_to_group(
            email=user_data.email,
            group_name=f"company_{company_id}"
        )
        
        return {
            "message": "User registered successfully. Check email for confirmation code.",
            "user_id": admin.user_id,
            "company_id": company_id,
            "requires_confirmation": True
        }
    
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Registration failed: {str(e)}"
        )

@router.post("/confirm", response_model=dict)
async def confirm_registration(
    data: ConfirmSignupRequest,
    cognito: CognitoConfigDependency
):
    
    #Confirm user registration with code
    try:
        response = await cognito.confirm_sign_up(
            email=data.email,
            confirmation_code=data.confirmation_code
        )
        
        return {
            "message": "User confirmed successfully. You can now sign in.",
            "status": "confirmed"
        }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Confirmation failed: {str(e)}"
        )
```

# backend/api/routes/trips.py

```py

```

# backend/api/routes/users.py

```py
from fastapi import APIRouter, HTTPException, Depends, status
from pydantic import BaseModel, EmailStr
from typing import List, Optional

#from applications.backend.auth.cognito import verify_cognito_token, CognitoUser
from api.dependencies import ConfigDBDependency, CognitoConfigDependency, CurrentUserDependency
from api.dependencies import ConfigDBDependency

router = APIRouter()

class AdminResponse(BaseModel):
    user_id: str
    email: EmailStr
    first_name: str
    last_name: str
    company_id: Optional[str]

@router.get("/", response_model=List[AdminResponse])
async def get_users(
    current_user: CurrentUserDependency,
    config_db: ConfigDBDependency
):
    """
    Get all users in the current user's company
    """
    if not current_user.company_id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User is not associated with any company"
        )
    
    try:
        # Get all admins in the same company
        admins = await config_db.get_admins_by_company(current_user.company_id)
        
        return [
            AdminResponse(
                user_id=admin.user_id,
                email=admin.email,
                first_name=admin.first_name,
                last_name=admin.last_name,
                company_id=admin.company_id
            )
            for admin in admins
        ]
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to get users: {str(e)}"
        )

@router.get("/me", response_model=AdminResponse)
async def get_current_user_profile(
    current_user: CurrentUserDependency,
    config_db: ConfigDBDependency
):
    """
    Get the current user's profile
    """
    try:
        admin = await config_db.get_admin_by_email(current_user.email)
        if not admin:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found in database"
            )
        
        return AdminResponse(
            user_id=admin.user_id,
            email=admin.email,
            first_name=admin.first_name,
            last_name=admin.last_name,
            company_id=admin.company_id
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to get user profile: {str(e)}"
        )

@router.get("/{email}", response_model=AdminResponse)
async def get_user_by_email(
    email: str,
    current_user: CurrentUserDependency,
    config_db: ConfigDBDependency
):
    """
    Get a user by email
    """
    try:
        admin = await config_db.get_admin_by_email(email)
        if not admin:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found"
            )
        
        # Check if user is in the same company
        if admin.company_id != current_user.company_id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Not authorized to access this user"
            )
        
        return AdminResponse(
            user_id=admin.user_id,
            email=admin.email,
            first_name=admin.first_name,
            last_name=admin.last_name,
            company_id=admin.company_id
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to get user: {str(e)}"
        )
```

# backend/auth/cognito.py

```py
import json
import boto3
from jose import jwk, jwt
from jose.utils import base64url_decode
from fastapi import HTTPException, status
import requests
import hmac
import hashlib
import base64
from typing import Dict
import time

class CognitoConfig:
    def __init__(self, config_file_path: str = None):
        self.config = self._load_config(config_file_path)
        self.region = self.config.get('region', 'us-east-1')
        self.user_pool_id = self.config.get('user_pool_ID')
        self.app_client_id = self.config.get('client_ID')
        self.app_client_secret = self.config.get('client_secret')

        aws_access_key_id = self.config.get('aws_access_key')
        aws_secret_access_key = self.config.get('aws_secret')
        
        # Initialize Cognito client
        self.client = boto3.client(
            'cognito-idp', 
            region_name=self.region,
            aws_access_key_id=aws_access_key_id,
            aws_secret_access_key=aws_secret_access_key
        )

        self._jwks = None
    
    def _load_config(self, config_file: str) -> Dict:
        """Load Cognito configuration from JSON file"""
        try:
            with open(config_file) as f:
                return json.load(f)
        except Exception as e:
            print(f"Error loading config from {config_file}: {str(e)}")
            return {}
    

    def get_secret_hash(self, username: str) -> str:
        """
        Calculates the secret hash for Cognito API calls that require it
        """
        message = username + self.app_client_id
        dig = hmac.new(
            bytes(self.app_client_secret, 'utf-8'),
            msg=bytes(message, 'utf-8'),
            digestmod=hashlib.sha256
        ).digest()
        return base64.b64encode(dig).decode()
    
    async def sign_up(self, email: str, password: str, first_name: str, last_name: str, company_id: str = None) -> Dict:
        """
        Register a new user in Cognito
        """
        user_attributes = [
            {'Name': 'email', 'Value': email},
            {'Name': 'given_name', 'Value': first_name},
            {'Name': 'family_name', 'Value': last_name},
            {'Name': 'custom:company_id', 'Value': company_id or ''}
        ]
        
        try:
            response = self.client.sign_up(
                ClientId=self.app_client_id,
                SecretHash=self.get_secret_hash(email),
                Username=email,
                Password=password,
                UserAttributes=user_attributes
            )
            return response
        except Exception as e:
            raise Exception(f"Error signing up user: {str(e)}")
    
    async def confirm_sign_up(self, email: str, confirmation_code: str) -> Dict:
        """
        Confirm a user registration with the code they received
        """
        try:
            response = self.client.confirm_sign_up(
                ClientId=self.app_client_id,
                SecretHash=self.get_secret_hash(email),
                Username=email,
                ConfirmationCode=confirmation_code
            )
            return response
        except Exception as e:
            raise Exception(f"Error confirming sign up: {str(e)}")
    
    async def initiate_auth(self, email: str, password: str) -> Dict:
        """
        Authenticate a user and get tokens
        """
        try:
            response = self.client.initiate_auth(
                ClientId=self.app_client_id,
                AuthFlow='USER_PASSWORD_AUTH',
                AuthParameters={
                    'USERNAME': email,
                    'PASSWORD': password,
                    'SECRET_HASH': self.get_secret_hash(email)
                }
            )
            return response
        except Exception as e:
            raise Exception(f"Error authenticating user: {str(e)}")
    
    
    async def verify_token(self, token: str) -> Dict:
        def get_cognito_jwks():
            """Fetch the JSON Web Key Set (JWKS) from Cognito"""
            jwks_url = f'https://cognito-idp.{self.region}.amazonaws.com/{self.user_pool_id}/.well-known/jwks.json'
            return requests.get(jwks_url).json()

        def get_jwt_keys():
            """Get the JWT keys, using a cached version if available"""
            if self._jwks is None:
                self._jwks = get_cognito_jwks()
            return self._jwks

        """Verify a JWT token from Cognito"""
        try:
            # Get the kid from the token
            kid = jwt.get_unverified_header(token).get("kid")
        
            # Find the correct key
            key = None
            jwks = get_jwt_keys()
            for k in jwks.get("keys", []):
                if k.get("kid") == kid:
                    key = k
                    break
            if not key:
                raise HTTPException(
                    status_code=status.HTTP_401_UNAUTHORIZED,
                    detail="Invalid authentication token - key not found"
                )
        
            # Verify the token
            public_key = jwk.construct(key)
            message, encoded_signature = token.rsplit('.', 1)
            decoded_signature = base64url_decode(encoded_signature.encode())
        
            # Verify the signature
            if not public_key.verify(message.encode(), decoded_signature):
                raise HTTPException(
                    status_code=status.HTTP_401_UNAUTHORIZED,
                    detail="Invalid authentication token - signature verification failed"
                )
        
            # Verify the token has not expired
            claims = jwt.get_unverified_claims(token)
            if claims['exp'] < time.time():
                raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Authentication token expired"
            )
            
            # Check the audience (client ID)
            if 'aud' in claims and claims['aud'] != self.app_client_id:
                raise HTTPException(
                    status_code=status.HTTP_401_UNAUTHORIZED,
                    detail="Invalid authentication token - incorrect audience"
                )
            
            # For access tokens, verify the token_use claim is 'access'
            if 'token_use' in claims and claims['token_use'] != 'access':
                raise HTTPException(
                    status_code=status.HTTP_401_UNAUTHORIZED,
                    detail="Invalid authentication token - incorrect token use"
                )
        
            return claims
        
        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail=f"Invalid authentication token: {str(e)}"
            )
    
    async def admin_create_user(self, email: str, password: str, first_name: str, last_name: str, company_id: str = None) -> Dict:
        """
        Admin creates a user (useful for testing without email verification)
        """
        user_attributes = [
            {'Name': 'email', 'Value': email},
            {'Name': 'given_name', 'Value': first_name},
            {'Name': 'family_name', 'Value': last_name},
            {'Name': 'email_verified', 'Value': 'true'},
            {'Name': 'custom:company_id', 'Value': company_id or ''}
        ]
        
        try:
            response = self.client.admin_create_user(
                UserPoolId=self.user_pool_id,
                Username=email,
                TemporaryPassword=password,
                UserAttributes=user_attributes
            )
            return response
        except Exception as e:
            raise Exception(f"Error creating user: {str(e)}")
    
    async def admin_add_user_to_group(self, email: str, group_name: str) -> Dict:
        """
        Add a user to a Cognito group
        """
        try:
            response = self.client.admin_add_user_to_group(
                UserPoolId=self.user_pool_id,
                Username=email,
                GroupName=group_name
            )
            return response
        except Exception as e:
            raise Exception(f"Error adding user to group: {str(e)}")
    
    async def admin_create_group(self, group_name: str, description: str = None) -> Dict:
        """
        Create a new Cognito group (used for companies/tenants)
        """
        try:
            response = self.client.create_group(
                GroupName=group_name,
                UserPoolId=self.user_pool_id,
                Description=description or f"Group for {group_name}"
            )
            return response
        except Exception as e:
            raise Exception(f"Error creating group: {str(e)}")
```

# backend/auth/constants.py

```py
DEV_COGNITO_KEY_FILE   = "/Users/deploy/keys/DevCognito.json"
```

# backend/core/config/dev.json

```json
{
    "HOST": "127.0.0.1",
    "PORT": 8000,
    "PSQL_KEY_FILE": "/Users/deploy/keys/DevPSQL.json",
    "COGNITO_KEY_FILE": "/Users/deploy/keys/DevCognito.json",
    "AWS_KEY_FILE": "/Users/deploy/keys/DevAWSAccess.json",
    "MODULE_NAME": "main",
    "APP_NAME": "app",
    "WORKERS": 1
}
```

# backend/core/config/prod.json

```json
{
    "HOST": "127.0.0.1",
    "PORT": 8000,
    "PSQL_KEY_FILE": "/deploy/keys/ProdPSQL.json",
    "MODULE_NAME": "main",
    "APP_NAME": "app",
    "WORKERS": 2
}
```

# backend/core/config/settings.py

```py
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
```

# backend/core/config/staging.json

```json

```

# backend/main.py

```py
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware

from api.api import api

app = FastAPI(title = "API", description = "API for Corporate Travel Booking System", version = "0.1")

origins = [
    "http://localhost:3000",
    "http://localhost:3001",
    "http://localhost:5173",
    "http://localhost",
]

app.include_router(api, prefix="/api/v1")

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


```

# backend/start_app.py

```py
import argparse
import os
import uvicorn

from core.config.settings import get_config

def get_args():
    parser = argparse.ArgumentParser()
    parser.add_argument("--env", default="dev")
    args = parser.parse_args()
    return args

def main():
    args = get_args()

    os.environ["ENVIRONMENT"] = args.env

    config = get_config()

    app = f"{config.module_name}:{config.app_name}"

    uvicorn.run(app, host=config.app_host, port=config.app_port, workers=config.workers)

if __name__ == "__main__":
    main()
```

# backend/start_app.sh

```sh
#!/usr/bin/env bash
DIR="$( cd  "$( dirname $BASH_SOURCE[0])" && pwd )"

export PYTHONUNBUFFERED=1
export PYTHONPATH=${DIR}/../../libraries/python:.:$PYTHONPATH

START_SCRIPT="start_app.py"

python3 ${DIR}/${START_SCRIPT} $@
```