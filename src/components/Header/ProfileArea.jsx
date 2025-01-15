// ProfileArea.js
import { useState } from 'react';
import { Button, Box } from '@mui/material';
import AuthModal from '@src/components/Authentication/AuthModal';
import { useAuth } from '@src/context/AuthContext';
import DropdownButton from '@src/components/Header/DropdownButton';

const ProfileArea = ({ isMobile }) => {
  const { isAuthenticated, user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  const dropdownItems = [
    { label: 'View Profile', link: '/profile' },
    { label: 'Logout', link: '#', onClick: logout },
  ];

  return (
    <Box sx={{ width: isMobile ? '100%' : 'auto' }}>
      {isAuthenticated ? (
        <DropdownButton 
          label={user?.username?.[0]}
          items={dropdownItems}
          isMobile={isMobile}
        />
      ) : (
        <Button
          onClick={() => setOpen(true)}
          fullWidth={isMobile}
          sx={{
            position: 'relative',
            textTransform: 'none',
            fontWeight: 'bold',
            color: 'inherit',
            '&:hover': {
              backgroundColor: 'transparent',
            },
            '&::before': {
              content: '""',
              position: 'absolute',
              bottom: 0,
              left: '50%',
              width: 0,
              height: 2,
              backgroundColor: 'currentColor',
              transition: 'all 0.8s ease',
              transform: 'translateX(-50%)',
            },
            '&:hover::before': {
              width: '100%',
            },
          }}
        >
          JOIN
        </Button>
      )}
      <AuthModal open={open} onClose={() => setOpen(false)} />
    </Box>
  );
};

export default ProfileArea;