# .eslintrc.json
```json
{
    "extends": [
        "eslint:recommended",
        "react-app",
        "plugin:react/jsx-runtime",
        "prettier"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": { "project": true, "tsconfigRootDir": "./" },
    "plugins": ["@typescript-eslint", "import-order"],
    "root": true,
    "ignorePatterns": ["dist"],
    "rules": {
        "@typescript-eslint/consistent-type-imports": [
            2,
            { "fixStyle": "separate-type-imports" }
        ],
        "@typescript-eslint/no-restricted-imports": [
            2,
            {
                "paths": [
                    {
                        "name": "react-redux",
                        "importNames": [
                            "useSelector",
                            "useStore",
                            "useDispatch"
                        ],
                        "message": "Please use pre-typed versions from `src/app/hooks.ts` instead."
                    }
                ]
            }
        ],
        "import/no-duplicates": "off",
        "import-order": [
            "warn",
            {
                "groups": [
                    "builtin",
                    "external",
                    "internal",
                    "parent",
                    "sibling",
                    "index",
                    "type"
                ],
                "newlines-between": "always",
                "pathGroups": [
                    {
                        "pattern": "node:**",
                        "group": "builtin"
                    },
                    {
                        "pattern": "**",
                        "group": "external",
                        "position": "after"
                    },
                    {
                        "pattern": "~/**",
                        "group": "internal",
                        "position": "before"
                    },
                    {
                        "pattern": "./*.module.scss",
                        "group": "index",
                        "position": "after"
                    }
                ],
                "pathGroupsExcludedImportTypes": ["type"]
            }
        ]
    },
    "overrides": [
        { "files": ["*.{c,m,}{t,j}s", "*.{t,j}sx"] },
        { "files": ["*{test,spec}.{t,j}s?(x)"], "env": { "jest": true } }
    ]
}
```
# .prettierrc.json
```json
{
    "semi": false,
    "arrowParens": "avoid",
    "tabWidth": 4
}
```
# index.html
```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/vite.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Corporate Travel Booking System</title>
    </head>
    <body>
        <div id="root"></div>
        <script type="module" src="/src/main.tsx"></script>
    </body>
</html>
```
# package.json
```json
{
    "name": "react-redux-typescript-app",
    "private": true,
    "version": "0.1.0",
    "type": "module",
    "scripts": {
        "dev": "vite",
        "build": "tsc && vite build",
        "lint": "eslint src --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
        "preview": "vite preview"
    },
    "dependencies": {
        "@mantine/charts": "^7.16.3",
        "@mantine/core": "^7.16.3",
        "@mantine/dates": "^7.16.3",
        "@radix-ui/react-avatar": "^1.1.2",
        "@radix-ui/react-checkbox": "^1.1.3",
        "@radix-ui/react-label": "^2.1.1",
        "@radix-ui/react-select": "^2.1.4",
        "@radix-ui/react-slot": "^1.1.1",
        "@tanstack/react-query": "5.64.0",
        "@types/recharts": "^1.8.29",
        "axios": "^1.8.2",
        "class-variance-authority": "^0.7.1",
        "classnames": "^2.5.1",
        "clsx": "^2.1.1",
        "dayjs": "^1.11.13",
        "ky": "1.7.4",
        "lucide-react": "0.471.0",
        "path": "0.12.7",
        "react": "^18.2.0",
        "react-dom": "^18.2.0",
        "react-helmet-async": "^2.0.5",
        "react-hook-form": "^7.54.2",
        "react-router-dom": "7.1.1",
        "recharts": "^2.15.1",
        "tailwindcss-animate": "^1.0.7",
        "url": "0.11.0"
    },
    "devDependencies": {
        "@types/react": "^18.2.43",
        "@types/react-dom": "^18.2.17",
        "@typescript-eslint/eslint-plugin": "^6.14.0",
        "@typescript-eslint/parser": "^6.14.0",
        "@vitejs/plugin-react": "^4.2.1",
        "eslint": "^8.55.0",
        "eslint-plugin-react-hooks": "^4.6.0",
        "eslint-plugin-react-refresh": "^0.4.5",
        "sass": "^1.69.7",
        "sass-embedded": "^1.83.4",
        "typescript": "^5.3.3",
        "vite": "^5.0.8"
    }
}
```
# README.md
```md
Corporate Travel Book System
```
# src/_mantine.scss
```scss
@use 'sass:math';
// Define variables for your breakpoints,
// values must be the same as in your theme
$mantine-breakpoint-xs: '36em';
$mantine-breakpoint-sm: '48em';
$mantine-breakpoint-md: '62em';
$mantine-breakpoint-lg: '75em';
$mantine-breakpoint-xl: '88em';
@function rem($value) {
  @return #{math.div(math.div($value, $value * 0 + 1), 16)}rem;
}
@mixin light {
  [data-mantine-color-scheme='light'] & {
    @content;
  }
}
@mixin dark {
  [data-mantine-color-scheme='dark'] & {
    @content;
  }
}
@mixin hover {
  @media (hover: hover) {
    &:hover {
      @content;
    }
  }
  @media (hover: none) {
    &:active {
      @content;
    }
  }
}
@mixin smaller-than($breakpoint) {
  @media (max-width: $breakpoint) {
    @content;
  }
}
@mixin larger-than($breakpoint) {
  @media (min-width: $breakpoint) {
    @content;
  }
}
// Add direction mixins if you need rtl support
@mixin rtl {
  [dir='rtl'] & {
    @content;
  }
}
@mixin ltr {
  [dir='ltr'] & {
    @content;
  }
}
```
# src/api/api.ts
```ts
import axios, { AxiosInstance } from 'axios';
import { getToken, isTokenExpiringSoon, removeToken } from './utils/tokenStorage';
import { AuthService } from './services/authServices';
const baseURL = 'http://localhost:8000/api/v1';
const api: AxiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  paramsSerializer: {
    indexes: null  // This will serialize arrays without brackets
  }
});
// Add a request interceptor to include the token
api.interceptors.request.use(
  async (config) => {
    const token = getToken();
    // If no token, proceed without Authorization header
    if(!token) return config
    // If token is about to expire and needs refreshing
    if (
      isTokenExpiringSoon() &&
      token.refresh_token &&
      !config.url?.includes('/auth/refresh') &&
      !config.url?.includes('/auth/token')
    ){
      const newToken = await AuthService.refreshToken();
      if (newToken) {
        config.headers.Authorization = `Bearer ${newToken.access_token}`;
        return config;
      }
    }
    // If existing token
    if (token.access_token) {
      config.headers.Authorization = `Bearer ${token.access_token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
// Add a response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config
    // If error is 401 (Unauthorized) and we haven't already tried to refresh
    if(
      error.response?.status === 401 && 
      !originalRequest._retry &&
      !originalRequest.url.includes('/auth/refresh') &&
      !originalRequest.url.includes('/auth/token')
    ){
      originalRequest._retry = true;
      const newToken = await AuthService.refreshToken();
      if (newToken) {
        originalRequest.headers.Authorization = `Bearer ${newToken.access_token}`;
        return api(originalRequest)
      }
      // If refresh failed, redirect to login
      removeToken();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
export default api;
```
# src/api/hooks/Amadeus/useFlightSearch.ts
```ts
import { useQuery } from '@tanstack/react-query';
import { AmadeusFlightServices } from '@/api/services/amadeus/flightSearchServices';
import { FlightAggregationRequest } from '@/types';
// get average flight prices for each airport pair and overall average price
export const useAvgFlightPriceSearch = (searchParams?: FlightAggregationRequest) =>{
    return useQuery({
        queryKey: ['avgFlightPriceSearch', searchParams],
        queryFn:() => {
            if(searchParams){
                return AmadeusFlightServices.getAvgFlightPrices(searchParams)
            }
        },
        staleTime: 1000 * 60 * 5,
        enabled: !!searchParams
    })
}
```
# src/api/hooks/Amadeus/useHotelSearch.ts
```ts
import { useQuery } from '@tanstack/react-query';
import { AmadeusHotelServices } from '@/api/services/amadeus/hotelSearchServices';
import { HotelCustomSearchRequest } from '@/types';
// get average flight prices for each airport pair and overall average price
export const useAvgHotelPriceSearch = (searchParams?: HotelCustomSearchRequest) =>{
    return useQuery({
        queryKey: ['avgHotelPriceSearch', searchParams],
        queryFn:() => {
            if(searchParams){
                return AmadeusHotelServices.getAvgHotelPrices(searchParams)
            }
        },
        staleTime: 1000 * 60 * 5,
        enabled: !!searchParams
    })
}
```
# src/api/hooks/index.ts
```ts
export * from './useAuth'
export * from './useDebounce'
export * from './useGuestPreferences'
export * from './useSearch'
export * from './Amadeus/useFlightSearch'
export * from './Amadeus/useHotelSearch'
```
# src/api/hooks/useAuth.ts
```ts
import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { 
  LoginRequest, 
  SignupRequest, 
  ConfirmSignupRequest 
} from '@/types';
import { AuthService } from '../services/authServices';
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
```
# src/api/hooks/useDebounce.ts
```ts
import { useState, useEffect} from 'react'
export const useDebounce = <T>(value: T, delay: number) => {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);
    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebouncedValue(value)
        }, delay)
        return () => clearTimeout(timeout)
    }, [value, delay])
    return debouncedValue
}
```
# src/api/hooks/useGuestPreferences.ts
```ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { GuestPreferencesService } from '../services/guestPreferencesServices';
import { CreateGuestType, UpdateGuestType } from '@/types/Trip/subtypes';
// Fetch all guest types
export const useAllGuestTypes = (company_id: string) => {
  return useQuery({
    queryKey: ['guestTypes', company_id],
    queryFn: () => GuestPreferencesService.getAllGuestTypes(company_id),
  });
};
// Fetch a specific guest type preferences by guest type id
export const useGuestTypePreferences = (guest_type_id: string) => {
  return useQuery({
    queryKey: ['guestType', guest_type_id],
    queryFn: () => GuestPreferencesService.getGuestTypePreferences(guest_type_id),
    enabled: !!guest_type_id, //what does this do?
  });
};
// Create a new guest type
export const useCreateGuestType = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (guestTypeData: CreateGuestType) => 
      GuestPreferencesService.createGuestType(guestTypeData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['guestTypes'] });
    }
  });
};
// Update an existing guest type
export const useUpdateGuestType = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ 
      guest_type_id, 
      updateData 
    }: { 
      guest_type_id: string; 
      updateData: UpdateGuestType
    }) => 
      GuestPreferencesService.updateGuestTypePreferences(guest_type_id, updateData),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['guestTypes'] });
      queryClient.invalidateQueries({ queryKey: ['guestType', data.id] });
    }
  });
};
// Delete a guest type
export const useDeleteGuestType = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (guest_type_id: string) => 
      GuestPreferencesService.deleteGuestTypePreferences(guest_type_id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['guestTypes'] });
    }
  });
};
```
# src/api/hooks/useSearch.ts
```ts
import { useQuery } from '@tanstack/react-query';
import { SearchServices } from '../services/searchServices';
// Search US based cities
export const useCitySearch = (q: string, limit: number, threshold: number, enabled: boolean = true) => {
    return useQuery({
        queryKey: ['searchCity', q, limit, threshold],
        queryFn: () => SearchServices.getCities(q,limit,threshold),
        enabled: q.length >= 1 && enabled,
        staleTime: 1000 * 60 * 3,
    })
}
// Search airports within a distance of an airport (200 miles max distance)
export const useServiceableAirportSearch = (hubs: string[], city_id: string, max_distance: number) => {
    return useQuery({
        queryKey: ['searchServiceableAirport', hubs, city_id, max_distance],
        queryFn: () => SearchServices.getServiceableAirports(hubs, city_id, max_distance),
        enabled: Boolean(city_id) && city_id.length >=1,
        staleTime: 1000 * 60 * 3,
    })
}
```
# src/api/query-client.ts
```ts
import { QueryClient } from "@tanstack/react-query"
export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 60 * 1000, // 1 minute
            gcTime: 5 * 60 * 1000, // 5 minutes
            retry: 1,
            refetchOnWindowFocus: false,
        },
        mutations: {
            retry: 1,
        },
    },
})
```
# src/api/services/amadeus/flightSearchServices.ts
```ts
import api from '@/api/api';
import { FlightAggregationRequest, FlightAggregationResponse } from '@/types';
export const AmadeusFlightServices = {
    async getAvgFlightPrices(searchParams: FlightAggregationRequest): Promise<FlightAggregationResponse> {
        const response = await api.get<FlightAggregationResponse>('/amadeus/flights/flight-offers-avg-price', {
            params: searchParams
        });
        return response.data
    }
}
```
# src/api/services/amadeus/hotelSearchServices.ts
```ts
import api from '@/api/api';
import { HotelCustomSearchRequest, HotelAggregationResponse } from '@/types';
export const AmadeusHotelServices = {
    async getAvgHotelPrices(searchParams: HotelCustomSearchRequest): Promise<HotelAggregationResponse> {
        const response = await api.get<HotelAggregationResponse>('/amadeus/hotels/hotel-offers-avg-price', {
            params: searchParams
        });
        return response.data
    }
}
```
# src/api/services/authServices.ts
```ts
import api from '../api';
import { saveToken, removeToken, getToken, isTokenExpired } from '../utils/tokenStorage';
import { 
  LoginRequest, Token, RefreshTokenRequest,
  SignupRequest, SignupResponse, ConfirmSignupRequest,
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
```
# src/api/services/guestPreferencesServices.ts
```ts
import api from '@/api/api';
import { 
  CreateGuestType, CreateGuestTypeResponse, GuestTypesResponse,
  UpdateGuestType, 
} from '@/types/Trip/subtypes'; //replace existing guesttypepreferences with what we are using here. Also add guestpreferences to trip
export const GuestPreferencesService = {
  async getAllGuestTypes(company_id: string): Promise<GuestTypesResponse> {
    const response = await api.get<GuestTypesResponse>('/guest-types', {params: {company_id}});
    return response.data;
  },
  async getGuestTypePreferences(guest_type_id: string): Promise<CreateGuestTypeResponse> {
    const response = await api.get<CreateGuestTypeResponse>(`/guest-types/${guest_type_id}`);
    return response.data;
  },
  async createGuestType(guestTypeData: CreateGuestType): Promise<CreateGuestTypeResponse> {
    const response = await api.post<CreateGuestTypeResponse>('/guest-types', {
        name: guestTypeData.name,
        company_id: guestTypeData.company_id,
        user_id: guestTypeData.user_id
    });
    return response.data;
  },
  async updateGuestTypePreferences(
    guest_type_id: string, 
    preferences: UpdateGuestType
  ): Promise<CreateGuestTypeResponse> {
    const response = await api.put<CreateGuestTypeResponse>(
      `/guest-types/${guest_type_id}`, 
      preferences
    );
    return response.data;
  },
  async deleteGuestTypePreferences(guest_type_id: string): Promise<boolean> {
    const response = await api.delete<boolean>(`/guest-types/${guest_type_id}`);
    return response.data;
  }
};
```
# src/api/services/searchServices.ts
```ts
import api from '@/api/api';
import { SearchCityResponse, SearchServiceableAirportsResponse } from '@/types';
export const SearchServices = {
    async getCities(q: string, limit: number, threshold: number): Promise<SearchCityResponse[]>  {
        const response = await api.get<SearchCityResponse[]>('/search/cities', {params: {
            q, limit, threshold
        }});
        return response.data;
    },
    async getServiceableAirports(hubs: string[], city_id: string, max_distance: number): Promise<SearchServiceableAirportsResponse[]> {
        const response = await api.get<SearchServiceableAirportsResponse[]>('/search/airport_serviceability', {params: {
            hubs, city_id, max_distance
        }});
        return response.data;
    }
}
```
# src/api/utils/tokenStorage.ts
```ts
interface Token {
    access_token: string;
    token_type: string;
    refresh_token?: string;
    id_token?: string;
    expires_in?: number;
    expiry_time?: number;
  }
export const saveToken = (token: Token): void => {
  if (token.expires_in) {
    token.expiry_time = Date.now() + token.expires_in * 1000;
  }
  localStorage.setItem('auth_token', JSON.stringify(token));
};
export const getToken = (): Token | null => {
  const tokenStr = localStorage.getItem('auth_token');
  if (!tokenStr) return null;
  try {
    return JSON.parse(tokenStr) as Token;
  } catch (error) {
    console.error('Failed to parse token from localStorage', error);
    return null;
  }
};
export const isTokenExpiringSoon = (bufferTime = 300): boolean => {
  const token = getToken()
  if (!token || !token.expiry_time) return false
  return token.expiry_time - Date.now() < bufferTime * 1000;
};
export const isTokenExpired = (): boolean => {
  const token = getToken();
  if (!token || !token.expiry_time) return false
  return token.expiry_time <= Date.now();
}
export const removeToken = (): void => {
  localStorage.removeItem('auth_token');
};
```
# src/App.tsx
```tsx
import { FC } from "react"
import { Routes, Route } from "react-router-dom"
import AuthLayout from "@/layouts/AuthLayout/AuthLayout"
import { DefaultLayout } from "@/layouts/DefaultLayout"
import GuestLayout from "@/layouts/GuestLayout/GuestLayout"
import { ConfirmationPage, DashboardPage, GuestDashboardPage, GuestExpensesPage, 
    GuestFlightsPage, GuestHotelPage, GuestInvitePage, GuestTransportPage, 
    LoginPage, RegisterPage, ReportsPage, SettingsPage
} from "@/routes"
import { RequireAuth } from "@/features/auth/RequireAuth"
import { TokenRefreshManager } from "@/features/auth/TokenRefreshManager"
const App: FC = () => {
    return (
        <>
        <TokenRefreshManager />
        
        <RequireAuth>
            <Routes>
                {/* Travel Manager Auth Routes */}
                <Route element={<AuthLayout />}>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/confirm-signup" element={<ConfirmationPage />} />
                    {/* Add other auth routes like register, forgot-password here */}
                </Route>
                {/* Protected routes */}
                <Route element={
                    <RequireAuth requireAuth={true}>
                        <DefaultLayout />
                    </RequireAuth>
                }>
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/guest-invite" element={<GuestInvitePage />} />
                    <Route path="/reports" element={<ReportsPage />} />
                    <Route path="/settings" element={<SettingsPage />} />
                </Route>
                {/* Guest Routes */}
                <Route path = "/guest" element={
                    <GuestLayout />
                }>
                    <Route path="dashboard" element={<GuestDashboardPage />} />
                    <Route path="flights" element={<GuestFlightsPage />} />
                    <Route path="hotel" element={<GuestHotelPage />} />
                    <Route path="transport" element={<GuestTransportPage />} />
                    <Route path="expenses" element={<GuestExpensesPage />} />
                </Route>
            </Routes>
        </RequireAuth>
        </>
    )
}
export default App
```
# src/components/TravelMgrPortalHeader/components/UserMenu.module.scss
```scss
.user {
    color: var(--mantine-color-black);
    padding: var(--mantine-spacing-xs) var(--mantine-spacing-sm);
    border-radius: var(--mantine-radius-sm);
    transition: background-color 100ms ease;
  
    &:hover {
      background-color: var(--mantine-color-default-hover);
    }
  }
  
  .userActive {
    background-color: var(--mantine-color-default-hover);
  }
  .dropDownLabel {
    color: var(--mantine-color-black);
    font-weight: 700;
    font-size: medium;
  }
  .dropSubLabel {
    color: var(--mantine-color-dimmed);
    font-size: small;
  }
```
# src/components/TravelMgrPortalHeader/components/UserMenu.tsx
```tsx
import { useState} from 'react'
import { Avatar, Menu, UnstyledButton } from "@mantine/core"
import cx from 'clsx';
import { useLogout } from '@/api/hooks';
import { LogOut } from "lucide-react";
import classes from './UserMenu.module.scss'
interface UserMenuProps {
    firstName: string;
    lastName: string;
    email: string;
}
export const UserMenu: React.FC<UserMenuProps> = ({firstName, lastName, email}) => {
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const handleLogout = useLogout()
  return(
    <Menu
      width={260}
      position="bottom-end"
      transitionProps={{ transition: 'pop-top-right' }}
      onClose={() => setUserMenuOpened(false)}
      onOpen={() => setUserMenuOpened(true)}
      withinPortal
    >
      <Menu.Target>
        <UnstyledButton
          className={cx(classes.user, { [classes.userActive]: userMenuOpened })}
        >
          <Avatar radius="xl" size="md">
            {`${firstName.charAt(0).toUpperCase()}${lastName.charAt(0).toUpperCase()}`}
          </Avatar>
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>
          <div className= {classes.dropDownLabel}>{`${firstName} ${lastName}`}</div>
          <div className= {classes.dropDownSubLabel}>{`${email}`}</div>
        </Menu.Label>
        <Menu.Divider />
        <Menu.Item onClick={handleLogout} leftSection={<LogOut size={16} strokeWidth={1.5} />}>
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  )
}
```
# src/components/TravelMgrPortalHeader/TravelMgrPortalHeader.module.scss
```scss
.header {
    height: 60px;
    background-color: var(--mantine-color-body);
    border-bottom: 1px solid light-dark(var(--mantine-color-gray-3), var(--mantine-color-dark-4));
    z-index: 100;
    width: 100%;
  }
  
  .headerContent {
    height: 60px;
    display: flex;
    align-items: center;
  }
  
  .logo {
    color: var(--mantine-color-blue-6);
    text-decoration: none;
    white-space: nowrap;
  }
  
  .navLink {
    display: flex;
    align-items: center;
    gap: var(--mantine-spacing-xs);
    line-height: 1;
    padding: 8px 12px;
    border-radius: var(--mantine-radius-sm);
    text-decoration: none;
    color: light-dark(var(--mantine-color-gray-7), var(--mantine-color-dark-0));
    font-size: var(--mantine-font-size-sm);
    font-weight: 500;
  
    &:not(.navLinkActive):hover {
        background-color: light-dark(var(--mantine-color-gray-0), var(--mantine-color-dark-6));
    }
  }
  
  .navLinkActive {
    color: var(--mantine-color-white);
    background-color: var(--mantine-color-blue-filled);
  }
  
  .navIcon {
    width: 20px;
    height: 20px;
  }
  
  .iconButton {
    color: var(--mantine-color-gray-6);
    
    &:hover {
      background-color: var(--mantine-color-gray-1);
    }
  }
```
# src/components/TravelMgrPortalHeader/TravelMgrPortalHeader.tsx
```tsx
import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ActionIcon, Avatar, Container, Flex, Group, Space, Text } from '@mantine/core';
import { LayoutDashboard, UserPlus, FileText, Settings, Bell } from 'lucide-react';
import { UserMenu } from './components/UserMenu';
import { useAuth } from '@/contexts/AuthContext'
import styles from './TravelMgrPortalHeader.module.scss';
const navigationItems = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/guest-invite', label: 'Guest Invite', icon: UserPlus },
    { path: '/reports', label: 'Reports', icon: FileText },
    { path: '/settings', label: 'Settings', icon: Settings },
  ];
export const TravelMgrPortalHeader: FC = () => {
  
  // get auth details
  const { authState } = useAuth();
  const companyId = authState.user?.company_id || '';
  const userFirstName = authState.user?.first_name || "";
  const userLastName = authState.user?.last_name || "";
  const email = authState.user?.email || "";
  
  const location = useLocation();
  const items = navigationItems.map(({ path, label, icon: Icon }) => (
    <Link
      key={path}
      to={path}
      className={`${styles.navLink} ${
        location.pathname === path ? styles.navLinkActive : ''
      }`}
    >
      <Icon className={styles.navIcon} size={20} />
      <span>{label}</span>
    </Link>
  ));
  return (
    <div className={styles.header}>
        <Container size="xl">
        <Flex align = "center" justify="space-between" className={styles.headerContent}>
          <Group>
            <Text size="xl" fw={700} className={styles.logo}>
              TravelPortal
            </Text>
            <Space w="sm"/>
            <Group gap={5} visibleFrom="sm">
              {items}
            </Group>
          </Group>
          <Group>
          <ActionIcon 
              variant="subtle" 
              size="lg"
              className={styles.iconButton}
            >
              <Bell size={20} />
            </ActionIcon>
            <UserMenu 
              firstName={userFirstName}
              lastName={userLastName}
              email = {email}
            />
            
          </Group>
        </Flex>
        </Container>
    </div>
  );
};
```
# src/contexts/AuthContext.tsx
```tsx
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
```
# src/features/auth/ConfirmSignup/ConfirmSignup.module.scss
```scss
.confirm {
    width: 100%;
    
    &__card {
      background-color: var(--mantine-color-body);
      border-radius: var(--mantine-radius-md);
      border: 1px solid var(--mantine-color-default-border);
      padding: var(--mantine-spacing-xl);
      box-shadow: var(--mantine-shadow-md);
    }
    
    &__title {
      font-size: 1.5rem;
      font-weight: 600;
      margin-bottom: var(--mantine-spacing-lg);
    }
    
    &__form {
      display: flex;
      flex-direction: column;
      gap: var(--mantine-spacing-md);
    }
    
    &__field {
      display: flex;
      flex-direction: column;
      gap: var(--mantine-spacing-xs);
    }
    &__namegroup {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--mantine-font-size-md);
  
      @media (max-width: 640px) {
        grid-template-columns: 1fr;
      }
    }
    
    &__footer {
      margin-top: var(--mantine-spacing-lg);
      text-align: center;
      font-size: 0.875rem;
      color: var(--mantine-color-dimmed);
    }
    
    &__link {
      color: var(--mantine-color-anchor);
      text-decoration: none;
      font-weight: 500;
      
      &:hover {
        text-decoration: underline;
      }
    }
  }
