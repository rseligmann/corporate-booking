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
        "@radix-ui/react-avatar": "^1.1.2",
        "@radix-ui/react-checkbox": "^1.1.3",
        "@radix-ui/react-label": "^2.1.1",
        "@radix-ui/react-select": "^2.1.4",
        "@radix-ui/react-slot": "^1.1.1",
        "@tanstack/react-query": "5.64.0",
        "@types/recharts": "^1.8.29",
        "autoprefixer": "^10.4.20",
        "class-variance-authority": "^0.7.1",
        "clsx": "^2.1.1",
        "ky": "1.7.4",
        "lucide-react": "0.471.0",
        "path": "0.12.7",
        "postcss": "^8.5.1",
        "react": "^18.2.0",
        "react-dom": "^18.2.0",
        "react-helmet-async": "^2.0.5",
        "react-router-dom": "7.1.1",
        "recharts": "^2.15.0",
        "tailwindcss": "^3.4.17",
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
        "typescript": "^5.3.3",
        "vite": "^5.0.8"
    }
}

```

# postcss.config.js

```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}

```

# README.md

```md
Corporate Travel Book System

```

# src/api/api-client.ts

```ts
import ky from "ky"

const baseUrl =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api/v1"

export const apiClient = ky.create({
    prefixUrl: baseUrl,
    hooks: {
        beforeRequest: [
            request => {
                const token = localStorage.getItem("token")
                if (token) {
                    request.headers.set("Authorization", `Bearer ${token}`)
                }
            },
        ],
    },
    retry: 0, // We handle retry with TanStack Query
})

```

# src/api/api.ts

```ts
/*const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api'

//async function handleApiError(error: unknown, context: string) {
  console.error(`Error in ${context}:`, error)
  if (error instanceof Error) {
    console.error('Error message:', error.message)
    console.error('Error stack:', error.stack)
    return new Error(`${context}: ${error.message}`)
  }
  return new Error(`An unknown error occurred in ${context}`)
}

export const fetchTrips = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/trips`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return await response.json()
  } catch (error) {
    throw await handleApiError(error, 'fetchTrips')
  }
}

//export const createGuestInvite = async (inviteData: any) => {
  try {
    const response = await fetch(`${API_BASE_URL}/guest-invite`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inviteData),
    })
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return await response.json()
  } catch (error) {
    throw await handleApiError(error, 'createGuestInvite')
  }
}

export const checkApiConnection = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/health`)
    if (!response.ok) {
      throw new Error(`API health check failed. Status: ${response.status}`)
    }
    return await response.json()
  } catch (error) {
    throw await handleApiError(error, 'checkApiConnection')
  }
}

// Add more API functions as needed */
```

# src/api/hooks/index.ts

```ts
export * from './useUserLogin'
export * from './useUserDetails'
```

# src/api/hooks/useGuestInviteState.ts

```ts
import { useState } from 'react';

export interface GuestDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  guestType: string;
}

export interface ItineraryDetails {
  origin: string;
  destination: string;
  firstMeetingStart: string;
  lastMeetingEnd: string;
}

export interface TravelPreferences {
  flightCabinClass: string;
  directFlightsPreferred: boolean;
  refundableTicketsOnly: boolean;
  hotelQuality: string;
  groundTransportService: string;
  groundTransportClass: string;
  perDiemAmount: number;
}

export interface GuestInviteState {
  currentStep: number;
  guestDetails: GuestDetails;
  itineraryDetails: ItineraryDetails;
  travelPreferences: TravelPreferences;
}

const initialState: GuestInviteState = {
  currentStep: 1,
  guestDetails: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    guestType: '',
  },
  itineraryDetails: {
    origin: '',
    destination: '',
    firstMeetingStart: '',
    lastMeetingEnd: '',
  },
  travelPreferences: {
    flightCabinClass: 'Economy',
    directFlightsPreferred: false,
    refundableTicketsOnly: false,
    hotelQuality: '3-star',
    groundTransportService: 'Uber',
    groundTransportClass: 'Standard',
    perDiemAmount: 0,
  },
};

export const useGuestInviteState = () => {
  const [state, setState] = useState<GuestInviteState>(initialState);

  const setCurrentStep = (step: number) => {
    setState(prevState => ({ ...prevState, currentStep: step }));
  };

  const updateGuestDetails = (details: Partial<GuestDetails>) => {
    setState(prevState => ({
      ...prevState,
      guestDetails: { ...prevState.guestDetails, ...details },
    }));
  };

  const updateItineraryDetails = (details: Partial<ItineraryDetails>) => {
    setState(prevState => ({
      ...prevState,
      itineraryDetails: { ...prevState.itineraryDetails, ...details },
    }));
  };

  const updateTravelPreferences = (preferences: Partial<TravelPreferences>) => {
    setState(prevState => ({
      ...prevState,
      travelPreferences: { ...prevState.travelPreferences, ...preferences },
    }));
  };

  return {
    state,
    setCurrentStep,
    updateGuestDetails,
    updateItineraryDetails,
    updateTravelPreferences,
  };
};
```

# src/api/hooks/useReportsState.ts

```ts
import { useState } from 'react';

export interface TripData {
  id: number;
  guest: {
    name: string;
    email: string;
    type: string;
  };
  dates: {
    start: string;
    end: string;
  };
  origin: string;
  destination: string;
  status: string;
  cost: number;
}

export interface SpendingData {
  month: string;
  amount: number;
}

export interface ReportsState {
  activeTab: 'trips' | 'billing';
  dateFilter: string;
  tripData: TripData[];
  spendingData: SpendingData[];
}

export const useReportsState = () => {
  const [state, setState] = useState<ReportsState>({
    activeTab: 'trips',
    dateFilter: 'last30',
    tripData: [
      {
        id: 1,
        guest: { name: 'John Smith', email: 'john@example.com', type: 'Interview' },
        dates: { start: '2024-01-15', end: '2024-01-17' },
        origin: 'SFO',
        destination: 'NYC',
        status: 'Completed',
        cost: 1250,
      },
      {
        id: 2,
        guest: { name: 'Sarah Davis', email: 'sarah@example.com', type: 'Contract Work' },
        dates: { start: '2024-01-20', end: '2024-01-25' },
        origin: 'LAX',
        destination: 'CHI',
        status: 'In Progress',
        cost: 1800,
      },
    ],
    spendingData: [
      { month: 'Jan', amount: 12500 },
      { month: 'Feb', amount: 15800 },
      { month: 'Mar', amount: 14200 },
      { month: 'Apr', amount: 16900 },
      { month: 'May', amount: 13600 },
      { month: 'Jun', amount: 17800 },
    ],
  });

  const setActiveTab = (tab: 'trips' | 'billing') => {
    setState(prevState => ({ ...prevState, activeTab: tab }));
  };

  const setDateFilter = (filter: string) => {
    setState(prevState => ({ ...prevState, dateFilter: filter }));
  };

  return {
    state,
    setActiveTab,
    setDateFilter,
  };
};
```

# src/api/hooks/useTrips.ts

```ts
import { useState, useEffect } from 'react'
import { fetchTrips, checkApiConnection } from '@/api/api'

export const useTrips = () => {
  const [trips, setTrips] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const loadTrips = async () => {
      try {
        await checkApiConnection()
        const data = await fetchTrips()
        setTrips(data)
      } catch (err) {
        console.error('Error in useTrips hook:', err)
        setError(err instanceof Error ? err : new Error('An unknown error occurred'))
      } finally {
        setLoading(false)
      }
    }

    loadTrips()
  }, [])

  return { trips, loading, error }
}
```

# src/api/hooks/useUserDetails.ts

```ts
import { useQuery } from "@tanstack/react-query"
import { USER_KEYS } from "../query-keys"
import { apiClient } from "../api-client"

export interface UserDetails {
    id: string
    email: string
    name: string
    role: string
    preferences: {
        theme: string
        notifications: boolean
    }
}

// Type for the raw API response, if it differs from our desired type
interface UserDetailsResponse {
    data: {
        user: UserDetails
    }
}

async function fetchUserDetails(userId: string) {
    const response = await apiClient
        .get(`users/${userId}`)
        .json<UserDetailsResponse>()
    return response.data.user
}

export function useUserDetails(userId: string) {
    return useQuery({
        queryKey: USER_KEYS.details(userId),
        queryFn: () => fetchUserDetails(userId),
        enabled: !!userId,
    })
}

```

# src/api/hooks/useUserLogin.ts

```ts
import { useMutation } from "@tanstack/react-query"
import { AUTH_KEYS } from "../query-keys"
import { apiClient } from "../api-client"

export interface LoginCredentials {
    email: string
    password: string
}

export interface LoginResponse {
    token: string
    user: {
        id: string
        email: string
        name: string
    }
}

interface LoginAPIResponse {
    data: {
        auth: LoginResponse
    }
}

async function loginUser(
    credentials: LoginCredentials
): Promise<LoginResponse> {
    const response = await apiClient
        .post("auth/login", {
            json: credentials,
        })
        .json<LoginAPIResponse>()

    return response.data.auth
}

export function useUserLogin() {
    return useMutation({
        mutationKey: AUTH_KEYS.login(),
        mutationFn: loginUser,
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

# src/api/query-keys/auth.ts

```ts
export const AUTH_KEYS = {
  all: ['auth'] as const,
  login: () => [...AUTH_KEYS.all, 'login'] as const,
  register: () => [...AUTH_KEYS.all, 'register'] as const,
  resetPassword: () => [...AUTH_KEYS.all, 'reset-password'] as const,
  session: () => [...AUTH_KEYS.all, 'session'] as const,
} as const
```

# src/api/query-keys/index.ts

```ts
export * from "./auth"
export * from "./user"

// You can also create a shared namespace for all query keys
export const QUERY_KEYS = {
    auth: ["auth"],
    users: ["users"],
    // Add more top-level keys as needed
} as const

```

# src/api/query-keys/user.ts

```ts
export const USER_KEYS = {
    all: ["users"] as const,
    lists: () => [...USER_KEYS.all, "list"] as const,
    details: (id: string) => [...USER_KEYS.all, "details", id] as const,
    preferences: (id: string) => [...USER_KEYS.all, "preferences", id] as const,
} as const

```

# src/App.tsx

```tsx
import { FC } from "react"
import { Routes, Route } from "react-router-dom"
import AuthLayout from "@/layouts/AuthLayout/AuthLayout"
import { DefaultLayout } from "@/layouts/DefaultLayout"
import { Login } from "@/routes/login"
import { RequireAuth } from "@/features/auth/RequireAuth"
import { DashboardPage } from "@/routes/dashboard"
import { GuestInvitePage } from "@/routes/guestinvite"
import { ReportsPage } from "@/routes/reports"
import { SettingsPage } from "@/routes/settings"

const App: FC = () => {
    return (
        <Routes>
            {/* Auth routes */}
            <Route element={<AuthLayout />}>
                <Route path="/login" element={<Login />} />
                {/* Add other auth routes like register, forgot-password here */}
            </Route>

            {/* Protected routes */}
            <Route element={
                <RequireAuth>
                    <DefaultLayout />
                </RequireAuth>
            }>
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/guest-invite" element={<GuestInvitePage />} />
                <Route path="/reports" element={<ReportsPage />} />
                <Route path="/settings" element={<SettingsPage />} />
            </Route>
        </Routes>
    )
}

export default App
```

# src/components/Alert/Alert.scss

```scss
.alert {
    position: relative;
    display: flex;
    padding: 16px;
    border-radius: 8px;
    gap: 12px;
    width: 100%;
  
    &__icon {
      flex-shrink: 0;
      margin-top: 2px;
    }
  
    &__content {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
  
    &__title {
      font-weight: 600;
      font-size: 16px;
      margin: 0;
    }
  
    &__description {
      font-size: 14px;
    }
  
    // Variants
    &--default {
      background-color: #f9fafb;
      color: #374151;
      border: 1px solid #e5e7eb;
    }
  
    &--info {
      background-color: #eff6ff;
      color: #1e40af;
      border: 1px solid #bfdbfe;
    }
  
    &--success {
      background-color: #f0fdf4;
      color: #166534;
      border: 1px solid #bbf7d0;
    }
  
    &--warning {
      background-color: #fffbeb;
      color: #92400e;
      border: 1px solid #fef3c7;
    }
  
    &--error {
      background-color: #fef2f2;
      color: #991b1b;
      border: 1px solid #fecaca;
    }
  }
```

# src/components/Alert/alert.tsx

```tsx
import React from 'react';
import './Alert.scss';

interface AlertProps {
  children: React.ReactNode;
  variant?: 'default' | 'info' | 'success' | 'warning' | 'error';
  title?: string;
  icon?: React.ReactNode;
  className?: string;
}

export const Alert: React.FC<AlertProps> = ({
  children,
  variant = 'default',
  title,
  icon,
  className = ''
}) => {
  const alertClasses = [
    'alert',
    `alert--${variant}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <div role="alert" className={alertClasses}>
      {icon && <div className="alert__icon">{icon}</div>}
      <div className="alert__content">
        {title && <h5 className="alert__title">{title}</h5>}
        <div className="alert__description">{children}</div>
      </div>
    </div>
  );
};

export default Alert;
```

# src/components/Alert/index.ts

```ts
//export { Alert, AlertTitle, AlertDescription } from './alert';
export { default } from './alert';
//export type { AlertProps } from './alert';
```

# src/components/Avatar/Avatar.scss

```scss
.avatar {
    position: relative;
    border-radius: 50%;
    overflow: hidden;
    background-color: #e5e7eb;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  
    // Sizes
    &--sm {
      width: 32px;
      height: 32px;
      font-size: 12px;
    }
  
    &--md {
      width: 40px;
      height: 40px;
      font-size: 16px;
    }
  
    &--lg {
      width: 48px;
      height: 48px;
      font-size: 20px;
    }
  
    &__image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  
    &__fallback {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #374151;
      font-weight: 500;
      background-color: #f3f4f6;
    }
  }
  
  .avatar-group {
    display: inline-flex;
    align-items: center;
  
    .avatar {
      margin-right: -8px;
      border: 2px solid white;
      transition: transform 0.2s ease;
  
      &:hover {
        transform: translateY(-2px);
      }
    }
  }
```

# src/components/Avatar/avatar.tsx

```tsx
import React from 'react';
import './Avatar.scss';

interface AvatarProps {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  fallback,
  size = 'md',
  className = ''
}) => {
  const [hasError, setHasError] = React.useState(false);

  const handleError = () => {
    setHasError(true);
  };

  const avatarClasses = [
    'avatar',
    `avatar--${size}`,
    className
  ].filter(Boolean).join(' ');

  const getFallback = () => {
    if (!fallback) return '';
    return fallback.slice(0, 2).toUpperCase();
  };

  return (
    <div className={avatarClasses}>
      {src && !hasError ? (
        <img
          src={src}
          alt={alt}
          className="avatar__image"
          onError={handleError}
        />
      ) : (
        <div className="avatar__fallback">
          {getFallback()}
        </div>
      )}
    </div>
  );
};

