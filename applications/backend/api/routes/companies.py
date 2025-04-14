# from fastapi import APIRouter, HTTPException, Depends, status
# from typing import List

# from api.models.companies import CompanyCreate, CompanyResponse, CompanyDetailResponse
# #from applications.backend.auth.cognito import verify_cognito_token, CognitoUser
# #from auth.service import CognitoService
# from api.dependencies import ConfigDBDependency, CognitoConfigDependency, CurrentUserDependency

# router = APIRouter()

# @router.post("/", response_model=CompanyDetailResponse)
# async def create_company(
#     company_data: CompanyCreate, 
#     current_user: CurrentUserDependency,
#     config_db: ConfigDBDependency
# ):
#     """
#     Create a new company and associate the current user with it
#     """
#     # Check if user already has a company
#     if current_user.company_id:
#         raise HTTPException(
#             status_code=status.HTTP_400_BAD_REQUEST,
#             detail="User is already associated with a company"
#         )
    
#     try:
#         # First create the address
#         address = await config_db.insert_address(
#             street=company_data.street,
#             city=company_data.city,
#             state=company_data.state,
#             country=company_data.country,
#             postal_code=company_data.postal_code
#         )
        
#         # Create the company
#         company = await config_db.insert_company(
#             name=company_data.name,
#             location=company_data.location,
#             address_id=address.address_id
#         )
        
#         # Update user in our database with company_id
#         admin = await config_db.get_admin_by_email(current_user.email)
#         admin.company_id = company.company_id
#         updated_admin = await config_db.update_admin(admin)
        
#         # Update Cognito user with company_id
#         cognito_result = CognitoService.set_user_company(
#             email=current_user.email, 
#             company_id=company.company_id
#         )
        
#         if not cognito_result['success']:
#             # This is not ideal, but we've already created the company in our DB
#             # Log this error and continue - we can reconcile later if needed
#             print(f"Failed to update Cognito user with company_id: {cognito_result['message']}")
        
#         # Construct the response
#         return CompanyDetailResponse(
#             id=company.company_id,
#             name=company.name,
#             location=company.location,
#             street=address.street,
#             city=address.city,
#             state=address.state,
#             country=address.country,
#             postal_code=address.postal_code
#         )
        
#     except Exception as e:
#         raise HTTPException(
#             status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
#             detail=f"Failed to create company: {str(e)}"
#         )

# @router.post("/join", response_model=CompanyResponse)
# async def join_company(
#     join_data: JoinCompanyRequest,
#     current_user: CurrentUserDependency,
#     config_db: ConfigDBDependency
# ):
#     """
#     Join an existing company
#     """
#     # Check if user already has a company
#     if current_user.company_id:
#         raise HTTPException(
#             status_code=status.HTTP_400_BAD_REQUEST,
#             detail="User is already associated with a company"
#         )
    
#     # Verify the company exists
#     company = await config_db.get_company(join_data.company_id)
#     if not company:
#         raise HTTPException(
#             status_code=status.HTTP_404_NOT_FOUND,
#             detail="Company not found"
#         )
    
#     try:
#         # Update user in our database with company_id
#         admin = await config_db.get_admin_by_email(current_user.email)
#         admin.company_id = company.company_id
#         updated_admin = await config_db.update_admin(admin)
        
#         # Update Cognito user with company_id
#         cognito_result = CognitoService.set_user_company(
#             email=current_user.email, 
#             company_id=company.company_id
#         )
        
#         if not cognito_result['success']:
#             print(f"Failed to update Cognito user with company_id: {cognito_result['message']}")
        
#         return CompanyResponse(
#             id=company.company_id,
#             name=company.name,
#             location=company.location
#         )
        
#     except Exception as e:
#         raise HTTPException(
#             status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
#             detail=f"Failed to join company: {str(e)}"
#         )

# @router.get("/", response_model=List[CompanyResponse])
# async def list_companies(
#     config_db: ConfigDBDependency,
#     current_user: CurrentUserDependency
# ):
#     """
#     List all companies (for company selection during registration)
#     Note: In a production app, you might want to add pagination and search
#     """
#     try:
#         companies = await config_db.get_all_companies()
#         return [
#             CompanyResponse(
#                 id=company.company_id,
#                 name=company.name,
#                 location=company.location
#             )
#             for company in companies
#         ]
#     except Exception as e:
#         raise HTTPException(
#             status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
#             detail=f"Failed to list companies: {str(e)}"
#         )

# @router.get("/{company_id}", response_model=CompanyDetailResponse)
# async def get_company(
#     company_id: str,
#     config_db: ConfigDBDependency,
#     current_user: CurrentUserDependency
# ):
#     """
#     Get details of a specific company
#     """
#     # Ensure user has permission to view this company
#     # For now, we'll allow any authenticated user to view any company
#     # In a real app, you might restrict this to company members
    
#     try:
#         company = await config_db.get_company(company_id)
#         if not company:
#             raise HTTPException(
#                 status_code=status.HTTP_404_NOT_FOUND,
#                 detail="Company not found"
#             )
        
#         address = await config_db.get_address(company.address_id)
        
#         return CompanyDetailResponse(
#             id=company.company_id,
#             name=company.name,
#             location=company.location,
#             street=address.street,
#             city=address.city,
#             state=address.state,
#             country=address.country,
#             postal_code=address.postal_code
#         )
#     except HTTPException:
#         raise
#     except Exception as e:
#         raise HTTPException(
#             status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
#             detail=f"Failed to get company: {str(e)}"
#         )