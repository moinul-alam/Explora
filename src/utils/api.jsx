import axios from 'axios';

const { VITE_API_BASE_URL, MODE } = import.meta.env;

const api = axios.create({
  baseURL: VITE_API_BASE_URL,
  withCredentials: true,
});

// Request Interceptor: Add start time
api.interceptors.request.use(
  (config) => {
    config.metadata = { startTime: performance.now() };  // Store request start time
    MODE !== 'production' && console.log(`[API Request] ${config.method.toUpperCase()}: ${config.url}`);
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Calculate and log duration
api.interceptors.response.use(
  (response) => {
    const endTime = performance.now();
    const duration = (endTime - response.config.metadata.startTime).toFixed(2);
    MODE !== 'production' && console.log(`[API Timing] ${response.config.url}: ${duration} ms`);

    MODE !== 'production' && console.log('[API Response]', response.data);
    return response.data;
  },
  (error) => {
    console.error('[API Error]', error.response?.data || error.message);
    return Promise.reject(error.response?.data || { message: 'An unexpected error occurred.' });
  }
);

export default api;
