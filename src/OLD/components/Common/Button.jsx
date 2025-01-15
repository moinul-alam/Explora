// /components/Button.jsx
import React from 'react';
import { Button as MUIButton } from '@mui/material';

const Button = ({ onClick }) => (
  <MUIButton
    variant="contained"
    color="primary"
    fullWidth
    onClick={onClick}
  >
    Discover
  </MUIButton>
);

export default Button;
