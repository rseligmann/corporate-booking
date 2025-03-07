#!/usr/bin/env python3
"""
AWS Cognito Credentials Debugger

This script helps debug AWS credential issues with Cognito.
"""

import boto3
import json
import sys

def test_aws_credentials(config_file):
    """Test if AWS credentials in config file work correctly"""
    print(f"Loading config from: {config_file}")
    
    try:
        with open(config_file) as f:
            config = json.load(f)
            print("Successfully loaded JSON config")
            
            # Print keys in config (without showing actual values)
            print("\nConfig keys found:")
            for key in config:
                value = config[key]
                # Show only first few chars of values for security
                display_value = str(value)[:5] + "..." if isinstance(value, str) and len(str(value)) > 8 else value
                print(f"  - {key}: {display_value}")
            
            # Check for required keys
            required_keys = [
                'aws_access_key', 'aws_secret', 
                'region', 'user_pool_ID', 
                'client_ID', 'client_secret'
            ]
            
            missing_keys = [key for key in required_keys if key not in config]
            if missing_keys:
                print("\n⚠️  Missing required keys:")
                for key in missing_keys:
                    print(f"  - {key}")
            
            # Extract AWS credentials
            aws_access_key = config.get('aws_access_key')
            aws_secret_key = config.get('aws_secret')
            region = config.get('region', 'us-east-2')  # Default to us-east-2
            
            if not aws_access_key or not aws_secret_key:
                print("\n❌ AWS credentials not found in config!")
                return False
            
            print(f"\nTesting connection to AWS with provided credentials...")
            
            # Try to create boto3 client
            try:
                client = boto3.client(
                    'cognito-idp',
                    region_name=region,
                    aws_access_key_id=aws_access_key,
                    aws_secret_access_key=aws_secret_key
                )
                
                print("✅ Successfully created Cognito client")
                
                # Try a simple Cognito operation
                response = client.list_user_pools(MaxResults=10)
                print(f"✅ Successfully listed user pools: {len(response.get('UserPools', []))} found")
                
                # Try to access the specific user pool
                user_pool_id = config.get('user_pool_ID')
                if user_pool_id:
                    try:
                        user_pool = client.describe_user_pool(UserPoolId=user_pool_id)
                        print(f"✅ Successfully accessed user pool: {user_pool_id}")
                    except Exception as e:
                        print(f"❌ Error accessing user pool {user_pool_id}: {str(e)}")
                
                return True
            
            except Exception as e:
                print(f"❌ Failed to connect to AWS: {str(e)}")
                
                if "InvalidClientTokenId" in str(e):
                    print("\n⚠️  Invalid AWS credentials. Please check your Access Key ID.")
                elif "SignatureDoesNotMatch" in str(e):
                    print("\n⚠️  Signature verification failed. Please check your Secret Access Key.")
                elif "AccessDenied" in str(e) or "UnauthorizedOperation" in str(e):
                    print("\n⚠️  Access denied. Your AWS credentials don't have sufficient permissions.")
                
                return False
    
    except json.JSONDecodeError:
        print(f"❌ Failed to parse config file as JSON: {config_file}")
        return False
    except FileNotFoundError:
        print(f"❌ Config file not found: {config_file}")
        return False
    except Exception as e:
        print(f"❌ Unexpected error: {str(e)}")
        return False

if __name__ == "__main__":
    config_file = "/Users/deploy/keys/DevCognito.json"
    if len(sys.argv) > 1:
        config_file = sys.argv[1]
    
    success = test_aws_credentials(config_file)
    
    if not success:
        print("\n💡 Suggestions:")
        print("1. Verify your AWS Access Key and Secret are correct")
        print("2. Make sure your IAM user has Cognito permissions")
        print("3. Check the JSON format of your config file")
        print("4. Try using environment variables instead:")
        print("   export AWS_ACCESS_KEY_ID=your_access_key")
        print("   export AWS_SECRET_ACCESS_KEY=your_secret_key")
        print("   export AWS_DEFAULT_REGION=us-east-2")
        
        sys.exit(1)
    else:
        print("\n✅ AWS credentials are working correctly!")