```
# src/features/auth/ConfirmSignup/ConfirmSignup.tsx
```tsx
import { FC, useEffect } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from 'react-router-dom';
import { Alert, Button, Text, TextInput } from '@mantine/core';
import { useConfirmSignup } from "@/api/hooks/useAuth"
import { ConfirmSignupRequest } from "@/types";
import { CircleAlert } from 'lucide-react'
import classes from "./ConfirmSignup.module.scss"
export const ConfirmSignup: FC = () => {
    const navigate = useNavigate();
    const { mutate, isPending, error } = useConfirmSignup();
    const defaultEmail = sessionStorage.getItem('signupEmail') || '';
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<ConfirmSignupRequest>({
        defaultValues: {
            email: defaultEmail
        }
    });
     // Pre-fill email if we have it
    useEffect(() => {
        if (defaultEmail) {
        setValue('email', defaultEmail);
        }
    }, [defaultEmail, setValue]);
    const onSubmit = (data: ConfirmSignupRequest) => {
        mutate(data);
    };
    // Redirect to signup if we don't have an email
    useEffect(() => {
        if (!defaultEmail) {
        navigate('/register', { 
            state: { 
            message: 'Please sign up before confirming your account' 
            } 
        });
        }
    }, [defaultEmail, navigate]);
    return (
        <div className={classes.confirm}>
            <div className={classes.confirm__card}>
                <h1 className={classes.confirm__title}>Confirm your account</h1>
                <Text size="md" c="dimmed">
                    We've sent a confirmation code to your email. Please enter it below to verify your account.
                </Text>
                {error && (
                    <Alert 
                        icon={<CircleAlert size="1rem" />} 
                        title="Error" 
                        color="red" 
                        mb="md"
                    >
                        {(error as Error).message}
                    </Alert>
                )}
                <form onSubmit={handleSubmit(onSubmit)} className={classes.confirm__form}>
                    <Text fw={700} c="dimmed">Personal Information</Text>
                    <div className={classes.confirm__field}>
                        <TextInput
                            label="Email"
                            placeholder={defaultEmail}
                            disabled
                            value={defaultEmail}
                            error={errors.email?.message}
                            {...register('email', { 
                                required: 'Email is required',
                                pattern: {
                                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                  message: 'Invalid email address'
                                }
                            })}
                        />
                    </div>
                    <div className={classes.confirm__field}>
                        <TextInput
                            label="Confirmation Code"
                            required
                            withAsterisk
                            placeholder="Enter code sent to your email"
                            error={errors.confirmation_code?.message}
                            {...register('confirmation_code', { 
                                required: 'Confirmation code is required' 
                              })}
                        />
                    </div>   
                    
                    <Button 
                        type="submit"
                        fullWidth
                        disabled={isPending}
                    >
                        {isPending ? 'Verifying...' : 'Verify Account'}
                    </Button>
                </form>
                
                <div className={classes.confirm__footer}>
                    <span>Didn't Recieve a Code? </span>
                    <a 
                        //Feature is not yet implemented
                        //href="/login" 
                        className={classes.confirm__link}
                    >
                        Resend Code
                    </a>
                </div>
            </div>
        </div>
    )
}
```
# src/features/auth/Login/Login.module.scss
```scss
.login {
    width: 100%;
    
    &__card {
      background-color: var(--mantine-color-body);
      border-radius: var(--mantine-radius-md);
      border: 1px solid var(--mantine-color-default-border);
      padding: var(--mantine-spacing-xl);
      box-shadow: var(--mantine-shadow-md);
    }
    
    &__title {
      font-size: 1.5rem;
      font-weight: 600;
      margin-bottom: var(--mantine-spacing-lg);
    }
    
    &__form {
      display: flex;
      flex-direction: column;
      gap: var(--mantine-spacing-md);
    }
    
    &__field {
      display: flex;
      flex-direction: column;
      gap: var(--mantine-spacing-xs);
    }
    
    &__footer {
      margin-top: var(--mantine-spacing-lg);
      text-align: center;
      font-size: var(--mantine-font-size-sm);
      color: var(--mantine-color-dimmed);
    }
    
    &__link {
      color: var(--mantine-color-anchor);
      text-decoration: none;
      font-weight: 500;
      
      &:hover {
        text-decoration: underline;
      }
    }
  }
```
# src/features/auth/Login/Login.tsx
```tsx
import { useForm } from "react-hook-form"
import { useLocation } from "react-router-dom"
import { LoginRequest } from "@/types"
import { useLogin } from "@/api/hooks/useAuth"
import { Alert, Button, PasswordInput, TextInput } from '@mantine/core';
import { CircleAlert } from 'lucide-react'
import classes from "./Login.module.scss"
export const Login = () => {
    const location = useLocation()
    const message = location.state?.message
    const { mutate, isPending, error } = useLogin()
    const { register, handleSubmit, formState: { errors } } = useForm<LoginRequest>()
    
    const onSubmit = (data: LoginRequest) => {
        mutate(data)
    }
    return (
        <div className={classes.login}>
            <div className={classes.login__card}>
                <h1 className={classes.login__title}>Sign in to your account</h1>
                {message && (
                    <Alert color="green" mb="md">
                        {message}
                    </Alert>
                )}
                {error && (
                    <Alert 
                        icon={<CircleAlert size="1rem" />} 
                        title="Error" 
                        color="red" 
                        mb="md"
                    >
                        {(error as Error).message}
                    </Alert>
                )}
                <form onSubmit={handleSubmit(onSubmit)} className={classes.login__form}>
                    <div className={classes.login__field}>
                        <TextInput
                            label="Email"
                            placeholder="you@example.com"
                            required
                            autoComplete="email"
                            error={errors.username?.message}
                            {...register('username', { 
                                required: 'Email is required',
                                pattern: {
                                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                  message: 'Invalid email address'
                                }
                            })}
                        />
                    </div>
                    
                    <div className={classes.login__field}>
                        <PasswordInput
                            label="Password"
                            placeholder="your password"
                            required
                            autoCapitalize="current-password"
                            error={errors.password?.message}
                            {...register('password', { 
                                required: 'Password is required' 
                              })}
                        />
                    </div>
                    
                    <Button 
                        fullWidth
                        type="submit"
                        disabled={isPending}
                    >
                        {isPending ? 'Logging in...' : 'Log In'}
                    </Button>
                </form>
                
                <div className={classes.login__footer}>
                    <span>Don't have an account? </span>
                    <a href="/register" className={classes.login__link}>Sign up</a>
                </div>
            </div>
        </div>
    )
}
```
# src/features/auth/Register/Register.module.scss
```scss
.register {
    width: 100%;
    
    &__card {
      background-color: var(--mantine-color-body);
      border-radius: var(--mantine-radius-md);
      border: 1px solid var(--mantine-color-default-border);
      padding: var(--mantine-spacing-xl);
      box-shadow: var(--mantine-shadow-md);
    }
    
    &__title {
      font-size: 1.5rem;
      font-weight: 600;
      margin-bottom: var(--mantine-spacing-lg);
    }
    
    &__form {
      display: flex;
      flex-direction: column;
      gap: var(--mantine-spacing-md);
    }
    
    &__field {
      display: flex;
      flex-direction: column;
      gap: var(--mantine-spacing-xs);
    }
    &__namegroup {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--mantine-spacing-md);
  
      @media (max-width: 640px) {
        grid-template-columns: 1fr;
      }
    }
    
    &__footer {
      margin-top: var(--mantine-spacing-lg);
      text-align: center;
      font-size: var(--mantine-font-size-sm);
      color: var(--mantine-color-dimmed);
    }
    
    &__link {
      color: var(--mantine-color-anchor);
      text-decoration: none;
      font-weight: 500;
      
      &:hover {
        text-decoration: underline;
      }
    }
  }
```
# src/features/auth/Register/Register.tsx
```tsx
import { FC } from "react"
import { useForm } from "react-hook-form"
import { Alert, Button, PasswordInput, Text, TextInput } from '@mantine/core';
import { useSignup } from "@/api/hooks/useAuth"
import { SignupRequest, SignupFormData } from "@/types";
import { CircleAlert } from 'lucide-react'
import classes from "./Register.module.scss"
export const Register: FC = () => {
    const { mutate, isPending, error } = useSignup();
    const { register, handleSubmit, watch, formState: { errors } } = useForm<SignupFormData>();
    const password = watch('password', '');
    const onSubmit = (data: SignupFormData) => {
        
        if (!data.company) {
            data.company = {};
        }
        // if (!data.company.location) {
        //     data.company.location = "Not specified";
        // }
        // Store password temporarily for auto-login after confirmation
        sessionStorage.setItem('tempPassword', data.password);
        const signupData: SignupRequest = {
            email: data.email,
            password: data.password,
            first_name: data.first_name,
            last_name: data.last_name,
            company: {
                name: data.company?.name,
                street: data.company?.street,
                city: data.company?.city,
                state: data.company?.state,
                country: data.company?.country,
                postal_code: data.company?.postal_code
            }
          };
        mutate(signupData);
    };
    return (
        <div className={classes.register}>
            <div className={classes.register__card}>
                <h1 className={classes.register__title}>Create a new account</h1>
                {error && (
                    <Alert 
                        icon={<CircleAlert size="1rem" />} 
                        title="Error" 
                        color="red" 
                        mb="md"
                    >
                        {(error as Error).message}
                    </Alert>
                )}
                <form onSubmit={handleSubmit(onSubmit)} className={classes.register__form}>
                    <Text fw={700} c="dimmed">Personal Information</Text>
                    <div className={classes.register__namegroup}>
                        <div className={classes.register__field}>
                            <TextInput
                                label="First Name"
                                placeholder="Enter first name"
                                required
                                withAsterisk
                                error={errors.first_name?.message}
                                {...register('first_name', { required: 'First name is required' })}
                            />
                        </div>
                        <div className={classes.register__field}>
                            <TextInput
                                label="Last Name"
                                placeholder="Enter last name"
                                required
                                withAsterisk
                                error={errors.last_name?.message}
                                {...register('last_name', { required: 'Last name is required' })}
                            />
                        </div>
                    </div>
                    <div className={classes.register__field}>
                        <TextInput
                            label="Email"
                            placeholder="you@example.com"
                            required
                            withAsterisk
                            error={errors.email?.message}
                            {...register('email', { 
                                required: 'Email is required',
                                pattern: {
                                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                  message: 'Invalid email address'
                                }
                            })}
                        />
                    </div>
                    <div className={classes.register__field}>
                        <PasswordInput
                            label="Password"
                            placeholder="your password"
                            required
                            withAsterisk
                            error={errors.password?.message}
                            {...register('password', { 
                                required: 'Password is required',
                                minLength: {
                                  value: 8,
                                  message: 'Password must be at least 8 characters'
                                },
                                validate: {
                                  hasUpperCase: (value) => 
                                    /[A-Z]/.test(value) || 'Password must contain at least one uppercase letter',
                                  hasLowerCase: (value) => 
                                    /[a-z]/.test(value) || 'Password must contain at least one lowercase letter',
                                  hasNumber: (value) => 
                                    /[0-9]/.test(value) || 'Password must contain at least one number'
                                }
                              })}
                        />
                    </div>
                    <div className={classes.register__field}>
                        <PasswordInput
                            label="Confirm Password"
                            placeholder="confirm your password"
                            required
                            withAsterisk
                            error={errors.confirmPassword?.message}
                            {...register('confirmPassword', { 
                                validate: (value) => value === password || 'The passwords do not match'
                              })}
                        />
                    </div>
                    <Text fw={700} c="dimmed">Company Information</Text>
                    <div className={classes.register__field}>
                        <TextInput
                            label="Company Name"
                            required
                            withAsterisk
                            placeholder="Enter name of company"
                            error={errors.company?.name?.message}
                            {...register('company.name', { 
                                required: 'Company name is required' 
                              })}
                        />
                    </div>
                    <div className={classes.register__field}>
                        <TextInput
                            label="Street Address"
                            required
                            withAsterisk
                            placeholder="Street Address"
                            error={errors.company?.street?.message}
                            {...register('company.street', { 
                                required: 'Street address is required' 
                              })}
                        />
                    </div>
                    <div className={classes.register__field}>
                        <TextInput
                            label="City"
                            required
                            withAsterisk
                            placeholder="City"
                            error={errors.company?.city?.message}
                            {...register('company.city', { 
                                required: 'City is required' 
                              })}
                        />
                    </div>
                    <div className={classes.register__field}>
                        <TextInput
                            label="Postal Code"
                            required
                            withAsterisk
                            placeholder="Postal Code"
                            error={errors.company?.postal_code?.message}
                            {...register('company.postal_code', { 
                                required: 'Postal code is required' 
                              })}
                        />
                    </div>
                    <div className={classes.register__namegroup}>
                        <div className={classes.register__field}>
                            <TextInput
                                label="State"
                                required
                                withAsterisk
                                placeholder="State"
                                error={errors.company?.state?.message}
                                {...register('company.state', { 
                                    required: 'State is required' 
                                  })}
                            />
                        </div>
                        <div className={classes.register__field}>
                            <TextInput
                                label="Country"
                                required
                                withAsterisk
                                placeholder="Country"
                                error={errors.company?.country?.message}
                                {...register('company.country', { 
                                    required: 'Country is required' 
                                  })}
                            />
                        </div>
                    </div>
                    
                    
                    <Button 
                        type="submit"
                        fullWidth
                        loading={isPending}
                    >
                        {isPending ? 'Creating Account...' : 'Create Account'}
                    </Button>
                </form>
                
                <div className={classes.register__footer}>
                    <span>Have an account? </span>
                    <a href="/login" className={classes.register__link}>Sign in</a>
                </div>
            </div>
        </div>
    )
}
```
# src/features/auth/RequireAuth.tsx
```tsx
import { Navigate, useLocation } from "react-router-dom"
import { useAuth } from "@/contexts/AuthContext"
interface RequireAuthProps {
    children: React.ReactNode
    requireAuth?: boolean
}
export const RequireAuth: React.FC<RequireAuthProps> = ({ children, requireAuth = false } ) => {
    const location = useLocation()
    const { authState } = useAuth()
    if (requireAuth && !authState.isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />
    }
return <>{children}</>
}
```
# src/features/auth/TokenRefreshManager.tsx
```tsx
import { useEffect, useState } from 'react';
import { AuthService } from '@/api/services/authServices';
import { getToken, isTokenExpiringSoon } from '@/api/utils/tokenStorage';
// Time in seconds to check token status
const CHECK_INTERVAL = 60;
// Events to track for user activity
const ACTIVITY_EVENTS = ['mousedown', 'keydown', 'scroll', 'touchstart'];
export const TokenRefreshManager: React.FC = () => {
  const [lastActivity, setLastActivity] = useState<number>(Date.now());
  // Track user activity
  const handleUserActivity = () => {
    setLastActivity(Date.now());
  };
  useEffect(() => {
    // Register activity event listeners
    ACTIVITY_EVENTS.forEach(event => {
      window.addEventListener(event, handleUserActivity);
    });
    // Periodic check for token status
    const intervalId = setInterval(async () => {
      const token = getToken();
      
      // If user is active and token is about to expire, refresh it
      const isUserActive = Date.now() - lastActivity < 30 * 60 * 1000; // 30 minutes
      
      if (token && isUserActive && isTokenExpiringSoon()) {
        try {
          await AuthService.refreshToken();
        } catch (error) {
          console.error('Failed to refresh token:', error);
        }
      }
    }, CHECK_INTERVAL * 1000);
    // Cleanup
    return () => {
      ACTIVITY_EVENTS.forEach(event => {
        window.removeEventListener(event, handleUserActivity);
      });
      clearInterval(intervalId);
    };
  }, [lastActivity]);
  // This component doesn't render anything
  return null;
};
```
# src/features/travel-manager-portal/Dashboard/components/CurrentTripsTable/CurrentTripsTable.module.scss
```scss
.th {
    padding: 0;
  }
  
  .control {
    width: 100%;
    padding: var(--mantine-spacing-xs) var(--mantine-spacing-md);
  
    @mixin hover {
      background-color: light-dark(var(--mantine-color-gray-0), var(--mantine-color-dark-6));
    }
  }
  
  .iconArrow {
    width: 18px;
    height: 18px;
    border-radius: 18px;
    color: var(--mantine-color-gray-6)
  }
  .icon {
    width: 15px;
    height: 15px;
    //border-radius: 15px;
    color: var(--mantine-color-gray-6)
  }
```
# src/features/travel-manager-portal/Dashboard/components/CurrentTripsTable/CurrentTripsTable.tsx
```tsx
import { useState } from 'react';
import { ArrowRight, Calendar, Clock, Mail, MapPin, Search } from 'lucide-react';
import { Anchor, Badge, Center, Flex, Group, Pagination, ScrollArea, Space, Stack, Table, Text, TextInput } from '@mantine/core';
import { calculateTripLength, formatStartDate, formatEndDate } from '@/lib/utils';
import { Trip } from '@/types';
import classes from './CurrentTripsTable.module.scss';
interface ProcessedTripData {
    id: string;
    guestName: string;
    guestEmail: string;
    tripStartDate: string;
    tripEndDate: string;
    tripLength: string;
    tripType: string;
    tripStatus: string;
    origin?: string;
    destination?: string;
    tripCost: string;
}
interface ThProps {
  children: React.ReactNode;
}
interface CurrentTripsTableProps {
    trips: Trip[];
}
const processTripsData = (trips: Trip[]): ProcessedTripData[] => {
    return trips.map((trip: Trip) =>{
        const tripStartDate = formatStartDate(trip.itinerary.startDate)
        const tripEndDate = formatEndDate(trip.itinerary.endDate)
        const tripLength = calculateTripLength(trip).toString()
        const tripCost = (trip.actualSpend|| 0).toString()
        const id = trip.id
        return{
            id,
            guestName: (`${trip.guest.firstName} ${trip.guest.lastName}`),
            guestEmail: trip.guest.email,
            tripStartDate,
            tripEndDate,
            tripLength,
            tripType: trip.guestType,
            tripStatus: trip.status,
            origin: trip.itinerary.origin,
            destination: trip.itinerary.destination,
            tripCost,
        }
    })
}
function Th({ children}: ThProps) {
  return (
    <Table.Th className={classes.th}>
        <Group justify="space-between">
          <Text fw={500} fz="sm">
            {children}
          </Text>
          <Center className={classes.icon}>
          </Center>
        </Group>
    </Table.Th>
  );
}
function filterData(data: ProcessedTripData[], search: string) {
    const query = search.toLowerCase().trim();
    const searchableFields: (keyof ProcessedTripData)[] = [
        'guestName',
        'guestEmail',
        'tripStartDate',
        'tripEndDate',
        'tripLength',
        'tripType',
        'tripStatus',
        'origin',
        'destination',
      ];
    return data.filter((item) =>
        searchableFields.some((key) => {
            const value = item[key];
            return value ? value.toLowerCase().includes(query): false;
        })
    );
  }
export const CurrentTripsTable = ({ trips }: CurrentTripsTableProps) => {
    const processedTrips = processTripsData(trips);
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
  
    const ITEMS_PER_PAGE = 10;
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.currentTarget;
        setSearch(value);
        setCurrentPage(1); //Reset to first page when searching
    };
    // Filter data based on search
    const filteredData = filterData(processedTrips, search);
    // Calculate pagination
    const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
    const paginatedData = filteredData.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );
    const rows = paginatedData.map((row) => (
        <Table.Tr key={row.guestName}>
            <Table.Td>
            <Flex justify="space-between">
                <div>
                    <Group wrap="nowrap" gap="sm">
                        <Text size="md" fw={500}>{row.guestName}</Text>
                        <Badge variant="light">{row.tripType}</Badge>
                    </Group>
                    <Space h="xs"/>
                    <Group wrap="nowrap" gap="xl">
                        <div>
                            <Group wrap="nowrap" gap="xs">
                                <Mail className={classes.icon}/>
                                <Text size ="sm" c="dimmed">{row.guestEmail}</Text>
                            </Group>
                            <Space h="xs"/>
                            <Group wrap="nowrap" gap="xs">
                                <MapPin className={classes.icon}/>
                                <Text c="dimmed" size="sm" fw={500}>{row.origin}</Text>    
                                <ArrowRight className={classes.iconArrow} />
                                <Text c="dimmed" size="sm" fw={500}>{row.destination}</Text>
                            </Group>
                        </div>
                        <div>
                            <Group wrap="nowrap" gap="xs">
                                <Calendar className={classes.icon}/>
                                <Text c="dimmed" size="sm" fw={500}>{`${row.tripStartDate} - ${row.tripEndDate}`}</Text>
                            </Group>  
                            <Space h="xs"/>
                            <Group wrap="nowrap" gap="xs">
                                <Clock className={classes.icon} />
                                <Text c="dimmed" size="sm" fw={500}>{`${row.tripLength} days`}</Text>
                            </Group>
                        </div>
                    </Group>
                    <Space h="xs"/>
                    <Anchor 
                        href={`/trips/${row.id}`}
                        underline="hover"
                        fz="sm">
                        View Details
                    </Anchor>
                </div>
                <div>
                    <Stack align="flex-end" justify="flex-start" gap ="xs">
                    <Text size="lg" fw={500}>
                        ${row.tripCost}
                    </Text>
                    <Badge 
                        variant={row.tripStatus === 'In Progress' ? "transparent" : "light"}
                        size = "lg"
                        color={
                            row.tripStatus === 'Upcoming' ? 'green' : 
                            row.tripStatus === 'Pending' ? 'yellow' : 
                            'default'
                        }>
                        {row.tripStatus}
                    </Badge>
                    </Stack>
                </div>
                </Flex>
            </Table.Td>
        </Table.Tr>
    ));
  return (
    <ScrollArea>
        <TextInput
            placeholder="Search by any field"
            mb="md"
            leftSection={<Search size={16} strokeWidth={1.5} />}
            value={search}
            onChange={handleSearchChange}
        />
        <Table.ScrollContainer minWidth={1000}>
        <Table horizontalSpacing="md" verticalSpacing="sm" miw={700}  highlightOnHover>
            <Table.Tbody>
            <Table.Tr>
                <Th>Guest</Th>
            </Table.Tr>
            </Table.Tbody>
            <Table.Tbody>
            {paginatedData.length > 0 ? (
                rows
            ) : (
                <Table.Tr>
                <Table.Td colSpan={Object.keys(processedTrips[0]).length}>
                    <Text fw={500} ta="center">
                    Nothing found
                    </Text>
                </Table.Td>
                </Table.Tr>
            )}
            </Table.Tbody>
        </Table>
        </Table.ScrollContainer>
            <Group justify="space-between" mt="md">
            <Text size="sm">
                Showing {Math.min(paginatedData.length, ITEMS_PER_PAGE)} of {filteredData.length} trips
            </Text>
            <Pagination
                value={currentPage}
                onChange={setCurrentPage}
                total={totalPages}
                size="sm"
            />
      </Group>
    </ScrollArea>
  );
}
```
# src/features/travel-manager-portal/Dashboard/components/StatsCard/StatsCard.module.scss
```scss
.stats-card {  
    &__icon {
        color: var(--mantine-color-gray-6);
      &--warning {
        color: var(--mantine-color-orange-6);
      }
    }
}
```
# src/features/travel-manager-portal/Dashboard/components/StatsCard/StatsCard.tsx
```tsx
import React from 'react';
import { Card, Group, Text } from '@mantine/core';
import { LucideIcon } from 'lucide-react';
import styles from './StatsCard.module.scss';
interface StatsCardProps {
    cardTitle: string;
    icon: LucideIcon;
    guestCount: number;
    quickStat: string;
}
export const StatsCard: React.FC<StatsCardProps> = ({cardTitle, icon: Icon, guestCount, quickStat}) => {
    return(
        <Card shadow ="xs" padding="lg" radius="md" withBorder>
            <Card.Section inheritPadding>
            <Group justify="space-between" mt="md" mb="xs">
                <Text size ="lg" fw={700}>{cardTitle}</Text>
                <Icon size = {16} className={cardTitle === "Requires Attention" ? styles["stats-card__icon--warning"] : styles["stats-card__icon"]} />
            </Group>
            </Card.Section>
            <Text size = "xl" fw={700}>
                {guestCount}
            </Text>
            <Text size="sm" c={cardTitle === "Requires Attention" ? "orange" : "dimmed"}>
                {quickStat}
            </Text>
        </Card>
    )
}
```
# src/features/travel-manager-portal/Dashboard/Dashboard.scss
```scss
.dashboard {
    &__stats {
      display: grid;
      grid-template-columns: 1fr;
      gap: 24px;
      margin-bottom: 32px;
  
      @media (min-width: 768px) {
        grid-template-columns: repeat(3, 1fr);
      }
    }
  
    &__trips {
      margin-bottom: 32px;
    }
  }
  
  .trips-header {
    display: flex;
    flex-direction: column;
    gap: 16px;
  
    @media (min-width: 640px) {
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }
  }
