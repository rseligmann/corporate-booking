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