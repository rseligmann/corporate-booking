import axios, { AxiosInstance } from 'axios';
import { getToken, removeToken } from './utils/tokenStorage';

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

// paramsSerializer: (params) => {
//   //indexes: null  // This will serialize arrays without brackets
//   const result: string[] = []
    
//   // Iterate through each parameter
//   Object.entries(params).forEach(([key, value]) => {
//     if (key === 'ratings' && Array.isArray(value)) {
//       // Special handling for ratings parameter
//       result.push(`${key}=${value.join(',')}`)
//     } 
//     else if (Array.isArray(value)) {
//       // Handle other arrays by repeating the parameter
//       value.forEach(item => {
//         result.push(`${encodeURIComponent(key)}=${encodeURIComponent(item)}`)
//       })
//     }
//     // Handle normal parameters
//     else {
//       result.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
//     }
//   });
  
//   return result.join('&')
// }

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