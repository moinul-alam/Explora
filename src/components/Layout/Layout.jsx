import { Box, useTheme, useMediaQuery } from '@mui/material';
import Header from '@src/components/Header/Header';
import Footer from '@src/components/Footer/Footer';

const Layout = ({ children }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const headerHeight = isSmallScreen ? '3.5rem' : '4rem';

  return (
    <Box
      sx={{
        minHeight: '100vh',
        overflowX: 'hidden',
      }}
    >
      <Header />
      <main style={{ flex: 1, marginTop: headerHeight }}>
        <Box sx={{ width: '100%', minHeight: '30rem' }}>
          {children}
        </Box>
      </main>
      <Footer />
    </Box>
  );
};

export default Layout;
