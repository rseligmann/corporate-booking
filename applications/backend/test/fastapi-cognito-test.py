#!/usr/bin/env python3
"""
FastAPI Cognito Integration Test

This script tests the FastAPI endpoints we've created for Cognito integration.
It focuses on testing the API endpoints rather than direct Cognito operations.
"""

import requests
import json
import uuid
import time
import sys
from typing import Dict, Any, Optional

# Configuration
BASE_URL = "http://localhost:8000/api/v1"
HEADERS = {"Content-Type": "application/json"}

class BColors:
    HEADER = '\033[95m'
    OKBLUE = '\033[94m'
    OKGREEN = '\033[92m'
    WARNING = '\033[93m'
    FAIL = '\033[91m'
    ENDC = '\033[0m'
    BOLD = '\033[1m'
    UNDERLINE = '\033[4m'

def print_header(message):
    print(f"\n{BColors.HEADER}{BColors.BOLD}{message}{BColors.ENDC}\n")

def print_success(message):
    print(f"{BColors.OKGREEN}SUCCESS: {message}{BColors.ENDC}")

def print_error(message):
    print(f"{BColors.FAIL}ERROR: {message}{BColors.ENDC}")

def print_info(message):
    print(f"{BColors.OKBLUE}INFO: {message}{BColors.ENDC}")

def print_json(data):
    print(json.dumps(data, indent=2))

def test_health_endpoint():
    """Test the health check endpoint"""
    print_header("Testing Health Check Endpoint")
    
    try:
        response = requests.get(f"{BASE_URL}/health")
        
        if response.status_code == 200:
            print_success(f"Health check succeeded with status code {response.status_code}")
            print_info("Response:")
            print_json(response.json())
            return True
        else:
            print_error(f"Health check failed with status code {response.status_code}")
            print_info("Response:")
            print(response.text)
            return False
    except Exception as e:
        print_error(f"Exception during health check: {str(e)}")
        return False

def test_db_health_endpoint():
    """Test the database health check endpoint"""
    print_header("Testing Database Health Check Endpoint")
    
    try:
        response = requests.get(f"{BASE_URL}/health/db")
        
        if response.status_code == 200:
            print_success(f"Database health check succeeded with status code {response.status_code}")
            print_info("Response:")
            print_json(response.json())
            return True
        else:
            print_error(f"Database health check failed with status code {response.status_code}")
            print_info("Response:")
            print(response.text)
            return False
    except Exception as e:
        print_error(f"Exception during database health check: {str(e)}")
        return False

def test_register_company_and_user():
    """Test the registration endpoint with company creation"""
    print_header("Testing User Registration with Company Creation")
    
    # Generate unique test data
    test_id = str(uuid.uuid4())[:8]
    test_email = f"test.fastapi.{test_id}@example.com"
    test_password = f"TestPassword123!"
    test_company_name = f"Test Company API {test_id}"
    
    # Create registration data
    registration_data = {
        "email": test_email,
        "password": test_password,
        "first_name": "Test",
        "last_name": "User",
        "company": {
            "name": test_company_name,
            "location": "API Test Location",
            "street": "123 API Test Street",
            "city": "API Test City",
            "state": "API Test State",
            "country": "API Test Country",
            "postal_code": "12345"
        }
    }
    
    print_info(f"Registering user with email: {test_email}")
    print_info(f"Company name: {test_company_name}")
    
    try:
        response = requests.post(
            f"{BASE_URL}/signup/register",
            headers=HEADERS,
            json=registration_data
        )
        
        if response.status_code == 200:
            print_success(f"Registration succeeded with status code {response.status_code}")
            print_info("Response:")
            print_json(response.json())
            
            # Store user and company IDs
            user_id = response.json().get("user_id")
            company_id = response.json().get("company_id")
            
            print_info(f"User ID: {user_id}")
            print_info(f"Company ID: {company_id}")
            
            return {
                "success": True,
                "user_id": user_id,
                "company_id": company_id,
                "email": test_email,
                "password": test_password
            }
        else:
            print_error(f"Registration failed with status code {response.status_code}")
            print_info("Response:")
            print(response.text)
            return {"success": False}
    except Exception as e:
        print_error(f"Exception during registration: {str(e)}")
        return {"success": False}

def test_confirm_registration(email, confirmation_code):
    """Test the confirmation endpoint"""
    print_header("Testing User Confirmation")
    
    confirmation_data = {
        "email": email,
        "confirmation_code": confirmation_code
    }
    
    try:
        response = requests.post(
            f"{BASE_URL}/signup/confirm",
            headers=HEADERS,
            json=confirmation_data
        )
        
        if response.status_code == 200:
            print_success(f"Confirmation succeeded with status code {response.status_code}")
            print_info("Response:")
            print_json(response.json())
            return True
        else:
            print_error(f"Confirmation failed with status code {response.status_code}")
            print_info("Response:")
            print(response.text)
            return False
    except Exception as e:
        print_error(f"Exception during confirmation: {str(e)}")
        return False

