import { useNavigate } from 'react-router-dom';
import { useUser } from '@src/contexts/UserContext';
import { CircularProgress } from '@mui/material';
import MenuButton from '@src/components/Header/MenuButton';
import api from '@src/utils/API';

const ProfileMenu = () => {
  const { user, setUser, loading } = useUser();
  const navigate = useNavigate();

  // Logout handler
  const handleLogout = async () => {
    try {
      await api.post('/api/auth/logout');
      setUser(null);  // Clear user state
      navigate('/');  // Redirect to homepage after logout
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  if (loading) {
    return <CircularProgress />; // Material-UI spinner
  }

  const loggedInMenuItems = [
    { label: 'View Profile', link: '/profile' },
    { label: 'Log Out', action: handleLogout }  // Pass logout function as action
  ];

  const loggedOutMenuItems = [
    { label: 'Register', link: '/register' },
    { label: 'Login', link: '/login' }
  ];

  return (
    <div>
      {user ? (
        <MenuButton
          label={user.username ? user.username.charAt(0) : 'U'}
          menuItems={loggedInMenuItems}
          darkMode={false}
        />
      ) : (
        <MenuButton
          label="Join"
          menuItems={loggedOutMenuItems}
          darkMode={false}
        />
      )}
    </div>
  );
};

export default ProfileMenu;
