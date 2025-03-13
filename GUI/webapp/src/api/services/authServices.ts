import api from '../api';
import { saveToken, removeToken, getToken } from '../utils/tokenStorage';
import { 
  LoginRequest, 
  Token, 
  SignupRequest, 
  SignupResponse, 
  ConfirmSignupRequest,
} from '@/types'

interface User {
    user_id?: string;
    email: string;
    first_name: string;
    last_name: string;
    company_id: string;
  }

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
        
        // if (response.data.refresh_token) {
        // localStorage.setItem('refresh_token', response.data.refresh_token);
        // }
        }
        return response.data;
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
        return response.data;
      },

    async logout(): Promise<void> {
        // Clear the token from storage
        removeToken();
    },

    isAuthenticated(): boolean {
        return !! getToken();
    }

}