import api from '../api';
import { saveToken, removeToken, getToken, isTokenExpired } from '../utils/tokenStorage';
import { 
  LoginRequest, Token, RefreshTokenRequest,
  SignupRequest, SignupResponse, ConfirmSignupRequest, User
} from '@/types'

export const AuthService ={
    async login(credentials: LoginRequest): Promise<Token> {
        const formData = new URLSearchParams();
        formData.append('username', credentials.username);
        formData.append('password', credentials.password);

        const response = await api.post<Token>('/auth/token', formData, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        // Save the token for later use
        if (response.data.access_token) {
          saveToken(response.data);
          // // Store the email for refresh token purposes
          // localStorage.setItem('user_email', credentials.username);
        }
        return response.data;
    },
    
    async refreshToken(): Promise<Token | null> {
        const currentToken = getToken();
        const userName = localStorage.getItem('user_name');

        if (!currentToken || !currentToken.refresh_token || !userName) {
          return null;
        }
    
        try {
          const refreshRequest: RefreshTokenRequest = {
            user_Id: userName,
            refresh_token: currentToken.refresh_token
          };
    
          const response = await api.post<Token>('/auth/refresh', refreshRequest);
          
          if (response.data.access_token) {   
            saveToken(response.data);
            return response.data;
          }
          return null;
        } catch (error) {
          console.error('Failed to refresh token:', error);
          // If refresh fails, user needs to login again
          this.logout();
          return null;
        }
    },

    async signup(userData: SignupRequest): Promise<SignupResponse> {
        console.log('Signup request payload:', JSON.stringify(userData, null, 2));
        const response = await api.post<SignupResponse>('/signup/register', userData);
        return response.data;
    },

    async confirmSignup(confirmData: ConfirmSignupRequest): Promise<{ message: string, status: string }> {
        const response = await api.post<{ message: string, status: string }>('/signup/confirm', confirmData);
        return response.data;
    },

    async getCurrentUser(): Promise<User> {
        const response = await api.get<User>('/auth/me');
        // Store username for refresh token purposes
        if(response.data.user_id){
          localStorage.setItem('user_name', response.data.user_id)
        }
        return response.data;
      },

    async logout(): Promise<void> {
        // Clear the token from storage
        removeToken();
        localStorage.removeItem('user_email')
    },

    isAuthenticated(): boolean {
        const token = getToken();

        if (!token) return false;
        if (isTokenExpired()) return false;
        return true;
    }

}