import axios from 'axios';

const { VITE_API_BASE_URL, MODE } = import.meta.env;

const api = axios.create({
  baseURL: VITE_API_BASE_URL,
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    MODE !== 'production' && console.log(`[API Request] ${config.method.toUpperCase()}: ${config.url}`);
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  ({ data }) => {
    MODE !== 'production' && console.log('[API Response]', data);
    return data;
  },
  (error) => {
    console.error('[API Error]', error.response?.data || error.message);
    return Promise.reject(error.response?.data || { message: 'An unexpected error occurred.' });
  }
);

export default api;