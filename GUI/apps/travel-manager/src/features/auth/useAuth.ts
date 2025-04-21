import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { 
  LoginRequest, 
  SignupRequest, 
  ConfirmSignupRequest 
} from '@/types';
import { AuthService } from '@corporate-travel-frontend/api/services/authServices';
import { useAuth } from '@/contexts/AuthContext';

export const useLogin = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (credentials: LoginRequest) => AuthService.login(credentials),
    onSuccess: (data) => {
      login(data);
      navigate('/dashboard');
    },
  });
};

export const useSignup = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (userData: SignupRequest) => AuthService.signup(userData),
    onSuccess: (_, variables) => {
      // Store email in session storage for confirmation
      sessionStorage.setItem('signupEmail', variables.email);
      navigate('/confirm-signup');
    },
  });
};

export const useConfirmSignup = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  return useMutation({
    mutationFn: (confirmData: ConfirmSignupRequest) => AuthService.confirmSignup(confirmData),
    onSuccess: async (_, variables) => {
      // After confirmation, attempt to login automatically
      try {
        // We need to retrieve the password from somewhere - this is a simplified version
        // In a real app, you might want to keep password in state during signup flow
        const password = sessionStorage.getItem('tempPassword');
        
        if (password) {
          const token = await AuthService.login({
            username: variables.email,
            password: password
          });
          
          login(token);

          navigate('/dashboard');
          
          // Clear any sensitive data after navigating to dashboard
          setTimeout(() =>{
            sessionStorage.removeItem('tempPassword');
            sessionStorage.removeItem('signupEmail');
          }, 500)
          
          
        } else {
          // If we don't have the password, redirect to login
          navigate('/login', { 
            state: { 
              message: 'Account confirmed successfully. Please log in.' 
            } 
          });
        }
      } catch (error) {
        console.error('Auto-login failed after confirmation:', error);
        navigate('/login', { 
          state: { 
            message: 'Account confirmed successfully. Please log in.' 
          } 
        });
      }
    },
    onError: (error) => {
        console.error('Confirmation error:', error);
    },
  });
};

export const useCurrentUser = () => {
    const { setUser } = useAuth();

    const query = useQuery({
        queryKey: ['currentUser'],
        queryFn: () => AuthService.getCurrentUser(),
        enabled: AuthService.isAuthenticated(),
        // onSuccess: (data) => {
        //   setUser(data);
        // },
        });
    if (query.data && !query.error) {
            setUser(query.data);
    }

    return query;
};

export const useLogout = () => {
  const { logout } = useAuth()
  const navigate = useNavigate()

  return () => {
    logout()
    navigate('/login')
  }
}
