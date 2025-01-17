import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Menu, MenuItem } from '@mui/material';
import { ArrowDropDown as ArrowDropDownIcon } from '@mui/icons-material';

const DropdownButton = ({ label, items, onItemClick }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleItemClick = (item) => {
    if (onItemClick) {
      onItemClick(item); // Invoke the callback with the clicked item
    }

    if (item.label === 'Logout') {
      item.onClick();
    } else if (item.link) {
      navigate(item.link);
    }
    handleClose();
  };

  return (
    <>
      <Button
        variant="text"
        onClick={handleClick}
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
        {label}
        <ArrowDropDownIcon sx={{ marginLeft: 1 }} />
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        sx={{
          '& .MuiPaper-root': {
            borderRadius: 0.5,
          },
        }}
      >
        {items.map((item, index) => (
          <MenuItem
            key={index}
            onClick={() => handleItemClick(item)}
            component="button"
          >
            {item.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default DropdownButton;
