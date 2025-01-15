import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '@src/utils/API'; // Make sure this points to your API utility

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state for initial check

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get('/api/auth/me'); // This hits your /me endpoint
        setUser(response.data.user);
      } catch (error) {
        setUser(null); // If error occurs (user is not logged in)
      } finally {
        setLoading(false); // Set loading to false once check is complete
      }
    };

    fetchUser(); // Run fetch on mount
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};
