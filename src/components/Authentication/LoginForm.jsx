import { useState } from 'react';
import { Box, Button, TextField, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const LoginForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={2}>
      <TextField label="Username" name="username" value={formData.username} onChange={handleChange} fullWidth required />
      <TextField
        label="Password"
        name="password"
        type={showPassword ? 'text' : 'password'}
        value={formData.password}
        onChange={handleChange}
        fullWidth
        required
        InputProps={{
          endAdornment: (
            <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          ),
        }}
      />
      <Button
        variant="contained"
        type="submit"
        sx={{
          backgroundColor: 'primary.dark',
          color: 'white',
          fontWeight: 'bold',
          '&:hover': {
            backgroundColor: 'primary.light',
          },
        }}
      >
        Login
      </Button>
    </Box>
  );
};

export default LoginForm;
