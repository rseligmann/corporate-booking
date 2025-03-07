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