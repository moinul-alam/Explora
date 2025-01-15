import React from 'react';
import {
  TextField,
  Button,
  Box,
  Typography,
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

const Register = ({ formData, handleChange, handleSubmit, error, success, handleModalClose }) => {
  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" align="center" gutterBottom>
        Register
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
        name="email"
        label="Email"
        value={formData.email}
        onChange={handleChange}
        type="email"
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
        Register
      </Button>

      {/* Success Modal */}
      <Dialog open={success} onClose={handleModalClose}>
        <DialogTitle>Registration Successful</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Your account has been created successfully! You can now log in with your credentials.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModalClose} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Register;
