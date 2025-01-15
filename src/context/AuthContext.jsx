import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '@src/utils/api'; 
import PropTypes from 'prop-types';

// Create Auth Context
const AuthContext = createContext();

// Custom hook to use Auth Context
export const useAuth = () => useContext(AuthContext);

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check session on initial load
  useEffect(() => {
    const checkSession = async () => {
      setLoading(true);
      try {
        const response = await api.get('/auth/me'); 
        if (response.status === 'success' || response?.data?.success) {
          setIsAuthenticated(true);
          setUser(response.data);
        }
      } catch (error) {
        console.error('Session check failed:', error);
        setIsAuthenticated(false);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkSession();
  }, []);

  // Login function
  const login = async (credentials) => {
    setLoading(true);
    try {
      const response = await api.post('/auth/login', credentials);
      if (response.status === 'success' || response?.data?.success) {
        setIsAuthenticated(true);
        setUser(response.data);
      }
    } catch (error) {
      console.error('Login failed:', error);
      setError('Login failed, please try again!');
      throw error;
    } finally {
      setLoading(false);
    }
  };  

  // Logout function
  const logout = async () => {
    setLoading(true);
    try {
      await api.post('/auth/logout'); // Using centralized API handler
      setIsAuthenticated(false);
      setUser(null);
      window.location.href = '/';
    } catch (error) {
      console.error('Logout failed:', error);
      setError('Logout failed, please try again!');
      throw error; // Pass error to the caller
    } finally {
      setLoading(false);
    }
  };

  // Provide context value
  const value = {
    isAuthenticated,
    user,
    loading,
    error,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>
    {children}
    </AuthContext.Provider>;
};

// Prop types for AuthProvider
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
