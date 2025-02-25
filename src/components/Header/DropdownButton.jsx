import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Button, Menu, MenuItem } from '@mui/material';
import { ArrowDropDown as ArrowDropDownIcon } from '@mui/icons-material';

const DropdownButton = ({ label, items, onItemClick }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

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
          '&:hover': { backgroundColor: 'transparent' },
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
          '&:hover::before': { width: '100%' },
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
          '& .MuiPaper-root': { borderRadius: 0.5 },
        }}
      >
        {items.map((item, index) => (
          <MenuItem
            key={index}
            component={RouterLink} // Use React Router's Link
            to={item.link}
            onClick={handleClose} // Close menu after clicking
            sx={{
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            {item.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default DropdownButton;
