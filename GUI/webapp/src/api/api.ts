import axios, { AxiosInstance } from 'axios';
import { getToken, removeToken } from './utils/tokenStorage';

const baseURL = 'http://localhost:8000/api/v1';

const api: AxiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the token
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token.access_token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      // If the error is due to an invalid token, clear the auth state
      removeToken();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;





// const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api'

// async function handleApiError(error: unknown, context: string) {
//   console.error(`Error in ${context}:`, error)
//   if (error instanceof Error) {
//     console.error('Error message:', error.message)
//     console.error('Error stack:', error.stack)
//     return new Error(`${context}: ${error.message}`)
//   }
//   return new Error(`An unknown error occurred in ${context}`)
// }

// export const fetchTrips = async () => {
//   try {
//     const response = await fetch(`${API_BASE_URL}/trips`)
//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`)
//     }
//     return await response.json()
//   } catch (error) {
//     throw await handleApiError(error, 'fetchTrips')
//   }
// }

// export const createGuestInvite = async (inviteData: any) => {
//   try {
//     const response = await fetch(`${API_BASE_URL}/guest-invite`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(inviteData),
//     })
//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`)
//     }
//     return await response.json()
//   } catch (error) {
//     throw await handleApiError(error, 'createGuestInvite')
//   }
// }

// export const checkApiConnection = async () => {
//   try {
//     const response = await fetch(`${API_BASE_URL}/health`)
//     if (!response.ok) {
//       throw new Error(`API health check failed. Status: ${response.status}`)
//     }
//     return await response.json()
//   } catch (error) {
//     throw await handleApiError(error, 'checkApiConnection')
//   }
// }

// Add more API functions as needed */