```
# src/features/travel-manager-portal/Dashboard/dashboard.tsx
```tsx
import { Clock, UserCheck, AlertCircle, UserPlus } from 'lucide-react';
import { Button, Card, Space, Text } from '@mantine/core'
import { StatsCard } from './components/StatsCard/StatsCard';
import { getSampleTripData } from '../utils/getSampleTripData';
import { TravelMgrPageLayout } from '@/layouts';
import { calculateStats } from './utils/calculateStats';
import { CurrentTripsTable } from './components/CurrentTripsTable/CurrentTripsTable';
import './Dashboard.scss';
const Dashboard = () => {
  const tripData = getSampleTripData();
  const stats = calculateStats(tripData);
  const actionButton = (
    <Button 
      variant="filled"
      onClick={() => window.location.href = '/guest-invite'}
      leftSection={<UserPlus size={14} />}
    >
      <span>New Guest Invite</span>
    </Button>
  );
  return (
    <TravelMgrPageLayout
      title="Welcome back, Sarah"
      subtitle="Manage your guest travel arrangements"
      action={actionButton}
    >
        <div className="dashboard__stats">
          <StatsCard 
            cardTitle="Upcoming Trips" 
            icon={Clock} 
            guestCount={stats.upcoming} 
            quickStat={`Next arrival in ${stats.nextArrivalIn} days`}
          />
          
          <StatsCard 
            cardTitle="Active Trips" 
            icon={UserCheck} 
            guestCount={stats.active} 
            quickStat={`${stats.checkingOutToday} checking out today`}
          />
          <StatsCard 
            cardTitle="Requires Attention" 
            icon={AlertCircle} 
            guestCount={stats.requiresAttention} 
            quickStat="Flight delays detected"
          />
          
        </div>
        <Card shadow ="xs" padding="lg" radius="md" withBorder>
            <Text size ="lg" fw={700}>
              Current Trips
            </Text>
            <Text size ="md" c="dimmed">
              Overview of all upcoming and active travel arrangements
            </Text>
            <Space h="md"/>
            <CurrentTripsTable trips={tripData}/>
        </Card>
    </TravelMgrPageLayout>
  );
};
export default Dashboard;
```
# src/features/travel-manager-portal/Dashboard/utils/calculateStats.ts
```ts
import { Trip } from '@/types';
export const calculateStats = (trips: Trip[]) => {
    const now = new Date();
    
    const stats = {
        upcoming: 0,
        active: 0,
        requiresAttention: 0,
        nextArrivalIn: null as number | null,
        checkingOutToday: 0
    };
    trips.forEach(trip => {
        const tripStartDate = new Date(trip.itinerary.startDate);
        const tripEndDate = new Date(trip.itinerary.endDate);
        
        // Calculate upcoming trips
        if (tripStartDate > now) {
            stats.upcoming++;
            
            // Calculate days until next arrival
            const daysUntilArrival = Math.ceil(
                (tripStartDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
            if (stats.nextArrivalIn === null || daysUntilArrival < stats.nextArrivalIn) {
            stats.nextArrivalIn = daysUntilArrival;
            }
        }
        
        // Calculate active trips
        if (tripStartDate <= now && tripEndDate >= now) {
            stats.active++;
            
            // Calculate checking out today
            if (tripEndDate.toDateString() === now.toDateString()) {
            stats.checkingOutToday++;
            }
        }
        
        // Calculate trips requiring attention
        if (trip.status === 'delayed') {
            stats.requiresAttention++;
        }
    });
    return stats;
  };
```
# src/features/travel-manager-portal/GuestInvite/components/EstimatedBudget/EstimatedBudget.module.scss
```scss
.budgetItem {
  &__title{
    font-size: var(--mantine-font-size-md);
    color: var(--mantine-color-text);
    margin-bottom: 10px;
  }
  
  &__label {
    font-size: var(--mantine-font-size-sm);
    color: var(--mantine-color-dimmed);
  }
  &__value {
    font-size: var(--mantine-font-size-xl);
    font-weight: 700;
    color: var(--mantine-color-blue-6);
    //margin-top: 4px;
  }
  &__card{
    background-color: var(--mantine-color-gray-0);
    padding: var(--mantine-spacing-xs);
    align-items: center;
    margin-bottom: 10px;
  }
}
.navLink{
  &__label{
    font-size: var(--mantine-font-size-sm);
    color: var(--mantine-color-blue-6);
    
  }
  &__root{
    padding: 5px;
  }
  &__chevron{
    color: var(--mantine-color-blue-6);
  }
}
.th{
  font-size: var(--mantine-font-size-xs);
  font-weight: 500;
}
.Tbody{
  font-size: var(--mantine-font-size-xs);
}
```
# src/features/travel-manager-portal/GuestInvite/components/EstimatedBudget/EstimatedBudget.tsx
```tsx
import { useState, useEffect } from 'react';
import { Card, Divider, Loader, Stack, Text } from '@mantine/core'
import { useAvgFlightPriceSearch, useAvgHotelPriceSearch } from '@/api/hooks';
import { EstimatedFlights } from './EstimatedFlights';
import { EstimatedHotels } from './EstimatedHotel';
import { FlightAggregationRequest, HotelCustomSearchRequest, HotelRating, Trip } from '@/types'
import classes from './EstimatedBudget.module.scss';
interface EstimateBudgetProps {
  formData: Trip;
}
export const EstimatedBudget: React.FC<EstimateBudgetProps> = ({formData}) => {
  const [ flightSearch, setFlightSearch ] = useState<FlightAggregationRequest>()
  const [ hotelSearch, setHotelSearch ] = useState <HotelCustomSearchRequest>()
  // Format date to YYYY-MM-DD string
  const formatDateToString = (date: Date | null): string => {
    if (!date) return '';
    return date.toISOString().split('T')[0];
  };
  const getNumbersUptoFive = (minRating: number): HotelRating[] => {
    const result: HotelRating[] = [];
    for(let i = minRating; i<=5; i++) {
      result.push(String(i) as HotelRating)
    }
    return result;
  }
  
  useEffect(() => {
    if(
      formData.itinerary.origin.searchedAirports && 
      formData.itinerary.destination.searchedAirports &&
      formData.itinerary.startDate &&
      formData.itinerary.endDate &&
      formData.itinerary.origin.searchedAirports?.length > 0 &&
      formData.itinerary.destination.searchedAirports?.length > 0 
    ){
      const newFlightSearch: FlightAggregationRequest = {
        originLocationCodes: formData.itinerary.origin.searchedAirports,
        destinationLocationCodes: formData.itinerary.destination.searchedAirports,
        departureDate: formatDateToString(formData.itinerary.startDate),
        returnDate: formatDateToString(formData.itinerary.endDate),
        adults: 1,
        travelClass: formData.travelPreferences.flight.cabinClass,
        currencyCode: 'USD',
        //arrival_time_window_end: formData.itinerary.startDate.toISOString().slice(0,-5),
        //return_departure_time_window_start: formData.itinerary.endDate.toISOString().slice(0,-5),
        max_stops: formData.travelPreferences.flight.maxStops
      }
      const newHotelSearch: HotelCustomSearchRequest = {
        latitude: formData.itinerary.destination.city.lat,
        longitude: formData.itinerary.destination.city.lng,
        radius: 3,
        ratings: getNumbersUptoFive(formData.travelPreferences.hotel.minimumRating as number),
        checkInDate: formatDateToString(formData.itinerary.startDate),
        checkOutDate: formatDateToString(formData.itinerary.endDate)
      }
      setFlightSearch(newFlightSearch)
      setHotelSearch(newHotelSearch)
    }
  }, [formData.itinerary, formData.travelPreferences])
  
  const { data: flightData, isPending: flightIsPending, error: flightError } = useAvgFlightPriceSearch(flightSearch)
  const { data: hotelData, isPending: hotelIsPending, error: hotelError } = useAvgHotelPriceSearch(hotelSearch)
  return (
    <Card  shadow='xs' padding='md' radius='md' withBorder>
        <Text size ="lg" fw={700}>Estimated Budget</Text>
        {flightSearch ? (
          <Stack align='stretch' justify='center' gap='md'>
            <div className={classes.budgetItem}>
              <div className={classes.budgetItem__title}>Flight Pricing</div>
              {flightData 
                ? (
                  <EstimatedFlights 
                    flightData={flightData}
                  />
                ) : (
                  flightIsPending
                ) ? (
                  <Loader type = "dots"/>
                ) : (
                flightError
                ) ? (
                  <div>{flightError.message}</div>
                ) : (
                  <></>
                )
              }
            </div>
            <Divider/>
            <div className={classes.budgetItem}>
              <div className={classes.budgetItem__title}>Hotel Pricing</div>
              {hotelData
                ? (
                  <EstimatedHotels
                    hotelData={hotelData}
                  />
                ) : (
                  hotelIsPending
                ) ? (
                  <Loader type = "dots"/>
                ) : (
                hotelError
                ) ? (
                  <div>{hotelError.message}</div>
                ) : (
                  <></>
                )
              }
            </div>
            <Divider/>
            <div className={classes.budgetItem}>
              <div className={classes.budgetItem__title}>Total Estimate</div>
              <div className={classes.budgetItem__value}>{`$${Math.round((flightData?.overall_average_price || 0)+(hotelData?.overall_average_total_price || 0))}`}</div>
            </div>
          </Stack>
        ) : 
        <div>
          <Text> Please provide origin, destination, and meeting times to see pricing data</Text>
        </div>
        }
    </Card>
  );
};
```
# src/features/travel-manager-portal/GuestInvite/components/EstimatedBudget/EstimatedFlights.module.scss
```scss
.budgetItem {
    
    &__label {
      font-size: var(--mantine-font-size-sm);
      color: var(--mantine-color-dimmed);
    }
  
    &__value {
      font-size: var(--mantine-font-size-xl);
      font-weight: 700;
      color: var(--mantine-color-blue-6);
    }
  
    &__card{
      background-color: var(--mantine-color-gray-0);
      padding: var(--mantine-spacing-xs);
      align-items: center;
      margin-bottom: 10px;
    }
  
  }
  
  .navLink{
    &__label{
      //padding: var(--mantine-spacing-xs);
      font-size: var(--mantine-font-size-sm);
      color: var(--mantine-color-blue-6);
      
    }
    &__root{
      //height: 30px;
      padding: 5px;
    }
  
    &__chevron{
      color: var(--mantine-color-blue-6);
    }
  }
  
  .th{
    font-size: var(--mantine-font-size-xs);
    font-weight: 500;
  }
  .Tbody{
    font-size: var(--mantine-font-size-xs);
  }
```
# src/features/travel-manager-portal/GuestInvite/components/EstimatedBudget/EstimatedFlights.tsx
```tsx
import { Card, Group, NavLink, Table } from '@mantine/core'
import { FlightAggregationResponse } from '@/types'
import classes from './EstimatedFlights.module.scss'
interface EstimateBudgetProps {
  flightData: FlightAggregationResponse;
}
export const EstimatedFlights: React.FC<EstimateBudgetProps> = ({flightData}) => {
    const rows = flightData?.pair_statistics.map((flights) => (
        <Table.Tr key={`${flights.origin}-${flights.destination}`}>
          <Table.Td>{`${flights.origin}-${flights.destination}`}</Table.Td>
          <Table.Td>{`$${Math.round(flights.average_price)}`}</Table.Td>
          <Table.Td>{`$${Math.round(flights.min_price)}`}</Table.Td>
          <Table.Td>{`$${Math.round(flights.max_price)}`}</Table.Td>
          <Table.Td>{flights.flight_count}</Table.Td>
        </Table.Tr>
      ))
    return(
        <div>
            <Group gap="xl">
                <Card className={classes.budgetItem__card}>
                    <div className={classes.budgetItem__value}>{`$${Math.round(flightData.overall_average_price)}`}</div>
                    <div className={classes.budgetItem__label}>avg. price</div>
                </Card>
                <Card className={classes.budgetItem__card}>
                    <div className={classes.budgetItem__value}>{`${Math.round(flightData.total_flights)}`}</div>
                    <div className={classes.budgetItem__label}>total flights</div>
                </Card>
                </Group>
            <NavLink
                //href="#required-for-focus"
                label='Pricing Details'
                childrenOffset={0}
                classNames={{root: classes.navLink__root, label: classes.navLink__label, chevron: classes.navLink__chevron}}
                //leftSection={<ChevronRight size={12} strokeWidth={1.5} className='mantine-rotate-rtl'/>}
            >
                <Table>
                    <Table.Thead>
                    <Table.Tr>
                        <Table.Th className={classes.th}>Route</Table.Th>
                        <Table.Th className={classes.th}>Avg. Price</Table.Th>
                        <Table.Th className={classes.th}>Min</Table.Th>
                        <Table.Th className={classes.th}>Max</Table.Th>
                        <Table.Th className={classes.th}>Flights</Table.Th>
                    </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody className={classes.Tbody}>{rows}</Table.Tbody>
                </Table>
            </NavLink>
        </div>
    )
}
```
# src/features/travel-manager-portal/GuestInvite/components/EstimatedBudget/EstimatedHotel.tsx
```tsx
import { Card, Group } from '@mantine/core'
import { HotelAggregationResponse } from '@/types'
import classes from './EstimatedFlights.module.scss'
interface EstimateBudgetProps {
  hotelData: HotelAggregationResponse;
}
export const EstimatedHotels: React.FC<EstimateBudgetProps> = ({hotelData}) => {
    return(
        <div>
            <Group gap="sm">
                <Card className={classes.budgetItem__card}>
                    <div className={classes.budgetItem__value}>{`$${Math.round(hotelData.overall_average_total_price)}`}</div>
                    <div className={classes.budgetItem__label}>avg. price</div>
                </Card>
                <Card className={classes.budgetItem__card}>
                    <div className={classes.budgetItem__value}>{`$${Math.round(hotelData.overall_average_night_price)}`}</div>
                    <div className={classes.budgetItem__label}>avg. price/night</div>
                </Card>
                <Card className={classes.budgetItem__card}>
                    <div className={classes.budgetItem__value}>{`${hotelData.total_available_hotels}`}</div>
                    <div className={classes.budgetItem__label}>total hotels</div>
                </Card>
                </Group>
        </div>
    )
}
```
# src/features/travel-manager-portal/GuestInvite/components/GuestDetailsForm/GuestDetailsForm.scss
```scss
.guest-details-form {
    display: flex;
    flex-direction: column;
    gap: 24px;
  
    &__name-group {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
  
      @media (max-width: 640px) {
        grid-template-columns: 1fr;
      }
    }
  }
  
  .form-field {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
```
# src/features/travel-manager-portal/GuestInvite/components/GuestDetailsForm/GuestDetailsForm.tsx
```tsx
import React, { useState } from 'react';
import { Loader, TextInput, Select } from '@mantine/core'
import { Trip, GuestTypesResponse  } from '@/types';
import { fieldValidators } from '../../utils/formValidation';
import './GuestDetailsForm.scss';
interface GuestDetailsFormProps{
  guestTypeData: GuestTypesResponse | undefined;
  guestData: Trip['guest'];
  updateGuestDetails: (update: Partial<Trip['guest']>) => void;
  updateGuestTypeAndPreferences: (guestType: string) => void;
  isGuestTypeDataPending: boolean;
  isGuestTypeDataError: Error| null;
}
interface GuestTypeSelection {
  guest_type_id: string;
  name: string;
}
export const GuestDetailsForm: React.FC<GuestDetailsFormProps> = ({
  guestTypeData, 
  guestData, 
  updateGuestDetails, 
  updateGuestTypeAndPreferences, 
  isGuestTypeDataPending, 
  isGuestTypeDataError
}) => {
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [selectedGuestType, setSelectedGuestType] = useState<GuestTypeSelection | null>(null);
  const getErrorMessage = (field: string) => {
    if (!touched[field]) return undefined;
    switch (field) {
      case 'firstName':
        return fieldValidators.firstName(guestData.firstName);
      case 'lastName':
        return fieldValidators.lastName(guestData.lastName);
      case 'email':
        return fieldValidators.email(guestData.email);
      default:
        return undefined;
    }
  };
  
  const handleGuestTypeChange=(value: string | null) =>{
    if (value) {
      const selectedType = guestTypeData?.find(type => type.guest_type_id === value)
      if (selectedType) {
        updateGuestTypeAndPreferences(selectedType.guest_type_id)
        setSelectedGuestType(selectedType)
      }
    }
  }
  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };
  return (
    <div className="guest-details-form">
      <div className="guest-details-form__name-group">
        <div className="form-field">
          <TextInput
            label="First Name"
            required
            withAsterisk
            value={guestData.firstName}
            onChange={(e) => updateGuestDetails({ firstName: e.target.value })}
            placeholder="Enter first name"
            error={getErrorMessage('firstName')}
            onBlur={() => handleBlur('firstName')}
          />
        </div>
        <div className="form-field">
          <TextInput
            label="Last Name"
            required
            withAsterisk
            value={guestData.lastName}
            onChange={(e) => updateGuestDetails({ lastName: e.target.value })}
            placeholder="Enter last name"
            error={getErrorMessage('lastName')}
            onBlur={() => handleBlur('lastName')}
          />
        </div>
      </div>
      
      <div className="form-field">
        <TextInput
          label="Email"
          required
          withAsterisk
          type="email"
          value={guestData.email}
          onChange={(e) => updateGuestDetails({ email: e.target.value })}
          placeholder="Enter work email"
          error={getErrorMessage('email')}
          onBlur={() => handleBlur('email')}
        />
      </div>
      
      <div className="form-field">
        <TextInput
          label="Phone Number"
          value={guestData.phone}
          onChange={(e) => updateGuestDetails({ phone: e.target.value })}
          placeholder="+1 (555) 000-0000"
        />
      </div>
      
      <div className="form-field">
        <Select
          label="Guest Type"
          placeholder="Select Guest Type"
          required
          withAsterisk
          data={guestTypeData?.map(t => ({value: t.guest_type_id, label: t.name}))}
          leftSection={isGuestTypeDataPending ? <Loader size={16}/> : null}
          value={selectedGuestType?.guest_type_id || null}
          onChange={handleGuestTypeChange}
          error={isGuestTypeDataError?.message}
        />
      </div>
    </div>
  );
};
```
# src/features/travel-manager-portal/GuestInvite/components/index.ts
```ts
export * from './EstimatedBudget/EstimatedBudget'
export * from './GuestDetailsForm/GuestDetailsForm'
export * from './ItineraryForm/ItineraryForm'
export * from './PreferencesForm/PreferencesForm'
export * from './ProgressStepper/ProgressStepper'
export * from './ReviewForm/ReviewForm'
```
# src/features/travel-manager-portal/GuestInvite/components/ItineraryForm/Components/AirportPill.module.scss
```scss
.pill {
    display: flex;
    align-items: center;
    cursor: default;
    background-color: var(--mantine-color-blue-light);
    color: var(--mantine-color-blue-filled);
    //border: rem(1px) solid light-dark(var(--mantine-color-gray-4), var(--mantine-color-dark-7));
    padding-left: var(--mantine-spacing-xs);
    border-radius: var(--mantine-radius-xl);
  }
  
  .label {
    line-height: 1;
    font-size: var(--mantine-font-size-xs);
    font-weight: 700;
    margin-right: var(--mantine-spacing-xs);
  }
  
  .distance {
    line-height: 1;
    font-size: var(--mantine-font-size-xs);
  }
```
# src/features/travel-manager-portal/GuestInvite/components/ItineraryForm/Components/AirportPill.tsx
```tsx
import { CloseButton } from "@mantine/core";
import { SearchServiceableAirportsResponse } from "@/types";
import classes from './AirportPill.module.scss'
import React from "react";
interface AirportPillProps {
     airportData: SearchServiceableAirportsResponse
     onRemove?: () => void;
}
export const AirportPill: React.FC<AirportPillProps> = ({airportData, onRemove}) => {
     return (
          <div className={classes.pill}>
            <div className={classes.label}>
              {`${airportData.iata} - ${airportData.airport_name}`}
            </div>
            <div className={classes.distance}>
               {`${Math.round(airportData.distance_miles)}mi`}
          </div>
            <CloseButton
              onMouseDown={onRemove}
              variant="transparent"
              color="gray"
              size={22}
              iconSize={14}
              tabIndex={-1}
            />
          </div>
        );
}
```
# src/features/travel-manager-portal/GuestInvite/components/ItineraryForm/Components/AirportSelect.tsx
```tsx
import {useState, useEffect} from 'react';
import { Grid, Group, Select } from '@mantine/core'
import { AirportPill } from './AirportPill';
import { SearchServiceableAirportsResponse, Trip } from "@/types";
interface AirportSelectProps{
    airportData: SearchServiceableAirportsResponse[];
    distance: string;
    itineraryField: string;
    setDistance: (update: string)=> void;
    isPending: boolean;
    hub: string[];
    setHub: (update: string[]) => void;
    itineraryData: Trip['itinerary'];
    updateItineraryDetails: (update: Partial<Trip['itinerary']>) => void;
}
export const AirportSelect: React.FC<AirportSelectProps> = ({
    airportData, 
    distance, 
    itineraryField, 
    setDistance, 
    isPending, 
    hub, 
    setHub,
    itineraryData,
    updateItineraryDetails}) => {
    
    const[serviceableAirportsResponse, setServiceableAirportsResponse] = useState<SearchServiceableAirportsResponse[]>([])
    const field = itineraryField as 'origin' | 'destination';
    
    useEffect (() =>{
        if (airportData&& !isPending) {
            setServiceableAirportsResponse(airportData);
            const updatedItinerary = { ...itineraryData };
            updatedItinerary[field] = {
                ...updatedItinerary[field],
                searchedAirports: airportData.map((airport) => airport.iata)
            }
            updateItineraryDetails(updatedItinerary)
        }
      }, [airportData, isPending])
    const handleHubChange = (value: string) => {
        if(value === 'Hubs Only'){
            setHub(["L","M"])
        }else{
            setHub([])
        }
    }
    const handleRemove = (airportId: string) => {
        setServiceableAirportsResponse((current) => {
            const updatedAirports = current.filter((airport) => airport.airport_id !== airportId)
            const updatedItinerary = { ...itineraryData};
            updatedItinerary[field] = {
                ...updatedItinerary[field],
                searchedAirports: updatedAirports.map((airport) => airport.iata)
            };
            updateItineraryDetails(updatedItinerary)
            return updatedAirports
        })
    }
    return(
        <Grid>
            <Grid.Col span={{base: 12, sm:9, lg: 10}}>
                <Group>
                    {serviceableAirportsResponse.map((airport) => (
                        <AirportPill key={airport.airport_id} airportData={airport} onRemove={() => handleRemove(airport.airport_id)}/>
                    ))}
                </Group>
            </Grid.Col>
            <Grid.Col span={{base: 12, sm:3, lg: 2}}>
                <Select
                    size='xs'
                    data={[
                            {value: "50", label: 'Within 50 miles'},
                            {value: "100", label: 'Within 100 miles'},
                            {value: "150", label: 'Within 150 miles'},
                            {value: "200", label: 'Within 200 miles'}
                        ]}
                    value={distance}
                    onChange={(value) => setDistance(value || "50")}
                />
                <Select
                    size='xs'
                    data={[
                            'Hubs Only','All Airports'
                        ]}
                    value={hub.length > 1 ? 'Hubs Only' : 'All Airports'}
                    onChange={(value) => handleHubChange(value || 'Hubs Only')}
                />
            </Grid.Col>
        </Grid>
    )
}
```
# src/features/travel-manager-portal/GuestInvite/components/ItineraryForm/Components/CitySelect.tsx
```tsx
import { useState, useEffect } from 'react'
import { Loader, Select } from '@mantine/core';
import { useCitySearch, useDebounce } from '@/api/hooks';
import { SearchCityResponse, Trip } from '@/types';
interface CitySelectProps {
    label: string
    placeholder: string
    itineraryField: string
    itineraryData: Trip['itinerary'];
    updateItineraryDetails: (update: Partial<Trip['itinerary']>) => void;
    setSelectedCity: (city: SearchCityResponse) => void;
    getErrorMessage: (message: string) => string | undefined;
}
export const CitySelect: React.FC<CitySelectProps> = ({label, placeholder, itineraryField, itineraryData, updateItineraryDetails, setSelectedCity, getErrorMessage}) => {
    // city SEARCH value and debounced version
    const [citySearch, setCitySearch] = useState<string>('')
    // Debounced verison of origin search value
    const debouncedCitySearch = useDebounce(citySearch, 200)
    // API to search city
    const { data: cityData, isPending: cityDataIsPending, error: cityDataError } = useCitySearch(debouncedCitySearch, 5, .3, debouncedCitySearch.length >=1)
    // API response of list of returned city objects
    const [cityResponseObjects, setCityResponseObjects] = useState<SearchCityResponse[]>([])
    // API response of list of "city, state_id". Needed to prevent drop down interuptions
    const [displayCityData, setDisplayCityData] = useState<string[]>([])
    const field = itineraryField as 'origin' | 'destination';
    // Everytime we get new data, update the response object. This prevents "no results" during debouncing
    useEffect (() =>{
    if (cityData && !cityDataIsPending) {
        setDisplayCityData(cityData.map((city) => `${city.city}, ${city.state_id}`));
        setCityResponseObjects(cityData);
    }
    }, [cityData, cityDataIsPending])
    const handleSearch= (value: string) => {
        const selectedCityIndex = displayCityData.findIndex(item => item === value)
        setCitySearch(value)
        if (selectedCityIndex !== -1){
            const selectedCity = cityResponseObjects[selectedCityIndex]
            setSelectedCity(selectedCity)
            
            const currentFieldData = itineraryData[field];
            updateItineraryDetails({ 
                [field]:{ 
                    ...currentFieldData,
                    city: {
                        id: selectedCity.city_id,
                        name: selectedCity.city,
                        state_id: selectedCity.state_id,
                        lat: selectedCity.lat,
                        lng: selectedCity.lng,
                        ranking: selectedCity.ranking
                    }
                }
            } as Partial<Trip['itinerary']>)
        }
    }
    return(
        <Select
            label={label}
            required
            withAsterisk
            searchValue={citySearch}
            onSearchChange={(value) => handleSearch(value)}
            placeholder={placeholder}
            error={cityDataError?.message || getErrorMessage(itineraryField)}
            data={displayCityData}
            rightSection={cityDataIsPending && citySearch ? <Loader size={16} /> : null}
            searchable
            nothingFoundMessage={citySearch.length > 0 && !cityDataIsPending && displayCityData.length ===0 ? "City not found..." : null}
        />
    )
}
```
# src/features/travel-manager-portal/GuestInvite/components/ItineraryForm/ItineraryForm.scss
```scss
.itinerary-form {
    display: flex;
    flex-direction: column;
    gap: 24px;
  
    &__location-group{
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    &__schedule-group {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
  
      @media (max-width: 640px) {
        grid-template-columns: 1fr;
      }
    }
  }
  
  .form-field {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
```
# src/features/travel-manager-portal/GuestInvite/components/ItineraryForm/ItineraryForm.tsx
```tsx
import React, { useState } from 'react';
import { DatePickerInput } from '@mantine/dates'
import { fieldValidators } from '../../utils/formValidation';
import { Trip, SearchCityResponse } from '@/types';
import { Timeline } from '../Timeline/Timeline';
import { useServiceableAirportSearch } from '@/api/hooks';
import { CitySelect } from './Components/CitySelect';
import { AirportSelect } from './Components/AirportSelect';
import './ItineraryForm.scss';
interface ItineraryFormProps {
  itineraryData: Trip['itinerary'];
  updateItineraryDetails: (update: Partial<Trip['itinerary']>) => void;
}
export const ItineraryForm: React.FC<ItineraryFormProps> = ({itineraryData, updateItineraryDetails}) => {
  // Origin SELECTED value
  const [selectedOriginCity, setSelectedOriginCity] = useState<SearchCityResponse>()
  // Search parament for max distance of serviceable airports to city
  const [originAirportDistance, setOriginAirportDistance] = useState("50")
  // Filters airport search to only large and medium sized hubs (L, M, S, N, None)
  const [originHubs,setOriginHubs] = useState(["L","M"])
  // API to search serviceable airports
  const { data: originAirportData, isPending: originAirportIsPending, error: originAirportError} = useServiceableAirportSearch(originHubs, selectedOriginCity?.city_id || "", Number(originAirportDistance))
  const [selectedDestinationCity, setSelectedDestinationCity] = useState<SearchCityResponse>()
  const [destinationAirportDistance, setDestinationAirportDistance] = useState("50")
  const [destinationHubs,setDestinationHubs] = useState(["L","M"])
  const { data: destinationAirportData, isPending: destinationAirportIsPending, error: destinationAirportError} = useServiceableAirportSearch(destinationHubs, selectedDestinationCity?.city_id || "", Number(destinationAirportDistance))
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const getErrorMessage = (field: string) => {
    if (!touched[field]) return undefined;
    switch (field) {
      case 'origin':
        return fieldValidators.origin(itineraryData.origin.city.name);
      case 'destination':
        return fieldValidators.destination(itineraryData.destination.city.name);
      case 'startDate':
        return fieldValidators.startDate(itineraryData.startDate);
      case 'endDate':
        return fieldValidators.endDate(itineraryData.startDate, itineraryData.endDate);
      default:
        return undefined;
    }
  }
  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };
  return (
    <div className="itinerary-form">
      <div className="itinerary-form__location-group">
        <div className="form-field">
          <CitySelect 
            label='Origin Location'
            placeholder='Search origin city'
            itineraryField='origin'
            itineraryData={itineraryData}
            updateItineraryDetails={updateItineraryDetails}
            setSelectedCity={setSelectedOriginCity}
            getErrorMessage={getErrorMessage}
          />
          {originAirportError ? (
            <div>Error loading airports: {originAirportError.message}</div>
          ) : originAirportData && !originAirportIsPending ? 
            <AirportSelect 
              airportData={originAirportData}
              distance={originAirportDistance}
              itineraryField='origin'
              setDistance={setOriginAirportDistance}
              isPending={originAirportIsPending}
              hub={originHubs}
              setHub={setOriginHubs}
              itineraryData={itineraryData}
              updateItineraryDetails={updateItineraryDetails}
            />
            : <></>
          }
        </div>
        <div className="form-field">
          <CitySelect 
            label='Destination Location'
            placeholder='Search destination city'
            itineraryField='destination'
            itineraryData={itineraryData}
            updateItineraryDetails={updateItineraryDetails}
            setSelectedCity={setSelectedDestinationCity}
            getErrorMessage={getErrorMessage}
          />
          {destinationAirportError ? (
            <div>Error loading airports: {destinationAirportError.message}</div>
          ) : destinationAirportData && !destinationAirportIsPending ? 
            <AirportSelect 
              airportData={destinationAirportData}
              distance={destinationAirportDistance}
              itineraryField='destination'
              setDistance={setDestinationAirportDistance}
              isPending={destinationAirportIsPending}
              hub={destinationHubs}
              setHub={setDestinationHubs}
              itineraryData={itineraryData}
              updateItineraryDetails={updateItineraryDetails}
            />
            : <></>
          }
        </div>
      </div>
      <div className="itinerary-form__schedule-group">
        <div className="form-field">
          <DatePickerInput //add back in time and figure out how to make it 1. select, 2, change itinerary after all is complete
            label="First Meeting Start"
            //type="datetime-local"
            value={itineraryData.startDate}
            onChange={(date) => updateItineraryDetails({ startDate: date })}
            placeholder="Date and Time"
            clearable
            valueFormat="MMM D, YYYY"
            required
            withAsterisk
            highlightToday
            minDate={new Date()}
            error={getErrorMessage('startDate')}
            onBlur={() => handleBlur('startDate')}
          />
        </div>
        <div className="form-field">
          <DatePickerInput
            label="Last Meeting End"
            //type="datetime-local"
            value={itineraryData.endDate}
            onChange={(date) => updateItineraryDetails({ endDate: date })}
            placeholder="Date and Time"
            clearable
            valueFormat="MMM D, YYYY"
            required
            withAsterisk
            highlightToday
            minDate={new Date()} 
            error={getErrorMessage('endDate')}
            onBlur={() => handleBlur('endDate')}
          />
        </div>
      </div>
      <Timeline itineraryData={itineraryData}/>
    </div>
  );
};
```
# src/features/travel-manager-portal/GuestInvite/components/PreferencesForm/PreferencesForm.tsx
```tsx
import React from 'react';
import { Card, Checkbox, Grid, NativeSelect, NumberInput, Space, Text } from '@mantine/core';
import { FlightPreferences } from '@/types/Trip/subtypes/GuestTypePreferences/subtypes/FlightPreferences';
import { HotelPreferences } from '@/types/Trip/subtypes/GuestTypePreferences/subtypes/HotelPreferences';
import { GroundTransportPreferences } from '@/types/Trip/subtypes/GuestTypePreferences/subtypes/GroundTransportPreferences';
import { getCabinClassOptions, getMaxStopsOptions, getGrondTransportOptions, getHotelRating } from '@/features/travel-manager-portal/utils'
import { Trip } from '@/types';
interface PreferencesFormProps {
  preferencesData: Trip['travelPreferences'];
  updateTravelPreferences: (update: Partial<Trip['travelPreferences']>) => void;
}
export const PreferencesForm: React.FC <PreferencesFormProps>= ({preferencesData, updateTravelPreferences}) => {
  const cabinClassOptions = getCabinClassOptions();
  const maxStopOptions = getMaxStopsOptions();
  const groundTransportOptions = getGrondTransportOptions();
  const hotelRatings=getHotelRating();
  return (
    <div>
      <Card padding="lg" radius="md" withBorder>
        <Text size ="lg" fw={700}>Flight Preferences</Text>
        <Grid>
          <Grid.Col span={{base: 12, sm: 6}}>
            <NativeSelect
              label="Cabin Class"
              value={preferencesData.flight.cabinClass}
              data={cabinClassOptions}
              onChange={(event) => updateTravelPreferences({ 
                flight: {
                  ...preferencesData.flight,
                  cabinClass: event.target.value as FlightPreferences['cabinClass']
                }
              })}
            />
          </Grid.Col>
          <Grid.Col span={{base: 12, sm: 6}}>
              <NativeSelect
                label="Maximum Stops"
                data={maxStopOptions}
                value={preferencesData.flight.maxStops}
                onChange={(event) => updateTravelPreferences({ 
                  flight: {
                    ...preferencesData.flight,
                    maxStops: event.target.value as FlightPreferences['maxStops']
                  }
                })}
              />
            </Grid.Col>
        </Grid>
        <Space h="sm" />
            
        <Checkbox
          label="Refundable tickets only"
          checked={preferencesData.flight.refundableTicket}
          onChange={(event) => updateTravelPreferences({ 
            flight: {
              ...preferencesData.flight,
              refundableTicket: event.currentTarget.checked as boolean
            }
          })}
        />
      </Card>
      <Space h="sm" />
      
      <Card padding="lg" radius="md" withBorder>
        <Text size ="lg" fw={700}>Hotel Preferences</Text>
          <div>
            <NativeSelect
              label="Hotel Quality"
              data={hotelRatings}
              value={preferencesData.hotel.minimumRating}
              onChange={(event) => updateTravelPreferences({ 
                hotel: {
                  ...preferencesData.hotel,
                  minimumRating: Number(event.target.value) as HotelPreferences['minimumRating']
                }
              })}
            />
          </div>
      </Card>
      <Space h="sm" />
      <Card padding="lg" radius="md" withBorder>
        <Text size ="lg" fw={700}>Ground Transport Preferences</Text>
          <div>
            <NativeSelect 
            label="Preferred Service"
            data={groundTransportOptions}
            value={preferencesData.groundTransport.preferredServices}
            onChange={(event) => updateTravelPreferences({
              groundTransport: {
                ...preferencesData.groundTransport,
                preferredServices: event.target.value as GroundTransportPreferences['preferredServices']
              }
            })}
            />
          </div>
          {/*<div>
            <Label htmlFor="groundTransportClass">Car Class</Label>
            <Select
              value={state.travelPreferences.groundTransportClass}
              onValueChange={(value) => updateTravelPreferences({ groundTransportClass: value })}
            >
              <SelectTrigger id="groundTransportClass">
                <SelectValue placeholder="Select car class" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Standard">Standard</SelectItem>
                <SelectItem value="Premium">Premium</SelectItem>
                <SelectItem value="SUV">SUV</SelectItem>
              </SelectContent>
            </Select>
          </div>*/}
      </Card>
      <Space h="sm" />
      <Card padding="lg" radius="md" withBorder>
        <Text size ="lg" fw={700}>Per Diem Preferences</Text>
          <NumberInput
            prefix="$"
            label="Per Diem Type"
            value={preferencesData.dailyPerDiem}
            onChange={(value) => updateTravelPreferences({
              dailyPerDiem: Number(value)
            })}
          />
      </Card>
      {/* <EstimatedBudget /> */}
    </div>
  );
};
```
# src/features/travel-manager-portal/GuestInvite/components/ProgressStepper/ProgressStepper.tsx
```tsx
import { Stepper } from '@mantine/core';
interface ProgressStepperProps {
    currentStep: number;
    //totalSteps: number;
  }
export const ProgressStepper: React.FC<ProgressStepperProps> = ({currentStep}) =>{
    return(
        <Stepper active={currentStep} size="sm">
        <Stepper.Step label="Guest Details"></Stepper.Step>
        <Stepper.Step label="Itinerary"></Stepper.Step>
        <Stepper.Step label="Preferences"></Stepper.Step>
        <Stepper.Step label="Review"></Stepper.Step>
      </Stepper>
    )
}
```
# src/features/travel-manager-portal/GuestInvite/components/ReviewForm/ReviewForm.scss
```scss
```
# src/features/travel-manager-portal/GuestInvite/components/ReviewForm/ReviewForm.tsx
```tsx
import React from 'react';
import { User, MapPin, Calendar, Plane, Hotel, Car, DollarSign } from 'lucide-react';
import { EstimatedBudget } from '../EstimatedBudget/EstimatedBudget';
import { Grid, Group, Space, Text } from '@mantine/core';
import { Trip } from '@/types';
import './ReviewForm.scss';
interface ReviewItemProps {
  formData: Trip;
}
const formatDateTime = (date: Date | null | undefined) => {
  return date?.toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};
export const ReviewForm: React.FC<ReviewItemProps> = ({formData}) => {
  
  const SummaryItem: React.FC<{
    icon: React.ReactNode;
    title: string;
    children: React.ReactNode;
  }> = ({ icon, title, children }) => (
    <div>
      <Group>
        {icon}
        <Text size="md" fw={700}>{title}</Text>
      </Group>   
      <Space h="xs" />
        {children}
    </div>
  );
  const PreferenceItem: React.FC<{
    icon: React.ReactNode;
    children: React.ReactNode;
  }> = ({ icon, children }) => (
    <Group>
      {icon}
      <span className="preference-item__text">{children}</span>
    </Group>
  );
  return (
    <div>
      <Text size="xl" fw={700}>TripSummary</Text>
      <Text c="dimmed">Review all details before sending invitation</Text>
      <Space h="lg" />
          <div >
            <SummaryItem 
                icon={<User />} 
                title="Guest Information"
              >
                <Group>
                  <Text c="dimmed">Guest Name:</Text>
                  <Text>{formData.guest.firstName} {formData.guest.lastName}</Text>
                </Group>
                <Group>
                  <Text c="dimmed">Email:</Text>
                  <Text>{formData.guest.email}</Text> 
                </Group>
                <Group>
                  <Text c="dimmed">Phone:</Text>
                  <Text>{formData.guest.phone}</Text>
                </Group>
                <Group>
                  <Text c="dimmed">Guest Type:</Text>
                  <Text>{formData.guestType}</Text>
                </Group>
            </SummaryItem>
            <Space h="lg" />
            <SummaryItem 
                icon={<MapPin className="summary-item__icon" />} 
                title="Location Details"
              >
                <Group>
                  <Text c="dimmed">Origin:</Text>
                  <Text>{formData.itinerary.origin.city.name}</Text>
                </Group>
                <Group>
                  <Text c="dimmed">Destination:</Text>
                  <Text>{formData.itinerary.destination.city.name}</Text>
                </Group>
            </SummaryItem>
            <Space h="lg" />
            <SummaryItem 
                icon={<Calendar className="summary-item__icon" />} 
                title="Schedule"
              >
                <Group>
                  <Text c="dimmed">First Meeting:</Text>
                  <Text>{formatDateTime(formData.itinerary.startDate)}</Text>
                </Group>
                <Group>
                  <Text c="dimmed">Last Meeting:</Text>
                  <Text>{formatDateTime(formData.itinerary.endDate)}</Text>
                </Group>
            </SummaryItem>
            <Space h="lg" />
            <div>
              <Text size="md" fw={700}>Travel Preferences</Text>
              <Space h="xs" />
                <Grid>
                  <Grid.Col span={{base:12, sm:6}}>
                    <PreferenceItem icon={<Plane />}>
                        Flight ({formData.travelPreferences.flight.cabinClass})
                      </PreferenceItem>
                  </Grid.Col>
                  <Grid.Col span={{base:12, sm:6}}>
                    <PreferenceItem icon={<Hotel />}>
                      Hotel ({formData.travelPreferences.hotel.minimumRating})
                    </PreferenceItem>
                  </Grid.Col>
                  <Grid.Col span={{base:12, sm:6}}>
                    <PreferenceItem icon={<Car />}>
                      Ground Transport ({formData.travelPreferences.groundTransport.preferredServices}) 
                      {/*(state.travelPreferences.groundTransportClass)*/}
                    </PreferenceItem>
                  </Grid.Col>
                  <Grid.Col span={{base:12, sm:6}}>
                    <PreferenceItem icon={<DollarSign />}>
                      Per Diem (${formData.travelPreferences.dailyPerDiem}/day)
                    </PreferenceItem>
                  </Grid.Col>
                </Grid>
              </div>
            {/* <EstimatedBudget /> */}
          </div>
    </div>
  );
};
```
# src/features/travel-manager-portal/GuestInvite/components/Timeline/Timeline.module.scss
```scss
```
# src/features/travel-manager-portal/GuestInvite/components/Timeline/Timeline.tsx
```tsx
import classes from './Timeline.module.scss'
import { Card, Text } from '@mantine/core'
import { Trip } from '@/types'
interface TimelineProps{
    itineraryData: Trip['itinerary']
}
export const Timeline: React.FC<TimelineProps> = ({itineraryData}) => {
    
    if (!itineraryData.startDate || !itineraryData.endDate) {
        return
    }
    const firstMeeting = new Date(itineraryData.startDate);
    const lastMeeting = new Date(itineraryData.endDate);
    // Set arrival window start to 8 AM on the day of first meeting
    const arrivalWindowStart = new Date(firstMeeting);
    arrivalWindowStart.setHours(8, 0, 0, 0);
  
    // Calculate transfer time arrival (buffer before meeting)
    const transferTimeArrivalEnd = new Date(firstMeeting);
    const transferTimeArrivalStart = new Date(firstMeeting);
    transferTimeArrivalStart.setHours(transferTimeArrivalStart.getHours() - 2); // Example: 2-hour buffer
    
    // Calculate departure window
    const transferTimeDepartureStart = new Date(lastMeeting);
    const transferTimeDepartureEnd = new Date(lastMeeting);
    transferTimeDepartureEnd.setHours(transferTimeDepartureEnd.getHours() + 2); // Example: 2-hour buffer
    
    const departureWindowStart = new Date(transferTimeDepartureEnd);
    const departureWindowEnd = new Date(lastMeeting);
    departureWindowEnd.setHours(23, 59, 59, 999); // End of the day
    
    // Calculate check-in time (1 PM on arrival day)
    const checkInTime = new Date(firstMeeting);
    checkInTime.setHours(13, 0, 0, 0);
    
    // Calculate check-out time (11 AM on departure day)
    const checkOutTime = new Date(lastMeeting);
    checkOutTime.setHours(11, 0, 0, 0);
    
    // Calculate max stay in days
    const maxStay = Math.ceil(
        (checkOutTime.getTime() - checkInTime.getTime()) / (1000 * 60 * 60 * 24)
    );
    
    return (
        <Card padding="lg" radius="md" withBorder>
            <Text size='lg' fw={700}>Itinerary Timeline</Text>
        </Card>
    )
}
```
# src/features/travel-manager-portal/GuestInvite/GuestInvite.scss
```scss
.guest-invite {
    //min-height: 100vh;
    //background-color: #f9fafb;
    //padding: 32px;
  
    &__header {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 24px;
    }
  
    &__actions {
      margin-top: var(--space-8);
      display: flex;
      justify-content: space-between;
    }
  
    &__primary-action {
      margin-left: auto;
    }
    &__action-icon {
      width: 1rem;
      height: 1rem;
    }
  }
  
  .continue-icon {
    margin-left: 8px;
    height: 16px;
    width: 16px;
  }
```
# src/features/travel-manager-portal/GuestInvite/GuestInvite.tsx
```tsx
import React, { useCallback, useEffect } from 'react'
import { useNavigate}  from 'react-router-dom'
import { ChevronRight, ArrowLeft } from 'lucide-react'
import { ActionIcon, Button, Card, Grid, Space, Text } from '@mantine/core'
import { useGuestInviteState, useFormData } from './hooks'
import { useAllGuestTypes } from '@/api/hooks'
import { useAuth } from '@/contexts/AuthContext'
import { getStepValidation } from './utils/formValidation'
import { TravelMgrPageLayout } from '@/layouts';
import { EstimatedBudget, GuestDetailsForm, ItineraryForm, PreferencesForm, ProgressStepper, ReviewForm } from './components'
//import { createGuestInvite } from '@/api/api'
import './GuestInvite.scss';
const GuestInvite: React.FC = () => {
  
  const {authState} = useAuth();
  const companyId = authState.user?.company_id || '';
  const {data: allGuestTypesData, isPending: allGuestTypesIsPending, error: allGuestTypesError} = useAllGuestTypes(companyId)
  const { formData, clearFormData, updateGuestDetails, updateGuestTypeAndPreferences, updateItineraryDetails, updateTravelPreferences } = useFormData();
  const { currentStep, nextStep, prevStep, step, clearCurrentStep } = useGuestInviteState([
      <GuestDetailsForm 
        guestTypeData = {allGuestTypesData}
        guestData={formData.guest}
        updateGuestDetails={updateGuestDetails} 
        updateGuestTypeAndPreferences = {updateGuestTypeAndPreferences}
        isGuestTypeDataPending = {allGuestTypesIsPending}
        isGuestTypeDataError = {allGuestTypesError}
        />, 
      <ItineraryForm
        itineraryData={formData.itinerary}
        updateItineraryDetails={updateItineraryDetails}
      />, 
      <PreferencesForm
        preferencesData={formData.travelPreferences}
        updateTravelPreferences={updateTravelPreferences}
      />, 
      <ReviewForm
        formData={formData}
      />
  ]);
  const canProceed = useCallback((step: number): boolean => {
      try{
        return getStepValidation(step, formData);
      }
      catch (error) {
        console.error("Validation error:", error);
        return false
      }
    }, [formData]);
  const navigate = useNavigate();
  const totalSteps = 4;
  // Clear form data when component unmounts
  useEffect(() => {
    return () => {
      clearFormData();
      clearCurrentStep();
    };
  }, [clearFormData, clearCurrentStep]);
  //add logic to submit guest invite
  const handleSendInvite = async () => {
    try {
      //await createGuestInvite(state)
      // Handle success (e.g., show a success message, redirect)
      alert('Invite sent successfully!');
      clearFormData(); // Clear form data after successful submission
      navigate('/dashboard'); // Redirect to dashboard after successful submission
    } catch (error) {
      // Handle error (e.g., show an error message)
      console.error("Error sending invite:", error);
      alert('Error sending invite. Please try again later.'); //Example error handling
    }
  }
  const handleBackToDashboard = () => {
    clearFormData();
    navigate('/dashboard');
  };
    return (
      <TravelMgrPageLayout
        title="New Guest Invite"
        subtitle="Create and send travel invites to your guests"
      >
          <div className="guest-invite__header">
            <ActionIcon
              onClick={handleBackToDashboard}
              variant="subtle" 
              color="gray" 
              size="sm"
            >
              <ArrowLeft />
            </ActionIcon>
            <Text fw={500}>Back to Dashboard</Text>
          </div>
  
          {/*<ProgressBar currentStep={state.currentStep} totalSteps={totalSteps} />*/}
          <ProgressStepper currentStep={currentStep} />
          <Space h="xl" />
          <Grid>
            <Grid.Col span="auto">
              <Card shadow ="xs" padding="lg" radius="md" withBorder>
                  {step}
              </Card>
            </Grid.Col>
            {currentStep > 0
            ? 
              <Grid.Col span={{base: 12, lg: 4}}>
                <EstimatedBudget
                  formData={formData}
                />
              </Grid.Col>
            : <></>
            }
          </Grid>
          <div className="guest-invite__actions">
            {currentStep > 0 && (
              <Button
                variant="outline"
                onClick={prevStep}
              >
                Previous
              </Button>
            )}
            <div className="guest-invite__primary-action">
              {currentStep < totalSteps ? (
                <Button
                  onClick={nextStep}
                  rightSection={<ChevronRight size={14}/>}
                  disabled={!canProceed(currentStep)}
                  //title={!canProceed(currentStep) ? 'Please fill out all required fields' : ""}
                >
                  <span>Continue</span>
                </Button>
              ) : (
                <Button
                  onClick={handleSendInvite}
                >
                  <span>Send Invite</span>
                </Button>
              )}
            </div>
          </div>
      </TravelMgrPageLayout>
    );
  };
  
  export default GuestInvite;
```
# src/features/travel-manager-portal/GuestInvite/hooks/index.ts
```ts
export * from './useFormData';
export * from './useGuestInviteState';
```
# src/features/travel-manager-portal/GuestInvite/hooks/useFormData.ts
```ts
import { useEffect, useState, useCallback } from 'react';
import { Trip } from '@/types'
import { useGuestTypePreferences } from '@/api/hooks';
const initialFormData: Trip ={
  id: "",
  guest:{
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  },
  guestType: "",
  status: "pending",
  travelPreferences: {
    id: "",
    guestType: "",
    flight: {
      cabinClass: "ECONOMY"
    },
    hotel: {},
    groundTransport: {},
    dailyPerDiem:0,
  },
  itinerary: {
    id: "",
    origin:{    
      city:{
        id: "",
        name: "",
        state_id: "",
        lat: 0,
        lng: 0,
        ranking: 0
      },
      searchedAirports: []
    },
    destination:{
      city:{
        id: "",
        name: "",
        state_id: "",
        lat: 0,
        lng: 0,
        ranking: 0
      },
      searchedAirports: []
    },
    startDate: new Date(),
    endDate: null,
  } ,
  created: new Date(),
  modified: new Date(),
  createdBy: "Rorey",
}
export const useFormData = () => {
   
  const [selectedGuestTypeId, setSelectedGuestType] = useState<string | null>(null);
  const {data: guestTypePreferences, isSuccess: guestTypePrefIsSuccess, isPending: guestTypePrefIsPending, error: apiErrorGuestPref } = useGuestTypePreferences(selectedGuestTypeId ?? '')
  
  //Set form data from localStorage or use initial data
    const [formData, setFormData] = useState<Trip>(()=>{
        const savedData=localStorage.getItem('guestInviteFormData');
        if (savedData) {
          const parsedData=JSON.parse(savedData);
          // Convert string dates back to Date objects
          return {
            ...parsedData,
            itinerary: {
              ...parsedData.itinerary,
              startDate: parsedData.itinerary.startDate ? new Date(parsedData.itinerary.startDate) : null,
              endDate: parsedData.itinerary.endDate ? new Date(parsedData.itinerary.endDate) : null,
            }
          };
        }
        return initialFormData;
    });
    //Save to localStorage whenever form data changes
    useEffect(()=>{
        localStorage.setItem('guestInviteFormData', JSON.stringify(formData));
    }, [formData]);
     // Effect to update form data when guestTypePreferences changes
    useEffect(() => {
      if (guestTypePreferences && guestTypePrefIsSuccess && selectedGuestTypeId) {
        setFormData(prevData => ({
          ...prevData,
          guestType: guestTypePreferences.guestType,
          travelPreferences: guestTypePreferences,
        }));
        console.log("Updated form data with preferences:", guestTypePreferences);
      }
    }, [guestTypePreferences, guestTypePrefIsSuccess, selectedGuestTypeId]);
    useEffect(() => {
      console.log("Form data after update:", formData);
    }, [formData]);
    //Cleanup function to clear form data from localStorage
      const clearFormData= useCallback(()=>{
        localStorage.removeItem('guestInviteFormData');
        localStorage.removeItem('guestInviteCurrentStep');
        setFormData(initialFormData);
      }, []);
    
    const updateGuestDetails = (details: Partial<Trip['guest']>) => {
        setFormData(prevData => ({
          ...prevData,
          guest: { ...prevData.guest, ...details },
        }));
      };
    
    const updateGuestTypeAndPreferences=(guestTypeId: string) =>{
        setSelectedGuestType(guestTypeId)
    }
    
    const updateItineraryDetails = (details: Partial<Trip['itinerary']>) => {
        setFormData(prevData => ({
          ...prevData,
          itinerary: { ...prevData.itinerary, ...details },
        }));
    };
    
    const updateTravelPreferences = (preferences: Partial<Trip['travelPreferences']>) => {
        setFormData(prevData => ({
          ...prevData,
          travelPreferences: { ...prevData.travelPreferences, ...preferences },
        }));
    };
    return {
        formData,
        clearFormData,
        updateGuestDetails,
        updateGuestTypeAndPreferences,
        updateItineraryDetails,
        updateTravelPreferences,
    }
}
```
# src/features/travel-manager-portal/GuestInvite/hooks/useGuestInviteState.ts
```ts
import { useState, useEffect, useCallback, ReactElement } from 'react';
export const useGuestInviteState = (steps: ReactElement[]) => {
  const [currentStep, setCurrentStep]= useState<number>(()=>{
    const savedStep=localStorage.getItem('guestInviteCurrentStep');
    return savedStep ? parseInt(savedStep) : 0;
  });
  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  }
  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  }
  //Save current step to localStorage
  useEffect(()=>{
    localStorage.setItem('guestInviteCurrentStep', currentStep.toString());
  }, [currentStep]);
  //Cleanup function to clear form data from localStorage
  const clearCurrentStep= useCallback(()=>{
    localStorage.removeItem('guestInviteCurrentStep');
    setCurrentStep(0);
  }, []);
  return {
    currentStep,
    setCurrentStep,
    step: steps[currentStep],
    nextStep,
    prevStep,
    clearCurrentStep,
  };
};
```
# src/features/travel-manager-portal/GuestInvite/utils/formValidation.ts
```ts
import { Trip } from '@/types';
export const validateEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};
export const validateDates = (startDate: Date | null, endDate: Date | null): boolean => {
    if (!endDate) return true
    if (!startDate) return true
    return new Date(endDate) > new Date(startDate);
};
export const formValidators = {
  guestDetails: (formData: Trip): boolean => {
    const { guest, guestType } = formData;
    return !!(
      guest.firstName &&
      guest.lastName &&
      guest.email &&
      guestType &&
      validateEmail(guest.email)
    );
  },
  itinerary: (formData: Trip): boolean => {
    const { itinerary } = formData;
    return !!(
      itinerary.origin.city.name &&
      itinerary.destination.city.name &&
      itinerary.startDate &&
      itinerary.endDate &&
      validateDates(itinerary.startDate, itinerary.endDate)
    );
  },
  preferences: (formData: Trip): boolean => {
    const { travelPreferences } = formData;
    return !!(
      travelPreferences.guestType &&
      travelPreferences.flight?.cabinClass
    );
  },
  review: (): boolean => true
};
export const getStepValidation = (step: number, formData: Trip): boolean => {
  switch (step) {
    case 0:
      return formValidators.guestDetails(formData);
    case 1:
      return formValidators.itinerary(formData);
    case 2:
      return formValidators.preferences(formData);
    case 3:
      return formValidators.review();
    default:
      return false;
  }
};
// Field-level validation for showing error messages
export const fieldValidators = {
  firstName: (value: string) => {
    if (!value) return 'First name is required';
    return undefined;
  },
  lastName: (value: string) => {
    if(!value) return 'Last name is required';
    return undefined;
  },
  email: (value: string) => {
    if (!value) return 'Email is required';
    if (!validateEmail(value)) return 'Invalid email format';
    return undefined;
  },
  origin: (value: string) => {
    if (!value) return 'Origin is required';
    return undefined;
  },
  destination: (value: string) => {
    if (!value) return 'Destination is required';
    return undefined;
  },
  startDate: (value: Date | null) => {
    if (!value) return 'Start date is required';
    return undefined;
  },
  endDate: (startDate: Date | null, endDate: Date | null) => {
    if (!endDate) return 'End date is required';
    if (!validateDates(startDate, endDate)) return 'End date must be after start date';
    return undefined;
  }
};
```
# src/features/travel-manager-portal/Reports/Components/MonthlySpendChart/MonthlySpendChart.tsx
```tsx
import { calculateMonthlySpend } from "../../utils/calculateMonthlySpend";
import { Trip } from "@/types";
import { LineChart } from '@mantine/charts';
export const MonthlySpendChart = ({ trips }: { trips: Trip[] }) => {
    const monthlySpend = calculateMonthlySpend(trips);
    return (
        <div>
            <LineChart
                data={monthlySpend}
                h={300}
                dataKey="month"
                series={[
                    { name: 'flightSpend', color: 'blue'},
                    { name: 'hotelSpend', color: 'green'},
                ]}
                curveType="natural"
            />
        </div>
    );
};
```
# src/features/travel-manager-portal/Settings/components/BookingPreferences/BookingPreferences.module.scss
```scss
.content{
    display: flex;
      flex-direction: column;
      gap: 24px;
}
```
# src/features/travel-manager-portal/Settings/components/BookingPreferences/BookPreferences.tsx
```tsx
import { useState, useEffect } from 'react'
import { SelectGuestType, ManageGuestTypes, GuestTypePreferencesForm} from './components'
import { useAuth } from '@/contexts/AuthContext'
import { useAllGuestTypes, useCreateGuestType, useGuestTypePreferences, useDeleteGuestType } from '@/api/hooks/useGuestPreferences'
import styles from './BookingPreferences.module.scss';
interface GuestTypeSelection {
  guest_type_id: string;
  name: string;
}
export const BookingPreferences =() => {
  
  // get auth details
  const { authState } = useAuth();
  const companyId = authState.user?.company_id || '';
  const userId = authState.user?.user_id || "";
  const {data: allGuestTypes, isSuccess, isPending, error: apiError} = useAllGuestTypes(companyId)
  const createGuestTypeMutation = useCreateGuestType();
  const deleteGuestTypeMutation = useDeleteGuestType();
  const [selectedGuestType, setSelectedGuestType] = useState<GuestTypeSelection | null>(null);
  const {data: guestTypePreferences, isSuccess: guestTypePrefIsSuccess, isPending: guestTypePrefIsPending, error: apiErrorGuestPref} = useGuestTypePreferences(selectedGuestType?.guest_type_id ?? '')
  const [newGuestType, setNewGuestType] = useState('');
  const [error, setError] = useState<string | null>(null);
  // Set first guest type as selected when data is loaded initially
  useEffect(() => {
    if (isSuccess && allGuestTypes && allGuestTypes.length > 0 && !selectedGuestType) {
      setSelectedGuestType({
        guest_type_id: allGuestTypes[0].guest_type_id,
        name: allGuestTypes[0].name
      });
    }
  }, [isSuccess, allGuestTypes, selectedGuestType]);
  // Reset selected guest type if the current one is deleted
  useEffect(() => {
    if (selectedGuestType && allGuestTypes && !allGuestTypes.some(type => type.guest_type_id === selectedGuestType.guest_type_id)) {
      if (allGuestTypes.length > 0) {
        setSelectedGuestType({
          guest_type_id: allGuestTypes[0].guest_type_id,
          name: allGuestTypes[0].name
        });
      } else {
        setSelectedGuestType(null);
      }
    }
  }, [allGuestTypes, selectedGuestType, deleteGuestTypeMutation.isSuccess]);
  const handleAddGuestType = () => {
    const trimmedName = newGuestType.trim();   
    if (!trimmedName) {
      setError('Guest type name cannot be empty');
      return;
    }
    if (allGuestTypes?.some(type => type.name.toLowerCase() === trimmedName.toLowerCase())) {
      setError('A guest type with this name already exists');
      return;
    }
    // Create new guest type with default values
    createGuestTypeMutation.mutate({
      name: trimmedName,
      company_id: companyId,
      user_id: userId
    })    
    // Reset form
    setNewGuestType('');
    setError(null);
    };
  
    const handleRemoveGuestType = (id: string) => {
      if (allGuestTypes && allGuestTypes.length <= 1) {
        setError('Cannot remove the last guest type');
        return;
      }
      deleteGuestTypeMutation.mutate(id)
      //const updatedGuestTypes = guestTypePreferences.filter(type => type.id !== id);
      // If we're deleting the currently selected guest type,
      // update the selected guest type to the first available one
      // if (selectedGuestType?.guest_type_id === id.toString()) {
      //   const firstAvailableId = updatedGuestTypes[0]?.id.toString();
      //   setSelectedGuestType(null);
      // }
      //setGuestTypePreferences(updatedGuestTypes);
    };
  return (
    <div>
        <div className={styles.content}>
          <ManageGuestTypes
            guestTypes={allGuestTypes}
            newGuestType={newGuestType}
            setNewGuestType={setNewGuestType}
            error={error || (createGuestTypeMutation.isError ? String(createGuestTypeMutation.error) : null)}
            setError={setError}
            handleAddGuestType={handleAddGuestType}
            handleRemoveGuestType={handleRemoveGuestType}
            isCreating={createGuestTypeMutation.isPending}
            isDeleting={deleteGuestTypeMutation.isPending}
          />
              <SelectGuestType
                guestTypes={allGuestTypes}
                selectedGuestType={selectedGuestType}
                updateGuestTypeState={setSelectedGuestType}
                isPending={isPending}
                apiError={apiError}
                isSuccess={isSuccess}
              />
          <GuestTypePreferencesForm 
            guestTypePreferences={guestTypePreferences}
            selectedGuestType={selectedGuestType}
            isSuccess={guestTypePrefIsSuccess}
            isPending={guestTypePrefIsPending}
            apiError={apiErrorGuestPref}
          /> 
        </div>
    </div>
  );
}
```
# src/features/travel-manager-portal/Settings/components/BookingPreferences/components/GuestTypePreferencesForm/GuestTypePreferencesForm.tsx
```tsx
import { Card, Checkbox, LoadingOverlay, NativeSelect, NumberInput, Space, Text } from '@mantine/core';
import { getCabinClassOptions, getMaxStopsOptions, getGrondTransportOptions, getHotelRating } from '@/features/travel-manager-portal/utils'
import { CreateGuestTypeResponse } from '@/types/Trip/subtypes';
import { useUpdateGuestType } from '@/api/hooks/useGuestPreferences';
import { Loader } from 'lucide-react';
interface GuestTypeSelection {
  guest_type_id: string;
  name: string;
}
interface GuestTypePreferencesFormProps {
    guestTypePreferences: CreateGuestTypeResponse | undefined;
    selectedGuestType: GuestTypeSelection | null;
    isSuccess: boolean
    isPending: boolean
    apiError: (Error | null)
}
export const GuestTypePreferencesForm: React.FC<GuestTypePreferencesFormProps> = ({
    guestTypePreferences, selectedGuestType,/*updateGuestTypePreferences, updateGuestTypeState*/ isSuccess, isPending, apiError
}) => {
    const updateGuestTypePreferenceMutation = useUpdateGuestType();
    const cabinClassOptions = getCabinClassOptions();
    const maxStopOptions = getMaxStopsOptions();
    const groundTransportOptions = getGrondTransportOptions();
    const hotelRatings=getHotelRating();
    return(
        <Card shadow ="xs" padding="lg" radius="md" withBorder>
          <LoadingOverlay visible={isPending && Boolean(selectedGuestType?.guest_type_id)}/>
          <div>
            {!selectedGuestType?.guest_type_id ? (
              <div><Text>Select Guest Type to edit preferences</Text></div>
            ) :
             apiError ?(
              <div>Error loading guest type details: {apiError.message}</div>
            ): isSuccess && guestTypePreferences ? (
              <>
                <Text size ="lg" fw={700}>Travel Preferences</Text>
                <Text size ="md" c="dimmed">Customize travel preferences for the selected guest type</Text>
                <Space h="md" />
                <Card padding="lg" radius="md" withBorder>
                    <Text size ="lg" fw={700}>Flight Preferences</Text>
                    <Space h="sm" />
                    <NativeSelect 
                        label="Default Cabin Class"
                        value={guestTypePreferences?.flight.cabinClass}
                        data ={cabinClassOptions}
                        onChange={(event) => updateGuestTypePreferenceMutation.mutate({
                          guest_type_id: guestTypePreferences.id,
                          updateData: {flight:{cabinClass: event.target.value as "ECONOMY" | "PREMIUM_ECONOMY" | "BUSINESS" | "FIRST"}}
                        })}
                        error={apiError}
                        disabled={updateGuestTypePreferenceMutation.isPending}
                        leftSection={updateGuestTypePreferenceMutation.isPending ? <Loader/> : null}
                        
                    />
                    <Space h="sm" />
                    <NativeSelect 
                        label="Maximum Stops"
                        value={guestTypePreferences?.flight.maxStops}
                        data ={maxStopOptions}
                        onChange={(event) => updateGuestTypePreferenceMutation.mutate({
                          guest_type_id: guestTypePreferences.id,
                          updateData: {flight:{maxStops: event.target.value as 'ANY' | 'DIRECT' | 'ONE_STOP' | 'TWO_STOPS'}}
                        })}
                        error={apiError}
                        disabled={updateGuestTypePreferenceMutation.isPending}
                        leftSection={updateGuestTypePreferenceMutation.isPending ? <Loader/> : null}
                    />
                    <Space h="sm" />
                    <Checkbox
                        checked={guestTypePreferences?.flight.refundableTicket}
                        label="Refundable tickets only"
                        onChange={(event) => updateGuestTypePreferenceMutation.mutate({
                          guest_type_id: guestTypePreferences.id,
                          updateData: {flight:{refundableTicket: event.currentTarget.checked}}
                        })}
                        error={apiError}
                    />
                </Card>
                <Space h="md" />
                <Card padding="lg" radius="md" withBorder>
                    <Text size ="lg" fw={700}>Hotel Preferences</Text>
                    <Space h="sm" />
                    <NativeSelect 
                        label="Default Hotel Quality"
                        value={guestTypePreferences?.hotel.minimumRating}
                        data ={hotelRatings}
                        onChange={(event) => updateGuestTypePreferenceMutation.mutate({
                          guest_type_id: guestTypePreferences.id,
                          updateData: {hotel:{minimumRating: parseInt(event.target.value,10) as 1 | 2 | 3 | 4 | 5}}
                        })}
                        error={apiError}
                    />
                </Card>
                <Space h="md" />
                <Card padding="lg" radius="md" withBorder>
                    <Text size ="lg" fw={700}>Ground Transport</Text>
                    <Space h="sm" />
                    <NativeSelect 
                        label="Preferred Service"
                        value={guestTypePreferences?.groundTransport.preferredServices}
                        data ={groundTransportOptions}
                        onChange={(event) => updateGuestTypePreferenceMutation.mutate({
                          guest_type_id: guestTypePreferences.id,
                          updateData: {groundTransport:{preferredServices: event.target.value as "UBER" | "LYFT"}}
                        })}
                        error={apiError}
                    />
                </Card>
                <Space h="md" />
                <Card padding="lg" radius="md" withBorder>
                    <Text size ="lg" fw={700}>Per Diem</Text>
                    <Space h="sm" />
                    <NumberInput
                    prefix="$"
                    label="Default Daily Amount"
                    value={guestTypePreferences?.dailyPerDiem}
                    onChange={(value) => updateGuestTypePreferenceMutation.mutate({
                      guest_type_id: guestTypePreferences.id,
                      updateData: { dailyPerDiem: Number(value)}
                    })}
                    error={apiError}
                    />
                </Card>
            </>
            ): (
              <div></div>
            )}
            </div>
        </Card>
    )
}
```
# src/features/travel-manager-portal/Settings/components/BookingPreferences/components/index.ts
```ts
export * from './GuestTypePreferencesForm/GuestTypePreferencesForm'
export * from './ManageGuestTypes/ManageGuestTypes'
export * from './SelectGuestType/SelectGuestType'
```
# src/features/travel-manager-portal/Settings/components/BookingPreferences/components/ManageGuestTypes/ManageGuestTypes.tsx
```tsx
import { Alert, Button, Card, CloseButton, Grid, Group, Space, Text, TextInput } from '@mantine/core'
import { GuestTypesResponse } from '@/types';
interface ManageGuestTypesProps {
    guestTypes: GuestTypesResponse | undefined;
    newGuestType: string;
    setNewGuestType: (value: string) => void;
    error: string | null;
    setError: (error: string | null) => void;
    handleAddGuestType: () => void;
    handleRemoveGuestType: (id: string) => void;
    isCreating?: boolean
    isDeleting?: boolean
}
export const ManageGuestTypes: React.FC<ManageGuestTypesProps> = ({
    guestTypes, 
    newGuestType,
    setNewGuestType,
    error,
    setError,
    handleAddGuestType,
    handleRemoveGuestType,
    isCreating = false,
    isDeleting = false
}) =>{
    return(
        <Card shadow ="xs" padding="lg" radius="md" withBorder>
            <Text size ="lg" fw={700}>Guest Types</Text>
            <Text size ="md" c="dimmed">Manage guest categories and their default preferences</Text>
            <Space h="md" />
            <Group>
                <TextInput 
                    placeholder="Enter new guest type"
                    value={newGuestType}
                    onChange={(event) => {
                        setNewGuestType(event.target.value);
                        setError(null);
                    }}
                    disabled={isCreating}
                />
                <Button
                    onClick={handleAddGuestType}
                    variant="outline"
                    loading={isCreating}
                    disabled= {isCreating}
                >
                    Add Type
                </Button>
                {/* Error message */}
                {error && (
                <Alert variant="light">
                    {error}
                </Alert>
          )}
            </Group>
            <Space h="md" />
            <Grid>
            {guestTypes?.map((type)=>(
                <Grid.Col span={{ base: 6, md: 4, lg: 3 }} key={type.guest_type_id}>
                <Card padding="xs" radius="md" withBorder>
                    <Group justify='space-between'>
                        {type.name}
                        <CloseButton 
                            onClick={()=> handleRemoveGuestType(type.guest_type_id)}
                            disabled= {isDeleting}
                        />
                    </Group>
                </Card>
                </Grid.Col>
            )
            )}
            
            </Grid>
        </Card>
    )
}
```
# src/features/travel-manager-portal/Settings/components/BookingPreferences/components/SelectGuestType/SelectGuestType.tsx
```tsx
import React from 'react';
//import { useAllGuestTypes } from '@/api/hooks/useGuestPreferences';
import { GuestTypesResponse } from '@/types';
//import { useAuth } from '@/contexts/AuthContext';
import { Notification, Card, Select, Space, Text } from '@mantine/core';
interface GuestTypeSelection {
    guest_type_id: string;
    name: string;
  }
