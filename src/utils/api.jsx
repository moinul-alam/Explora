//api.jsx@src/utils

import axios from 'axios';

// Create an Axios instance
const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:12345/api', // Base URL for your backend
    withCredentials: true,
  });  

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Modify config before sending the request (e.g., add headers)
    console.log(`[API Request] ${config.method.toUpperCase()}: ${config.url}`);
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
    console.log('[API Response]', response);
    return response.data; // Simplify response to only return data
  },
  (error) => {
    // Handle errors globally
    console.error('[API Response Error]', error.response || error.message);
    const errResponse = error.response?.data || { message: 'An error occurred' };
    return Promise.reject(errResponse); // Pass the error to the caller
  }
);

export default api;
