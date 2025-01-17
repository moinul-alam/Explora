// api.jsx @ src/utils
import axios from 'axios';

// Create an Axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // Base URL for your backend
  withCredentials: true, // Include credentials for cross-origin requests
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    if (import.meta.env.MODE !== 'production') {
      console.log(`[API Request] ${config.method.toUpperCase()}: ${config.url}`);
    }
    return config;
  },
  (error) => {
    console.error('[API Request Error]', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    if (import.meta.env.MODE !== 'production') {
      console.log('[API Response]', response);
    }
    return response.data; // Simplify response to only return data
  },
  (error) => {
    console.error('[API Response Error]', error.response || error.message);
    const errResponse = error.response?.data || { message: 'An unexpected error occurred. Please try again later.' };
    return Promise.reject(errResponse);
  }
);

export default api;