interface SelectGuestTypeProps {
    guestTypes: GuestTypesResponse | undefined;
    selectedGuestType: GuestTypeSelection | null;
    updateGuestTypeState: (newValue: GuestTypeSelection | null ) => void;
    isPending: boolean;
    apiError: (Error | null);
    isSuccess: boolean;
}
export const SelectGuestType: React.FC<SelectGuestTypeProps> = ({guestTypes, selectedGuestType, updateGuestTypeState, isPending, apiError, isSuccess }) => {
    const handleChange =(value: string | null) =>{
        if (value) {
            const selectedType = guestTypes?.find(type => type.guest_type_id === value)
            if (selectedType) {
                updateGuestTypeState({
                    guest_type_id: selectedType.guest_type_id,
                    name: selectedType.name
                })
            } else{
                updateGuestTypeState(null)
            }
        }
    }
    return(
        <Card shadow ="xs" padding="lg" radius="md" withBorder>
            <div>
                {isPending ? (
                    <div>Loadind guest types...</div>
                ): apiError ? (
                    <div>Error loading guest types: {apiError.message}</div>
                ): isSuccess ? (
                    <>
                        <Text size ="lg" fw={700}>Guest Type Preferences</Text>
                        <Text size ="md" c="dimmed">Configure travel preferences for each guest type</Text>
                        <Space h="md" />
                        <Select 
                            label="Select Guest Type"
                            placeholder='Select Guest Type'
                            data ={guestTypes?.map(t => ({value: t.guest_type_id, label: t.name}))}
                            value={selectedGuestType?.guest_type_id || null}
                            onChange={handleChange}
                        />
                        <Space h="xs" />
                        {selectedGuestType ? (
                        <Notification withCloseButton={false}>
                            {/*`Editing preferences for ${selectedGuestType}`*/}
                            Editing preferences for <Text span size="sm" fw={700}>{selectedGuestType.name}</Text>
                        </Notification>
                        ):<></>}
                    </>
                ): (
                    <div>No guest types available</div>
                )}
            </div>
        </Card>
    )
}
```
# src/features/travel-manager-portal/Settings/components/index.ts
```ts
export * from './BookingPreferences/components/GuestTypePreferencesForm/GuestTypePreferencesForm'
export * from './BookingPreferences/components/ManageGuestTypes/ManageGuestTypes'
export * from './BookingPreferences/components/SelectGuestType/SelectGuestType'
export * from './SettingsNav/SettingsNav'
```
# src/features/travel-manager-portal/Settings/components/PaymentMethods/PaymentMethods.tsx
```tsx
import { Text } from '@mantine/core'
export const PaymentMethods = () =>{
    return(
        <Text />
    )
}
```
# src/features/travel-manager-portal/Settings/components/PreferredVendors/PreferredVendors.tsx
```tsx
import { Text } from '@mantine/core'
export const PreferredVendors = () =>{
    return(
            <Text />
        )
    
}
```
# src/features/travel-manager-portal/Settings/components/SettingsNav/SettingsNav.tsx
```tsx
import { Card, Divider, NavLink, Text } from '@mantine/core';
import { CreditCard, Handshake, Hotel } from 'lucide-react';
type SettingsSection = 'payment' | 'vendors' | 'booking';
interface SettingsNavProps {
  activeSection: SettingsSection;
  onSectionChange: (section: SettingsSection) => void;
}
const data = [
    {
        icon: CreditCard,
        label: "Payment Methods",
        value: 'payment' as SettingsSection
    },
    {
        icon: Handshake,
        label: "Preffered Vendors",
        value: 'vendors' as SettingsSection
    },
    {
        icon: Hotel,
        label: "Booking Preferences",
        value: 'booking' as SettingsSection
    }
];
export const SettingsNav = ({ activeSection, onSectionChange }: SettingsNavProps) => {
    const items = data.map((item) => (
        <NavLink 
            key={item.label}
            label={item.label}
            leftSection={<item.icon size={15} strokeWidth={1.5} />}
            active={item.value === activeSection}
            onClick={() => onSectionChange(item.value)}
            variant = "filled"
        />
    ));
    return (
        <Card shadow="xs" padding="xs" radius="md" withBorder>
            <Text size="sm" fw={700}>Travel</Text>
            <Divider my="xs" />
        {items}
        </Card>
    );
}
```
# src/features/travel-manager-portal/Settings/Settings.module.scss
```scss
.settingsLayout {
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: 2rem;
  height: 100%;
  
  &__nav {
    position: sticky;
    top: 2rem;
    height: fit-content;
    top: calc(60px + 1rem); // Adjust based on your header height
    max-height: calc(100vh - 60px - 2rem);
  }
  
  &__content {
    min-width: 0; // Prevents content from expanding beyond container
  }
}
.settings-nav {
  width: 100%;
}
```
# src/features/travel-manager-portal/Settings/Settings.tsx
```tsx
import { useState } from 'react'
import { TravelMgrPageLayout } from '@/layouts'
import { SettingsNav } from './components/SettingsNav/SettingsNav';
import { BookingPreferences } from './components/BookingPreferences/BookPreferences'
import { PaymentMethods } from './components/PaymentMethods/PaymentMethods'
import { PreferredVendors } from './components/PreferredVendors/PreferredVendors'
import styles from './Settings.module.scss'
type SettingsSection = 'payment' | 'vendors' | 'booking';
const Settings = () => {
  const [activeSection, setActiveSection] = useState<SettingsSection>('booking');
  const renderContent = () => {
    switch (activeSection) {
      case 'payment':
        return <PaymentMethods />;
      case 'vendors':
        return <PreferredVendors />;
      case 'booking':
        return <BookingPreferences />;
      default:
        return null;
    }
  };
  return (
    <TravelMgrPageLayout
      title="Settings"
      subtitle="Manage your travel settings"
    >
      <div className={styles.settingsLayout}>
        <div className={styles.settingsLayout__nav}>
          <SettingsNav 
            activeSection={activeSection}
            onSectionChange={setActiveSection}
          />
        </div>
        
        <div className={styles.settingsLayout__content}>         
          {renderContent()}
        </div>
      </div>
    </TravelMgrPageLayout>
  );
};
export default Settings;
```
# src/features/travel-manager-portal/utils/getPreferenceOptions/flightPreferences.ts
```ts
import { FlightPreferences } from "@/types/Trip/subtypes/GuestTypePreferences/subtypes/FlightPreferences";
export const getCabinClassOptions = () => {
    type CabinClass = NonNullable<FlightPreferences['cabinClass']>;
    
    const cabinClasses: CabinClass[] = ['ECONOMY', 'PREMIUM_ECONOMY', 'BUSINESS', 'FIRST'];
    
    return cabinClasses.map(cabinClass => ({
      value: cabinClass,
      label: cabinClass
        .split('_')
        .map(word => word.charAt(0) + word.slice(1).toLowerCase())
        .join(' ')
    }));
};
export const getMaxStopsOptions = () => {
    type MaxStops = NonNullable<FlightPreferences['maxStops']>;
    
    const maxStopOptions: MaxStops[] = ['ANY', 'DIRECT', 'ONE_STOP', 'TWO_STOPS'];
    
    return maxStopOptions.map(maxStopOption => ({
      value: maxStopOption,
      label: maxStopOption
        .split('_')
        .map(word => word.charAt(0)+ word.slice(1).toLowerCase())
        .join(' ')
    }));
  };
