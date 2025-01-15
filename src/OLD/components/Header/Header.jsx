import { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Switch,
  useMediaQuery,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { useTheme } from '@mui/system';
import { LogoSection, NavigationMenu, ProfileMenu, SearchBar } from '@src/components/Header/index';

const Header = ({ darkMode, toggleDarkMode, isGuest = true }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Handle Drawer Toggle
  const toggleDrawer = () => setMobileOpen(!mobileOpen);

  return (
    <>
      {/* Fixed Header */}
      <AppBar position="fixed">
        <Toolbar>
          {/* Mobile Menu Icon */}
          {isMobile && (
            <IconButton
              edge="start"
              onClick={toggleDrawer}
              sx={{ color: 'inherit', mr: 2 }}
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
          )}

          {/* Logo Section */}
          <LogoSection darkMode={darkMode} isMobile={isMobile} />

          {/* Navigation Menu (Desktop) */}
          {!isMobile && <NavigationMenu darkMode={darkMode} />}

          {/* Search Bar (Desktop) */}
          {!isMobile && <SearchBar />}

          {/* Profile Menu */}
          <ProfileMenu isGuest={isGuest} />

          {/* Dark/Light Mode Toggle */}
          <Switch checked={darkMode} onChange={toggleDarkMode} />
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={toggleDrawer}
        ModalProps={{ keepMounted: true }} // Improves performance on mobile
      >
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer} onKeyDown={toggleDrawer}>
          <List>
            <ListItem button>
              <ListItemText primary="Top Rated Movies" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="Top Rated TV Series" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="Popular Movies" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="Popular TV Series" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="Discover Movies" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="Discover TV Series" />
            </ListItem>
          </List>
        </Box>
      </Drawer>

      {/* Spacer to prevent content overlap */}
      <Box sx={{ height: '4rem' }} />
    </>
  );
};

export default Header;
