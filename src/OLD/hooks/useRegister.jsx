import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '@src/utils/API';

const useRegister = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/api/auth/register', formData);
      setSuccess(true);
    } catch (error) {
      setError(
        error.response?.data?.message || 'Something went wrong. Please try again.'
      );
    }
  };

  const handleModalClose = () => {
    setSuccess(false);
    navigate('/login');
  };

  return { formData, handleChange, handleSubmit, error, success, handleModalClose };
};

export default useRegister;
