# from fastapi import APIRouter, HTTPException, Depends, status
# from pydantic import BaseModel, EmailStr
# from typing import List, Optional

# #from applications.backend.auth.cognito import verify_cognito_token, CognitoUser
# from api.dependencies import ConfigDBDependency, CognitoConfigDependency, CurrentUserDependency
# from api.dependencies import ConfigDBDependency

# router = APIRouter()

# class AdminResponse(BaseModel):
#     user_id: str
#     email: EmailStr
#     first_name: str
#     last_name: str
#     company_id: Optional[str]

# @router.get("/", response_model=List[AdminResponse])
# async def get_users(
#     current_user: CurrentUserDependency,
#     config_db: ConfigDBDependency
# ):
#     """
#     Get all users in the current user's company
#     """
#     if not current_user.company_id:
#         raise HTTPException(
#             status_code=status.HTTP_400_BAD_REQUEST,
#             detail="User is not associated with any company"
#         )
    
#     try:
#         # Get all admins in the same company
#         admins = await config_db.get_admins_by_company(current_user.company_id)
        
#         return [
#             AdminResponse(
#                 user_id=admin.user_id,
#                 email=admin.email,
#                 first_name=admin.first_name,
#                 last_name=admin.last_name,
#                 company_id=admin.company_id
#             )
#             for admin in admins
#         ]
#     except Exception as e:
#         raise HTTPException(
#             status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
#             detail=f"Failed to get users: {str(e)}"
#         )

# @router.get("/me", response_model=AdminResponse)
# async def get_current_user_profile(
#     current_user: CurrentUserDependency,
#     config_db: ConfigDBDependency
# ):
#     """
#     Get the current user's profile
#     """
#     try:
#         admin = await config_db.get_admin_by_email(current_user.email)
#         if not admin:
#             raise HTTPException(
#                 status_code=status.HTTP_404_NOT_FOUND,
#                 detail="User not found in database"
#             )
        
#         return AdminResponse(
#             user_id=admin.user_id,
#             email=admin.email,
#             first_name=admin.first_name,
#             last_name=admin.last_name,
#             company_id=admin.company_id
#         )
#     except HTTPException:
#         raise
#     except Exception as e:
#         raise HTTPException(
#             status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
#             detail=f"Failed to get user profile: {str(e)}"
#         )

# @router.get("/{email}", response_model=AdminResponse)
# async def get_user_by_email(
#     email: str,
#     current_user: CurrentUserDependency,
#     config_db: ConfigDBDependency
# ):
#     """
#     Get a user by email
#     """
#     try:
#         admin = await config_db.get_admin_by_email(email)
#         if not admin:
#             raise HTTPException(
#                 status_code=status.HTTP_404_NOT_FOUND,
#                 detail="User not found"
#             )
        
#         # Check if user is in the same company
#         if admin.company_id != current_user.company_id:
#             raise HTTPException(
#                 status_code=status.HTTP_403_FORBIDDEN,
#                 detail="Not authorized to access this user"
#             )
        
#         return AdminResponse(
#             user_id=admin.user_id,
#             email=admin.email,
#             first_name=admin.first_name,
#             last_name=admin.last_name,
#             company_id=admin.company_id
#         )
#     except HTTPException:
#         raise
#     except Exception as e:
#         raise HTTPException(
#             status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
#             detail=f"Failed to get user: {str(e)}"
#         )