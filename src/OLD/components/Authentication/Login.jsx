import React from 'react';
import { TextField, Button, Box, Typography, Alert } from '@mui/material';

const Login = ({ formData, handleChange, handleSubmit, error }) => {
  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" align="center" gutterBottom>
        Login
      </Typography>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <TextField
        fullWidth
        margin="normal"
        name="username"
        label="Username"
        value={formData.username}
        onChange={handleChange}
        required
      />
      <TextField
        fullWidth
        margin="normal"
        name="password"
        label="Password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
        Login
      </Button>
    </Box>
  );
};

export default Login;
