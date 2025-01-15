import { useState } from 'react';
import { Box, Button, TextField, IconButton, MenuItem, Grid } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const RegisterForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    gender: '',
    dateOfBirth: '',
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); // Pass form data to AuthModal
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
      
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField 
            label="First Name" 
            name="firstName" 
            value={formData.firstName} 
            onChange={handleChange} 
            fullWidth 
            required 
          />
        </Grid>
        <Grid item xs={6}>
          <TextField 
            label="Last Name" 
            name="lastName" 
            value={formData.lastName} 
            onChange={handleChange} 
            fullWidth 
            required 
          />
        </Grid>
      </Grid>

      <TextField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} fullWidth required />
      
      <TextField select label="Gender" name="gender" value={formData.gender} onChange={handleChange} fullWidth required >
        <MenuItem value="Male">Male</MenuItem>
        <MenuItem value="Female">Female</MenuItem>
        <MenuItem value="Other">Other</MenuItem>
      </TextField>
      
      <TextField
        label="Date of Birth"
        name="dateOfBirth"
        type="date"
        value={formData.dateOfBirth}
        onChange={handleChange}
        fullWidth
        InputLabelProps={{ shrink: true }}
        required
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
        Register
      </Button>
    </Box>
  );
};

export default RegisterForm;