export const AvatarGroup: React.FC<{
  children: React.ReactNode;
  max?: number;
  className?: string;
}> = ({
  children,
  max,
  className = ''
}) => {
  const avatars = React.Children.toArray(children);
  const shouldLimit = max && avatars.length > max;
  const visibleAvatars = shouldLimit ? avatars.slice(0, max) : avatars;
  const remainingCount = shouldLimit ? avatars.length - max : 0;

  return (
    <div className={`avatar-group ${className}`}>
      {visibleAvatars}
      {remainingCount > 0 && (
        <div className="avatar avatar--md">
          <div className="avatar__fallback">
            +{remainingCount}
          </div>
        </div>
      )}
    </div>
  );
};
```

# src/components/Button/Button.scss

```scss
.button {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  white-space: nowrap;
  border-radius: var(--radius);
  font-weight: 500;
  font-size: 0.875rem;
  transition: all 0.2s ease;
  cursor: pointer;
  border: none;
  line-height: 1;

  appearance: none;
  -webkit-appearance: none;
  padding: 0;
  margin: 0;
  background: none;

  // Handle focus states
  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px var(--color-background), 
                0 0 0 4px var(--color-primary);
  }

  // Base disabled state
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  // Sizing variants
  &--default {
    height: 2.25rem; // 36px
    padding: 0 1rem;
  }

  &--sm {
    height: 2rem; // 32px
    padding: 0 0.75rem;
    font-size: 0.75rem;
  }

  &--lg {
    height: 2.5rem; // 40px
    padding: 0 1.5rem;
    font-size: 0.925rem;
  }

  &--icon {
    height: 2.25rem;
    width: 2.25rem;
    padding: 0;
  }

  // Style variants
  &--default {
    background-color: var(--color-primary);
    color: var(--color-primary-foreground);

    &:hover:not(:disabled) {
      filter: brightness(0.9);
    }
  }

  &--destructive {
    background-color: var(--color-destructive);
    color: white;

    &:hover:not(:disabled) {
      background-color: rgba(var(--color-destructive), 0.9);
    }
  }

  &--outline {
    background-color: transparent;
    border: 1px solid var(--color-border);

    &:hover:not(:disabled) {
      background-color: var(--color-muted);
    }
  }

  &--secondary {
    background-color: var(--color-secondary);
    color: var(--color-secondary-foreground);

    &:hover:not(:disabled) {
      background-color: rgba(var(--color-secondary), 0.8);
    }
  }

  &--ghost {
    background-color: transparent;

    &:hover:not(:disabled) {
      background-color: var(--color-muted);
    }
  }

  &--link {
    background-color: transparent;
    color: var(--color-primary);
    height: auto;
    padding: 0;

    &:hover:not(:disabled) {
      text-decoration: underline;
    }
  }

  // Full width modifier
  &--full-width {
    width: 100%;
  }

  // Loading state
  &--loading {
    cursor: wait;

    .button__content {
      opacity: 0;
    }
  }

  // Handle icons within buttons
  svg {
    height: 1rem;
    width: 1rem;
  }
}

// Loading spinner
.button__spinner {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  svg {
    height: 1rem;
    width: 1rem;
    animation: spin 1s linear infinite;
  }
}

.button__spinner-circle {
  stroke: currentColor;
  stroke-dasharray: 80;
  stroke-dashoffset: 60;
  animation: dash 1.5s ease-in-out infinite;
}

@keyframes spin {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes dash {
  0% {
    stroke-dashoffset: 60;
  }
  50% {
    stroke-dashoffset: 20;
  }
  100% {
    stroke-dashoffset: 60;
  }
}
```

# src/components/Button/button.tsx

```tsx
import { FC, ButtonHTMLAttributes, ReactNode } from "react"
import "./Button.scss"

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode
    variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
    size?: 'default' | 'sm' | 'lg' | 'icon'
    fullWidth?: boolean
    isLoading?: boolean
    asChild?: boolean // For compatibility with existing code
}

const Button: FC<ButtonProps> = ({
    children,
    variant = 'default',
    size = 'default',
    fullWidth = false,
    isLoading = false,
    className = '',
    disabled,
    ...props
}) => {
    const buttonClasses = [
        'button',
        `button--${variant}`,
        `button--${size}`,
        fullWidth ? 'button--full-width' : '',
        isLoading ? 'button--loading' : '',
        className
    ].filter(Boolean).join(' ')

    return (
        <button
            className={buttonClasses}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading && (
                <span className="button__spinner">
                    <svg viewBox="0 0 24 24">
                        <circle
                            className="button__spinner-circle"
                            cx="12"
                            cy="12"
                            r="10"
                            fill="none"
                            strokeWidth="3"
                        />
                    </svg>
                </span>
            )}
            {!isLoading && children}
            {/*<span className={`button__content ${isLoading ? 'button__content--loading' : ''}`}>
                {children}

            </span>*/}
        </button>
    )
}

export default Button
```

# src/components/Button/index.ts

```ts
export {default } from './button';
```

# src/components/Button2/Button.scss

```scss
.button {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  white-space: nowrap;
  border-radius: var(--radius);
  font-weight: 500;
  font-size: 0.875rem;
  transition: all 0.2s ease;
  cursor: pointer;
  border: none;

  // Handle focus states
  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px var(--color-background), 
                0 0 0 4px var(--color-primary);
  }

  // Base disabled state
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  // Sizing variants
  &--default {
    height: 2.25rem; // 36px
    padding: 0 1rem;
  }

  &--sm {
    height: 2rem; // 32px
    padding: 0 0.75rem;
    font-size: 0.75rem;
  }

  &--lg {
    height: 2.5rem; // 40px
    padding: 0 1.5rem;
    font-size: 0.925rem;
  }

  &--icon {
    height: 2.25rem;
    width: 2.25rem;
    padding: 0;
  }

  // Style variants
  &--default {
    background-color: var(--color-primary);
    color: var(--color-primary-foreground);

    &:hover:not(:disabled) {
      background-color: hsl(0, 0%, 0%);
    }
  }

  &--destructive {
    background-color: var(--color-destructive);
    color: white;

    &:hover:not(:disabled) {
      background-color: rgba(var(--color-destructive), 0.9);
    }
  }

  &--outline {
    background-color: transparent;
    border: 1px solid var(--color-border);

    &:hover:not(:disabled) {
      background-color: var(--color-muted);
    }
  }

  &--secondary {
    background-color: var(--color-secondary);
    color: var(--color-secondary-foreground);

    &:hover:not(:disabled) {
      background-color: rgba(var(--color-secondary), 0.8);
    }
  }

  &--ghost {
    background-color: transparent;

    &:hover:not(:disabled) {
      background-color: var(--color-muted);
    }
  }

  &--link {
    background-color: transparent;
    color: var(--color-primary);
    height: auto;
    padding: 0;

    &:hover:not(:disabled) {
      text-decoration: underline;
    }
  }

  // Full width modifier
  &--full-width {
    width: 100%;
  }

  // Loading state
  &--loading {
    cursor: wait;

    .button__content {
      opacity: 0;
    }
  }

  // Handle icons within buttons
  svg {
    height: 1rem;
    width: 1rem;
  }
}

// Loading spinner
.button__spinner {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  svg {
    height: 1rem;
    width: 1rem;
    animation: spin 1s linear infinite;
  }
}

.button__spinner-circle {
  stroke: currentColor;
  stroke-dasharray: 80;
  stroke-dashoffset: 60;
  animation: dash 1.5s ease-in-out infinite;
}

@keyframes spin {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes dash {
  0% {
    stroke-dashoffset: 60;
  }
  50% {
    stroke-dashoffset: 20;
  }
  100% {
    stroke-dashoffset: 60;
  }
}
```

# src/components/Button2/button.tsx

```tsx
import { FC, ButtonHTMLAttributes, ReactNode } from "react"
import "./Button.scss"

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode
    variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
    size?: 'default' | 'sm' | 'lg' | 'icon'
    fullWidth?: boolean
    isLoading?: boolean
    asChild?: boolean // For compatibility with existing code
}

const Button: FC<ButtonProps> = ({
    children,
    variant = 'default',
    size = 'default',
    fullWidth = false,
    isLoading = false,
    className = '',
    disabled,
    ...props
}) => {
    const buttonClasses = [
        'button',
        `button--${variant}`,
        `button--${size}`,
        fullWidth ? 'button--full-width' : '',
        isLoading ? 'button--loading' : '',
        className
    ].filter(Boolean).join(' ')

    return (
        <button
            className={buttonClasses}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading && (
                <span className="button__spinner">
                    <svg viewBox="0 0 24 24">
                        <circle
                            className="button__spinner-circle"
                            cx="12"
                            cy="12"
                            r="10"
                            fill="none"
                            strokeWidth="3"
                        />
                    </svg>
                </span>
            )}
            <span className={`button__content ${isLoading ? 'button__content--loading' : ''}`}>
                {children}
            </span>
        </button>
    )
}

export default Button
```

# src/components/Button2/index.ts

```ts
export { default } from './button';
export type { ButtonProps, ButtonSize, ButtonVariant } from './button';
```

# src/components/Card/Card.scss

```scss
.card {
  background-color: var(--color-background);
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow);
  
  &__header {
    padding: var(--space-6);
    padding-bottom: 0;
  }
  
  &__title {
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--color-foreground);
    line-height: 1.2;
  }
  
  &__description {
    color: var(--color-muted-foreground);
    font-size: 0.875rem;
    margin-top: var(--space-1);
  }
  
  &__content {
    padding: var(--space-6);
    }
  }
```

# src/components/Card/card.tsx

```tsx
import React from 'react';
import './Card.scss';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '' }) => (
  <div className={`card ${className}`}>{children}</div>
);

export const CardHeader: React.FC<CardProps> = ({ children, className = '' }) => (
  <div className={`card__header ${className}`}>{children}</div>
);

export const CardTitle: React.FC<CardProps> = ({ children, className = '' }) => (
  <h3 className={`card__title ${className}`}>{children}</h3>
);

export const CardDescription: React.FC<CardProps> = ({ children, className = '' }) => (
  <p className={`card__description ${className}`}>{children}</p>
);

export const CardContent: React.FC<CardProps> = ({ children, className = '' }) => (
  <div className={`card__content ${className}`}>{children}</div>
);
```

# src/components/Card/index.ts

```ts
export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from './card';
```

# src/components/Checkbox/Checkbox.scss

```scss
.checkbox {
    height: 16px;
    width: 16px;
    flex-shrink: 0;
    border-radius: 2px;
    border: 1px solid var(--primary-color);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    
    &:focus-visible {
      outline: none;
      ring: 1px solid var(--ring-color);
    }
    
    &:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }
    
    &[data-state="checked"] {
      background-color: var(--primary-color);
      color: var(--primary-foreground);
    }
  }
  
  .checkbox__indicator {
    display: flex;
    align-items: center;
    justify-content: center;
    color: currentColor;
  }
  
  .checkbox__check {
    height: 16px;
    width: 16px;
  }
```

# src/components/Checkbox/checkbox.tsx

```tsx
import * as React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { Check } from "lucide-react";
import './Checkbox.scss';