def test_authentication(email, password):
    """Test the authentication endpoint"""
    print_header("Testing User Authentication")
    
    auth_data = {
        "username": email,
        "password": password
    }
    
    try:
        # For OAuth2 token endpoint, we need to use form data
        response = requests.post(
            f"{BASE_URL}/auth/token",
            data=auth_data  # Using data instead of json for form submission
        )
        
        if response.status_code == 200:
            print_success(f"Authentication succeeded with status code {response.status_code}")
            print_info("Response:")
            
            # Don't print the full tokens for security
            auth_result = response.json()
            for key in auth_result:
                if key.endswith('_token'):
                    value = auth_result[key]
                    if value and len(value) > 20:
                        auth_result[key] = f"{value[:20]}..."
            
            print_json(auth_result)
            
            return {
                "success": True,
                "access_token": response.json().get("access_token"),
                "id_token": response.json().get("id_token"),
                "refresh_token": response.json().get("refresh_token")
            }
        else:
            print_error(f"Authentication failed with status code {response.status_code}")
            print_info("Response:")
            print(response.text)
            return {"success": False}
    except Exception as e:
        print_error(f"Exception during authentication: {str(e)}")
        return {"success": False}

def test_me_endpoint(access_token):
    """Test the /me endpoint with authentication"""
    print_header("Testing Authenticated /me Endpoint")
    
    if not access_token:
        print_error("No access token provided")
        return False
    
    # Log the token (first 20 characters for security)
    print_info(f"Using access token: {access_token[:20]}...")

    auth_headers = {
        "Authorization": f"Bearer {access_token}",
        "Content-Type": "application/json"
    }
    
    # Log the exact headers being sent
    print_info(f"Request headers: {auth_headers}")

    try:
        response = requests.get(
            f"{BASE_URL}/auth/me",
            headers=auth_headers
        )

        # Log response headers to check for auth-related headers
        print_info(f"Response headers: {dict(response.headers)}")
        
        if response.status_code == 200:
            print_success(f"/me endpoint succeeded with status code {response.status_code}")
            print_info("Response (user information):")
            print_json(response.json())
            return True
        else:
            print_error(f"/me endpoint failed with status code {response.status_code}")
            print_info("Response:")
            print(response.text)
            return False
    except Exception as e:
        print_error(f"Exception during /me endpoint: {str(e)}")
        return False

def test_register_with_existing_company(company_id):
    """Test registering a user with an existing company"""
    print_header("Testing User Registration with Existing Company")
    
    if not company_id:
        print_error("No company ID provided")
        return {"success": False}
    
    # Generate unique test data
    test_id = str(uuid.uuid4())[:8]
    test_email = f"test.existing.{test_id}@example.com"
    test_password = f"TestPassword123!"
    
    # Create registration data
    registration_data = {
        "email": test_email,
        "password": test_password,
        "first_name": "Existing",
        "last_name": "Company User",
        "company_id": company_id
    }
    
    print_info(f"Registering user with email: {test_email}")
    print_info(f"Using existing company ID: {company_id}")
    
    try:
        response = requests.post(
            f"{BASE_URL}/signup/register",
            headers=HEADERS,
            json=registration_data
        )
        
        if response.status_code == 200:
            print_success(f"Registration succeeded with status code {response.status_code}")
            print_info("Response:")
            print_json(response.json())
            
            # Verify company ID matches
            response_company_id = response.json().get("company_id")
            if response_company_id == company_id:
                print_success(f"Company ID match confirmed: {response_company_id}")
            else:
                print_error(f"Company ID mismatch: expected {company_id}, got {response_company_id}")
            
            return {
                "success": True,
                "user_id": response.json().get("user_id"),
                "company_id": response_company_id,
                "email": test_email,
                "password": test_password
            }
        else:
            print_error(f"Registration failed with status code {response.status_code}")
            print_info("Response:")
            print(response.text)
            return {"success": False}
    except Exception as e:
        print_error(f"Exception during registration: {str(e)}")
        return {"success": False}

def main():
    # Start with basic health checks
    if not test_health_endpoint():
        print_error("Health check failed - exiting tests")
        return False
    
    if not test_db_health_endpoint():
        print_error("Database health check failed - exiting tests")
        return False
    
    # Test company and user registration
    registration_result = test_register_company_and_user()
    if not registration_result["success"]:
        print_error("Registration failed - exiting tests")
        return False
    
    company_id = registration_result["company_id"]
    
    # In a real-world scenario, we'd wait for confirmation code
    # For this test script, we'd need to manually verify or use admin
    # controls to confirm the user for subsequent tests
    print_header("Confirmation Step")
    print_info("In a real-world scenario, you would receive a confirmation code via email.")
    print_info("For testing, we have two options:")
    print_info("1. Use the AWS Console to confirm the user")
    print_info("2. Provide a confirmation code manually")
    
    confirmation_option = input("\nSelect option (1 for AWS Console, 2 for manual code): ")
    
    if confirmation_option == "2":
        confirmation_code = input("Enter the confirmation code: ")
        test_confirm_registration(registration_result["email"], confirmation_code)
    else:
        print_info("Please confirm the user in the AWS Console before continuing")
        input("Press Enter once you've confirmed the user...")
    
    # Test authentication
    auth_result = test_authentication(registration_result["email"], registration_result["password"])
    if not auth_result["success"]:
        print_error("Authentication failed - cannot test protected endpoints")
    else:
        # Test /me endpoint
        test_me_endpoint(auth_result["access_token"])
    
    # Test registering another user with existing company
    existing_company_result = test_register_with_existing_company(company_id)
    if not existing_company_result["success"]:
        print_error("Registration with existing company failed")
    
    print_header("Test Summary")
    print_info("Initial API health checks - Completed")
    print_info("User registration with company creation - Completed")
    print_info("User confirmation - Manual step")
    print_info("User authentication - Completed")
    print_info("Protected endpoint access - Completed if authentication succeeded")
    print_info("Registration with existing company - Completed")
    
    print_header("Testing Process Complete")
    return True

if __name__ == "__main__":
    success = main()
    if not success:
        sys.exit(1)