import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { AuthState, User, Token } from '@/types';
import { AuthService } from '@/api/services/authServices';

// Define the context shape
interface AuthContextType {
  authState: AuthState;
  login: (token: Token) => void;
  logout: () => void;
  setUser: (user: User) => void;
}

// Initial auth state
const initialState: AuthState = {
  isAuthenticated: AuthService.isAuthenticated(),
  user: null,
  token: null,
  isLoading: false,
  error: null,
};

// Define action types
type AuthAction =
  | { type: 'LOGIN_SUCCESS'; payload: Token}
  | { type: 'LOGOUT' }
  | { type: 'SET_USER'; payload: User }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string };

// Auth reducer
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload,
        isLoading: false,
        error: null,
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
      };
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
      };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth Provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, initialState);

  // Load user on mount if token exists
  useEffect(() => {
    const loadUser = async () => {
      if (authState.isAuthenticated && !authState.user) {
        try {
          dispatch({ type: 'SET_LOADING', payload: true });
          const user = await AuthService.getCurrentUser();
          dispatch({ type: 'SET_USER', payload: user });
        } catch (error) {
          console.error('Failed to load user:', error);
          dispatch({ type: 'SET_ERROR', payload: 'Failed to load user profile' });
          AuthService.logout();
          dispatch({ type: 'LOGOUT' });
        } finally {
          dispatch({ type: 'SET_LOADING', payload: false });
        }
      }
    };

    loadUser();
  }, [authState.isAuthenticated]);

  const login = (token: Token) => {
    dispatch({ type: 'LOGIN_SUCCESS', payload: token });
  };

  const logout = () => {
    AuthService.logout();
    dispatch({ type: 'LOGOUT' });
  };

  const setUser = (user: User) => {
    dispatch({ type: 'SET_USER', payload: user });
  };

  const value = {
    authState,
    login,
    logout,
    setUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};