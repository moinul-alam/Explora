import { useState } from 'react';
import { Modal, Box, Typography, Snackbar, Tab, Tabs } from '@mui/material';
import RegisterForm from '@src/components/Authentication/RegisterForm';
import LoginForm from '@src/components/Authentication/LoginForm';
import { useAuth } from '@src/context/AuthContext';
import api from '@src/utils/api';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  p: 4,
  borderRadius: 2,
};

const AuthModal = ({ open, onClose }) => {
  const [isRegister, setIsRegister] = useState(false); // Login tab is default
  const [message, setMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  // Use the useAuth hook to get login function
  const { login } = useAuth();

  // Function to handle registration
  const handleRegistration = async (formData) => {
    try {
      const response = await api.post('/auth/register', formData);
      setMessage('Registration Success');
      setOpenSnackbar(true);
    } catch (error) {
      setMessage('Registration Failed, Try Again');
      setOpenSnackbar(true);
    }
  };

  // Function to handle login using context's login
  const handleLogin = async (formData) => {
    try {
      await login(formData);
      setMessage('Login Success');
      setOpenSnackbar(true);
      onClose();
    } catch (error) {
      setMessage('Login Failed, Try Again');
      setOpenSnackbar(true);
    }
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="auth-modal-title">
      <Box sx={modalStyle}>
        <Typography id="auth-modal-title" variant="h6" textAlign="center" mb={2}>
          <Tabs
            value={isRegister ? 1 : 0} 
            onChange={(event, newValue) => setIsRegister(newValue === 1)}
            centered
          >
            <Tab label="Login" />
            <Tab label="Register" />
          </Tabs>
        </Typography>

        {isRegister ? (
          <RegisterForm onSubmit={handleRegistration} />
        ) : (
          <LoginForm onSubmit={handleLogin} />
        )}

        <Snackbar
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={() => setOpenSnackbar(false)}
          message={message}
        />
      </Box>
    </Modal>
  );
};

export default AuthModal;
