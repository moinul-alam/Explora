import React from 'react';
import { Button, Menu, MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';

const MenuButton = ({ label, menuItems, darkMode }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleOpen = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleItemClick = (action) => {
    if (action) {
      action();  // Execute the logout function if it's provided
    }
    handleClose();  // Close the menu after an action is taken
  };

  return (
    <>
      <Button sx={{ color: darkMode ? 'gold' : 'white' }} onMouseEnter={handleOpen}>
        {label}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        MenuListProps={{ onMouseLeave: handleClose }}
        disableScrollLock
      >
        {menuItems.map((item, index) => (
          <MenuItem
            key={index}
            onClick={() => handleItemClick(item.action)}  // Execute action if present
            component={item.link ? Link : 'div'}
            to={item.link}
          >
            {item.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default MenuButton;