```
# src/features/travel-manager-portal/utils/getPreferenceOptions/groundTransportPreferences.ts
```ts
import { GroundTransportPreferences } from "@/types/Trip/subtypes/GuestTypePreferences/subtypes/GroundTransportPreferences";
export const getGrondTransportOptions = () => {
    type GroundServices = NonNullable<GroundTransportPreferences['preferredServices']>;
    
    const groundServices: GroundServices[] = ['UBER', 'LYFT'];
    
    return groundServices.map(services => ({
      value: services,
      label: services
        .split('_')
        .map(word => word.charAt(0) + word.slice(1).toLowerCase())
        .join(' ')
    }));
};
```
# src/features/travel-manager-portal/utils/getPreferenceOptions/hotelPreferences.ts
```ts
import { HotelPreferences } from "@/types/Trip/subtypes/GuestTypePreferences/subtypes/HotelPreferences";
export const getHotelRating = () => {
    type HotelRating = NonNullable<HotelPreferences['minimumRating']>;
    
    const hotelRatings: HotelRating[] = [1, 2, 3, 4, 5];
    
    return hotelRatings.map(hotelRating => ({
      value: hotelRating.toString(),
      label: `${'⭐'.repeat(hotelRating)} ${hotelRating}+ Rating`
    }));
};
```
# src/features/travel-manager-portal/utils/getSampleTripData.ts
```ts
import { Trip } from "@/types";
export const getSampleTripData = (): Trip[] => {
    return [
      {
        id: "T1001",
        guest: {
          id: "G1001",
          firstName: "Sarah",
          lastName: "Chen",
          email: "sarah.chen@company.com",
          phone: "+1-415-555-0101",
          nationality: "USA",
          passportNumber: "123456789",
          passportExpiryDate: new Date("2026-12-31"),
          loyaltyPrograms: [
            {
              provider: "United Airlines",
              programName: "MileagePlus",
              memberNumber: "UA123456",
              status: "1K"
            }
          ]
        },
        tripType: "business",
        status: "Completed",
        travelPreferences: {
          id: "TP1001",
          guestType: "executive",
          flight: {
            cabinClass: "business",
            maxStops: "nonstop",
            refundableTicket: true
          },
          hotel: {
            minimumRating: 5
          },
          groundTransport: {
            preferredServices: "uber"
          },
          dailyPerDiem: 150
        },
        itinerary: {
          id: "I1001",
          origin: "SFO",
          destination: "NYC",
          startDate: new Date("2025-03-15"),
          endDate: new Date("2025-03-17")
        },
        flights: {
          outbound: {
            id: "F1001",
            bookingReference: "ABC123",
            flightNumber: "UA123",
            airline: "United Airlines",
            origin: {
              airport: "SFO",
              terminal: "3"
            },
            destination: {
              airport: "JFK",
              terminal: "4"
            },
            departureTime: new Date("2025-03-15T08:00:00Z"),
            arrivalTime: new Date("2025-03-15T16:30:00Z"),
            price: 1200,
            bookingStatus: "confirmed"
          },
          return: {
            id: "F1002",
            bookingReference: "ABC124",
            flightNumber: "UA456",
            airline: "United Airlines",
            origin: {
              airport: "JFK",
              terminal: "4"
            },
            destination: {
              airport: "SFO",
              terminal: "3"
            },
            departureTime: new Date("2025-03-17T17:00:00Z"),
            arrivalTime: new Date("2025-03-17T20:30:00Z"),
            price: 1200,
            bookingStatus: "confirmed"
          }
        },
        hotel: {
          id: "H1001",
          bookingReference: "HIL789",
          name: "Four Seasons New York",
          location: {
            street: "57 E 57th St",
            city: "New York",
            state: "NY",
            country: "USA",
            postalCode: "10022"
          },
          checkIn: new Date("2025-03-15T15:00:00Z"),
          checkOut: new Date("2025-03-17T12:00:00Z"),
          roomType: "Executive Suite",
          price: 800,
          bookingStatus: "confirmed"
        },
        groundTransport: [
          {
            id: "GT1001",
            type: "uber",
            pickupLocation: {
              street: "SFO International Terminal",
              city: "San Francisco",
              state: "CA",
              country: "USA",
              postalCode: "94128"
            },
            dropoffLocation: {
              street: "57 E 57th St",
              city: "New York",
              state: "NY",
              country: "USA",
              postalCode: "10022"
            },
            estimatedPrice: 85,
            actualPrice: 92,
            status: "completed"
          }
        ],
        perDiem: {
          id: "PD1001",
          dailyRate: 150,
          startDate: new Date("2025-03-15"),
          endDate: new Date("2025-03-17"),
          totalAmount: 300,
          status: "approved",
          expenses: [
            {
              id: "E1001",
              category: "meals",
              amount: 145,
              date: new Date("2025-03-15"),
              receipt: "receipt_url_1",
              status: "approved",
              notes: "Business dinner with clients"
            }
          ]
        },
        created: new Date("2025-02-01T10:00:00Z"),
        modified: new Date("2025-02-15T14:30:00Z"),
        createdBy: "ADMIN_USER_001",
        totalBudget: 4000,
        actualSpend: 3737
      },
    
      // 2. Consultant Short Trip
      {
        id: "T1002",
        guest: {
          id: "G1002",
          firstName: "Mike",
          lastName: "Johnson",
          email: "mike.johnson@consultant.com",
          phone: "+1-312-555-0202",
          dietaryRestrictions: ["vegetarian"]
        },
        tripType: "consulting",
        status: "Completed",
        travelPreferences: {
          id: "TP1002",
          guestType: "consultant",
          flight: {
            cabinClass: "economy",
            maxStops: "1-stop",
            refundableTicket: false
          },
          hotel: {
            minimumRating: 3
          },
          groundTransport: {
            preferredServices: "lyft"
          },
          dailyPerDiem: 75
        },
        itinerary: {
          id: "I1002",
          origin: "ORD",
          destination: "SEA",
          startDate: new Date("2025-02-20"),
          endDate: new Date("2025-02-21")
        },
        flights: {
          outbound: {
            id: "F1003",
            bookingReference: "DEF456",
            flightNumber: "AS234",
            airline: "Alaska Airlines",
            origin: {
              airport: "ORD",
              terminal: "3"
            },
            destination: {
              airport: "SEA",
              terminal: "N"
            },
            departureTime: new Date("2025-02-20T06:00:00Z"),
            arrivalTime: new Date("2025-02-20T08:45:00Z"),
            price: 350,
            bookingStatus: "confirmed"
          }
        },
        hotel: {
          id: "H1002",
          bookingReference: "MAR456",
          name: "Courtyard Seattle Downtown",
          location: {
            street: "612 2nd Ave",
            city: "Seattle",
            state: "WA",
            country: "USA",
            postalCode: "98104"
          },
          checkIn: new Date("2025-02-20T15:00:00Z"),
          checkOut: new Date("2025-02-21T12:00:00Z"),
          roomType: "Standard King",
          price: 200,
          bookingStatus: "confirmed"
        },
        created: new Date("2025-01-15T09:00:00Z"),
        modified: new Date("2025-01-15T09:00:00Z"),
        createdBy: "ADMIN_USER_002",
        totalBudget: 800,
        actualSpend: 625
      },
}   
```
# src/features/travel-manager-portal/utils/index.ts
```ts
export * from './getPreferenceOptions/flightPreferences'
export * from './getPreferenceOptions/groundTransportPreferences'
export * from './getPreferenceOptions/hotelPreferences'
```
# src/layouts/AuthLayout/AuthLayout.scss
```scss
.auth-layout {
    min-height: 100vh;
    background-color: var(--color-background);
    
    &__container {
      width: 100%;
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 var(--space-4);
    }
    
    &__main {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: calc(100vh - 73px); // Full height minus header
      padding: var(--space-8);
      
      .auth-layout__container {
        max-width: 400px;
        &--register {
          max-width: 700px;
        }
      }
    }
  }
```
# src/layouts/AuthLayout/AuthLayout.tsx
```tsx
import { FC } from "react"
import { Outlet, useLocation } from "react-router-dom"
import "./AuthLayout.scss"
export const AuthLayout: FC = () => {
    const locattion = useLocation();
    const isRegisterPage = locattion.pathname === "/register";
    return (
        <div className="auth-layout">
            <main className="auth-layout__main">
                <div className={`auth-layout__container ${isRegisterPage ? "auth-layout__container--register" : ""}`}>
                    <Outlet />
                </div>
            </main>
        </div>
    )
}
export default AuthLayout
```
# src/layouts/AuthLayout/index.ts
```ts
export { AuthLayout } from './AuthLayout';
```
# src/layouts/DefaultLayout/DefaultLayout.tsx
```tsx
import { FC } from "react"
import { Outlet } from "react-router-dom"
import { TravelMgrPortalHeader } from "@/components/TravelMgrPortalHeader/TravelMgrPortalHeader"
import { AppShell, Container } from '@mantine/core'
const DefaultLayout: FC = () => {
    
    return (
        <AppShell
            header={{ height: 60 }}
            padding="md"
            bg="var(--mantine-color-gray-0)"
        >
        <AppShell.Header >
            <TravelMgrPortalHeader />
        </AppShell.Header>
        <AppShell.Main pt={60}>
            {/* <Container size="xl"> */}
            <Outlet />
            {/* </Container> */}
        </AppShell.Main>
        </AppShell>
    )
}
export default DefaultLayout;
```
# src/layouts/DefaultLayout/index.ts
```ts
export { default as DefaultLayout } from "./DefaultLayout"
```
# src/layouts/GuestLayout/GuestLayout.scss
```scss
.guest-layout {
    min-height: 100vh;
    background-color: var(--color-background);
    
    &__header {
      background-color: var(--color-card);
      padding: var(--space-4);
      border-bottom: 1px solid var(--color-border);
    }
    
    &__container {
      width: 100%;
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 var(--space-4);
    }
    
    &__logo {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--color-foreground);
    }
    
    &__main {
      padding: var(--space-6) 0;
    }
  }
