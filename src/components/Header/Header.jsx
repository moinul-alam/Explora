import { useState } from 'react';
import { AppBar, Toolbar, Box, useMediaQuery, IconButton, Drawer } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { useThemeContext } from '@src/context/ThemeContext';
import { Logo, NavigationMenu, SearchBar, ProfileArea, ThemeToggler } from '@src/components/Header';

const Header = () => {
  const { mode } = useThemeContext();
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('md'));
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(prevState => !prevState);
  };

  return (
    <AppBar 
      position="fixed" 
      sx={(theme) => ({
        zIndex: theme.zIndex.drawer + 1,
        width: '100%',
      })}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box sx={{ flexShrink: 0 }}>
          <Logo mode={mode} isMobile={isMobile} />
        </Box>

        {/* Desktop Menu */}
        {!isMobile && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              ml: 'auto',
              '& > *': {
                color: 'inherit',
              }
            }}
          >
            <NavigationMenu />
            <SearchBar />
            <ProfileArea />
            <ThemeToggler />
          </Box>
        )}

        {/* Mobile Menu */}
        {isMobile && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <SearchBar isMobile={true} />
            <IconButton 
              color="inherit"
              onClick={toggleDrawer}
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
          </Box>
        )}
      </Toolbar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={toggleDrawer}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            width: '280px',
            boxSizing: 'border-box',
            p: 2,
          },
        }}
      >
        <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', gap: 3 }}>
          <NavigationMenu isMobile={true} />
          <ProfileArea isMobile={true} />
          <ThemeToggler />
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default Header;