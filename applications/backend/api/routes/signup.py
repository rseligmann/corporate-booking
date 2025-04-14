from fastapi import APIRouter, HTTPException, status

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
    Register a new user and a new company
    """
    try:
        company_id = user_data.company_id
        
        # If user is creating a new company, create it first (if company data is being sent)
        if user_data.company:

            # Create the company
            company = await config_db.insert_company(
                name=user_data.company.name,
                #address_id=None,
                # db auto sets status to ACTIVE
                # db auto sets subscription tier to FREE
                # db generates company_id
                # db aut sets address_id to NONE
            )
            company_id = company.company_id

            #Create address with company_id
            address = await config_db.insert_address(
                company_id=company_id,
                street=user_data.company.street,
                city=user_data.company.city,
                state=user_data.company.state,
                country=user_data.company.country,
                postal_code=user_data.company.postal_code
            )

            #Update company with address_id
            # company.address_id = address.address_id
            # await config_db.update_company(company)

            # Create a Cognito group for the company
            await cognito.admin_create_group(
                group_name=f"company_{company_id}",
                description=f"Members of company {user_data.company.name}"
            )
        
        # Verify company exists if joining existing
        # elif user_data.company_id:
        #     company = await config_db.get_company(user_data.company_id)
        #     if not company:
        #         raise HTTPException(
        #             status_code=status.HTTP_404_NOT_FOUND,
        #             detail="Company not found"
        #         )
        
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
        admin = await config_db.insert_user(
            user_id = cognito_user_id,
            company_id=company_id,
            email=user_data.email,
            first_name=user_data.first_name,
            last_name=user_data.last_name,
            # db auto sets role to ADMIN
            # db auto sets status to ACTIVE
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