export interface LoginRequest {
    username: string;
    password: string;
  }
  
export interface Token {
    access_token: string;
    token_type: string;
    refresh_token?: string;
    id_token?: string;
    expires_in?: number;
}
  
export interface RefreshTokenRequest {
    refresh_token: string;
}
  
export interface CompanyCreate {
    name?: string;
    street?: string;
    city?: string;
    state?: string;
    country?: string;
    postal_code?: string;
  }
  
export interface SignupRequest {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    companyId?: string;
    company?: CompanyCreate;
}

export interface SignupFormData extends SignupRequest {
    confirmPassword: string;
}
  
export interface SignupResponse {
    message: string;
    user_id: string;
    company_id: string;
    requires_confirmation: boolean;
}
  
export interface ConfirmSignupRequest {
    email: string;
    confirmation_code: string;
}
  
export interface AuthError {
    detail: string;
    status: number;
}

// Reminder: Validate if this matches existing user type. Then remove this and use other User type
export interface User {
    user_id?: string;
    email: string;
    first_name: string;
    last_name: string;
    company_id: string;
  }

export interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
    token: Token | null;
    isLoading: boolean;
    error: string | null;
  }