interface CheckboxProps extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  className?: string;
}

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
  >((props, ref) => {
    const { className, ...otherProps } = props;

    return (
      <CheckboxPrimitive.Root
      ref={ref}
      className={`checkbox ${className}`}
      {...otherProps}
    >
      <CheckboxPrimitive.Indicator className="checkbox__indicator">
        <Check className="checkbox__check" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
});

Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
```

# src/components/Form/Form.scss

```scss
.custom-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  &__fields {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  &__title {
    margin-bottom: 0.5rem;
  }

  &__description {
    margin-bottom: 1.5rem;
  }

  &__error {
    margin-top: -0.5rem;
  }

  // Size variants
  &--sm {
    gap: 1rem;
  }

  &--lg {
    gap: 2rem;
  }
}
```

# src/components/Form/form.tsx

```tsx
/* import { FormEvent, forwardRef } from 'react';
import  Button  from "@/components/Button/button"
import  Input from "@/components/Input/input"
import { Text } from '@/components';

import './Form.scss';

export type FormSize = 'sm' | 'md' | 'lg';
export type FormVariant = 'outlined' | 'filled';

export interface FormField {
  name: string;
  label?: string;
  type?: string;
  placeholder?: string;
  helperText?: string;
  required?: boolean;
  value?: string;
  error?: string;
}

export interface FormProps {
  fields: FormField[];
  onSubmit: (data: Record<string, string>) => void;
  size?: FormSize;
  variant?: FormVariant;
  className?: string;
  submitText?: string;
  title?: string;
  description?: string;
  error?: string;
  isLoading?: boolean;
  submitButtonVariant?: 'primary' | 'secondary' | 'danger' | 'success' | 'ghost';
}

export const Form = forwardRef<HTMLFormElement, FormProps>(
  (
    {
      fields,
      onSubmit,
      size = 'md',
      variant = 'outlined',
      className = '',
      submitText = 'Submit',
      title,
      description,
      error,
      isLoading = false,
      submitButtonVariant = 'primary',
      ...props
    },
    ref
  ) => {
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const data = Object.fromEntries(formData.entries()) as Record<string, string>;
      onSubmit(data);
    };

    const formClasses = [
      'custom-form',
      `custom-form--${variant}`,
      `custom-form--${size}`,
      className
    ].filter(Boolean).join(' ');

    return (
      <form ref={ref} className={formClasses} onSubmit={handleSubmit} {...props}>
        {title && (
          <Text
            size="xl"
            weight="semibold"
            className="custom-form__title"
          >
            {title}
          </Text>
        )}
        
        {description && (
          <Text
            size="sm"
            className="custom-form__description"
            color="gray"
          >
            {description}
          </Text>
        )}

        <div className="custom-form__fields">
          {fields.map((field) => (
            <Input
              key={field.name}
              name={field.name}
              label={field.label}
              type={field.type}
              placeholder={field.placeholder}
              helperText={field.helperText}
              error={field.error}
              required={field.required}
              value={field.value}
              size={size}
              variant={variant}
              fullWidth
            />
          ))}
        </div>

        {error && (
          <Text
            size="sm"
            className="custom-form__error"
            color="red"
          >
            {error}
          </Text>
        )}

        <Button
          type="submit"
          isLoading={isLoading}
          size={size}
          variant={submitButtonVariant}
          fullWidth
        >
          {submitText}
        </Button>
      </form>
    );
  }
);

Form.displayName = 'Form';
*/
```

# src/components/Form/index.ts

```ts
//export * from './form';
//export { Form as default } from './form';
```

# src/components/index.ts

```ts
// Nav exports
export { default as Nav } from "./Nav/Nav"

// Text exports
export { default as Text } from "./Text/Text"
export type {
    TextProps,
    TextSize,
    TextWeight,
    TextAlign,
    TextTransform,
    TextVariant,
} from "./Text/Text"

//Button exports
export { default as Button} from "./Button2"
//export type { ButtonProps } from "./Button/button"

// Input exports
export { Input} from "./Input2"
//export type { InputProps } from "./Input"

// Form exports
//export { Form } from "./Form"
//export type { FormProps } from "./Form"

// Spinner exports
export { Spinner } from "./Spinner"
export type { SpinnerProps } from "./Spinner"

```

# src/components/Input/index.ts

```ts
export { default } from './input';
```

# src/components/Input/Input.scss

```scss
.input-wrapper {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.input {
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid #d1d5db;
  font-size: 16px;
  outline: none;
  transition: border-color 0.2s ease;
  width: 100%;
  background-color: white;

  &:focus {
    border-color: #0070f3;
    box-shadow: 0 0 0 3px rgba(0, 112, 243, 0.1);
  }

  &--error {
    border-color: #ef4444;

    &:focus {
      border-color: #ef4444;
      box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
    }
  }

  &__helper-text {
    font-size: 14px;
    color: #6b7280;

    &--error {
      color: #ef4444;
    }
  }
}

```

# src/components/Input/input.tsx

```tsx
import React from 'react';
import './Input.scss';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  helperText?: string;
}

const Input: React.FC<InputProps> = ({
  error = false,
  helperText,
  className = '',
  ...props
}) => {
  const inputClasses = [
    'input',
    error ? 'input--error' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className="input-wrapper">
      <input className={inputClasses} {...props} />
      {helperText && (
        <p className={`input__helper-text ${error ? 'input__helper-text--error' : ''}`}>
          {helperText}
        </p>
      )}
    </div>
  );
};

export default Input;
```

# src/components/Input2/index.ts

```ts
export { Input } from './input';
export type { InputProps } from './input';


```

# src/components/Input2/Input.scss

```scss
custom-input-wrapper {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .custom-input {
    border-radius: 0.375rem;
    transition: all 0.2s ease-in-out;
    width: auto;
    color: var(--text-primary);
    
    // Size variations
    &--sm {
      padding: 0.5rem 0.75rem;
      font-size: 0.875rem;
    }
    
    &--md {
      padding: 0.75rem 1rem;
      font-size: 1rem;
    }
    
    &--lg {
      padding: 1rem 1.25rem;
      font-size: 1.125rem;
    }
    
    // Variants
    &--outlined {
      border: 1px solid var(--border-color);
      background-color: var(--background-primary);
      
      &:hover {
        border-color: var(--text-secondary);
        background-color: var(--background-primary);
        box-shadow: inset 0 0 0 100px var(--hover-overlay);
      }
      
      &:focus {
        border-color: var(--primary-color);
        outline: none;
        box-shadow: 0 0 0 4px var(--focus-ring);
      }
    }
    
    &--filled {
      border: 1px solid transparent;
      background-color: var(--background-secondary);
      
      &:hover {
        background-color: var(--background-secondary);
        box-shadow: inset 0 0 0 100px var(--hover-overlay);
      }
      
      &:focus {
        background-color: var(--background-primary);
        border-color: var(--primary-color);
        outline: none;
        box-shadow: 0 0 0 2px var(--focus-ring);
      }
    }
    
    &--full-width {
      width: 100%;
    }
    
    &--error {
      border-color: var(--error-color);
      
      &:focus {
        border-color: var(--error-color);
        box-shadow: 0 0 0 2px var(--error-light);
      }
    }
    
    &:disabled {
      background-color: var(--background-secondary);
      cursor: not-allowed;
      opacity: 0.7;
    }
  
    &::placeholder {
      color: var(--text-secondary);
      opacity: 0.7;
    }
  }
  
  .custom-input__label {
    color: var(--text-primary);
    
    &--sm {
      font-size: 0.75rem;
    }
    
    &--md {
      font-size: 0.875rem;
    }
    
    &--lg {
      font-size: 1rem;
    }
  }
  
  .custom-input__helper-text {
    color: var(--text-secondary);
    
    &--sm {
      font-size: 0.675rem;
    }
    
    &--md {
      font-size: 0.75rem;
    }
    
    &--lg {
      font-size: 0.875rem;
    }
    
    &--error {
      color: var(--error-color);
    }
  }
```

# src/components/Input2/input.tsx

```tsx
import { InputHTMLAttributes, forwardRef } from 'react';
import './Input.scss';

export type InputSize = 'sm' | 'md' | 'lg';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
  variant?: 'outlined' | 'filled';
  size?: InputSize;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      className = '',
      fullWidth = false,
      variant = 'outlined',
      size = 'md',
      ...props
    },
    ref
  ) => {
    const inputClasses = [
      'custom-input',
      `custom-input--${variant}`,
      `custom-input--${size}`,
      fullWidth ? 'custom-input--full-width' : '',
      error ? 'custom-input--error' : '',
      className
    ].filter(Boolean).join(' ');

    const labelClasses = [
      'custom-input__label',
      `custom-input__label--${size}`
    ].filter(Boolean).join(' ');

    const helperTextClasses = [
      'custom-input__helper-text',
      `custom-input__helper-text--${size}`,
      error ? 'custom-input__helper-text--error' : ''
    ].filter(Boolean).join(' ');

    return (
      <div className="custom-input-wrapper">
        {label && (
          <label className={labelClasses}>
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={inputClasses}
          {...props}
        />
        {(error || helperText) && (
          <div className={helperTextClasses}>
            {error || helperText}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
```

# src/components/Label/Label.scss

```scss
.label {
    font-size: 14px;
    font-weight: 500;
    color: #374151;
    cursor: pointer;
  
    &--required {
      &::after {
        content: '*';
        color: #ef4444;
        margin-left: 4px;
      }
    }
  }
```

# src/components/Label/label.tsx

```tsx
import React from 'react';
import './Label.scss';

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

export const Label: React.FC<LabelProps> = ({
  children,
  required = false,
  className = '',
  ...props
}) => {
  const labelClasses = [
    'label',
    required ? 'label--required' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <label className={labelClasses} {...props}>
      {children}
    </label>
  );
};
```

# src/components/Nav/index.ts

```ts
export { default } from './Nav';
```

# src/components/Nav/Nav.scss

```scss
.vertical-nav {
  height: 100vh;
  background-color: var(--background-secondary);
  position: fixed;
  top: 0;
  left: 0;
  padding: 1rem;
  border-right: 1px solid var(--border-color);
  transition: width 0.3s ease;
  display: flex;
  flex-direction: column;

  &.expanded {
    width: 250px;

    .nav-text {
      opacity: 1;
      transition: opacity 0.3s ease 0.1s;
    }

    .icon-container {
      transform: rotate(0deg);
    }
  }

  &.collapsed {
    width: 60px;

    .nav-text {
      display: none;
      opacity: 0;
      transition: opacity 0.1s ease;
    }

    .nav-item, .theme-toggle {
      justify-content: center;
      padding: 0.75rem 0;
      
      .nav-icon {
        margin-right: 0;
      }
    }

    .icon-container {
      transform: rotate(0deg);
    }
  }

  .toggle-button {
    width: 30px;
    height: 30px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    margin-bottom: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text-primary);

    .icon-container {
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.3s ease;
    }

    &:hover {
      color: var(--primary-color);
    }
  }

  .nav-list {
    list-style: none;
    padding: 0;
    margin: 0;
    flex: 1;
  }

  .nav-item {
    padding: 0.75rem 0.5rem;
    margin: 0.5rem 0;
    color: var(--text-primary);
    cursor: pointer;
    border-radius: 4px;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    white-space: nowrap;

    &:hover {
      background-color: var(--border-color);
    }
  }

  .nav-icon {
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.5rem;
    flex-shrink: 0;
  }

  .nav-text {
    display: inline-block;
    overflow: hidden;
  }

  .theme-toggle {
    margin-top: auto;
    padding: 0.75rem 0.5rem;
    background: none;
    border: none;
    color: var(--text-primary);
    cursor: pointer;
    border-radius: 4px;
    display: flex;
    align-items: center;
    white-space: nowrap;
    width: 100%;
    transition: all 0.2s ease;

    &:hover {
      background-color: var(--border-color);
    }
  }
}
```

# src/components/Nav/Nav.tsx

```tsx
import { FC, useState } from 'react'
import { ChevronRight, Menu } from 'lucide-react'
import { useTheme } from '~/contexts/ThemeContext'
import './Nav.scss'

interface NavProps {
  className?: string;
}

const Nav: FC<NavProps> = ({ className = '' }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className={`vertical-nav ${isExpanded ? 'expanded' : 'collapsed'} ${className}`}>
      <button 
        className="toggle-button"
        onClick={() => setIsExpanded(!isExpanded)}
        aria-label={isExpanded ? 'Collapse menu' : 'Expand menu'}
      >
        <div className="icon-container">
          {isExpanded ? (
            <Menu className="w-6 h-6" />
          ) : (
            <ChevronRight className="w-6 h-6" />
          )}
        </div>
      </button>
      
      <ul className="nav-list">
        <li className="nav-item">
          <span className="nav-icon">🏠</span>
          <span className="nav-text">Home</span>
        </li>
        <li className="nav-item">
          <span className="nav-icon">📊</span>
          <span className="nav-text">Dashboard</span>
        </li>
        <li className="nav-item">
          <span className="nav-icon">⚙️</span>
          <span className="nav-text">Settings</span>
        </li>
      </ul>

      <button 
        className="theme-toggle"
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      >
        <span className="nav-icon">{theme === 'light' ? '🌙' : '☀️'}</span>
        <span className="nav-text">
          {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
        </span>
      </button>
    </nav>
  )
}

export default Nav
```

# src/components/Select/index.ts

```ts
export { Select } from './select';
//export type { SelectProps, SelectOption } from './select';
```

# src/components/Select/Select.scss

```scss
.select-wrapper {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  
  .select {
    position: relative;
    user-select: none;
  
    &__trigger {
      padding: 8px 12px;
      border: 1px solid #d1d5db;
      border-radius: 6px;
      background-color: white;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: space-between;
      transition: all 0.2s ease;
    }
  
    &__value {
      font-size: 14px;
      color: #374151;
  
      &--placeholder {
        color: #9ca3af;
      }
    }
  
    &__arrow {
      border-style: solid;
      border-width: 2px 2px 0 0;
      display: inline-block;
      padding: 3px;
      transform: rotate(135deg);
      vertical-align: middle;
      transition: transform 0.2s ease;
  
      &--open {
        transform: rotate(-45deg);
      }
    }
  
    &__options {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      margin-top: 4px;
      background-color: white;
      border: 1px solid #d1d5db;
      border-radius: 6px;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      z-index: 10;
      max-height: 200px;
      overflow-y: auto;
    }
  
    &__option {
      padding: 8px 12px;
      font-size: 14px;
      cursor: pointer;
      transition: all 0.2s ease;
  
      &:hover {
        background-color: #f3f4f6;
      }
  
      &--selected {
        background-color: #e5e7eb;
        color: #111827;
      }
    }
  
    &--error {
      .select__trigger {
        border-color: #ef4444;
      }
    }
  
    &--disabled {
      opacity: 0.5;
      cursor: not-allowed;
  
      .select__trigger {
        pointer-events: none;
      }
    }
  
    &__helper-text {
      font-size: 12px;
      color: #6b7280;
  
      &--error {
        color: #ef4444;
      }
    }
  }
```

# src/components/Select/select.tsx

```tsx
import React, { useState, useRef, useEffect } from 'react';
import './Select.scss';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  value?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
  className?: string;
}

interface SelectTriggerProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  onClick?: () => void;
}

interface SelectValueProps {
  placeholder?: string;
  children?: React.ReactNode;
  className?: string;
}

interface SelectContentProps {
  children: React.ReactNode;
  className?: string;
}

interface SelectItemProps {
  value: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  'aria-selected'?: boolean;
}

export const SelectTrigger: React.FC<SelectTriggerProps> = ({
  children,
  id,
  className = ''
}) => (
  <div id={id} className={`select__trigger ${className}`}>
    {children}
  </div>
);

export const SelectValue: React.FC<SelectValueProps> = ({
  placeholder,
  children,
  className = ''
}) => (
  <span className={`select__value ${!children ? 'select__value--placeholder' : ''} ${className}`}>
    {children || placeholder}
  </span>
);

export const SelectContent: React.FC<SelectContentProps> = ({
  children,
  className = ''
}) => (
  <div className={`select__content ${className}`}>
    {children}
  </div>
);

export const SelectItem: React.FC<SelectItemProps> = ({
  value,
  children,
  className = ''
}) => (
  <div
    className={`select__item ${className}`}
    data-value={value}
  >
    {children}
  </div>
);

export const Select: React.FC<SelectProps> = ({
  value,
  onValueChange,
  children,
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value);
  const selectRef = useRef<HTMLDivElement>(null);

  //const selectClasses = [
  //  'select',
  // isOpen ? 'select--open' : '',
  //  error ? 'select--error' : '',
  //  disabled ? 'select--disabled' : '',
  //  className
  //].filter(Boolean).join(' ');

  useEffect(() => {
    setSelectedValue(value);
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleTriggerClick = () => {
    setIsOpen(!isOpen);
  };
  
  const handleItemClick = (itemValue: string) => {
    setSelectedValue(itemValue);
    onValueChange?.(itemValue);
    setIsOpen(false);
  };

  const childrenWithProps = React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) return child;

    if (child.type === SelectTrigger) {
      return React.cloneElement(child as React.ReactElement<SelectTriggerProps>, {
        onClick: handleTriggerClick,
      });
    }

    if (child.type === SelectContent && isOpen) {
      const contentChildren = React.Children.map(child.props.children, (contentChild) => {
        if (!React.isValidElement(contentChild)) return contentChild;

        const typedContentChild = contentChild as React.ReactElement<SelectItemProps>;

        if (contentChild.type === SelectItem) {
          return React.cloneElement(typedContentChild, {
            onClick: () => handleItemClick(typedContentChild.props.value),
            'aria-selected': typedContentChild.props.value === selectedValue,
          });
        }

        return contentChild;
      });

      return React.cloneElement(child, {}, contentChildren);
    }

    return child;
  });

  return (
    <div ref={selectRef} className={`select ${className}`}>
      {childrenWithProps}
    </div>
  );
};
```

# src/components/Spinner/index.ts

```ts
export { default as Spinner } from './spinner';
export type { SpinnerProps } from './spinner';
```

# src/components/Spinner/Spinner.scss

```scss
// Spinner variables
$spinner-border-width: 3px;
$spinner-animation-duration: 0.8s;

// Spinner base styles
.spinner {
    position: relative;
    display: inline-block;
    border-style: solid;
    border-radius: 50%;
    border-color: var(--border-color);
    border-top-color: var(--primary-color);
    animation: spinner-rotate $spinner-animation-duration linear infinite;

    &__container {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
    }
}

// Spinner sizes
.spinner--sm {
    width: 16px;
    height: 16px;
    border-width: 2px;
}

.spinner--md {
    width: 32px;
    height: 32px;
    border-width: $spinner-border-width;
}

.spinner--lg {
    width: 48px;
    height: 48px;
    border-width: 4px;
}

// Animation keyframes
@keyframes spinner-rotate {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}

```

# src/components/Spinner/spinner.tsx

```tsx
import { FC } from 'react';
import './Spinner.scss';

export interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Spinner: FC<SpinnerProps> = ({ size = 'md', className = '' }) => {
  return (
    <div className="spinner__container">
      <div 
        className={`
          spinner 
          spinner--${size}
          ${className}
        `}
      />
    </div>
  );
};

export default Spinner;
```

# src/components/Table/index.ts

```ts
export {
    Table,
    TableHeader,
    TableBody,
    TableFooter,
    TableHead,
    TableRow,
    TableCell,
    TableCaption,
  } from './table';
```

# src/components/Table/Table.scss

```scss
.table-wrapper {
    width: 100%;
    overflow-x: auto;
  }
  
  .table {
    width: 100%;
    border-collapse: collapse;
    text-align: left;
  
    &__header {
      background-color: #f9fafb;
    }
  
    &__header-cell {
      padding: 12px 16px;
      font-weight: 600;
      font-size: 14px;
      color: #374151;
      border-bottom: 2px solid #e5e7eb;
    }
  
    &__cell {
      padding: 12px 16px;
      font-size: 14px;
      color: #374151;
      border-bottom: 1px solid #e5e7eb;
    }
  
    &--striped {
      .table__body {
        .table__row:nth-child(even) {
          background-color: #f9fafb;
        }
      }
    }
  
    &--hoverable {
      .table__body {
        .table__row:hover {
          background-color: #f3f4f6;
        }
      }
    }
  }
```

# src/components/Table/table.tsx

```tsx
import React from 'react';
import './Table.scss';

interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  striped?: boolean;
  hoverable?: boolean;
}

export const Table: React.FC<TableProps> = ({
  children,
  striped = false,
  hoverable = false,
  className = '',
  ...props
}) => {
  const tableClasses = [
    'table',
    striped ? 'table--striped' : '',
    hoverable ? 'table--hoverable' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className="table-wrapper">
      <table className={tableClasses} {...props}>
        {children}
      </table>
    </div>
  );
};

export const TableHeader: React.FC<React.HTMLAttributes<HTMLTableSectionElement>> = ({
  children,
  className = '',
  ...props
}) => (
  <thead className={`table__header ${className}`} {...props}>
    {children}
  </thead>
);

export const TableBody: React.FC<React.HTMLAttributes<HTMLTableSectionElement>> = ({
  children,
  className = '',
  ...props
}) => (
  <tbody className={`table__body ${className}`} {...props}>
    {children}
  </tbody>
);

export const TableRow: React.FC<React.HTMLAttributes<HTMLTableRowElement>> = ({
  children,
  className = '',
  ...props
}) => (
  <tr className={`table__row ${className}`} {...props}>
    {children}
  </tr>
);

export const TableCell: React.FC<React.TdHTMLAttributes<HTMLTableCellElement>> = ({
  children,
  className = '',
  ...props
}) => (
  <td className={`table__cell ${className}`} {...props}>
    {children}
  </td>
);

export const TableHeaderCell: React.FC<React.ThHTMLAttributes<HTMLTableCellElement>> = ({
  children,
  className = '',
  ...props
}) => (
  <th className={`table__header-cell ${className}`} {...props}>
    {children}
  </th>
);
```

# src/components/Text/index.ts

```ts
export { default } from './Text';
export type { 
  TextProps, 
  TextSize, 
  TextWeight, 
  TextAlign, 
  TextTransform, 
  TextVariant 
} from './Text';
```

# src/components/Text/Text.scss

```scss
.text {
  margin: 0;
  padding: 0;

  // Variants
  &--body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  }

  &--display {
    font-family: Georgia, 'Times New Roman', Times, serif;
  }

  &--mono {
    font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace;
  }

  &--caption {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    color: var(--text-secondary);
  }

  // Sizes
  &--xs {
    font-size: 0.75rem;
    line-height: 1rem;
  }

  &--sm {
    font-size: 0.875rem;
    line-height: 1.25rem;
  }

  &--md {
    font-size: 1rem;
    line-height: 1.5rem;
  }

  &--lg {
    font-size: 1.125rem;
    line-height: 1.75rem;
  }

  &--xl {
    font-size: 1.25rem;
    line-height: 1.75rem;
  }

  &--2xl {
    font-size: 1.5rem;
    line-height: 2rem;
  }

  &--3xl {
    font-size: 1.875rem;
    line-height: 2.25rem;
  }

  // Weights
  &--light {
    font-weight: 300;
  }

  &--normal {
    font-weight: 400;
  }

  &--medium {
    font-weight: 500;
  }

  &--semibold {
    font-weight: 600;
  }

  &--bold {
    font-weight: 700;
  }

  // Alignment
  &--center {
    text-align: center;
  }

  &--right {
    text-align: right;
  }

  &--justify {
    text-align: justify;
  }

  // Text transforms
  &--capitalize {
    text-transform: capitalize;
  }

  &--uppercase {
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  &--lowercase {
    text-transform: lowercase;
  }

  // Truncation
  &--truncate {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &--multiline {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  // Style variants
  &--italic {
    font-style: italic;
  }

  // Responsive font sizes
  @media (max-width: 640px) {
    &--3xl {
      font-size: 1.5rem;
      line-height: 2rem;
    }

    &--2xl {
      font-size: 1.25rem;
      line-height: 1.75rem;
    }

    &--xl {
      font-size: 1.125rem;
      line-height: 1.75rem;
    }
  }
}
```

# src/components/Text/Text.tsx

```tsx
import { ElementType, FC, ReactNode } from "react"
import "./Text.scss"

export type TextSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl"
export type TextWeight = "light" | "normal" | "medium" | "semibold" | "bold"
export type TextAlign = "left" | "center" | "right" | "justify"
export type TextTransform = "none" | "capitalize" | "uppercase" | "lowercase"
export type TextVariant = "body" | "display" | "mono" | "caption"

export interface TextProps {
    children: ReactNode
    size?: TextSize
    weight?: TextWeight
    align?: TextAlign
    transform?: TextTransform
    variant?: TextVariant
    as?: ElementType
    truncate?: boolean
    maxLines?: number
    className?: string
    color?: string
    italic?: boolean
}

const Text: FC<TextProps> = ({
    children,
    size = "md",
    weight = "normal",
    align = "left",
    transform = "none",
    variant = "body",
    as: Component = "p",
    truncate = false,
    maxLines,
    className = "",
    color,
    italic = false,
}) => {
    const baseClass = "text"
    const classes = [
        baseClass,
        `${baseClass}--${variant}`,
        `${baseClass}--${size}`,
        `${baseClass}--${weight}`,
        align !== "left" && `${baseClass}--${align}`,
        transform !== "none" && `${baseClass}--${transform}`,
        truncate && `${baseClass}--truncate`,
        maxLines && `${baseClass}--multiline`,
        italic && `${baseClass}--italic`,
        className,
    ]
        .filter(Boolean)
        .join(" ")

    const style = {
        ...(color && { color }),
        ...(maxLines && {
            WebkitLineClamp: maxLines,
        }),
    }

    return (
        <Component className={classes} style={style}>
            {children}
        </Component>
    )
}

export default Text

```

# src/contexts/AppContext.tsx

```tsx
import React, { createContext, useContext, useState } from 'react'

interface User {
  name: string
  email: string
}

interface AppContextType {
  user: User | null
  setUser: (user: User | null) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)

  return (
    <AppContext.Provider value={{ user, setUser }}>
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider')
  }
  return context
}
```

# src/contexts/ThemeContext.tsx

```tsx
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    // Check for saved theme
    const saved = localStorage.getItem('theme');
    // Check system preference if no saved theme
    if (!saved) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return saved as Theme;
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
```

# src/features/auth/RequireAuth.tsx

```tsx
import { Navigate, useLocation } from "react-router-dom"

interface RequireAuthProps {
    children: React.ReactNode
}

export function RequireAuth({ children }: RequireAuthProps) {
    const location = useLocation()

    // TODO: add real auth logic
    const isAuthenticated = true

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />
    }

    return <>{children}</>
}

```

# src/features/guest-invite/EstimatedBudget/EstimatedBudget.scss

```scss
.estimated-budget {
    background-color: #f9fafb;
    border-style: dashed;
  
    &__grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
    }
  }
  
  .budget-item {
    &__label {
      font-size: 12px;
      color: #6b7280;
    }
  
    &__value {
      font-size: 18px;
      font-weight: 500;
      color: #111827;
      margin-top: 4px;
    }
  }
```

# src/features/guest-invite/EstimatedBudget/EstimatedBudget.tsx

```tsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/Card/card";
import './EstimatedBudget.scss';

export const EstimatedBudget: React.FC = () => {
  return (
    <Card className="estimated-budget">
      <CardHeader>
        <CardTitle>Estimated Budget</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="estimated-budget__grid">
          <div className="budget-item">
            <div className="budget-item__label">Average Flight</div>
            <div className="budget-item__value">$450</div>
          </div>
          <div className="budget-item">
            <div className="budget-item__label">Average Hotel</div>
            <div className="budget-item__value">$320</div>
          </div>
          <div className="budget-item">
            <div className="budget-item__label">Total Estimate</div>
            <div className="budget-item__value">$770</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
```

# src/features/guest-invite/GuestDetailsForm/GuestDetailsForm.scss

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

# src/features/guest-invite/GuestDetailsForm/GuestDetailsForm.tsx

```tsx
import React from 'react';
import  Input from "@/components/Input/input";
import { Label } from "@/components/Label/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/Select/select";
import { useGuestInviteState } from '@/api/hooks/useGuestInviteState';
import './GuestDetailsForm.scss';

export const GuestDetailsForm: React.FC = () => {
  const { state, updateGuestDetails } = useGuestInviteState();

  return (
    <div className="guest-details-form">
      <div className="guest-details-form__name-group">
        <div className="form-field">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            value={state.guestDetails.firstName}
            onChange={(e) => updateGuestDetails({ firstName: e.target.value })}
            placeholder="Enter first name"
          />
        </div>
        <div className="form-field">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            value={state.guestDetails.lastName}
            onChange={(e) => updateGuestDetails({ lastName: e.target.value })}
            placeholder="Enter last name"
          />
        </div>
      </div>
      
      <div className="form-field">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={state.guestDetails.email}
          onChange={(e) => updateGuestDetails({ email: e.target.value })}
          placeholder="Enter work email"
        />
      </div>
      
      <div className="form-field">
        <Label htmlFor="phone">Phone Number</Label>
        <Input
          id="phone"
          type="tel"
          value={state.guestDetails.phone}
          onChange={(e) => updateGuestDetails({ phone: e.target.value })}
          placeholder="+1 (555) 000-0000"
        />
      </div>
      
      <div className="form-field">
        <Label htmlFor="guestType">Guest Type</Label>
        <Select
          value={state.guestDetails.guestType}
          onValueChange={(value) => updateGuestDetails({ guestType: value })}
        >
          <SelectTrigger id="guestType">
            <SelectValue placeholder="Select guest type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="interview">Interview</SelectItem>
            <SelectItem value="contract">Contract Work</SelectItem>
            <SelectItem value="student">Student Visit</SelectItem>
            <SelectItem value="internship">Internship</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
```

# src/features/guest-invite/ItineraryForm/ItineraryForm.scss

```scss
.itinerary-form {
    display: flex;
    flex-direction: column;
    gap: 24px;
  
    &__location-group,
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

# src/features/guest-invite/ItineraryForm/ItineraryForm.tsx

```tsx
import React from 'react';
import  Input  from "@/components/Input/input";
import { Label } from "@/components/Label/label";
import { useGuestInviteState } from '@/api/hooks/useGuestInviteState';
import { EstimatedBudget } from '../EstimatedBudget/EstimatedBudget';
import './ItineraryForm.scss';

export const ItineraryForm: React.FC = () => {
  const { state, updateItineraryDetails } = useGuestInviteState();

  return (
    <div className="itinerary-form">
      <div className="itinerary-form__location-group">
        <div className="form-field">
          <Label htmlFor="origin">Origin Location</Label>
          <Input
            id="origin"
            value={state.itineraryDetails.origin}
            onChange={(e) => updateItineraryDetails({ origin: e.target.value })}
            placeholder="City or airport code"
          />
        </div>
        <div className="form-field">
          <Label htmlFor="destination">Destination Location</Label>
          <Input
            id="destination"
            value={state.itineraryDetails.destination}
            onChange={(e) => updateItineraryDetails({ destination: e.target.value })}
            placeholder="City or airport code"
          />
        </div>
      </div>

      <div className="itinerary-form__schedule-group">
        <div className="form-field">
          <Label htmlFor="firstMeetingStart">First Meeting Start</Label>
          <Input
            id="firstMeetingStart"
            type="datetime-local"
            value={state.itineraryDetails.firstMeetingStart}
            onChange={(e) => updateItineraryDetails({ firstMeetingStart: e.target.value })}
          />
        </div>
        <div className="form-field">
          <Label htmlFor="lastMeetingEnd">Last Meeting End</Label>
          <Input
            id="lastMeetingEnd"
            type="datetime-local"
            value={state.itineraryDetails.lastMeetingEnd}
            onChange={(e) => updateItineraryDetails({ lastMeetingEnd: e.target.value })}
          />
        </div>
      </div>

      <EstimatedBudget />
    </div>
  );
};
```

# src/features/guest-invite/PreferencesForm/PreferencesForm.scss

```scss

```

# src/features/guest-invite/PreferencesForm/PreferencesForm.tsx

```tsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/Card/card";
import { Label } from "@/components/Label/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/Select/select";
import { Checkbox } from "@/components/Checkbox/checkbox";
import Input from "@/components/Input/input";
import { useGuestInviteState } from '@/api/hooks/useGuestInviteState';
import { EstimatedBudget } from '../EstimatedBudget/EstimatedBudget';
import './PreferencesForm.scss';

export const PreferencesForm: React.FC = () => {
  const { state, updateTravelPreferences } = useGuestInviteState();

  return (
    <div className="preferences-form">
      <Card>
        <CardHeader>
          <CardTitle >Flight Details</CardTitle>
        </CardHeader>
        <CardContent className="preferences-section">
          <div className="form-field">
            <Label htmlFor="flightCabinClass">Cabin Class</Label>
            <Select
              value={state.travelPreferences.flightCabinClass}
              onValueChange={(value) => updateTravelPreferences({ flightCabinClass: value })}
            >
              <SelectTrigger id="flightCabinClass">
                <SelectValue placeholder="Select cabin class" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Economy">Economy</SelectItem>
                <SelectItem value="Premium Economy">Premium Economy</SelectItem>
                <SelectItem value="Business">Business</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="checkbox-group">
            <div className="checkbox-field">
              <Checkbox
                id="directFlights"
                checked={state.travelPreferences.directFlightsPreferred}
                onCheckedChange={(checked) => 
                  updateTravelPreferences({ directFlightsPreferred: checked as boolean })
                }
              />
              <Label htmlFor="directFlights" className="ml-2">Direct flights preferred</Label>
            </div>
            <div className="flex items-center">
              <Checkbox
                id="refundableTickets"
                checked={state.travelPreferences.refundableTicketsOnly}
                onCheckedChange={(checked) => 
                  updateTravelPreferences({ refundableTicketsOnly: checked as boolean })
                }
              />
              <Label htmlFor="refundableTickets" className="ml-2">Refundable tickets only</Label>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-medium">Hotel Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <Label htmlFor="hotelQuality">Hotel Quality</Label>
            <Select
              value={state.travelPreferences.hotelQuality}
              onValueChange={(value) => updateTravelPreferences({ hotelQuality: value })}
            >
              <SelectTrigger id="hotelQuality">
                <SelectValue placeholder="Select hotel quality" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="3-star">⭐⭐⭐ 3-star hotels</SelectItem>
                <SelectItem value="4-star">⭐⭐⭐⭐ 4-star hotels</SelectItem>
                <SelectItem value="5-star">⭐⭐⭐⭐⭐ 5-star hotels</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-medium">Ground Transport</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="groundTransportService">Preferred Service</Label>
            <Select
              value={state.travelPreferences.groundTransportService}
              onValueChange={(value) => updateTravelPreferences({ groundTransportService: value })}
            >
              <SelectTrigger id="groundTransportService">
                <SelectValue placeholder="Select preferred service" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Uber">Uber</SelectItem>
                <SelectItem value="Lyft">Lyft</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
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
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-medium">Per Diem</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <Label htmlFor="perDiemAmount">Daily Amount</Label>
            <div className="relative">
              <span className="absolute left-3 top-2 text-gray-500">$</span>
              <Input
                id="perDiemAmount"
                type="number"
                className="pl-8"
                value={state.travelPreferences.perDiemAmount}
                onChange={(e) => updateTravelPreferences({ perDiemAmount: Number(e.target.value) })}
                placeholder="Enter amount"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <EstimatedBudget />
    </div>
  );
};
```

# src/features/guest-invite/ProgressBar/ProgressBar.scss

```scss
.progress-bar {
    margin-bottom: 32px;
  
    &__steps {
      display: flex;
      justify-content: space-between;
      margin-bottom: 8px;
    }
  
    &__step-container {
      display: flex;
      align-items: center;
    }
  
    &__step {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      transition: all 0.2s ease;
  
      &--current {
        background-color: #2563eb;
        color: white;
      }
  
      &--completed {
        background-color: #dcfce7;
        color: #16a34a;
      }
  
      &--upcoming {
        background-color: #f3f4f6;
        color: #9ca3af;
      }
    }
  
    &__connector {
      width: 96px;
      height: 4px;
      margin: 0 8px;
      background-color: #f3f4f6;
      transition: background-color 0.2s ease;
  
      &--completed {
        background-color: #dcfce7;
      }
    }
  
    &__labels {
      display: flex;
      justify-content: space-between;
      padding: 0 4px;
    }
  
    &__label {
      font-size: 14px;
      color: #4b5563;
    }
  }
```

# src/features/guest-invite/ProgressBar/ProgressBar.tsx

```tsx
import React from 'react';
import './ProgressBar.scss';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps }) => {
  return (
    <div className="progress-bar">
      <div className="progress-bar__steps">
        {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
          <div key={step} className="progress-bar__step-container">
            <div className={`progress-bar__step ${
              step === currentStep 
                ? 'progress-bar__step--current' 
                : step < currentStep 
                ? 'progress-bar__step--completed' 
                : 'progress-bar__step--upcoming'
            }`}>
              {step < currentStep ? '✓' : step}
            </div>
            {step < totalSteps && (
              <div className={`progress-bar__connector ${
                step < currentStep ? 'progress-bar__connector--completed' : ''
              }`} />
            )}
          </div>
        ))}
      </div>
      <div className="progress-bar__labels">
        <span>Guest Details</span>
        <span>Itinerary</span>
        <span>Preferences</span>
        <span>Review</span>
      </div>
    </div>
  );
};
```

# src/features/guest-invite/ReviewForm/ReviewForm.scss

```scss

```

# src/features/guest-invite/ReviewForm/ReviewForm.tsx

```tsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/Card/card";
import { User, MapPin, Calendar, Plane, Hotel, Car, DollarSign } from 'lucide-react';
import { useGuestInviteState } from '@/api/hooks/useGuestInviteState';
import { EstimatedBudget } from '../EstimatedBudget/EstimatedBudget';
import './ReviewForm.scss';

export const ReviewForm: React.FC = () => {
  const { state } = useGuestInviteState();

  const SummaryItem: React.FC<{
    icon: React.ReactNode;
    title: string;
    children: React.ReactNode;
  }> = ({ icon, title, children }) => (
    <div className="summary-item">
      {icon}
      <div className="summary-item__content">
        <div className="summary-item__title">{title}</div>
        {children}
      </div>
    </div>
  );

  const PreferenceItem: React.FC<{
    icon: React.ReactNode;
    children: React.ReactNode;
  }> = ({ icon, children }) => (
    <div className="preference-item">
      {icon}
      <span className="preference-item__text">{children}</span>
    </div>
  );

  return (
    <div className="review-form">
      <Card>
        <CardHeader>
          <CardTitle>Trip Summary</CardTitle>
          <CardDescription>Review all details before sending invitation</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="review-form__content">
            <SummaryItem 
                icon={<User className="summary-item__icon" />} 
                title="Guest Information"
              >
                <div className="summary-item__detail">
                  {state.guestDetails.firstName} {state.guestDetails.lastName}
                </div>
                <div className="summary-item__detail">{state.guestDetails.email}</div>
                <div className="summary-item__detail">{state.guestDetails.guestType}</div>
            </SummaryItem>

            <SummaryItem 
                icon={<MapPin className="summary-item__icon" />} 
                title="Location Details"
              >
                <div className="summary-item__detail">From: {state.itineraryDetails.origin}</div>
                <div className="summary-item__detail">To: {state.itineraryDetails.destination}</div>
            </SummaryItem>

            <SummaryItem 
                icon={<Calendar className="summary-item__icon" />} 
                title="Schedule"
              >
                <div className="summary-item__detail">
                  First Meeting: {state.itineraryDetails.firstMeetingStart}
                </div>
                <div className="summary-item__detail">
                  Last Meeting: {state.itineraryDetails.lastMeetingEnd}
                </div>
            </SummaryItem>

            <div className="preferences-section">
                <div className="preferences-section__title">Travel Preferences</div>
                <div className="preferences-section__grid">
                  <PreferenceItem icon={<Plane className="preference-item__icon" />}>
                      Flight ({state.travelPreferences.flightCabinClass})
                    </PreferenceItem>
                    <PreferenceItem icon={<Hotel className="preference-item__icon" />}>
                      Hotel ({state.travelPreferences.hotelQuality})
                    </PreferenceItem>
                    <PreferenceItem icon={<Car className="preference-item__icon" />}>
                      {state.travelPreferences.groundTransportService} (
                      {state.travelPreferences.groundTransportClass})
                    </PreferenceItem>
                    <PreferenceItem icon={<DollarSign className="preference-item__icon" />}>
                      Per Diem (${state.travelPreferences.perDiemAmount}/day)
                    </PreferenceItem>
                </div>
              </div>

            <EstimatedBudget />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
```

# src/features/reports/QuickStats/QuickStats.scss

```scss
.quick-stats {
    display: grid;
    grid-template-columns: 1fr;
    gap: 24px;
    margin-bottom: 32px;
  
    @media (min-width: 768px) {
      grid-template-columns: repeat(4, 1fr);
    }
  }
  
  .quick-stat {
    &__title {
      font-size: 14px;
      font-weight: 500;
      color: #6b7280;
    }
  
    &__value {
      font-size: 24px;
      font-weight: 700;
      color: #111827;
    }
  
    &__subvalue {
      font-size: 12px;
      color: #6b7280;
      display: flex;
      align-items: center;
    }
  
    &__trend-icon {
      width: 12px;
      height: 12px;
      margin-right: 4px;
      color: #10b981;
    }
  }
```

# src/features/reports/QuickStats/QuickStats.tsx

```tsx
import React from 'react';
import { TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/Card/card";
import './QuickStats.scss';

interface QuickStatProps {
  title: string;
  value: string;
  subvalue?: string;
  icon?: React.ReactNode;
}

const QuickStat: React.FC<QuickStatProps> = ({ title, value, subvalue, icon }) => (
  <Card>
    <CardHeader className="pb-2">
      <CardTitle className="quick-stat__title">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="quick-stat__value">{value}</div>
      {subvalue && (
        <p className="quick-stat__subvalue">
          {icon}
          {subvalue}
        </p>
      )}
    </CardContent>
  </Card>
);

export const QuickStats: React.FC = () => {
  return (
    <div className="quick-stats">
      <QuickStat
        title="This Month's Spend"
        value="$17,800"
        subvalue="+12% from last month"
        icon={<TrendingUp className="w-3 h-3 mr-1 text-green-500" />}
      />
      <QuickStat
        title="Active Trips"
        value="8"
        subvalue="3 upcoming this week"
      />
      <QuickStat
        title="Total Guests"
        value="45"
        subvalue="This month"
      />
      <QuickStat
        title="Average Trip Cost"
        value="$1,450"
        subvalue="Per guest"
      />
    </div>
  );
};
```

# src/features/settings/types.ts

```ts
export interface FlightPreferences {
    cabin: string;
    directOnly: boolean;
    refundable: boolean;
  }
  
  export interface HotelPreferences {
    quality: string;
  }
  
  export interface TransportPreferences {
    service: string;
    carClass: string;
  }
  
  export interface PerDiemPreferences {
    amount: number;
  }
  
  export interface Preferences {
    flight: FlightPreferences;
    hotel: HotelPreferences;
    transport: TransportPreferences;
    perDiem: PerDiemPreferences;
  }
  
  export interface GuestType {
    id: number;
    name: string;
    preferences: Preferences;
  }
  
  export interface PreferenceCardProps {
    title: string;
    icon: React.ElementType;
    children: React.ReactElement<PreferenceChildProps> | React.ReactElement<PreferenceChildProps>[];
  }

  export interface PreferenceChildProps {
    preferences?: Preferences | null;
  }
  
  // Default preferences that can be imported and used
  export const defaultPreferences: Preferences = {
    flight: {
      cabin: 'Economy',
      directOnly: false,
      refundable: false
    },
    hotel: {
      quality: '3-star'
    },
    transport: {
      service: 'Uber',
      carClass: 'Standard'
    },
    perDiem: {
      amount: 50
    }
  };
```

# src/layouts/AuthLayout/AuthLayout.scss

```scss
.auth-layout {
    min-height: 100vh;
    background-color: var(--color-background);
    
    &__header {
      background-color: var(--color-card);
      padding: var(--space-6);
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
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: calc(100vh - 73px); // Full height minus header
      padding: var(--space-8);
      
      .auth-layout__container {
        max-width: 400px;
      }
    }
  }
```

# src/layouts/AuthLayout/AuthLayout.tsx

```tsx
import { FC } from "react"
import { Outlet } from "react-router-dom"
import "./AuthLayout.scss"

const AuthLayout: FC = () => {
    return (
        <div className="auth-layout">
            <header className="auth-layout__header">
                <div className="auth-layout__container">
                    <div className="auth-layout__logo">
                        TravelPortal
                    </div>
                </div>
            </header>
            <main className="auth-layout__main">
                <div className="auth-layout__container">
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

# src/layouts/DefaultLayout/DefaultLayout.scss

```scss
.layout {
    min-height: 100vh;
    background-color: var(--color-background);
  }
  
  .header {
    background-color: var(--color-card);
    border-bottom: 1px solid var(--color-border);
    
    &__container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 var(--space-4);
    }
    
    &__content {
      display: flex;
      height: 4rem;
      align-items: center;
      justify-content: space-between;
    }
    
    &__left {
      display: flex;
      align-items: center;
    }
    
    &__logo {
      font-size: 1.25rem;
      font-weight: 700;
      margin-right: var(--space-8);
      color: var(--color-foreground);
    }
    
    &__actions {
      display: flex;
      align-items: center;
      gap: var(--space-4);
    }
  }
  
  .nav {
    display: none;
    gap: var(--space-1);
    
    @media (min-width: 768px) {
      display: flex;
    }
    
    &__link {
      display: flex;
      align-items: center;
      padding: var(--space-2) var(--space-4);
      color: var(--color-foreground);
      text-decoration: none;
      border-radius: var(--radius);
      transition: background-color 0.2s;
      
      &:hover {
        background-color: var(--color-muted);
      }
      
      &--active {
        background-color: var(--color-secondary);
        color: var(--color-secondary-foreground);
      }
    }
    
    &__icon {
      width: 16px;
      height: 16px;
      margin-right: var(--space-2);
    }
  }
  
  .main {
    flex: 1;
    
    &__container {
      max-width: 1200px;
      margin: 0 auto;
      padding: var(--space-8) var(--space-4);
    }
  }
  
  .icon-button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.25rem;
    height: 2.25rem;
    border-radius: var(--radius);
    background: transparent;
    border: none;
    cursor: pointer;
    transition: background-color 0.2s;
    
    &:hover {
      background-color: var(--color-muted);
    }
    
    svg {
      width: 20px;
      height: 20px;
      color: var(--color-foreground);
    }
  }
  
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
  }
```

# src/layouts/DefaultLayout/DefaultLayout.tsx

```tsx
import { FC, ReactNode } from "react"
import { Outlet, Link, useLocation } from "react-router-dom"
import { LayoutDashboard, UserPlus, FileText, Settings, Bell } from "lucide-react"
import { Avatar } from "@/components/Avatar/avatar"
import "./DefaultLayout.scss"

const DefaultLayout: FC = () => {
    const location = useLocation()
    
    return (
        <div className="layout">
            <header className="header">
                <div className="header__container">
                    <div className="header__content">
                        <div className="header__left">
                            <h1 className="header__logo">TravelPortal</h1>
                            
                            <nav className="nav">
                                <Link 
                                    to="/dashboard"
                                    className={`nav__link ${location.pathname === '/dashboard' ? 'nav__link--active' : ''}`}
                                >
                                    <LayoutDashboard className="nav__icon" />
                                    <span>Dashboard</span>
                                </Link>
                                <Link 
                                    to="/guest-invite"
                                    className={`nav__link ${location.pathname === '/guest-invite' ? 'nav__link--active' : ''}`}
                                >
                                    <UserPlus className="nav__icon" />
                                    <span>Guest Invite</span>
                                </Link>
                                <Link 
                                    to="/reports"
                                    className={`nav__link ${location.pathname === '/reports' ? 'nav__link--active' : ''}`}
                                >
                                    <FileText className="nav__icon" />
                                    <span>Reports</span>
                                </Link>
                                <Link 
                                    to="/settings"
                                    className={`nav__link ${location.pathname === '/settings' ? 'nav__link--active' : ''}`}
                                >
                                    <Settings className="nav__icon" />
                                    <span>Settings</span>
                                </Link>
                            </nav>
                        </div>

                        <div className="header__actions">
                            <button className="icon-button">
                                <Bell />
                                <span className="sr-only">Notifications</span>
                            </button>
                            <Avatar fallback="SA" />
                        </div>
                    </div>
                </div>
            </header>

            <main className="main">
                <div className="main__container">
                    <Outlet />
                </div>
            </main>
        </div>
    )
}

export default DefaultLayout;
```

# src/layouts/DefaultLayout/index.ts

```ts
export { default as DefaultLayout } from "./DefaultLayout"
```

# src/layouts/ReportsLayout/ReportsLayout.scss

```scss
.reports-layout {
    min-height: 100vh;
    background-color: #f9fafb;
    padding: 32px;
  
    &__container {
      max-width: 1200px;
      margin: 0 auto;
    }
  
    &__header {
      margin-bottom: 32px;
    }
  
    &__title {
      font-size: 24px;
      font-weight: 700;
      color: #1f2937;
    }
  
    &__subtitle {
      color: #6b7280;
      margin-top: 4px;
    }
  }
```

# src/layouts/ReportsLayout/ReportsLayout.tsx

```tsx
import React from 'react';
import './ReportsLayout.scss';
//import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/Card/card";

interface ReportsLayoutProps {
  children: React.ReactNode;
}

export const ReportsLayout: React.FC<ReportsLayoutProps> = ({ children }) => {
  return (
    <div className="reports-layout">
      <div className="reports-layout__container">
        <div className="reports-layout__header">
          <h1 className="reports-layout__title">Reports</h1>
          <p className="reports-layout__subtitle">Track and analyze your travel expenses</p>
        </div>
        {children}
      </div>
    </div>
  );
};
```

# src/layouts/TravelMgrLayout/AppLayout/AppLayout.scss

```scss
.app-layout {
    min-height: 100vh;
    background-color: var(--background);
  }
  
  .app-header {
    position: sticky;
    top: 0;
    z-index: 40;
    border-bottom: 1px solid var(--border);
    background-color: var(--background);
  
    &__container {
      margin: 0 auto;
      padding: 0 1rem;
    }
  
    &__content {
      display: flex;
      height: 4rem; // equivalent to h-16
      align-items: center;
      justify-content: space-between;
    }
  
    &__logo-section {
      display: flex;
      align-items: center;
    }
  
    &__logo {
      font-size: 1.25rem; // equivalent to text-xl
      font-weight: 700; // equivalent to font-bold
      margin-right: 2rem;
    }
  
    &__actions {
      display: flex;
      align-items: center;
      margin-left: 1rem; 
    }
  }
  
  .app-nav {
    display: none;
    //gap: 4px;
  
    @media (min-width: 768px) {
      display: flex;

      > * + * {
        margin-left: 0.25rem;
      }
    }
  
    &__item {
      text-decoration: none;
    }
  
    &__link {
      display: flex;
      align-items: center;
      text-decoration: none;
      color: inherit;
    }
  
    &__icon {
      height: 1 rem;
      width: 1 rem;
      margin-right: .5rem;;
    }
  }
  
  .notification-btn {
    padding: 8px;
    border-radius: 50%;
    
    svg {
      height: 20px;
      width: 20px;
    }
  }
  
  .app-main {
    max-width: 1280px; // container
    margin-left: auto;  // mx-auto
    margin-right: auto; // mx-auto
    padding: 2rem; 
  }

  .bell-size {
    height: 1.25rem; // 20px
    width: 1.25rem; // 20px
  }
```

# src/layouts/TravelMgrLayout/AppLayout/AppLayout.tsx

```tsx
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, UserPlus, FileText, Settings, Bell } from 'lucide-react'
import  Button  from "@/components/Button/button"
import { Avatar } from "../../../components/Avatar/avatar"
import './AppLayout.scss'

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const location = useLocation();
  
  const navigationItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/invite', icon: UserPlus, label: 'Guest Invite' },
    { path: '/reports', icon: FileText, label: 'Reports' },
    { path: '/settings', icon: Settings, label: 'Settings' }
  ];

  return (
    <div className="app-layout">
      <header className="app-header">
        <div className="app-header__container">
          <div className="app-header__content">
            {/* Logo */}
            <div className="app-header__logo-section">
              <h1 className="app-header__logo">TravelPortal</h1>
              
              {/* Navigation Links */}
              <nav className="app-nav">
                <Button variant={location.pathname === '/dashboard' ? 'secondary' : 'ghost'} asChild>
                  <Link to ="/dashboard">
                    <LayoutDashboard className="app-nav__icon" />
                    Dashboard
                  </Link>
                </Button>
                <Button variant={location.pathname === '/invite' ? 'secondary' : 'ghost'} asChild>
                  <Link to ="/invite">
                    <UserPlus className="app-nav__icon" />
                    Guest Invite
                  </Link>
                </Button>
                <Button variant={location.pathname === '/reports' ? 'secondary' : 'ghost'} asChild>
                  <Link to ="/reports">
                    <FileText className="app-nav__icon" />
                    Reports
                  </Link>
                </Button>
                <Button variant={location.pathname === '/settings' ? 'secondary' : 'ghost'} asChild>
                  <Link to ="/settings">
                    <Settings className="app-nav__icon" />
                    Settings
                  </Link>
                </Button>
              </nav>
            </div>

            {/* User Actions */}
            <div className="app-header__actions">
              <Button variant="ghost" size = "icon">
                <Bell className = "bell-size"/>
                {/*<span className="sr-only">Notifications</span>*/}
              </Button>
              <Avatar
                fallback="SA"
                size="sm"
              />
            </div>
          </div>
        </div>
      </header>

      <main className="app-main">
          {children}
      </main>
    </div>
  );
};

