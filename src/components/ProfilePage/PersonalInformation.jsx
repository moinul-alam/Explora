import { useState } from 'react';
import { Avatar, Box, Typography, Paper, Divider, Button, TextField, CircularProgress, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import FallbackImage from '@src/assets/fallback-image.png';
import api from '@src/utils/api';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

const PersonalInformation = ({ info, createdAt }) => {
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    firstName: info.firstName,
    lastName: info.lastName,
    avatar: info.avatar,
    email: info.email,
    gender: info.gender,
    dateOfBirth: info.dateOfBirth ? new Date(info.dateOfBirth) : null,
    location: info.location || '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle avatar upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setFormData((prevData) => ({ ...prevData, avatar: URL.createObjectURL(file) }));
    }
  };

  // Handle Date of Birth change
  const handleDateChange = (newDate) => {
    setFormData((prevData) => ({ ...prevData, dateOfBirth: newDate }));
  };

  // Save the updated data
  const handleSave = async () => {
    try {
      setLoading(true);
      setErrorMessage('');
      const updatedData = { ...formData };

      if (imageFile) {
        const formDataWithImage = new FormData();
        formDataWithImage.append('avatar', imageFile);
        Object.keys(updatedData).forEach((key) => {
          if (key !== 'avatar') {
            formDataWithImage.append(key, updatedData[key]);
          }
        });
        await api.post('/user/profile/update', formDataWithImage, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      } else {
        await api.post('/user/profile/update', updatedData);
      }

      setEditMode(false);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('Error updating profile:', error);
      setErrorMessage('Failed to update profile. Please try again.');
    }
  };

  // Form validation
  const isFormValid = () => {
    const { firstName, lastName, email, gender, dateOfBirth, location } = formData;
    return firstName && lastName && email && gender && dateOfBirth && location;
  };

  // Cancel edit mode and reset form
  const handleCancel = () => {
    setEditMode(false);
    setFormData({
      firstName: info.firstName,
      lastName: info.lastName,
      avatar: info.avatar,
      email: info.email,
      gender: info.gender,
      dateOfBirth: info.dateOfBirth ? new Date(info.dateOfBirth) : null,
      location: info.location || '',
    });
  };

  return (
    <Paper sx={{ padding: 4, marginBottom: 4, borderRadius: 1, display: 'flex', alignItems: 'center', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }}>
      <Avatar
        src={formData.avatar || FallbackImage}
        sx={{ width: 120, height: 120, marginRight: 4, border: '3px solid #e0e0e0', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)' }}
      />
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant='h4' fontWeight='bold' sx={{ color: '#3f51b5' }}>
          {formData.firstName} {formData.lastName || ''}
        </Typography>
        {!editMode && (
          <Typography variant='subtitle1' sx={{ marginBottom: 1, color: '#757575' }}>
            @{info.username || 'Guest'}
          </Typography>
        )}
        <Divider sx={{ marginY: 1 }} />
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
          {editMode ? (
            <>
              <TextField label='First Name' name='firstName' value={formData.firstName} onChange={handleChange} fullWidth sx={{ marginBottom: 2 }} />
              <TextField label='Last Name' name='lastName' value={formData.lastName} onChange={handleChange} fullWidth sx={{ marginBottom: 2 }} />
              <TextField label='Email' name='email' value={formData.email} onChange={handleChange} fullWidth sx={{ marginBottom: 2 }} />
              <FormControl fullWidth sx={{ marginBottom: 2 }}>
                <InputLabel>Gender</InputLabel>
                <Select label='Gender' name='gender' value={formData.gender} onChange={handleChange}>
                  <MenuItem value='Male'>Male</MenuItem>
                  <MenuItem value='Female'>Female</MenuItem>
                  <MenuItem value='Other'>Other</MenuItem>
                </Select>
              </FormControl>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label='Date of Birth'
                  value={formData.dateOfBirth}
                  onChange={handleDateChange}
                  renderInput={(params) => <TextField {...params} fullWidth sx={{ marginBottom: 2 }} />}
                />
              </LocalizationProvider>
              <TextField label='Location' name='location' value={formData.location} onChange={handleChange} fullWidth sx={{ marginBottom: 2 }} />
              <Box sx={{ marginTop: 2 }}>
                <input type='file' accept='image/*' onChange={handleImageUpload} style={{ display: 'none' }} id='avatar-upload' />
                <label htmlFor='avatar-upload'>
                  <Button variant='outlined' component='span'>
                    Upload New Avatar
                  </Button>
                </label>
              </Box>
            </>
          ) : (
            <>
              <Typography variant='body1'>
                <strong>Email:</strong> {formData.email}
              </Typography>
              <Typography variant='body1'>
                <strong>Gender:</strong> {formData.gender || 'Gender not specified'}
              </Typography>
              <Typography variant='body1'>
                <strong>Date of Birth:</strong> {formData.dateOfBirth ? formData.dateOfBirth.toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' }) : 'Not specified'}
              </Typography>
              <Typography variant='body1'>
                <strong>Location:</strong> {formData.location || 'Location not specified'}
              </Typography>
            </>
          )}
          <Typography variant='body1'>
            <strong>Active since:</strong> {createdAt}
          </Typography>
        </Box>
        <Box sx={{ marginTop: 2 }}>
          {loading ? (
            <CircularProgress />
          ) : (
            <>
              {editMode ? (
                <>
                  <Button variant='contained' color='primary' onClick={handleSave} disabled={!isFormValid()} sx={{ marginRight: 2 }}>
                    Save Changes
                  </Button>
                  <Button variant='outlined' onClick={handleCancel}>
                    Cancel
                  </Button>
                </>
              ) : (
                <Button variant='contained' color='primary' onClick={() => setEditMode(true)}>
                  Edit Profile
                </Button>
              )}
            </>
          )}
          {errorMessage && (
            <Typography variant='body2' color='error' sx={{ marginTop: 2 }}>
              {errorMessage}
            </Typography>
          )}
        </Box>
      </Box>
    </Paper>
  );
};

export default PersonalInformation;