```
# src/layouts/GuestLayout/GuestLayout.tsx
```tsx
import { FC } from "react"
import { Outlet } from "react-router-dom"
import "./GuestLayout.scss"
const GuestLayout: FC = () => {
    return (
        <div className="guest-layout">
            <header className="guest-layout__header">
                <div className="guest-layout__container">
                    <div className="guest-layout__logo">
                        TravelPortal
                    </div>
                </div>
            </header>
            <main className="guest-layout__main">
                <div className="guest-layout__container">
                    <Outlet />
                </div>
            </main>
        </div>
    )
}
export default GuestLayout
```
# src/layouts/index.ts
```ts
export * from './TravelMgrPageLayout/TravelMgrPageLayout'
```
# src/layouts/TravelMgrPageLayout/TravelMgrPageLayout.module.scss
```scss
.pageLayout {
    width: 100%;
  }
  
  .main {
    max-width: 1200px;
    margin: 0 auto;
    padding: var(--mantine-spacing-xl);
  }
  
  .header {
    display: flex;
    flex-direction: column;
    gap: var(--mantine-spacing-md);
    margin-bottom: var(--mantine-spacing-xl);
  
    @media (min-width: 640px) {
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }
  }
  
  .titleGroup {
    flex: 1;
  }
  
  .title {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--mantine-color-black);
  }
  
  .subtitle {
    color: var(--mantine-color-dimmed);
    margin-top: 0.25rem;
  }
  
  .action {
    flex-shrink: 0;
  }
```
# src/layouts/TravelMgrPageLayout/TravelMgrPageLayout.tsx
```tsx
import { ReactNode } from 'react';
import styles from './TravelMgrPageLayout.module.scss';
interface PageLayoutProps {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  children: ReactNode;
}
export const TravelMgrPageLayout = ({ 
  title, 
  subtitle, 
  action,
  children 
}: PageLayoutProps) => {
  return (
    <div className={styles.pageLayout}>
      <main className={styles.main}>
        <div className={styles.header}>
          <div className={styles.titleGroup}>
            <h1 className={styles.title}>{title}</h1>
            {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          </div>
          {action && (
            <div className={styles.action}>
              {action}
            </div>
          )}
        </div>
        {children}
      </main>
    </div>
  );
};
```
# src/lib/utils/calculateTripLength.ts
```ts
import { Trip } from '@/types';
//Helper function to calculate trip length in days
export const calculateTripLength =(trip: Trip): number => {
    let startDate: Date;
    let endDate: Date;
    if (trip.itinerary.startDate && trip.itinerary.endDate){
        // If there are flights, use flight dates, else use hotel dates
        startDate = trip.itinerary.startDate;
        endDate = trip.itinerary.endDate;
        // Calculate difference in days
        const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    }else return 0
}
```
# src/lib/utils/className.ts
```ts
type ClassValue = string | number | boolean | undefined | null | Record<string, any> | ClassValue[];
export function cn(...inputs: ClassValue[]): string {
  const classes: string[] = [];
  for (const input of inputs) {
    if (!input) continue;
    if (typeof input === 'string' || typeof input === 'number') {
      classes.push(String(input));
    } else if (Array.isArray(input)) {
      const nestedClasses = cn(...input);
      if (nestedClasses) classes.push(nestedClasses);
    } else if (typeof input === 'object') {
      for (const [key, value] of Object.entries(input)) {
        if (value) classes.push(key);
      }
    }
  }
  return classes.join(' ').trim();
}
```
# src/lib/utils/formatDate.ts
```ts
// Helper function to format date
export const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
  export const formatStartDate = (date: Date): string => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
    }).format(date);
  };
  
  export const formatEndDate = (date: Date): string => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };
```
# src/lib/utils/index.ts
```ts
export * from './calculateTripLength';
export * from './className';
export * from './formatDate';
```
# src/main.tsx
```tsx
import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import { QueryClientProvider } from "@tanstack/react-query"
import { HelmetProvider } from 'react-helmet-async'
//import { ThemeProvider } from "~/contexts/ThemeContext"
import { AuthProvider } from "@/contexts/AuthContext"
import { MantineProvider } from "@mantine/core"
import '@mantine/core/styles.css'
import '@mantine/charts/styles.css'
import '@mantine/dates/styles.css'
import { queryClient } from "~/api/query-client"
import App from "./App"
import "./styles/index.scss"
ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
          <HelmetProvider>
            <QueryClientProvider client={queryClient}>
                <AuthProvider>
                    {/*<ThemeProvider>*/}
                    <MantineProvider defaultColorScheme="auto">
                        <BrowserRouter>
                            <App />
                        </BrowserRouter>
                    </MantineProvider>
                    {/*</ThemeProvider>*/}
                </AuthProvider>
                </QueryClientProvider>
          </HelmetProvider>
    </React.StrictMode>
)
```
# src/routes/confirmation/index.tsx
```tsx
import { FC } from 'react';
import { Helmet } from 'react-helmet-async';
import { ConfirmSignup} from '@/features/auth/ConfirmSignup/ConfirmSignup';
export const ConfirmationPage: FC = () => {
    return (
        <>
            <Helmet>
                <title> Confirm Signup | TravelPortal </title>
                <meta name="description" content="Confirm your corporate travel account" />
            </Helmet>
            <ConfirmSignup />
        </>
    );
}
```
# src/routes/dashboard/index.tsx
```tsx
import { FC } from 'react';
import { Helmet } from 'react-helmet-async';
import Dashboard from '@/features/travel-manager-portal/Dashboard/dashboard';
export const DashboardPage: FC = () => {
  return (
    <>
      <Helmet>
        <title>Dashboard | TravelPortal</title>
        <meta name="description" content="Manage your guest travel arrangements" />
      </Helmet>
      <Dashboard />
    </>
  );
}
export default DashboardPage;
```
# src/routes/guestdashboard/GuestDashboard.scss
```scss
.guest-dashboard {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  .introduction-section {
    margin-bottom: 2rem;
    .intro-content {
      padding: 1.5rem;
      .intro-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 2rem;
        .welcome-info {
          h1 {
            font-size: 2rem;
            font-weight: 600;
            color: var(--color-foreground);
            margin-bottom: 0.5rem;
          }
          .trip-countdown {
            color: var(--color-primary);
            font-weight: 500;
            margin-bottom: 1rem;
          }
          .intro-description {
            color: var(--color-muted-foreground);
            font-size: 1rem;
          }
        }
        .weather-widget {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          background-color: var(--color-background);
          border-radius: 0.5rem;
          
          img {
            width: 3rem;
            height: 3rem;
          }
          .weather-details {
            display: flex;
            flex-direction: column;
            .temperature {
              font-size: 1.25rem;
              font-weight: 600;
            }
            .condition {
              color: var(--color-muted-foreground);
              font-size: 0.875rem;
            }
          }
        }
      }
      .intro-features {
        list-style: none;
        padding: 0;
        margin: 0 0 1.5rem 0;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 1.25rem;
        li {
          display: flex;
          align-items: center;
          gap: 1rem;
          color: var(--color-foreground);
          .feature-icon {
            width: 1.5rem;
            height: 1.5rem;
            color: var(--color-primary);
            flex-shrink: 0;
          }
          span {
            font-size: 0.975rem;
          }
        }
      }
      .intro-help {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        font-size: 0.875rem;
        color: var(--color-muted-foreground);
        padding-top: 1rem;
        border-top: 1px solid var(--color-border);
        .help-icon {
          width: 1.25rem;
          height: 1.25rem;
          color: var(--color-primary);
        }
      }
    }
    @media (max-width: 768px) {
      .intro-content {
        .intro-header {
          flex-direction: column;
          gap: 1.5rem;
          .weather-widget {
            width: 100%;
            justify-content: center;
          }
        }
        .intro-features {
          grid-template-columns: 1fr;
        }
      }
    }
  }
  .dashboard-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    .welcome-section {
      h1 {
        font-size: 2rem;
        font-weight: 600;
        color: var(--color-foreground);
        margin-bottom: 0.5rem;
      }
      .trip-countdown {
        color: var(--color-muted-foreground);
        font-size: 1rem;
      }
    }
    .weather-widget {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem;
      background-color: var(--color-card);
      border-radius: 0.5rem;
      box-shadow: var(--shadow-sm);
      img {
        width: 3rem;
        height: 3rem;
      }
      .weather-details {
        display: flex;
        flex-direction: column;
        .temperature {
          font-size: 1.25rem;
          font-weight: 600;
        }
        .condition {
          color: var(--color-muted-foreground);
          font-size: 0.875rem;
        }
      }
    }
  }
  .trip-overview {
    margin-bottom: 2rem;
    .trip-details {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
      padding: 1.5rem;
      .detail-item {
        display: flex;
        align-items: flex-start;
        gap: 1rem;
        .icon {
          width: 1.5rem;
          height: 1.5rem;
          color: var(--color-primary);
          flex-shrink: 0;
        }
        .detail-content {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          .label {
            color: var(--color-muted-foreground);
            font-size: 0.875rem;
          }
          .value {
            font-weight: 500;
            color: var(--color-foreground);
          }
        }
      }
    }
  }
   .action-cards {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
    margin-bottom: 2rem;
    
    @media (min-width: 640px) {
      grid-template-columns: repeat(2, 1fr);
      max-width: 1fr;
      margin-left: auto;
      margin-right: auto;
    }
    .action-item {
      padding: 1.5rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-left: 4px solid transparent;
      &.status-pending {
        border-left-color: #f59e0b;
      }
      &.status-confirmed {
        border-left-color: #10b981;
      }
      &.status-completed {
        border-left-color: #6366f1;
      }
      &.status-in-progress {
        border-left-color: #3b82f6;
      }
      .action-content {
        h3 {
          font-size: 1.125rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: var(--color-foreground);
        }
        p {
          color: var(--color-muted-foreground);
          font-size: 0.875rem;
        }
      }
      .action-button {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        color: var(--color-muted-foreground);
        .button-icon {
          width: 1.25rem;
          height: 1.25rem;
        }
      }
    }
  }
  .notifications {
    .notification-header {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-bottom: 1rem;
      padding: 1.5rem 1.5rem 0;
      .icon {
        width: 1.5rem;
        height: 1.5rem;
        color: var(--color-primary);
      }
      h3 {
        font-size: 1.125rem;
        font-weight: 600;
        color: var(--color-foreground);
      }
    }
    .notification-list {
      list-style: none;
      padding: 0 1.5rem 1.5rem;
      li {
        position: relative;
        padding-left: 1.5rem;
        margin-bottom: 0.75rem;
        color: var(--color-muted-foreground);
        font-size: 0.875rem;
        &:before {
          content: "•";
          position: absolute;
          left: 0;
          color: var(--color-primary);
        }
        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }
  @media (max-width: 768px) {
    padding: 1rem;
    .dashboard-header {
      flex-direction: column;
      align-items: flex-start;
      gap: 1rem;
    }
    .action-cards {
      grid-template-columns: 1fr;
    }
    .trip-details {
      grid-template-columns: 1fr;
    }
  }
}
```
# src/routes/guestdashboard/GuestDashboard.tsx
```tsx
import React from 'react';
import './GuestDashboard.scss';
import { MapPin, Calendar, AlertCircle, ChevronRight, Plane, Building2, Car, Receipt, HelpCircle } from 'lucide-react';
import { Card } from '@/components/Card/card';
import Button from '@/components/Button/button';
interface TripStatus {
  flight: {
    status: 'pending' | 'confirmed' | 'completed';
    details?: string;
  };
  hotel: {
    status: 'pending' | 'confirmed' | 'completed';
    details?: string;
  };
  transport: {
    status: 'pending' | 'confirmed' | 'completed';
    details?: string;
  };
  expenses: {
    status: 'pending' | 'in-progress' | 'submitted';
    details?: string;
  };
}
interface GuestDashboardProps {
  guestName: string;
  tripDates: {
    start: string;
    end: string;
  };
  location: {
    origin: string;
    destination: string;
  };
  weather?: {
    temperature: string;
    condition: string;
    icon: string;
  };
  tripStatus: TripStatus;
  onActionClick: (action: string) => void;
}
const GuestDashboard: React.FC<GuestDashboardProps> = ({
  guestName,
  tripDates,
  location,
  weather,
  tripStatus,
  onActionClick
}) => {
  const getStatusClass = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'status-confirmed';
      case 'completed':
        return 'status-completed';
      case 'in-progress':
        return 'status-in-progress';
      default:
        return 'status-pending';
    }
  };
  const calculateDaysUntilTrip = () => {
    const start = new Date(tripDates.start);
    const today = new Date();
    const diffTime = start.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };
  return (
    <div className="guest-dashboard">
        <div className="introduction-section">
        <Card>
          <div className="intro-content">
            <div className="intro-header">
              <div className="welcome-info">
                <h1>Welcome, {guestName}</h1>
                <p className="trip-countdown">{calculateDaysUntilTrip()} days until your trip</p>
                <p className="intro-description">
                  This is your personal dashboard for managing all aspects of your upcoming visit. Here's what you can do:
                </p>
              </div>
              {weather && (
                <div className="weather-widget">
                  <img src={weather.icon} alt={weather.condition} />
                  <div className="weather-details">
                    <span className="temperature">{weather.temperature}</span>
                    <span className="condition">{weather.condition}</span>
                  </div>
                </div>
              )}
            </div>
            <ul className="intro-features">
              <li>
                <Plane className="feature-icon" />
                <span>Book flights</span>
              </li>
              <li>
                <Building2 className="feature-icon" />
                <span>View hotel details</span>
              </li>
              <li>
                <Car className="feature-icon" />
                <span>Set up ground transportation</span>
              </li>
              <li>
                <Receipt className="feature-icon" />
                <span>Submit travel expenses</span>
              </li>
            </ul>
            <p className="intro-help">
              <HelpCircle className="help-icon" />
              Need help? Contact your travel coordinator or click the support button in the top right corner.
            </p>
          </div>
        </Card>
      </div>
      <div className="trip-overview">
        <Card>
          <div className="trip-details">
            <div className="detail-item">
              <Calendar className="icon" />
              <div className="detail-content">
                <span className="label">Trip Dates</span>
                <span className="value">{tripDates.start} - {tripDates.end}</span>
              </div>
            </div>
            <div className="detail-item">
              <MapPin className="icon" />
              <div className="detail-content">
                <span className="label">Location</span>
                <span className="value">{location.origin} → {location.destination}</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
      <div className="action-cards">
        <Card>
          <div className={`action-item ${getStatusClass(tripStatus.flight.status)}`}>
            <div className="action-content">
              <h3>Flight Booking</h3>
              <p>{tripStatus.flight.details || 'Action required'}</p>
            </div>
            <Button 
              variant="outline"
              onClick={() => window.location.href = '/guest/flights'}
              className="action-button"
            >
              <span>Manage Flight</span>
              <ChevronRight className="button-icon" />
            </Button>
          </div>
        </Card>
        <Card>
          <div className={`action-item ${getStatusClass(tripStatus.hotel.status)}`}>
            <div className="action-content">
              <h3>Hotel Details</h3>
              <p>{tripStatus.hotel.details || 'View accommodation details'}</p>
            </div>
            <Button 
              variant="outline"
              onClick={() => window.location.href = '/guest/hotel'}
              className="action-button"
            >
              <span>View Hotel</span>
              <ChevronRight className="button-icon" />
            </Button>
          </div>
        </Card>
        <Card>
          <div className={`action-item ${getStatusClass(tripStatus.transport.status)}`}>
            <div className="action-content">
              <h3>Ground Transport</h3>
              <p>{tripStatus.transport.details || 'Set up transportation'}</p>
            </div>
            <Button 
              variant="outline"
              onClick={() => window.location.href = '/guest/transport'}
              className="action-button"
            >
              <span>Arrange Transport</span>
              <ChevronRight className="button-icon" />
            </Button>
          </div>
        </Card>
        <Card>
          <div className={`action-item ${getStatusClass(tripStatus.expenses.status)}`}>
            <div className="action-content">
              <h3>Expenses</h3>
              <p>{tripStatus.expenses.details || 'Track your expenses'}</p>
            </div>
            <Button 
              variant="outline"
              onClick={() => window.location.href = '/guest/expenses'}
              className="action-button"
            >
              <span>Manage Expenses</span>
              <ChevronRight className="button-icon" />
            </Button>
          </div>
        </Card>
      </div>
      <div className="notifications">
        <Card>
          <div className="notification-header">
            <AlertCircle className="icon" />
            <h3>Important Reminders</h3>
          </div>
          <ul className="notification-list">
            <li>Complete your flight booking at least 2 weeks before departure</li>
            <li>Download required travel apps before your trip</li>
            <li>Submit expenses within 30 days of trip completion</li>
          </ul>
        </Card>
      </div>
    </div>
  );
};
export default GuestDashboard;
```
# src/routes/guestdashboard/index.tsx
```tsx
import { FC } from 'react';
import { Helmet } from 'react-helmet-async';
import  GuestDashboard from './GuestDashboard';
export const GuestDashboardPage: FC = () => {
  const handleActionClick = (action: string) => {
    // Handle different actions (flight, hotel, etc.)
    console.log(`Action clicked: ${action}`);
  };
  return (
    <>
      <Helmet>
        <title>Trip Dashboard | TravelPortal</title>
        <meta name="description" content="Manage your travel arrangements" />
      </Helmet>
      <GuestDashboard
        guestName="John Doe"
        tripDates={{
          start: "2024-02-15",
          end: "2024-02-20"
        }}
        location={{
          origin: "San Francisco",
          destination: "New York"
        }}
        weather={{
          temperature: "72°F",
          condition: "Sunny",
          icon: "/weather-icon.svg"
        }}
        tripStatus={{
          flight: { status: "pending", details: "Booking required" },
          hotel: { status: "confirmed", details: "Hilton Downtown" },
          transport: { status: "pending", details: "Setup required" },
          expenses: { status: "pending", details: "No expenses submitted" }
        }}
        onActionClick={handleActionClick}
      />
    </>
  );
}
export default GuestDashboardPage;
```
# src/routes/guestexpenses/GuestExpenses.scss
```scss
.guest-expenses {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  
    &__overview {
      .expense-stats {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 2rem;
      }
  
      .stat-item {
        display: flex;
        align-items: center;
        gap: 1rem;
  
        .stat-icon {
          width: 2rem;
          height: 2rem;
          color: var(--color-primary);
        }
  
        .stat-content {
          display: flex;
          flex-direction: column;
        }
  
        .stat-label {
          font-size: 0.875rem;
          color: var(--color-muted-foreground);
        }
  
        .stat-value {
          font-size: 1.5rem;
          font-weight: 600;
          color: var(--color-foreground);
        }
      }
    }
  
    &__actions {
      .expense-form {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
  
        &__fields {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
        }
  
        .form-field {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
  
          label {
            font-size: 0.875rem;
            font-weight: 500;
            color: var(--color-foreground);
          }
        }
  
        .receipt-upload {
          display: flex;
          flex-direction: column;
          gap: 1rem;
  
          .selected-file {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0.5rem;
            background-color: var(--color-muted);
            border-radius: 0.5rem;
  
            span {
              font-size: 0.875rem;
              color: var(--color-muted-foreground);
            }
          }
        }
  
        .submit-button {
          align-self: flex-end;
        }
  
        .button-icon {
          width: 1rem;
          height: 1rem;
        }
      }
    }
  
    &__history {
      .expense-list {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }
  
      .expense-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem;
        border-radius: 0.5rem;
        border: 1px solid var(--color-border);
  
        &__details {
          display: flex;
          gap: 2rem;
          align-items: center;
        }
  
        &__status {
          text-transform: capitalize;
          font-size: 0.875rem;
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
        }
  
        &.status-pending {
          background-color: var(--color-muted);
          .expense-item__status {
            background-color: #fef3c7;
            color: #92400e;
          }
        }
  
        &.status-approved {
          .expense-item__status {
            background-color: #dcfce7;
            color: #166534;
          }
        }
  
        &.status-rejected {
          .expense-item__status {
            background-color: #fee2e2;
            color: #991b1b;
          }
        }
  
        .expense-date {
          color: var(--color-muted-foreground);
        }
  
        .expense-category {
          font-weight: 500;
        }
  
        .expense-amount {
          font-weight: 600;
        }
      }
    }
  }
  
  @media (max-width: 768px) {
    .guest-expenses {
      .expense-stats {
        grid-template-columns: 1fr;
        gap: 1rem;
      }
  
      .expense-form__fields {
        grid-template-columns: 1fr;
      }
  
      .expense-item {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.5rem;
  
        &__details {
          flex-direction: column;
          gap: 0.25rem;
        }
      }
    }
  }
