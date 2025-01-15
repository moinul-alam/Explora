import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '@src/utils/API';
import { useUser } from '@src/contexts/UserContext';

const useLogin = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState(null);
  const { setUser } = useUser();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/api/auth/login', formData);
      setUser(response.data.user);
      navigate('/');
    } catch (error) {
      setError(
        error.response?.data?.message || 'Something went wrong. Please try again.'
      );
    }
  };

  return { formData, handleChange, handleSubmit, error };
};

export default useLogin;
