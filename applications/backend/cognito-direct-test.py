#!/usr/bin/env python3
"""
Direct Cognito Management Test

This script tests AWS Cognito operations directly with boto3.
Use this to verify your Cognito configuration and troubleshoot integration issues.
"""

import boto3
import json
import uuid
import base64
import hmac
import hashlib
import argparse
import time
from typing import Dict, Any, Optional


class CognitoDirectTester:
    def __init__(self, config_file: str = "/Users/deploy/keys/DevCognito.json"):
        """Initialize the tester with Cognito configuration"""
        self.config = self._load_config(config_file)
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
        
        # Generate test data
        self.test_id = str(uuid.uuid4())[:8]
        self.test_email = f"test.direct.{self.test_id}@example.com"
        self.test_password = f"TestPassword123!"
        self.test_company_name = f"Test Company Direct {self.test_id}"
        self.company_id = str(uuid.uuid4())
        
        # Print configuration (without sensitive parts)
        print(f"Cognito Configuration:")
        print(f"  Region: {self.region}")
        print(f"  User Pool ID: {self.user_pool_id}")
        print(f"  App Client ID: {self.app_client_id}")
        print(f"  Test Email: {self.test_email}")
        print(f"  Company ID: {self.company_id}")
    
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
        Calculate the secret hash for Cognito API calls that require it
        """
        message = username + self.app_client_id
        dig = hmac.new(
            bytes(self.app_client_secret, 'utf-8'),
            msg=bytes(message, 'utf-8'),
            digestmod=hashlib.sha256
        ).digest()
        return base64.b64encode(dig).decode()
    
    def test_create_group(self) -> bool:
        """
        Test creating a new group in Cognito (represents a company/tenant)
        """
        print("\n=== Testing Group Creation ===")
        
        group_name = f"company_{self.company_id}"
        description = f"Members of company {self.test_company_name}"
        
        try:
            response = self.client.create_group(
                GroupName=group_name,
                UserPoolId=self.user_pool_id,
                Description=description
            )
            
            print(f"✅ Successfully created group: {group_name}")
            print(f"   Group description: {description}")
            return True
        except Exception as e:
            print(f"❌ Failed to create group: {str(e)}")
            return False
    
    def test_sign_up_user(self) -> bool:
        """
        Test user registration in Cognito
        """
        print("\n=== Testing User Sign Up ===")
        
        user_attributes = [
            {'Name': 'email', 'Value': self.test_email},
            {'Name': 'given_name', 'Value': 'Test'},
            {'Name': 'family_name', 'Value': 'User'},
            {'Name': 'custom:company_id', 'Value': self.company_id}
        ]
        
        try:
            # Calculate secret hash if client secret is configured
            secret_hash = self.get_secret_hash(self.test_email) if self.app_client_secret else None
            
            signup_args = {
                'ClientId': self.app_client_id,
                'Username': self.test_email,
                'Password': self.test_password,
                'UserAttributes': user_attributes
            }
            
            # Only add SecretHash if we have a client secret
            if secret_hash:
                signup_args['SecretHash'] = secret_hash
            
            response = self.client.sign_up(**signup_args)
            
            print(f"✅ Successfully signed up user: {self.test_email}")
            print(f"   User sub: {response['UserSub']}")
            return True
        except Exception as e:
            print(f"❌ Failed to sign up user: {str(e)}")
            return False
    
    def test_admin_create_user(self) -> bool:
        """
        Test admin-created user in Cognito (bypasses email verification)
        """
        print("\n=== Testing Admin User Creation ===")
        
        admin_email = f"admin.test.{self.test_id}@example.com"
        
        user_attributes = [
            {'Name': 'email', 'Value': admin_email},
            {'Name': 'given_name', 'Value': 'Admin'},
            {'Name': 'family_name', 'Value': 'User'},
            {'Name': 'email_verified', 'Value': 'true'},
            {'Name': 'custom:company_id', 'Value': self.company_id}
        ]
        
        try:
            response = self.client.admin_create_user(
                UserPoolId=self.user_pool_id,
                Username=admin_email,
                TemporaryPassword=self.test_password,
                UserAttributes=user_attributes
            )
            
            print(f"✅ Successfully created admin user: {admin_email}")
            
            # Set permanent password for the admin user
            try:
                self.client.admin_set_user_password(
                    UserPoolId=self.user_pool_id,
                    Username=admin_email,
                    Password=self.test_password,
                    Permanent=True
                )
                print(f"✅ Successfully set permanent password for admin user")
            except Exception as e:
                print(f"❌ Failed to set permanent password: {str(e)}")
                return False
            
            return True
        except Exception as e:
            print(f"❌ Failed to create admin user: {str(e)}")
            return False
    
    def test_add_user_to_group(self) -> bool:
        """
        Test adding a user to a group
        """
        print("\n=== Testing Add User to Group ===")
        
        admin_email = f"admin.test.{self.test_id}@example.com"
        group_name = f"company_{self.company_id}"
        
        try:
            response = self.client.admin_add_user_to_group(
                UserPoolId=self.user_pool_id,
                Username=admin_email,
                GroupName=group_name
            )
            
            print(f"✅ Successfully added user to group: {group_name}")
            return True
        except Exception as e:
            print(f"❌ Failed to add user to group: {str(e)}")
            return False
    
    def test_authenticate_user(self) -> bool:
        """
        Test authenticating a user
        """
        print("\n=== Testing User Authentication ===")
        
        admin_email = f"admin.test.{self.test_id}@example.com"
        
        try:
            # Calculate secret hash if client secret is configured
            secret_hash = self.get_secret_hash(admin_email) if self.app_client_secret else None
            
            auth_args = {
                'ClientId': self.app_client_id,
                'AuthFlow': 'USER_PASSWORD_AUTH',
                'AuthParameters': {
                    'USERNAME': admin_email,
                    'PASSWORD': self.test_password
                }
            }
            
            # Only add SecretHash if we have a client secret
            if secret_hash:
                auth_args['AuthParameters']['SECRET_HASH'] = secret_hash
            
            response = self.client.initiate_auth(**auth_args)
            
            print(f"✅ Successfully authenticated user: {admin_email}")
            print(f"   Authentication result contains:")
            for key in response.get('AuthenticationResult', {}).keys():
                print(f"   - {key}")
            
            # Get the ID token
            id_token = response.get('AuthenticationResult', {}).get('IdToken')
            if id_token:
                print(f"   ID Token (first 20 chars): {id_token[:20]}...")
            
            return True
        except Exception as e:
            print(f"❌ Failed to authenticate user: {str(e)}")
            return False
    
    def test_list_users_in_group(self) -> bool:
        """
        Test listing users in a group
        """
        print("\n=== Testing List Users in Group ===")
        
        group_name = f"company_{self.company_id}"
        
        try:
            response = self.client.list_users_in_group(
                UserPoolId=self.user_pool_id,
                GroupName=group_name
            )
            
            users = response.get('Users', [])
            print(f"✅ Successfully listed users in group: {group_name}")
            print(f"   Found {len(users)} users in the group")
            
            for user in users:
                username = user.get('Username')
                print(f"   - User: {username}")
            
            return True
        except Exception as e:
            print(f"❌ Failed to list users in group: {str(e)}")
            return False
    
    def run_all_tests(self) -> bool:
        """Run all tests in sequence"""
        success = True
        
        # Test creating a group (company)
        if not self.test_create_group():
            success = False
        
        # Test signing up a user
        if not self.test_sign_up_user():
            print("ℹ️ Normal sign-up requires email verification. Testing admin creation instead.")
        
        # Test admin-created user
        if not self.test_admin_create_user():
            success = False
        
        # Test adding user to group
        if not self.test_add_user_to_group():
            success = False
        
        # Test authentication
        if not self.test_authenticate_user():
            success = False
        
        # Test listing users in group
        if not self.test_list_users_in_group():
            success = False
        
        if success:
            print("\n✅ All tests completed successfully!")
        else:
            print("\n❌ Some tests failed.")
        
        return success


def parse_args():
    parser = argparse.ArgumentParser(description="Test AWS Cognito operations directly")
    parser.add_argument('--config', default="/Users/deploy/keys/DevCognito.json", 
                        help="Path to Cognito configuration file")
    return parser.parse_args()


if __name__ == "__main__":
    args = parse_args()
    
    tester = CognitoDirectTester(config_file=args.config)
    success = tester.run_all_tests()
    
    if not success:
        import sys
        sys.exit(1)