```
# src/routes/guestexpenses/GuestExpenses.tsx
```tsx
import React, { useState } from 'react';
import { DollarSign, Upload, Clock, FileCheck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/Card/card';
import Button from '@/components/Button/button';
import { Input } from '@mantine/core';
import './GuestExpenses.scss';
interface Expense {
  id: string;
  date: string;
  amount: number;
  category: string;
  status: 'pending' | 'approved' | 'rejected';
  receiptUrl?: string;
}
interface GuestExpensesProps {
  perDiem: {
    dailyAmount: number;
    totalAvailable: number;
    remainingDays: number;
  };
  expenses: Expense[];
  onUploadReceipt: (file: File) => Promise<void>;
  onSubmitExpense: (expense: Omit<Expense, 'id' | 'status'>) => Promise<void>;
}
const GuestExpenses: React.FC<GuestExpensesProps> = ({
  perDiem,
  expenses,
  onUploadReceipt,
  onSubmitExpense
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [newExpense, setNewExpense] = useState({
    date: '',
    amount: '',
    category: '',
    description: ''
  });
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };
  const handleUpload = async () => {
    if (!selectedFile) return;
    
    setIsUploading(true);
    try {
      await onUploadReceipt(selectedFile);
      setSelectedFile(null);
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setIsUploading(false);
    }
  };
  const handleSubmitExpense = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newExpense.amount || !newExpense.date || !newExpense.category) return;
    try {
      await onSubmitExpense({
        date: newExpense.date,
        amount: Number(newExpense.amount),
        category: newExpense.category
      });
      setNewExpense({ date: '', amount: '', category: '', description: '' });
    } catch (error) {
      console.error('Failed to submit expense:', error);
    }
  };
  const totalSubmitted = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const remainingBudget = perDiem.totalAvailable - totalSubmitted;
  return (
    <div className="guest-expenses">
      <div className="guest-expenses__overview">
        <Card>
          <CardHeader>
            <CardTitle>Expense Overview</CardTitle>
            <CardDescription>Track your travel expenses and per diem</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="expense-stats">
              <div className="stat-item">
                <DollarSign className="stat-icon" />
                <div className="stat-content">
                  <span className="stat-label">Daily Per Diem</span>
                  <span className="stat-value">${perDiem.dailyAmount}</span>
                </div>
              </div>
              <div className="stat-item">
                <Clock className="stat-icon" />
                <div className="stat-content">
                  <span className="stat-label">Remaining Days</span>
                  <span className="stat-value">{perDiem.remainingDays}</span>
                </div>
              </div>
              <div className="stat-item">
                <FileCheck className="stat-icon" />
                <div className="stat-content">
                  <span className="stat-label">Remaining Budget</span>
                  <span className="stat-value">${remainingBudget}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="guest-expenses__actions">
        <Card>
          <CardHeader>
            <CardTitle>Submit New Expense</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmitExpense} className="expense-form">
              <div className="expense-form__fields">
                <div className="form-field">
                  <label>Date</label>
                  <Input
                    type="date"
                    value={newExpense.date}
                    onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })}
                    required
                  />
                </div>
                <div className="form-field">
                  <label>Amount</label>
                  <Input
                    type="number"
                    value={newExpense.amount}
                    onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                    placeholder="Enter amount"
                    required
                  />
                </div>
                <div className="form-field">
                  <label>Category</label>
                  <Input
                    type="text"
                    value={newExpense.category}
                    onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
                    placeholder="e.g., Meals, Transport"
                    required
                  />
                </div>
              </div>
              
              <div className="receipt-upload">
                <input
                  type="file"
                  id="receipt"
                  accept="image/*,.pdf"
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById('receipt')?.click()}
                >
                  <Upload className="button-icon" />
                  Select Receipt
                </Button>
                {selectedFile && (
                  <div className="selected-file">
                    <span>{selectedFile.name}</span>
                    <Button
                      type="button"
                      variant="default"
                      onClick={handleUpload}
                      isLoading={isUploading}
                    >
                      Upload
                    </Button>
                  </div>
                )}
              </div>
              <Button type="submit" variant="default" className="submit-button">
                Submit Expense
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
      <div className="guest-expenses__history">
        <Card>
          <CardHeader>
            <CardTitle>Expense History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="expense-list">
              {expenses.map((expense) => (
                <div key={expense.id} className={`expense-item status-${expense.status}`}>
                  <div className="expense-item__details">
                    <span className="expense-date">{expense.date}</span>
                    <span className="expense-category">{expense.category}</span>
                    <span className="expense-amount">${expense.amount}</span>
                  </div>
                  <div className="expense-item__status">
                    {expense.status}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
export default GuestExpenses;
```
# src/routes/guestexpenses/index.tsx
```tsx
import { FC, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import GuestExpenses from './GuestExpenses';
const mockExpenses = [
    {
      id: '1',
      date: '2024-01-20',
      amount: 45.50,
      category: 'Meals',
      status: 'approved' as const
    },
    {
      id: '2',
      date: '2024-01-21',
      amount: 25.00,
      category: 'Transport',
      status: 'pending' as const
    }
  ];
  
  const mockPerDiem = {
    dailyAmount: 75,
    totalAvailable: 375,
    remainingDays: 5
  };
  
  export const GuestExpensesPage: FC = () => {
    const [expenses, setExpenses] = useState(mockExpenses);
    const [perDiem] = useState(mockPerDiem);
  
    const handleUploadReceipt = async (file: File) => {
      // Simulated upload delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Receipt uploaded:', file.name);
    };
  
    const handleSubmitExpense = async (expense: any) => {
      // Simulated submission delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newExpense = {
        id: String(Date.now()),
        ...expense,
        status: 'pending' as const
      };
  
      setExpenses(prev => [...prev, newExpense]);
      console.log('Expense submitted:', newExpense);
    };
  
    return (
      <>
        <Helmet>
          <title>Expenses | TravelPortal</title>
          <meta name="description" content="Manage your travel expenses" />
        </Helmet>
        <GuestExpenses
          perDiem={perDiem}
          expenses={expenses}
          onUploadReceipt={handleUploadReceipt}
          onSubmitExpense={handleSubmitExpense}
        />
      </>
    );
  };
  
  export default GuestExpensesPage;
```
# src/routes/guestflightbooking/index.tsx
```tsx
import { FC } from 'react';
import { Helmet } from 'react-helmet-async';
import { GuestFlightBooking } from '../../features/guest-flights/GuestFlightBooking';
export const GuestFlightsPage: FC = () => {
  return (
    <>
      <Helmet>
        <title>Flight Selection | TravelPortal</title>
        <meta name="description" content="Select your flights" />
      </Helmet>
      <GuestFlightBooking />
    </>
  );
}
export default GuestFlightsPage;
```
# src/routes/guesthotel/GuestHotel.scss
```scss
.guest-hotel {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
  
    &__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
  
      h1 {
        font-size: 2rem;
        font-weight: 600;
        color: var(--color-foreground);
      }
    }
  
    &__content {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }
  }
  
  .status-badge {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    border-radius: 9999px;
    font-size: 0.875rem;
    font-weight: 500;
  
    &--confirmed {
      background-color: #dcfce7;
      color: #166534;
    }
  
    &--pending {
      background-color: #fef9c3;
      color: #854d0e;
    }
  
    &--completed {
      background-color: #e0e7ff;
      color: #4338ca;
    }
  }
  
  .hotel-summary {
    .card-icon {
      width: 1.5rem;
      height: 1.5rem;
      margin-right: 0.75rem;
      vertical-align: middle;
    }
  
    &__details {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      margin-bottom: 1.5rem;
    }
  
    .detail-item {
      display: flex;
      align-items: flex-start;
      gap: 0.75rem;
  
      .detail-icon {
        width: 1.25rem;
        height: 1.25rem;
        color: var(--color-muted-foreground);
        flex-shrink: 0;
      }
  
      p {
        margin: 0;
        color: var(--color-foreground);
      }
    }
  
    .confirmation-number {
      padding: 1rem;
      background-color: var(--color-muted);
      border-radius: 0.5rem;
      margin-bottom: 1.5rem;
      font-size: 0.875rem;
      color: var(--color-muted-foreground);
  
      strong {
        color: var(--color-foreground);
        font-weight: 600;
      }
    }
  
    .action-buttons {
      display: flex;
      gap: 1rem;
  
      button {
        flex: 1;
      }
    }
  }
  
  .hotel-info-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
  
    .amenities-list,
    .info-list {
      list-style: none;
      padding: 0;
      margin: 0;
  
      li {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem 0;
        color: var(--color-foreground);
        font-size: 0.875rem;
  
        &:not(:last-child) {
          border-bottom: 1px solid var(--color-border);
        }
      }
    }
  
    .list-icon {
      width: 1rem;
      height: 1rem;
      color: var(--color-primary);
    }
  }
  
  @media (max-width: 768px) {
    .guest-hotel {
      padding: 1rem;
  
      &__header {
        flex-direction: column;
        align-items: flex-start;
        gap: 1rem;
      }
    }
  
    .hotel-summary {
      .action-buttons {
        flex-direction: column;
      }
    }
  }
```
# src/routes/guesthotel/GuestHotel.tsx
```tsx
import React from 'react';
import { Building2, Calendar, MapPin, Users, Check, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/Card/card";
import Button from "@/components/Button/button";
import './GuestHotel.scss';
interface HotelDetails {
  name: string;
  address: string;
  checkIn: string;
  checkOut: string;
  roomType: string;
  confirmationNumber: string;
  status: 'confirmed' | 'pending' | 'completed';
  amenities: string[];
  importantInfo: string[];
}
const GuestHotel: React.FC = () => {
  // This would eventually come from your API
  const hotelDetails: HotelDetails = {
    name: "Hilton Downtown",
    address: "123 Business District, New York, NY 10001",
    checkIn: "Feb 15, 2024 - 3:00 PM",
    checkOut: "Feb 20, 2024 - 11:00 AM",
    roomType: "King Bed Business Suite",
    confirmationNumber: "HT123456789",
    status: "confirmed",
    amenities: [
      "Free Wi-Fi",
      "Business Center",
      "24/7 Fitness Center",
      "Room Service",
      "Airport Shuttle"
    ],
    importantInfo: [
      "Photo ID required at check-in",
      "Credit card required for incidentals",
      "Non-smoking property",
      "Early check-in subject to availability"
    ]
  };
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'status-badge--confirmed';
      case 'completed':
        return 'status-badge--completed';
      default:
        return 'status-badge--pending';
    }
  };
  return (
    <div className="guest-hotel">
      <div className="guest-hotel__header">
        <h1>Hotel Details</h1>
        <span className={`status-badge ${getStatusBadgeClass(hotelDetails.status)}`}>
          {hotelDetails.status === 'confirmed' && <Check size={16} />}
          {hotelDetails.status === 'pending' && <Clock size={16} />}
          {hotelDetails.status.charAt(0).toUpperCase() + hotelDetails.status.slice(1)}
        </span>
      </div>
      <div className="guest-hotel__content">
        <Card className="hotel-summary">
          <CardHeader>
            <CardTitle>
              <Building2 className="card-icon" />
              {hotelDetails.name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="hotel-summary__details">
              <div className="detail-item">
                <MapPin className="detail-icon" />
                <p>{hotelDetails.address}</p>
              </div>
              
              <div className="detail-item">
                <Calendar className="detail-icon" />
                <div>
                  <p>Check-in: {hotelDetails.checkIn}</p>
                  <p>Check-out: {hotelDetails.checkOut}</p>
                </div>
              </div>
              
              <div className="detail-item">
                <Users className="detail-icon" />
                <p>{hotelDetails.roomType}</p>
              </div>
            </div>
            <div className="confirmation-number">
              Confirmation Number: <strong>{hotelDetails.confirmationNumber}</strong>
            </div>
            <div className="action-buttons">
              <Button variant="default">
                Add to Calendar
              </Button>
              <Button variant="outline">
                View on Map
              </Button>
            </div>
          </CardContent>
        </Card>
        <div className="hotel-info-grid">
          <Card>
            <CardHeader>
              <CardTitle>Amenities</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="amenities-list">
                {hotelDetails.amenities.map((amenity, index) => (
                  <li key={index}>
                    <Check className="list-icon" />
                    {amenity}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Important Information</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="info-list">
                {hotelDetails.importantInfo.map((info, index) => (
                  <li key={index}>{info}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
export default GuestHotel;
```
# src/routes/guesthotel/index.tsx
```tsx
import { FC } from 'react';
import { Helmet } from 'react-helmet-async';
import GuestHotel from './GuestHotel';
export const GuestHotelPage: FC = () => {
  return (
    <>
      <Helmet>
        <title>Hotel Details | TravelPortal</title>
        <meta name="description" content="View your hotel booking details and information" />
      </Helmet>
      <GuestHotel />
    </>
  );
};
export default GuestHotelPage;
```
# src/routes/guestinvite/index.tsx
```tsx
import { FC } from 'react';
import { Helmet } from 'react-helmet-async';
import GuestInvite from '@/features/travel-manager-portal/GuestInvite/GuestInvite'
export const GuestInvitePage: FC = () => {
  return (
    <>
      <Helmet>
        <title>Invite Guest | TravelPortal</title>
        <meta name="description" content="Invite a new guest for corporate travel" />
      </Helmet>
      <GuestInvite />
    </>
  );
}
export default GuestInvitePage;
```
# src/routes/guesttransport/GuestTransport.scss
```scss
.guest-transport {
    padding: 2rem;
    max-width: 800px;
    margin: 0 auto;
  
    .transport-header {
      margin-bottom: 2rem;
  
      h1 {
        font-size: 2rem;
        font-weight: 600;
        color: var(--color-foreground);
        margin-bottom: 0.5rem;
      }
  
      p {
        color: var(--color-muted-foreground);
        font-size: 1rem;
      }
    }
  
    .transport-overview,
    .transport-vouchers,
    .transport-info {
      margin-bottom: 2rem;
    }
  
    .location-timeline {
      position: relative;
      padding-left: 2rem;
  
      &::before {
        content: '';
        position: absolute;
        left: 12px;
        top: 0;
        bottom: 0;
        width: 2px;
        background-color: var(--color-border);
      }
    }
  
    .location-item {
      position: relative;
      padding-bottom: 2rem;
  
      &:last-child {
        padding-bottom: 0;
      }
  
      .location-icon {
        position: absolute;
        left: -2rem;
        width: 24px;
        height: 24px;
        background-color: var(--color-background);
        border: 2px solid var(--color-primary);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
  
        .icon {
          width: 14px;
          height: 14px;
          color: var(--color-primary);
        }
      }
  
      .location-details {
        background-color: var(--color-card);
        border: 1px solid var(--color-border);
        border-radius: var(--radius);
        padding: 1rem;
  
        .location-type {
          font-size: 0.875rem;
          color: var(--color-primary);
          font-weight: 500;
          margin-bottom: 0.25rem;
        }
  
        .location-name {
          font-size: 1.125rem;
          font-weight: 600;
          margin-bottom: 0.25rem;
          color: var(--color-foreground);
        }
  
        .location-address {
          color: var(--color-muted-foreground);
          margin-bottom: 0.5rem;
        }
  
        .location-time {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.875rem;
          color: var(--color-muted-foreground);
  
          .icon {
            width: 1rem;
            height: 1rem;
          }
        }
  
        .location-instructions {
          margin-top: 0.5rem;
          padding-top: 0.5rem;
          border-top: 1px solid var(--color-border);
          font-size: 0.875rem;
          color: var(--color-muted-foreground);
        }
      }
    }
  
    .voucher-item {
      border: 1px solid var(--color-border);
      border-radius: var(--radius);
      padding: 1rem;
      margin-bottom: 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-left-width: 4px;
  
      &:last-child {
        margin-bottom: 0;
      }
  
      &.status-pending {
        border-left-color: #f59e0b;
      }
  
      &.status-active {
        border-left-color: #10b981;
      }
  
      &.status-used {
        border-left-color: #6b7280;
        opacity: 0.7;
      }
  
      .voucher-info {
        .voucher-service {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
  
          .icon {
            width: 1.25rem;
            height: 1.25rem;
          }
        }
  
        .voucher-code {
          font-size: 0.875rem;
          margin-bottom: 0.25rem;
  
          span {
            font-family: monospace;
            font-weight: 600;
          }
        }
  
        .voucher-validity,
        .voucher-amount {
          font-size: 0.875rem;
          color: var(--color-muted-foreground);
        }
      }
  
      .voucher-actions {
        flex-shrink: 0;
        margin-left: 1rem;
      }
    }
  
    .transport-info {
      .info-header {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        margin-bottom: 1rem;
  
        .icon {
          width: 1.5rem;
          height: 1.5rem;
          color: var(--color-primary);
        }
  
        h3 {
          font-size: 1.125rem;
          font-weight: 600;
          color: var(--color-foreground);
        }
      }
  
      .info-list {
        list-style: none;
        padding: 0;
  
        li {
          position: relative;
          padding-left: 1.5rem;
          margin-bottom: 0.75rem;
          color: var(--color-muted-foreground);
          font-size: 0.875rem;
  
          &:before {
            content: "•";
            position: absolute;
            left: 0;
            color: var(--color-primary);
          }
  
          &:last-child {
            margin-bottom: 0;
          }
        }
      }
    }
  
    @media (max-width: 640px) {
      padding: 1rem;
  
      .voucher-item {
        flex-direction: column;
        align-items: flex-start;
        gap: 1rem;
  
        .voucher-actions {
          margin-left: 0;
          width: 100%;
  
          button {
            width: 100%;
          }
        }
      }
    }
  }
```
# src/routes/guesttransport/GuestTransport.tsx
```tsx
import React from 'react';
import { MapPin, Car, Clock, AlertCircle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/Card/card";
import Button from "@/components/Button/button";
import './GuestTransport.scss';
interface TransportLocation {
  type: 'pickup' | 'dropoff';
  name: string;
  address: string;
  time: string;
  instructions?: string;
}
interface TransportVoucher {
  code: string;
  service: 'Uber' | 'Lyft';
  status: 'pending' | 'active' | 'used';
  validFrom: string;
  validUntil: string;
  maxAmount: number;
}
interface GuestTransportProps {
  locations: TransportLocation[];
  vouchers: TransportVoucher[];
  onActivateVoucher: (code: string) => void;
  onLaunchApp: (service: string) => void;
}
const GuestTransport: React.FC<GuestTransportProps> = ({
  locations,
  vouchers,
  onActivateVoucher,
  onLaunchApp
}) => {
  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    });
  };
  const getStatusClass = (status: string) => {
    switch (status) {
      case 'active':
        return 'status-active';
      case 'used':
        return 'status-used';
      default:
        return 'status-pending';
    }
  };
  return (
    <div className="guest-transport">
      <div className="transport-header">
        <h1>Ground Transport</h1>
        <p>Manage your transportation arrangements</p>
      </div>
      <div className="transport-overview">
        <Card>
          <CardHeader>
            <CardTitle>Transport Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="location-timeline">
              {locations.map((location, index) => (
                <div key={index} className="location-item">
                  <div className="location-icon">
                    <MapPin className="icon" />
                  </div>
                  <div className="location-details">
                    <div className="location-type">
                      {location.type === 'pickup' ? 'Pick-up' : 'Drop-off'}
                    </div>
                    <h3 className="location-name">{location.name}</h3>
                    <p className="location-address">{location.address}</p>
                    <div className="location-time">
                      <Clock className="icon" />
                      {formatTime(location.time)}
                    </div>
                    {location.instructions && (
                      <p className="location-instructions">{location.instructions}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="transport-vouchers">
        <Card>
          <CardHeader>
            <CardTitle>Transport Vouchers</CardTitle>
          </CardHeader>
          <CardContent>
            {vouchers.map((voucher, index) => (
              <div key={index} className={`voucher-item ${getStatusClass(voucher.status)}`}>
                <div className="voucher-info">
                  <div className="voucher-service">
                    <Car className="icon" />
                    {voucher.service}
                  </div>
                  <div className="voucher-code">
                    Code: <span>{voucher.code}</span>
                  </div>
                  <div className="voucher-validity">
                    Valid {formatTime(voucher.validFrom)} - {formatTime(voucher.validUntil)}
                  </div>
                  <div className="voucher-amount">
                    Up to ${voucher.maxAmount}
                  </div>
                </div>
                <div className="voucher-actions">
                  {voucher.status === 'pending' && (
                    <Button
                      onClick={() => onActivateVoucher(voucher.code)}
                      variant="default"
                    >
                      Activate Voucher
                    </Button>
                  )}
                  {voucher.status === 'active' && (
                    <Button
                      onClick={() => onLaunchApp(voucher.service)}
                      variant="outline"
                    >
                      Open {voucher.service}
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
      <div className="transport-info">
        <Card>
          <CardContent>
            <div className="info-header">
              <AlertCircle className="icon" />
              <h3>Important Information</h3>
            </div>
            <ul className="info-list">
              <li>Vouchers must be activated before your first ride</li>
              <li>Each voucher has a maximum value and validity period</li>
              <li>Download the service provider's app before your trip</li>
              <li>Contact support if you have any issues with your vouchers</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
export default GuestTransport;
```
# src/routes/guesttransport/index.tsx
```tsx
import { FC } from 'react';
import { Helmet } from 'react-helmet-async';
import GuestTransport from './GuestTransport';
export const GuestTransportPage: FC = () => {
  // Example data - replace with actual data from your API
  const locations = [
    {
      type: 'pickup' as const,
      name: 'San Francisco International Airport (SFO)',
      address: 'International Terminal, Level 2',
      time: '2024-02-15T09:00:00',
      instructions: 'Meet your driver at the designated rideshare pickup area'
    },
    {
      type: 'dropoff' as const,
      name: 'Company Office',
      address: '123 Main Street, San Francisco, CA 94105',
      time: '2024-02-15T10:00:00'
    }
  ];
  const vouchers = [
    {
      code: 'TRIP2024ABC',
      service: 'Uber' as const,
      status: 'pending' as const,
      validFrom: '2024-02-15T00:00:00',
      validUntil: '2024-02-16T23:59:59',
      maxAmount: 50
    },
    {
      code: 'TRIP2024DEF',
      service: 'Lyft' as const,
      status: 'active' as const,
      validFrom: '2024-02-15T00:00:00',
      validUntil: '2024-02-16T23:59:59',
      maxAmount: 50
    }
  ];
  const handleActivateVoucher = (code: string) => {
    console.log('Activating voucher:', code);
    // Implement voucher activation logic
  };
  const handleLaunchApp = (service: string) => {
    console.log('Launching app:', service);
    // Implement deep linking to ride service apps
  };
  return (
    <>
      <Helmet>
        <title>Ground Transport | TravelPortal</title>
        <meta name="description" content="Manage your ground transportation arrangements" />
      </Helmet>
      <GuestTransport 
        locations={locations}
        vouchers={vouchers}
        onActivateVoucher={handleActivateVoucher}
        onLaunchApp={handleLaunchApp}
      />
    </>
  );
};
export default GuestTransportPage;
```
# src/routes/index.ts
```ts
export { DashboardPage } from './dashboard';
export { GuestInvitePage } from './guestinvite';
export { GuestFlightsPage } from './guestflightbooking';
export { GuestTransportPage } from './guesttransport';
export { GuestHotelPage } from './guesthotel';
export { GuestExpensesPage } from './guestexpenses';
export { ReportsPage } from './reports';
export { SettingsPage } from './settings';
export { GuestDashboardPage } from './guestdashboard';
export { RegisterPage } from './register';
export { LoginPage } from './login';
export { ConfirmationPage } from './confirmation';
```
# src/routes/login/index.tsx
```tsx
import { FC } from 'react';
import { Helmet } from 'react-helmet-async';
import { Login } from '@/features/auth/Login/Login';
export const LoginPage: FC = () => {
    return (
        <>
            <Helmet>
                <title> Login | TravelPortal </title>
                <meta name="description" content="Login to your corporate travel account" />
            </Helmet>
            <Login />
        </>
    );
}
```
# src/routes/register/index.tsx
```tsx
import { FC } from 'react';
import { Helmet } from 'react-helmet-async';
import { Register } from '@/features/auth/Register/Register';
export const RegisterPage: FC = () => {
    return (
        <>
            <Helmet>
                <title> Register | TravelPortal </title>
                <meta name="description" content="Register for a corporate travel account" />
            </Helmet>
            <Register />
        </>
    );
}
```
# src/routes/reports/index.tsx
```tsx
import { FC } from 'react'; 
import { Helmet } from 'react-helmet-async';
import Reports from '@/features/travel-manager-portal/Reports/Reports'
export const ReportsPage: FC = () => {
  return (
    <>
      <Helmet>
        <title>Reports | TravelPortal</title>
        <meta name="description" content="View and analyze your travel expenses" />
      </Helmet>
      <Reports />
    </>
  );
}
export default ReportsPage;
```
# src/routes/settings/index.tsx
```tsx
import { FC } from 'react';
import { Helmet } from 'react-helmet-async';
import Settings from '@/features/travel-manager-portal/Settings/Settings'
export const SettingsPage: FC = () => {
  return (
    <>
      <Helmet>
        <title>Settings | TravelPortal</title>
        <meta name="description" content="Manage your travel preferences and guest types" />
      </Helmet>
      <Settings />
    </>
  );
}
```
# src/styles/fonts/GeistMonoVF.woff
This is a binary file of the type: Binary
# src/styles/fonts/GeistVF.woff
This is a binary file of the type: Binary
# src/styles/index.scss
```scss
@use "variables" as *;
:root {
    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    
}
body {
    min-width: 100vw;
    min-height: 100vh;
}
/* Fix header positioning */
.mantine-AppShell-header {
    width: 100vw !important;
    margin-right: calc(-1 * (100vw - 100%));
    padding-right: "md";
}
```
# src/styles/variables.scss
```scss
:root {
  // Shadows
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  // Border radius
  --radius: 0.5rem;
  --radius-sm: calc(var(--radius) - 2px);
  --radius-lg: calc(var(--radius) + 2px);
  // Spacing
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
// Animations
$spinner-size: 50px;
$spin-duration: 3s; }
```
# src/types/Amadeus/flightSearch.ts
```ts
interface Link {
    self: string;
}
  
interface Meta {
    count: number;
    links: Link;
}
interface Fee {
    amount: string;
    type: string;
}
interface Price {
    currency: string;
    total: string;
    base: string;
    fees?: Fee[];
    grandTotal?: string;
}
interface PricingOptions {
    fareType: string[];
    includedCheckedBagsOnly: boolean;
}
interface Aircraft {
    code: string;
}
interface Operating {
    carrierCode: string;
}
interface Location {
    iataCode: string;
    terminal?: string;
    at: Date;
}
interface Segment {
    departure: Location;
    arrival: Location;
    carrierCode: string;
    number: string;
    aircraft: Aircraft;
    operating?: Operating;
    duration: string;
    id: string;
    numberOfStops: number;
    blacklistedInEU: boolean;
}
interface Itinerary {
    duration: string;
    segments: Segment[];
}
interface IncludedCheckedBags {
    quantity?: number;
    weight?: number;
    weightUnit?: string;
}
interface FareDetailsBySegment {
    segmentId: string;
    cabin: string;
    fareBasis: string;
    class: string; // In TypeScript, 'class' is not a reserved keyword in interfaces
    includedCheckedBags?: IncludedCheckedBags;
}
interface TravelerPricing {
    travelerId: string;
    fareOption: string;
    travelerType: string;
    price: Price;
    fareDetailsBySegment: FareDetailsBySegment[];
}
interface FlightOffer {
    type: string;
    id: string;
    source: string;
    instantTicketingRequired: boolean;
    nonHomogeneous: boolean;
    oneWay: boolean;
    lastTicketingDate: string;
    numberOfBookableSeats: number;
    itineraries: Itinerary[];
    price: Price;
    pricingOptions: PricingOptions;
    validatingAirlineCodes: string[];
    travelerPricings: TravelerPricing[];
}
interface LocationInfo {
    cityCode: string;
    countryCode: string;
}
interface Dictionaries {
    locations: Record<string, LocationInfo>;
    aircraft?: Record<string, string>;
    currencies?: Record<string, string>;
    carriers?: Record<string, string>;
}
export interface FlightOffersResponse {
    meta: Meta;
    data?: FlightOffer[];
    dictionaries?: Dictionaries;
}
export interface FlightAggregationRequest {
    originLocationCodes: string[]; // List of city/airport IATA code 
    destinationLocationCodes: string[]; // City/airport IATA code 
    departureDate: string; 
    returnDate?: string; 
    adults: number; 
    children?: number; 
    infants?: number; 
    travelClass?: "ECONOMY" | "PREMIUM_ECONOMY" | "BUSINESS" | "FIRST"; 
    includedAirlineCodes?: string; 
    excludedAirlineCodes?: string; 
    nonStop?: boolean; 
    currencyCode?: string; 
    maxPrice?: number; 
    max?: number; 
    
    // custom fields to filter Amadeus response
    arrival_time_window_start?: string; 
    arrival_time_window_end?: string; 
    return_departure_time_window_start?: string; 
    return_departure_time_window_end?: string; 
    max_stops?: "ANY" | "DIRECT" | "ONE_STOP" | "TWO_STOPS"; 
}
  
interface AirportPairStatistics {
    origin: string; 
    destination: string; 
    flight_count: number; 
    average_price: number; 
    min_price: number; 
    max_price: number; 
    currency: string;
}
  
export interface FlightAggregationResponse {
    pair_statistics: AirportPairStatistics[]; 
    total_flights: number; 
    overall_average_price: number; 
    currency: string; 
}
```
# src/types/Amadeus/hotelSearch.ts
```ts
// Type for ratings literal union
export type HotelRating = "1" | "2" | "3" | "4" | "5";
// Interface for HotelCustomSearchRequest
export interface HotelCustomSearchRequest {
  latitude: number;
  longitude: number;
  radius: number;
  ratings?: HotelRating[];
  checkInDate?: string; // Using string for date format YYYY-MM-DD
  checkOutDate?: string; // Using string for date format YYYY-MM-DD
}
// Interface for HotelAggregationResponse
export interface HotelAggregationResponse {
  total_hotels: number;
  total_available_hotels: number;
  overall_average_night_price: number;
  overall_average_total_price: number;
  currency: string;
}
```
# src/types/Auth/auth.ts
```ts
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
    user_Id: string;
    device_key?: string;
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
```
# src/types/index.ts
```ts
export * from './Trip/Trip';
export * from './Trip/subtypes/GuestTypePreferences/GuestTypePreferences';
export * from './Auth/auth';
export * from './Search/cityAirport'
export * from './Amadeus/flightSearch'
export * from './Amadeus/hotelSearch'
```
# src/types/Search/cityAirport.ts
```ts
export interface SearchCityResponse {
    city_id: string;
    city: string;
    state_id: string;
    lat: number;
    lng: number;
    ranking: number
}
export interface SearchServiceableAirportsResponse {
  airport_serviceability_id: string;
  city_id: string;
  airport_id: string;
  iata: string;
  airport_name: string;
  distance_miles: number;
  hub: string;
}
```
# src/types/Trip/subtypes/Address.ts
```ts
export interface Address {
    street: string;
    city: string;
    state?: string;
    country: string;
    postalCode: string;
  }
```
# src/types/Trip/subtypes/Expense.ts
```ts
export interface Expense {
    id: string;
    category: string;
    amount: number;
    date: Date;
    receipt?: string;
    status: 'pending' | 'approved' | 'rejected';
    notes?: string;
  }
```
# src/types/Trip/subtypes/Flight.ts
```ts
export interface Flight {
    id: string
    bookingReference: string
    flightNumber: string //'UA 123'
    airline: string //'United Airlines'
    origin: {
        airport: string //'SFO'
        terminal?: string
        gate?: string
    } 
    destination: {
        airport: string //'JFK'
        terminal?: string
        gate?: string
    } 
    departureTime: Date 
    arrivalTime: Date /
    price: number // 500
    bookingStatus: 'pending' | 'confirmed' | 'cancelled'
}
```
# src/types/Trip/subtypes/GroundTransport.ts
```ts
import { Address } from './Address'
export interface GroundTransport {
    id: string;
    type: 'uber' | 'lyft';
    voucherID?: string;
    pickupLocation: Address;
    dropoffLocation: Address;
    estimatedPrice?: number;
    actualPrice?: number;
    status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  }
```
# src/types/Trip/subtypes/GuestPreferences.ts
```ts
export interface FlightPreference {
    preferences_id?: string;
    cabin_class_id: string;
    max_stops_id: string;
    refundable_ticket: boolean;
  }
  
  export interface HotelPreference {
    preferences_id?: string;
    minimum_rating_id: string;
  }
  
  export interface GroundTransportPreference {
    preferences_id?: string;
    preferred_services_id: string;
  }
  
  export interface GuestTypePreference {
    preferences_id?: string;
    flight_preferences_id: string;
    hotel_preferences_id: string;
    ground_transport_preferences_id: string;
    guest_type: string;
    daily_per_diem: number | null;
  }
  
  export interface CombinedPreferences {
    flight_preferences: FlightPreference;
    hotel_preferences: HotelPreference;
    ground_transport_preferences: GroundTransportPreference;
    guest_type: string;
    daily_per_diem: number | null;
  }
  
  export interface GuestTypeWithDetails extends GuestTypePreference {
    flight_preferences?: FlightPreference;
    hotel_preferences?: HotelPreference;
    ground_transport_preferences?: GroundTransportPreference;
  }
  
  // Enum types for select options
  export enum CabinClassType {
    ECONOMY = "ECONOMY",
    PREMIUM_ECONOMY = "PREMIUM_ECONOMY",
    BUSINESS = "BUSINESS",
    FIRST = "FIRST"
  }
  
  export enum MaxStopsType {
    DIRECT = "DIRECT",
    ONE_STOP = "ONE_STOP",
    TWO_STOPS = "TWO_STOPS",
    ANY = "ANY"
  }
  
  export enum HotelRatingType {
    ONE_STAR = "ONE_STAR",
    TWO_STAR = "TWO_STAR",
    THREE_STAR = "THREE_STAR",
    FOUR_STAR = "FOUR_STAR",
    FIVE_STAR = "FIVE_STAR"
  }
  
  export enum TransportServiceType {
    UBER = "UBER",
    LYFT = "LYFT"
  }
  
  // Helper functions to get display names for enum values
  export const getCabinClassDisplayName = (value: string): string => {
    const lookup: Record<string, string> = {
      [CabinClassType.ECONOMY]: "Economy",
      [CabinClassType.PREMIUM_ECONOMY]: "Premium Economy",
      [CabinClassType.BUSINESS]: "Business",
      [CabinClassType.FIRST]: "First Class"
    };
    return lookup[value] || value;
  };
  
  export const getMaxStopsDisplayName = (value: string): string => {
    const lookup: Record<string, string> = {
      [MaxStopsType.DIRECT]: "Direct Flights Only",
      [MaxStopsType.ONE_STOP]: "Maximum 1 Stop",
      [MaxStopsType.TWO_STOPS]: "Maximum 2 Stops",
      [MaxStopsType.ANY]: "Any Number of Stops"
    };
    return lookup[value] || value;
  };
  
  export const getHotelRatingDisplayName = (value: string): string => {
    const lookup: Record<string, string> = {
      [HotelRatingType.ONE_STAR]: "1 Star (Minimum)",
      [HotelRatingType.TWO_STAR]: "2 Stars (Minimum)",
      [HotelRatingType.THREE_STAR]: "3 Stars (Minimum)",
      [HotelRatingType.FOUR_STAR]: "4 Stars (Minimum)",
      [HotelRatingType.FIVE_STAR]: "5 Stars (Minimum)"
    };
    return lookup[value] || value;
  };
  
  export const getTransportServiceDisplayName = (value: string): string => {
    const lookup: Record<string, string> = {
      [TransportServiceType.UBER]: "Uber",
      [TransportServiceType.LYFT]: "Lyft"
    };
    return lookup[value] || value;
  };
```
# src/types/Trip/subtypes/GuestProfile.ts
```ts
import { LoyaltyProgram } from "./LoyaltyProgram"
import { Address } from './Address'
export interface GuestProfile {
    id: string
    firstName: string //'Alice',
    lastName: string //'Johnson'
    email: string //'alice@example.com',
    phone?: string
    dataOfBirth?: Date
    gender?: string;
    address?: Address;
    nationality?: string;
    passportNumber?: string;
    passportExpiryDate?: Date;
    dietaryRestrictions?: string[];
    accessibilityNeeds?: string[];
    emergencyContact?: {
        name: string;
        relationship: string;
        phone: string;
    };
    loyaltyPrograms?: LoyaltyProgram[];
}
```
# src/types/Trip/subtypes/GuestTypePreferences/GuestTypePreferences.ts
```ts
import { FlightPreferences } from './subtypes/FlightPreferences';
import { HotelPreferences } from './subtypes/HotelPreferences';
import { GroundTransportPreferences } from './subtypes/GroundTransportPreferences';
export type GuestTypePreferences = {
    guestType: string;
    flight: FlightPreferences;
    hotel: HotelPreferences;
    groundTransport: GroundTransportPreferences;
    dailyPerDiem?: number;
    id: string;
};
export type GuestTypes = {
    guest_type_id: string;
    name: string;
    company_id: string;
    user_id: string;
};
export type GuestTypesResponse = [GuestTypes]
export type CreateGuestType = {
    name: string;
    company_id: string;
    user_id: string;
}
export type CreateGuestTypeResponse = {	
    id: string;
    guestType: string;
    flight: FlightPreferences
    hotel: HotelPreferences
    groundTransport: GroundTransportPreferences
    dailyPerDiem: number;
}
export type DeleteGuestType ={
    guest_type_id: string;
}
export type UpdateGuestType = {	
    guestType?: string;
    flight?: FlightPreferences
    hotel?: HotelPreferences
    groundTransport?: GroundTransportPreferences
    dailyPerDiem?: number;
}
```
# src/types/Trip/subtypes/GuestTypePreferences/subtypes/FlightPreferences.ts
```ts
export type FlightPreferences = {
    cabinClass?: 'ECONOMY' | 'PREMIUM_ECONOMY' | 'BUSINESS' | 'FIRST';
    maxStops?: 'ANY' | 'DIRECT' | 'ONE_STOP' | 'TWO_STOPS';
    refundableTicket?: boolean;
};
```
# src/types/Trip/subtypes/GuestTypePreferences/subtypes/GroundTransportPreferences.ts
```ts
export type GroundTransportPreferences = {
    preferredServices?: 'UBER' | 'LYFT';
};
```
# src/types/Trip/subtypes/GuestTypePreferences/subtypes/HotelPreferences.ts
```ts
export type HotelPreferences = {
    minimumRating?: 1 | 2 | 3 | 4 | 5;
};
```
# src/types/Trip/subtypes/Hotel.ts
```ts
import { Address } from './Address'
export interface Hotel {
    id: string;
    bookingReference?: string;
    name: string //'Hilton'
    location: Address //'123 Main St, San Francisco, CA 94105'
    checkIn: Date //'2025-03-15T15:00:00' ISO 8601 format
    checkOut: Date //'2025-03-17T12:00:00' ISO 8601 format
    roomType: string //'King'
    price: number // 200
    bookingStatus: 'pending' | 'confirmed' | 'cancelled'
}
```
# src/types/Trip/subtypes/index.ts
```ts
export * from './Flight';
export * from './GuestProfile';
export * from './Hotel'
export * from './LoyaltyProgram'
export * from './Itinerary'
export * from './GroundTransport'
export * from './Expense'
export * from './PerDiem'
export * from './GuestTypePreferences/GuestTypePreferences'
export * from './GuestPreferences'
```
# src/types/Trip/subtypes/Itinerary.ts
```ts
interface City {
  id: string;
  name: string;
  state_id: string;
  lat: number;
  lng: number;
  ranking: number
}
export interface Itinerary {
  id: string;
  origin:{
    city: City,
    searchedAirports?: string[]
  }
  destination:{
    city: City,
    searchedAirports?: string[]
  }
  startDate: Date | null;
  endDate: Date | null;
}
# src/types/Trip/subtypes/LoyaltyProgram.ts
```ts
export interface LoyaltyProgram {
    provider: string;
    programName: string;
    memberNumber: string;
    status?: string;
  }
```
# src/types/Trip/subtypes/PerDiem.ts
```ts
import { Expense } from './Expense'
export interface PerDiem {
    id: string;
    dailyRate: number;
    startDate: Date;
    endDate: Date;
    totalAmount: number;
    //currency: string;
    status: 'pending' | 'approved' | 'paid';
    expenses?: Expense[];
  }
```
# src/types/Trip/Trip.ts
```ts
import { GroundTransport, GuestProfile, GuestTypePreferences, Flight, Hotel, Itinerary, PerDiem} from "./subtypes"
export interface Trip {
    id: string //1
    guest: GuestProfile
    guestType: string
    status: string// 'Completed'
    travelPreferences: GuestTypePreferences;
    itinerary: Itinerary
    flights?:{
        outbound?: Flight
        return?: Flight
    }
    hotel?: Hotel;
    groundTransport?: GroundTransport[];
    perDiem?: PerDiem;
    created: Date;
    modified: Date;
    createdBy?: string; // Reference to admin user
    totalBudget?: number;
    actualSpend?: number;
    
}
```
# src/vite-env.d.ts
```ts
/// <reference types="vite/client" />
```
# tsconfig.json
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@components": ["src/components"],
      "@components/*": ["src/components/*"],
      "~/*": ["src/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```
# tsconfig.node.json
```json
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts"]
}
```
# vite.config.ts
```ts
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import { fileURLToPath } from "url"
import path from "path"
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
            "@components": path.resolve(__dirname, "./src/components"),
            "~": path.resolve(__dirname, "./src"),
        },
    },
    css: {
        preprocessorOptions: {
            scss: {
                api: "modern-compiler",
                additionalData: `@use "${path.join(process.cwd(), 'src/_mantine').replace(/\\/g, '/')}" as mantine;`,
            },
        },
    },
})
```