export default AppLayout;
```

# src/layouts/TravelMgrLayout/fonts.scss

```scss
@font-face {
    font-family: 'Geist Sans';
    src: url('../styles/fonts/GeistVF.woff') format('woff');
    font-weight: 100 900;
    font-display: swap;
    font-style: normal;
  }
  
  @font-face {
    font-family: 'Geist Mono';
    src: url('../styles/fonts/GeistMonoVF.woff') format('woff');
    font-weight: 100 900;
    font-display: swap;
    font-style: normal;
  }
 
  // CSS Variables for font families 
  :root {
    --font-geist-sans: 'Geist Sans';
    --font-geist-mono: 'Geist Mono';
  }

// SCSS Variables for easier usage in your SCSS files
$font-geist-sans: var(--font-geist-sans);
$font-geist-mono: var(--font-geist-mono);

// Utility classes
.font-geist-sans {
  font-family: $font-geist-sans;
}

.font-geist-mono {
  font-family: $font-geist-mono;
}
```

# src/layouts/TravelMgrLayout/TravelMgrLayout.scss

```scss
.root-layout {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
```

# src/layouts/TravelMgrLayout/TravelMgrLayout.tsx

```tsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import "./TravelMgrLayout.scss";
//import { RequireAuth } from '@/features/auth/RequireAuth';
import AppLayout from './AppLayout/AppLayout';
import './TravelMgrLayout.scss';


const TravelMgrLayout: React.FC = () => {
    return (
        <AppLayout>
            <Outlet />
        </AppLayout> 
    );
        
}

export default TravelMgrLayout;

```

# src/lib/utils.ts

```ts
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

# src/main.tsx

```tsx
import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import { QueryClientProvider } from "@tanstack/react-query"
import { HelmetProvider } from 'react-helmet-async'
import { ThemeProvider } from "~/contexts/ThemeContext"
import { queryClient } from "~/api/query-client"
import App from "./App"
import "./styles/index.scss"

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
          <HelmetProvider>
            <QueryClientProvider client={queryClient}>
                <ThemeProvider>
                    <BrowserRouter>
                        <App />
                    </BrowserRouter>
                </ThemeProvider>
                </QueryClientProvider>
          </HelmetProvider>
    </React.StrictMode>
)

```

# src/routes/dashboard/Dashboard.scss

```scss
.dashboard {
  &__main {
    max-width: 1200px;
    margin: 0 auto;
    padding: var(--space-8);
  }

  &__header {
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
    margin-bottom: var(--space-8);

    @media (min-width: 640px) {
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }
  }

  &__title-group {
    flex: 1;
  }

  &__title {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--color-foreground);
  }

  &__subtitle {
    color: var(--color-muted-foreground);
    margin-top: var(--space-1);
  }
  
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

    &__invite-button {
      display: inline-flex;
      align-items: center;
      //gap: var(--space-2);
    }
  
    //&__button-icon {
    //  width: 1.25rem;
    //  height: 1.25rem;
    //}
  }
  
  .stats-card {
    &__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-bottom: 8px;
    }
  
    &__icon {
      height: 16px;
      width: 16px;
      color: #6b7280;
  
      &--warning {
        color: #f97316;
      }
    }
  
    &__value {
      font-size: 24px;
      font-weight: 700;
      color: #111827;
    }
  
    &__subtitle {
      font-size: 12px;
      color: #6b7280;
  
      &--warning {
        color: #f97316;
      }
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
  
    &__actions {
      display: flex;
      gap: 8px;
      width: 100%;
  
      @media (min-width: 640px) {
        width: auto;
      }
    }
  }
  
  .search-input {
    position: relative;
    flex-grow: 1;
  
    &__icon {
      position: absolute;
      left: 12px;
      top: 50%;
      transform: translateY(-50%);
      height: 16px;
      width: 16px;
      color: #6b7280;
    }
  
    &__field {
      padding-left: 36px;
    }
  }
  
  .guest-info {
    display: flex;
    align-items: center;
    gap: 12px;
  
    &__details {
      display: flex;
      flex-direction: column;
    }
  
    &__name {
      font-weight: 500;
      color: #111827;
    }
  
    &__email {
      font-size: 14px;
      color: #6b7280;
    }
  }
  
  .trip-type {
    display: inline-flex;
    align-items: center;
    padding: 4px 8px;
    border-radius: 9999px;
    font-size: 12px;
    font-weight: 500;
    background-color: #dbeafe;
    color: #1e40af;
  }
  
  .trip-dates {
    &__range {
      color: #111827;
    }
  
    &__duration {
      font-size: 14px;
      color: #6b7280;
    }
  }
  
  .trip-status {
    display: inline-flex;
    align-items: center;
    padding: 4px 8px;
    border-radius: 9999px;
    font-size: 12px;
    font-weight: 500;
  
    &--completed {
      background-color: #dcfce7;
      color: #15803d;
    }
  
    &--in-progress {
      background-color: #dbeafe;
      color: #1e40af;
    }
  
    &--upcoming {
      background-color: #fef9c3;
      color: #854d0e;
    }
  }
  
  .view-details-link {
    color: #0070f3;
    text-decoration: none;
  
    &:hover {
      text-decoration: underline;
    }
  }
  
  .filter-button {
    padding: 8px;
    aspect-ratio: 1;
  }
```

# src/routes/dashboard/dashboard.tsx

```tsx
// src/pages/Dashboard/Dashboard.tsx
//import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, UserCheck, AlertCircle, Search, Filter, UserPlus } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/Card/card';
import Button  from '../../components/Button/button';
import  Input  from '../../components/Input/input';
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHeaderCell } from '../../components/Table/table';
import { Avatar } from '../../components/Avatar/avatar';
import './Dashboard.scss';

// Example recent trips data remains the same
const exampleTrips = [
  // ... your existing trips data
  {
    id: 1,
    guest: {
      name: 'Alice Johnson',
      email: 'alice@example.com',
    },
    type: 'Interview',
    dates: 'May 15 - May 17, 2023',
    duration: '3 days',
    status: 'Completed',
  },
  {
    id: 2,
    guest: {
      name: 'Bob Smith',
      email: 'bob@example.com',
    },
    type: 'Conference',
    dates: 'Jun 1 - Jun 5, 2023',
    duration: '5 days',
    status: 'In Progress',
  },
  {
    id: 3,
    guest: {
      name: 'Carol Davis',
      email: 'carol@example.com',
    },
    type: 'Training',
    dates: 'Jun 10 - Jun 14, 2023',
    duration: '5 days',
    status: 'Upcoming',
  },
  {
    id: 4,
    guest: {
      name: 'David Wilson',
      email: 'david@example.com',
    },
    type: 'Client Meeting',
    dates: 'May 20 - May 21, 2023',
    duration: '2 days',
    status: 'Completed',
  },
  {
    id: 5,
    guest: {
      name: 'Eva Brown',
      email: 'eva@example.com',
    },
    type: 'Interview',
    dates: 'Jun 7 - Jun 8, 2023',
    duration: '2 days',
    status: 'Upcoming',
  },
];

const Dashboard = () => {
  return (
    <div className="dashboard">
      <main className="dashboard__main">
        <div className="dashboard__header">
          <div className="dashboard__title-group">
            <h1 className="dashboard__title">Welcome back, Sarah</h1>
            <p className="dashboard__subtitle">Manage your guest travel arrangements</p>
          </div>
          <Button 
            variant="default" 
            onClick={() => window.location.href = '/guest-invite'}
            className="dashboard__invite-button"
          >
            <UserPlus className="dashboard__button-icon" />
            <span>New Guest Invite</span>
          </Button>
        </div>

        <div className="dashboard__stats">
          <Card>
            <CardHeader>
              <div className="stats-card__header">
                <CardTitle>Pending Arrivals</CardTitle>
                <Clock className="stats-card__icon" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="stats-card__value">12</div>
              <p className="stats-card__subtitle">Next arrival in 2 days</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <div className="stats-card__header">
                <CardTitle>Active Guests</CardTitle>
                <UserCheck className="stats-card__icon" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="stats-card__value">8</div>
              <p className="stats-card__subtitle">3 checking out today</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <div className="stats-card__header">
                <CardTitle>Requires Attention</CardTitle>
                <AlertCircle className="stats-card__icon stats-card__icon--warning" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="stats-card__value">2</div>
              <p className="stats-card__subtitle stats-card__subtitle--warning">Flight delays detected</p>
            </CardContent>
          </Card>
        </div>

        <Card className="dashboard__trips">
          <CardHeader>
            <div className="trips-header">
              <div className="trips-header__titles">
                <CardTitle>Recent Trips</CardTitle>
                <CardDescription>Overview of your latest guest arrangements</CardDescription>
              </div>
              <div className="trips-header__actions">
                <div className="search-input">
                  <Search className="search-input__icon" />
                  <Input
                    type="text"
                    placeholder="Search trips..."
                    className="search-input__field"
                  />
                </div>
                <Button 
                  variant="outline" 
                  className="filter-button"
                  size = "icon"
                >
                  <Filter />
                  <span className="sr-only">Filter</span>
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table striped hoverable>
              <TableHeader>
                <TableRow>
                  <TableHeaderCell>Guest</TableHeaderCell>
                  <TableHeaderCell>Type</TableHeaderCell>
                  <TableHeaderCell>Dates</TableHeaderCell>
                  <TableHeaderCell>Status</TableHeaderCell>
                  <TableHeaderCell>Actions</TableHeaderCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {exampleTrips.map((trip) => (
                  <TableRow key={trip.id}>
                    <TableCell>
                      <div className="guest-info">
                        <Avatar
                            //alt={trip.guest.name}
                            //fallback={trip.guest.name.substring(0, 2)}
                            //size="sm"
                            fallback={trip.guest.name.substring(0, 2)}
                            size="sm"
                        />
                        <div className="guest-info__details">
                          <div className="guest-info__name">{trip.guest.name}</div>
                          <div className="guest-info__email">{trip.guest.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="trip-type">{trip.type}</span>
                    </TableCell>
                    <TableCell>
                      <div className="trip-dates">
                        <div className="trip-dates__range">{trip.dates}</div>
                        <div className="trip-dates__duration">{trip.duration}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={`trip-status trip-status--${trip.status.toLowerCase()}`}>
                        {trip.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Button variant = "link" asChild>
                        <Link to={`/trips/${trip.id}`} className="view-details-link">
                          View Details
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Dashboard;
```

# src/routes/dashboard/index.tsx

```tsx
import { FC } from 'react';
import { Helmet } from 'react-helmet-async';
import Dashboard from '@/routes/dashboard/dashboard';

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

# src/routes/guestinvite/GuestInvite.scss

```scss
.guest-invite {
    min-height: 100vh;
    background-color: #f9fafb;
    padding: 32px;
  
    &__container {
      max-width: 896px;
      margin: 0 auto;
    }
  
    &__header {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 24px;
    }
  
    &__title {
      font-size: 24px;
      font-weight: 700;
      color: #1f2937;
    }
  
    &__content {
      padding: 24px;
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
  
  .back-button {
    padding: 8px;
    border-radius: 8px;
    background: none;
    border: none;
    cursor: pointer;
    color: #4b5563;
    transition: background-color 0.2s ease;
  
    &:hover {
      background-color: #f3f4f6;
    }
  }
  
  .continue-icon {
    margin-left: 8px;
    height: 16px;
    width: 16px;
  }
```

# src/routes/guestinvite/GuestInvite.tsx

```tsx
import React from 'react'
import { useNavigate}  from 'react-router-dom'
import { ChevronRight, ArrowLeft } from 'lucide-react'
import Button from '../../components/Button/button';
import { Card, CardContent } from "@/components/Card/card"
import { ProgressBar } from '../../features/guest-invite/ProgressBar/ProgressBar'
import { useGuestInviteState } from '@/api/hooks/useGuestInviteState'
import { GuestDetailsForm } from '../../features/guest-invite/GuestDetailsForm/GuestDetailsForm'
import { ItineraryForm } from '../../features/guest-invite/ItineraryForm/ItineraryForm'
import { PreferencesForm } from '../../features/guest-invite/PreferencesForm/PreferencesForm'
import { ReviewForm } from '../../features/guest-invite/ReviewForm/ReviewForm'
//import { createGuestInvite } from '@/api/api'
import './GuestInvite.scss';

const GuestInvite: React.FC = () => {
  const { state, setCurrentStep } = useGuestInviteState();
  const navigate = useNavigate();
  const totalSteps = 4;

  const renderStepContent = () => {
    switch (state.currentStep) {
      case 1:
        return <GuestDetailsForm />;
      case 2:
        return <ItineraryForm />;
      case 3:
        return <PreferencesForm />;
      case 4:
        return <ReviewForm />;
      default:
        return null;
    }
  };

  //add logic to submit guest invite

  /*const handleSendInvite = async () => {
    try {
      await createGuestInvite(state)
      // Handle success (e.g., show a success message, redirect)
      alert('Invite sent successfully!'); //Example success handling
      navigate('/'); //Example redirect
    } catch (error) {
      // Handle error (e.g., show an error message)
      console.error("Error sending invite:", error);
      alert('Error sending invite. Please try again later.'); //Example error handling

    }
  }*/

    return (
      <div className="guest-invite">
        <div className="guest-invite__container">
          <div className="guest-invite__header">
            <button 
              onClick={() => navigate('/')}
              className="back-button"
            >
              <ArrowLeft />
            </button>
            <h1 className="guest-invite__title">New Guest Invite</h1>
          </div>
  
          <ProgressBar currentStep={state.currentStep} totalSteps={totalSteps} />
          
          <Card>
            <CardContent className="guest-invite__content">
              {renderStepContent()}
            </CardContent>
          </Card>
  
          <div className="guest-invite__actions">
            {state.currentStep > 1 && (
              <Button
                variant="outline"
                onClick={() => setCurrentStep(state.currentStep - 1)}
              >
                Previous
              </Button>
            )}
            <div className="guest-invite__primary-action">
              {state.currentStep < totalSteps ? (
                <Button
                  variant="default"
                  onClick={() => setCurrentStep(state.currentStep + 1)}
                >
                  <span>Continue</span>
                  <ChevronRight className="guest-invite__action-icon" />
                </Button>
              ) : (
                <Button
                  variant="default"
                  //onClick={handleSendInvite}
                >
                  <span>Send Invite</span>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default GuestInvite;
```

# src/routes/guestinvite/index.tsx

```tsx
import { FC } from 'react';
import { Helmet } from 'react-helmet-async';
import GuestInvite from '@/routes/guestinvite/GuestInvite'

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

# src/routes/login/index.ts

```ts
export { Login } from './Login';
```

# src/routes/login/Login.scss

```scss
.login {
    width: 100%;
    
    &__card {
      background-color: var(--color-card);
      border-radius: var(--radius);
      border: 1px solid var(--color-border);
      padding: var(--space-8);
      box-shadow: var(--shadow-md);
    }
    
    &__title {
      font-size: 1.5rem;
      font-weight: 600;
      color: var(--color-foreground);
      margin-bottom: var(--space-6);
    }
    
    &__form {
      display: flex;
      flex-direction: column;
      gap: var(--space-4);
    }
    
    &__field {
      display: flex;
      flex-direction: column;
      gap: var(--space-2);
    }
    
    &__label {
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--color-foreground);
    }
    
    &__footer {
      margin-top: var(--space-6);
      text-align: center;
      font-size: 0.875rem;
      color: var(--color-muted-foreground);
    }
    
    &__link {
      color: var(--color-primary);
      text-decoration: none;
      font-weight: 500;
      
      &:hover {
        text-decoration: underline;
      }
    }
  }
```

# src/routes/login/Login.tsx

```tsx
import { FC, FormEvent, useState } from "react"
import  Button  from "@/components/Button/button"
import  Input  from "@/components/Input/input"
import "./Login.scss"

export const Login: FC = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        // Handle login logic
    }

    return (
        <div className="login">
            <div className="login__card">
                <h1 className="login__title">Sign in to your account</h1>
                <form onSubmit={handleSubmit} className="login__form">
                    <div className="login__field">
                        <label htmlFor="email" className="login__label">Email</label>
                        <Input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    
                    <div className="login__field">
                        <label htmlFor="password" className="login__label">Password</label>
                        <Input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    
                    <Button type="submit" variant="default" fullWidth>
                        Sign In
                    </Button>
                </form>
                
                <div className="login__footer">
                    <span>Don't have an account? </span>
                    <a href="/register" className="login__link">Sign up</a>
                </div>
            </div>
        </div>
    )
}
```

# src/routes/reports/index.tsx

```tsx
import { FC } from 'react'; 
import { Helmet } from 'react-helmet-async';
import Reports from '@/routes/reports/Reports'

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

# src/routes/reports/Reports.scss

```scss
.reports-container {
    .tabs-container {
      border-bottom: 1px solid #e5e7eb;
      
      nav {
        display: flex;
        > * + * {
          margin-left: 2rem;
        }
        //gap: 2rem;
      }
  
      .tab-button {
        padding: 0.25rem 1rem;
        padding-top: 1rem;      
        padding-bottom: 1rem; 
        font-size: 0.875rem;
        font-weight: 500;
        border-width: 0 0 2px 0;
        border-style: solid;
        //color: #6b7280;

        &:not(.active) {
            border-color: transparent;
            color: #6b7280;

            &:hover {
                color: #374151;
                border-color: #d1d5db;
            }
        }
        
        &.active {
          color: #2563eb;
          border-bottom-color: #2563eb;
        }
        
      }
    }
  
    .filters-section {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 1.5rem 0;
  
      .search-filters {
        display: flex;
        gap: 1rem;
      }
  
      .search-wrapper {
        position: relative;
  
        .search-icon {
          position: absolute;
          left: 0.75rem;
          top: 0.625rem;
          width: 1rem;
          height: 1rem;
          color: #6b7280;
        }
  
        .search-input {
          padding-left: 2.25rem;
          padding-right: 1rem;
          width: 16rem;
        }
      }
  
      .date-filter {
        padding: 0.5rem 1rem;
        border: 1px solid #e5e7eb;
        border-radius: 0.5rem;
        font-size: 0.875rem;
        background-color: white;
      }
  
      .filter-button,
      .export-button {
        display: flex;
        align-items: center;
        gap: 0.5rem;
  
        .icon {
          width: 1rem;
          height: 1rem;
        }
      }
    }
  
    .trip-details {
      padding: 1rem;
      border-bottom: 1px solid #e5e7eb;
      
      &:last-child {
        border-bottom: none;
      }
  
      .trip-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 1rem;
  
        .guest-info {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
  
          .avatar {
            width: 2.5rem;
            height: 2.5rem;
            border-radius: 9999px;
            background-color: #dbeafe;
            display: flex;
            align-items: center;
            justify-content: center;
            
            span {
              color: #2563eb;
              font-weight: 500;
            }
          }
  
          .guest-details {
            .guest-name {
              font-weight: 500;
            }
  
            .guest-email {
              font-size: 0.875rem;
              color: #6b7280;
            }
  
            .guest-type {
              display: inline-block;
              padding: 0.25rem 0.5rem;
              font-size: 0.875rem;
              background-color: #dbeafe;
              color: #2563eb;
              border-radius: 9999px;
              margin-top: 0.25rem;
            }
          }
        }
  
        .trip-cost {
          text-align: right;
  
          .cost-amount {
            font-weight: 500;
            color: #111827;
          }
  
          .status-badge {
            display: inline-block;
            padding: 0.25rem 0.5rem;
            font-size: 0.875rem;
            border-radius: 9999px;
            margin-top: 0.25rem;
  
            &.completed {
              background-color: #dcfce7;
              color: #16a34a;
            }
  
            &.pending {
              background-color: #dbeafe;
              color: #2563eb;
            }
          }
        }
      }
  
      .trip-metadata {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;
        font-size: 0.875rem;
        color: #4b5563;
  
        .metadata-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
  
          .icon {
            width: 1rem;
            height: 1rem;
          }
        }
      }
  
      .view-details {
        margin-top: 1rem;
        color: #2563eb;
        font-size: 0.875rem;
        
        &:hover {
          color: #1d4ed8;
        }
      }
    }
  
    .chart-container {
      height: 18rem;
    }
  }
  
  .spending-card {
    margin-bottom: 1.5rem;
  }
```

# src/routes/reports/Reports.tsx

```tsx
import React from 'react'
import { Filter, Search, Calendar, Download, MapPin } from 'lucide-react'
import Button from "@/components/Button/button"
import Input from "@/components/Input/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/Card/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { ReportsLayout } from '@/layouts//ReportsLayout/ReportsLayout'
import { QuickStats } from '@/features/reports/QuickStats/QuickStats'
import { useReportsState, TripData } from '@/api/hooks/useReportsState'
import './Reports.scss';

const ReportsPage: React.FC = () => {
  const { state, setActiveTab, setDateFilter } = useReportsState();

  const renderTripDetails = (trip: TripData) => (
    <div key={trip.id} className="trip-details">
      <div className="trip-header">
        <div className="guest-info">
          <div className="avatar">
            <span>{trip.guest.name.split(' ').map(n => n[0]).join('')}</span>
          </div>
          <div className="guest-details">
            <div className="guest-name">{trip.guest.name}</div>
            <div className="guest-email">{trip.guest.email}</div>
            <span className="guest-type">{trip.guest.type}</span>
          </div>
        </div>
        <div className="trip-cost">
          <div className="cost-amount">${trip.cost}</div>
          <span className={`status-badge ${trip.status.toLowerCase()}`}>
            {trip.status}
          </span>
        </div>
      </div>
      <div className="trip-metadata">
        <div className="metadata-item">
          <Calendar className="icon" />
          <span>{trip.dates.start} - {trip.dates.end}</span>
        </div>
        <div className="metadata-item">
          <MapPin className="icon" />
          <span>{trip.origin} → {trip.destination}</span>
        </div>
      </div>
      <button className="view-details">
        View Full Details →
      </button>
    </div>
  );

  return (
    <ReportsLayout>
      <QuickStats />

      <div className="reports-container">
        <div className="tabs-container">
          <nav>
            <button
              onClick={() => setActiveTab('trips')}
              className={`tab-button ${state.activeTab === 'trips' ? 'active' : ''}`}
            >
              Trip History
            </button>
            <button
              onClick={() => setActiveTab('billing')}
              className={`tab-button ${state.activeTab === 'billing' ? 'active' : ''}`}
            >
              Billing
            </button>
          </nav>
        </div>

        <div className="filters-section">
          <div className="search-filters">
            <div className="search-wrapper">
              <Search className="search-icon" />
              <Input
                type="text"
                placeholder="Search trips..."
                className="search-input"
              />
            </div>
            <select 
              className="date-filter"
              value={state.dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
            >
              <option value="last30">Last 30 days</option>
              <option value="last90">Last 90 days</option>
              <option value="lastYear">Last year</option>
              <option value="custom">Custom range</option>
            </select>
            <Button variant="outline" className="filter-button">
              <Filter className="icon" />
              <span>More Filters</span>
            </Button>
          </div>
          <Button variant="outline" className="export-button">
            <Download className="icon" />
            <span>Export</span>
          </Button>
        </div>

        {state.activeTab === 'trips' ? (
          <Card className="trips-card">
            <CardHeader>
              <CardTitle>Trip History</CardTitle>
              <CardDescription>
                View and manage all guest travel arrangements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="trips-list">
                {state.tripData.map(trip => renderTripDetails(trip))}
              </div>
            </CardContent>
          </Card>
        ) : (
          <>
            <Card className="spending-card">
              <CardHeader>
                <CardTitle>Spending Overview</CardTitle>
                <CardDescription>
                  Track your travel spending over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="chart-container">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={state.spendingData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="amount" 
                        stroke="#2563eb"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </ReportsLayout>
  );
};

export default ReportsPage;
```

# src/routes/settings/index.tsx

```tsx
import { FC } from 'react';
import { Helmet } from 'react-helmet-async';
import Settings from '@/routes/settings/settings'

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

# src/routes/settings/Settings.scss

```scss
.settings {
    min-height: 100vh;
    background-color: #f9fafb;
    padding: 32px;
  
    &__container {
      max-width: 1024px;
      margin: 0 auto;
    }
  
    &__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
  
      @media (max-width: 640px) {
        flex-direction: column;
        align-items: flex-start;
        gap: 16px;
      }
    }
  
    &__title {
      font-size: 24px;
      font-weight: 700;
      color: #1f2937;
    }
  
    &__subtitle {
      color: #6b7280;
      margin-top: 4px;
    }
  
    &__alert {
      margin-bottom: 24px;
    }
  
    &__content {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }
    
    &__save-button {
      display: inline-flex;
      align-items: center;
      gap: var(--space-2);
    }
  }
  
  .guest-types {
    &__header {
      display: flex;
      align-items: center;
      gap: 8px;
    }
  
    &__icon {
      width: 20px;
      height: 20px;
      color: #6b7280;
    }
  
    &__content {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
  
    &__add {
      display: flex;
      gap: 8px;
  
      @media (max-width: 640px) {
        flex-direction: column;
      }
    }
  
    &__list {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 16px;
    }
  }
  
  .guest-type-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px;
    background-color: white;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
  
    &__name {
      font-weight: 500;
      color: #374151;
    }
  
    &__remove:hover {
      color: #ef4444;
    }
  }
  
  .guest-preferences {
    &__label {
      display: block;
      font-size: 14px;
      font-weight: 500;
      color: #374151;
      margin-bottom: 8px;
    }
  
    &__selected {
      margin-top: 16px;
      padding: 12px;
      background-color: #eff6ff;
      border: 1px solid #bfdbfe;
      border-radius: 8px;
      color: #1e40af;
  
      &-name {
        font-weight: 500;
      }
    }
  }
  
  .preference-card {
    &__header {
      display: flex;
      align-items: center;
      gap: 8px;
    }
  
    &__icon {
      width: 20px;
      height: 20px;
      color: #6b7280;
    }
  }
  
  .travel-preferences {
    &__cards {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }
  }
  
  .flight-preferences {
    &__cabin {
      margin-bottom: 16px;
    }
  
    &__options {
      display: flex;
      gap: 24px;
  
      @media (max-width: 640px) {
        flex-direction: column;
        gap: 12px;
      }
    }
  }
  
  .hotel-preferences {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  
  .transport-preferences {
    display: flex;
    flex-direction: column;
    gap: 16px;
  
    &__service,
    &__car {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
  }
  
  .per-diem {
    display: flex;
    flex-direction: column;
    gap: 8px;
  
    &__input {
      position: relative;
    }
  
    &__currency {
      position: absolute;
      left: 12px;
      top: 50%;
      transform: translateY(-50%);
      color: #6b7280;
    }
  
    input {
      padding-left: 28px;
    }
  }
```

# src/routes/settings/settings.tsx

```tsx
import React, { useState } from 'react'
import { Users, Plane, Hotel, Car, DollarSign, Plus, X, Save } from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/Card/card"
import { Alert } from "@/components/Alert/alert"
import Button from "@/components/Button/button"
import Input from "@/components/Input/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/Select/select"
import { Checkbox } from "@/components/Checkbox/checkbox"
//import { GuestType, PreferenceCardProps, defaultPreferences } from '@/features/settings/types'
import './Settings.scss';

interface GuestType {
  id: number;
  name: string;
  preferences: {
    flight?: {
      cabin: string;
      directOnly: boolean;
      refundable: boolean;
    };
    hotel?: {
      quality: string;
    };
    transport?: {
      service: string;
      carClass: string;
    };
    perDiem?: {
      amount: number;
    };
  };
}

interface PreferenceCardProps {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
  preferences?: any;
}

const Settings = () => {
  const [showSaveAlert, setShowSaveAlert] = useState(false);
  const [selectedGuestType, setSelectedGuestType] = useState('');
  const [guestTypes, setGuestTypes] = useState<GuestType[]>([
    { 
      id: 1, 
      name: 'Interview',
      preferences: {
        flight: {
          cabin: 'Economy',
          directOnly: false,
          refundable: true
        },
        hotel: {
          quality: '4-star'
        },
        transport: {
          service: 'Uber',
          carClass: 'Standard'
        },
        perDiem: {
          amount: 75
        }
      }
    },
    { 
      id: 2, 
      name: 'Contract Work',
      preferences: {
        flight: {
          cabin: 'Economy',
          directOnly: false,
          refundable: false
        },
        hotel: {
          quality: '3-star'
        },
        transport: {
          service: 'Lyft',
          carClass: 'Standard'
        },
        perDiem: {
          amount: 50
        }
      }
    },
    { 
      id: 3, 
      name: 'Student Visit',
      preferences: {
        flight: {
          cabin: 'Economy',
          directOnly: false,
          refundable: false
        },
        hotel: {
          quality: '3-star'
        },
        transport: {
          service: 'Uber',
          carClass: 'Standard'
        },
        perDiem: {
          amount: 40
        }
      }
    },
    { 
      id: 4, 
      name: 'Internship',
      preferences: {
        flight: {
          cabin: 'Economy',
          directOnly: false,
          refundable: false
        },
        hotel: {
          quality: '3-star'
        },
        transport: {
          service: 'Uber',
          carClass: 'Standard'
        },
        perDiem: {
          amount: 45
        }
      }
    }
  ]);
  const [newGuestType, setNewGuestType] = useState('');

  const handleAddGuestType = () => {
    if (newGuestType.trim()) {
      setGuestTypes([
        ...guestTypes,
        { 
          id: guestTypes.length + 1, 
          name: newGuestType.trim(),
          preferences: {}
        }
      ]);
      setNewGuestType('');
    }
  };

  const handleRemoveGuestType = (id: number) => {
    setGuestTypes(guestTypes.filter(type => type.id !== id));
  };

  const handleSave = () => {
    setShowSaveAlert(true);
    setTimeout(() => setShowSaveAlert(false), 3000);
  };

  const PreferenceCard = ({ title, icon: Icon, children }: PreferenceCardProps) => {
    const getPreferencesForSelectedType = () => {
      if (!selectedGuestType) return null;
      const guestType = guestTypes.find(t => t.id === Number(selectedGuestType));
      return guestType?.preferences;
    };
  
    const prefs = getPreferencesForSelectedType();
  
    return (
      <Card>
        <CardHeader>
          <div className="preference-card__header">
            <Icon className="preference-card__icon" />
            <CardTitle>{title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          {React.Children.map(children, child => {
            return React.cloneElement(child as React.ReactElement, { preferences: prefs });
          })}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="settings">
      <div className="settings__container">
        <div className="settings__header">
          <div className="settings__title-group">
            <h1 className="settings__title">Settings</h1>
            <p className="settings__subtitle">Manage your travel preferences and guest types</p>
          </div>
          <Button
            onClick={handleSave}
            variant="default"
            className="settings__save-button"
          >
            <Save size={20} />
            <span>Save Changes</span>
          </Button>
        </div>

        {showSaveAlert && (
          <Alert 
            variant="success"
            className="settings__alert"
          >
            Settings saved successfully!
          </Alert>
        )}

        <div className="settings__content">
          <Card>
            <CardHeader>
              <div className="guest-types__header">
                <div className="guest-types__title">
                  <Users className="guest-types__icon" />
                  <CardTitle>Guest Types</CardTitle>
                </div>
              </div>
              <CardDescription>
                Manage guest categories and their default preferences
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="guest-types__content">
                <div className="guest-types__add">
                  <Input
                    type="text"
                    value={newGuestType}
                    onChange={(e) => setNewGuestType(e.target.value)}
                    placeholder="Enter new guest type"
                  />
                  <Button
                    onClick={handleAddGuestType}
                    variant="outline"
                    className="guest-types__add-button"
                  >
                    <Plus size={20} />
                    <span>Add Type</span>
                  </Button>
                </div>

                <div className="guest-types__list">
                  {guestTypes.map((type) => (
                    <div
                      key={type.id}
                      className="guest-type-item"
                    >
                      <span className="guest-type-item__name">{type.name}</span>
                      <Button
                        onClick={() => handleRemoveGuestType(type.id)}
                        variant="ghost"
                        className="guest-type-item__remove"
                      >
                        <X size={20} />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Guest Type Preferences</CardTitle>
              <CardDescription>
                Configure travel preferences for each guest type
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="guest-preferences">
                <label className="guest-preferences__label">
                  Select Guest Type
                </label>
                <Select value={selectedGuestType} onValueChange={setSelectedGuestType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a guest type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Default (All Guest Types)</SelectItem>
                    {guestTypes.map(type => (
                      <SelectItem key={type.id} value={type.id.toString()}> {type.name} </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                

                {selectedGuestType && (
                  <div className="guest-preferences__selected">
                    <p>
                      Editing preferences for{' '}
                      <span className="guest-preferences__selected-name">
                        {guestTypes.find(t => t.id === Number(selectedGuestType))?.name}
                      </span>
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <div className="travel-preferences">
            <Card>
              <CardHeader>
                <CardTitle>Travel Preferences</CardTitle>
                <CardDescription>
                  Customize travel preferences for the selected guest type
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="travel-preferences__cards">
                  <PreferenceCard title="Flight Preferences" icon={Plane}>
                    <div className="flight-preferences">
                      <div className="flight-preferences__cabin">
                        <label>Default Cabin Class</label>
                        <Select value="economy">
                          <SelectTrigger>
                            <SelectValue placeholder="Select cabin class" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="economy">Economy</SelectItem>
                            <SelectItem value="premium-economy">Premium Economy</SelectItem>
                            <SelectItem value="business">Business</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flight-preferences__options">
                        <Checkbox
                          //label="Prefer direct flights"
                          id="direct-flights"
                        />
                        <label>Prefer direct flights</label>
                        <Checkbox
                          //label="Refundable tickets only"
                          id="refundable-tickets"
                        />
                        <label>Refundable tickets only</label>
                      </div>
                    </div>
                  </PreferenceCard>

                  <PreferenceCard title="Hotel Preferences" icon={Hotel}>
                    <div className="hotel-preferences">
                      <label>Default Hotel Quality</label>
                      <Select value="3-star">
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select hotel quality" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="3-star">⭐⭐⭐ 3-star hotels</SelectItem>
                          <SelectItem value="4-star">⭐⭐⭐⭐ 4-star hotels</SelectItem>
                          <SelectItem value="5-star">⭐⭐⭐⭐⭐ 5-star hotels</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </PreferenceCard>

                  <PreferenceCard title="Ground Transport" icon={Car}>
                    <div className="transport-preferences">
                      <div className="transport-preferences__service">
                        <label>Preferred Service</label>
                        <Select value="standard">
                          <SelectTrigger>
                            <SelectValue placeholder="Select car class" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="standard">Standard</SelectItem>
                            <SelectItem value="premium">Premium</SelectItem>
                            <SelectItem value="suv">SUV</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </PreferenceCard>

                  <PreferenceCard title="Per Diem Settings" icon={DollarSign}>
                    <div className="per-diem">
                      <label>Default Daily Amount</label>
                      <div className="per-diem__input">
                        <span className="per-diem__currency">$</span>
                        <Input
                          type="number"
                          placeholder="Enter amount"
                        />
                      </div>
                    </div>
                  </PreferenceCard>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
```

# src/styles/_fonts.scss

```scss
@font-face {
  font-family: 'Geist Sans';
  src: url('../fonts/GeistVF.woff') format('woff');
  font-weight: 100 900;
  font-display: swap;
  font-style: normal;
}

@font-face {
  font-family: 'Geist Mono';
  src: url('../fonts/GeistMonoVF.woff') format('woff');
  font-weight: 100 900;
  font-display: swap;
  font-style: normal;
}

:root {
  --font-geist-sans: 'Geist Sans';
  --font-geist-mono: 'Geist Mono';
}
```

# src/styles/_reset.scss

```scss
*, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  
  html {
    font-size: 16px;
    -webkit-text-size-adjust: 100%;
  }
  
  body {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  img, picture, video, canvas, svg {
    display: block;
    max-width: 100%;
  }
  
  input, button, textarea, select {
    font: inherit;
  }
  
  p, h1, h2, h3, h4, h5, h6 {
    overflow-wrap: break-word;
  }
  
  #root, #__next {
    isolation: isolate;
  }
```

# src/styles/App.scss

```scss
.app {
  width: 100vw;
  height: 100vh;
  display: flex;
  background-color: var(--background-primary);
  color: var(--text-primary);
}

.main-content {
  margin-left: 250px;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  transition: margin-left 0.3s ease;
  overflow-y: auto;
  padding: 2rem;

  .vertical-nav.collapsed + & {
    margin-left: 60px;
  }
}

.form-demo {
  max-width: 800px;
  width: 100%;
  background-color: var(--background-secondary);
  border-radius: 8px;
  padding: 2rem;

  .demo-title {
    margin-bottom: 2rem;
    text-align: center;
  }

  .demo-section {
    margin-bottom: 2rem;
    padding: 1rem;
    border: 1px solid var(--border-color);
    border-radius: 6px;

    &:last-child {
      margin-bottom: 0;
    }

    .section-title {
      margin-bottom: 1rem;
      color: var(--primary-color);
    }

    .form-example {
      margin-bottom: 2rem;
      padding: 1.5rem;
      background-color: var(--background-primary);
      border-radius: 6px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}
```

# src/styles/fonts/GeistMonoVF.woff

This is a binary file of the type: Binary

# src/styles/fonts/GeistVF.woff

This is a binary file of the type: Binary

# src/styles/fonts/test.scss

```scss
@use "sass:map";

// Import core styles
@import 'theme';

// Reset styles
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

// Base styles
html {
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-text-size-adjust: 100%;
}

body {
  font-family: var(--font-geist-sans), -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 
    Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  line-height: 1.5;
  background-color: var(--color-background);
  color: var(--color-foreground);
  min-width: 100vw;
  min-height: 100vh;
}

// Typography
h1, h2, h3, h4, h5, h6 {
  font-weight: 600;
  line-height: 1.2;
}

// Focus styles
:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

// Utility classes that are commonly needed
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.container {
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding-left: var(--space-4);
  padding-right: var(--space-4);
  max-width: 1200px;
}

// Flex utilities that are frequently used
.flex {
  display: flex;
}

.flex-col {
  flex-direction: column;
}

.items-center {
  align-items: center;
}

.justify-between {
  justify-content: space-between;
}

// Spacing utilities
.gap-1 { gap: var(--space-1); }
.gap-2 { gap: var(--space-2); }
.gap-4 { gap: var(--space-4); }
.gap-6 { gap: var(--space-6); }

// Interactive element base styles
button {
  background: none;
  border: none;
  font: inherit;
  cursor: pointer;
  
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
}

// Form element base styles
input,
select,
textarea {
  font: inherit;
  color: inherit;
  background-color: transparent;
}

// Link styles
a {
  color: inherit;
  text-decoration: none;
  
  &:hover {
    text-decoration: none;
  }
}

// Responsive breakpoints
$breakpoints: (
  sm: 640px,
  md: 768px,
  lg: 1024px,
  xl: 1280px,
);

@mixin breakpoint($size) {
  @media (min-width: map.get($breakpoints, $size)) {
    @content;
  }
}

// Text balance for better typography
.text-balance {
  text-wrap: balance;
}

// Animation utilities
@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slide-in {
  from { transform: translateY(10px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

.animate-fade-in {
  animation: fade-in 0.2s ease-out;
}

.animate-slide-in {
  animation: slide-in 0.3s ease-out;
}
```

# src/styles/global.scss

```scss
// Reset
/**, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}*/


/* Font faces */

/*@font-face {
  font-family: 'Geist Sans';
  src: url('../fonts/GeistVF.woff') format('woff');
  font-weight: 100 900;
  font-display: swap;
}*/

/*@font-face {
  font-family: 'Geist Mono';
  src: url('../fonts/GeistMonoVF.woff') format('woff');
  font-weight: 100 900;
  font-display: swap;
}*/

/* Root variables
:root {
  --font-geist-sans: 'Geist Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  --font-geist-mono: 'Geist Mono', 'SF Mono', SFMono-Regular, ui-monospace, Menlo, Monaco, Consolas, monospace;
} */

// Base styles
body {
  font-family: Arial, Helvetica, sans-serif;
}

.text-balance {
  text-wrap: balance;
}

// Theme colors
:root {
  // Base colors
  --background: hsl(0, 0%, 100%);
  --foreground: hsl(0, 0%, 3.9%);
  
  // Card colors
  --card: hsl(0, 0%, 100%);
  --card-foreground: hsl(0, 0%, 3.9%);
  
  // Popover colors
  --popover: hsl(0, 0%, 100%);
  --popover-foreground: hsl(0, 0%, 3.9%);
  
  // Primary colors
  --primary: hsl(0, 0%, 9%);
  --primary-foreground: hsl(0, 0%, 98%);
  
  // Secondary colors
  --secondary: hsl(0, 0%, 96.1%);
  --secondary-foreground: hsl(0, 0%, 9%);
  
  // Utility colors
  --muted: hsl(0, 0%, 96.1%);
  --muted-foreground: hsl(0, 0%, 45.1%);
  --accent: hsl(0, 0%, 96.1%);
  --accent-foreground: hsl(0, 0%, 9%);
  
  // State colors
  --destructive: hsl(0, 84.2%, 60.2%);
  --destructive-foreground: hsl(0, 0%, 98%);
  
  // Form colors
  --border: hsl(0, 0%, 89.8%);
  --input: hsl(0, 0%, 89.8%);
  --ring: hsl(0, 0%, 3.9%);
  
  // Chart colors
  --chart-1: hsl(12, 76%, 61%);
  --chart-2: hsl(173, 58%, 39%);
  --chart-3: hsl(197, 37%, 24%);
  --chart-4: hsl(43, 74%, 66%);
  --chart-5: hsl(27, 87%, 67%);
  
  // Border radius
  --radius: 0.5rem;
}

// Dark mode (optional)
/*@media (prefers-color-scheme: dark) {
  :root {
    --color-bg-primary: #1f2937;
    --color-bg-secondary: #111827;
    --color-bg-tertiary: #374151;
    
    --color-text-primary: #f9fafb;
    --color-text-secondary: #e5e7eb;
    --color-text-muted: #9ca3af;
    
    --color-border: #374151;
    --color-border-light: #4b5563;
  }
}*/

* {
  border-color: var(--border); // Assuming border-border is a CSS variable
}

body {
  background-color: var(--background); // Assuming bg-background is a CSS variable
  color: var(--foreground); // Assuming text-foreground is a CSS variable
}

// Utility classes
/*.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}*/
```

# src/styles/index.scss

```scss
@use "variables" as *;

:root {
    font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
    line-height: 1.5;
    font-weight: 400;

    color-scheme: light dark;
    color: var(--color-foreground);
    background-color: var(--color-background);

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

```

# src/styles/variables.scss

```scss
:root {
  // Base colors
  --color-background: hsl(0, 0%, 98%); // Light gray for page background
  --color-foreground: hsl(222, 47%, 11%); // Dark text color
  --color-card: hsl(0, 0%, 100%); // Pure white for cards
  
  // UI Colors
  --color-primary: hsl(221, 83%, 53%); // Blue
  --color-primary-foreground: hsl(0, 0%, 100%);
  --color-secondary: hsl(0, 0%, 96%);
  --color-secondary-foreground: hsl(222, 47%, 11%);
  --color-muted: hsl(0, 0%, 96%);
  --color-muted-foreground: hsl(215, 16%, 47%);
  
  // Borders & Dividers
  --color-border: hsl(0, 0%, 93%);
  
  // Status Colors
  --color-destructive: hsl(0, 84%, 60%);
  --color-success: hsl(142, 76%, 36%);
  --color-warning: hsl(38, 92%, 50%);

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

# src/vite-env.d.ts

```ts
/// <reference types="vite/client" />

```

# tailwind.config.js

```js
/** @type {import('tailwindcss'.Config} */

module.exports = {
    darkMode: ["class"],
    content: ["./src/**/*.{ts,tsx}"],
    prefix: "",
  theme: {
  	extend: {
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}
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
            },
        },
    },
})

```

