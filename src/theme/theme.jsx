import { createTheme, responsiveFontSizes } from '@mui/material/styles';

const theme = (mode) => {
  let theme = createTheme({
    palette: {
      mode,
      ...(mode === 'dark'
        ? {
            primary: {
              main: '#4A90E2',
              light: '#76B7F0',
              dark: '#357ABD',
              contrastText: '#FFFFFF',
            },
            secondary: {
              main: '#FF6F61',
              light: '#FF9385',
              dark: '#D94F48',
              contrastText: '#FFFFFF',
            },
            background: {
              default: '#F9FAFB',
              paper: '#FFFFFF',
              variant: '#F4F6F8',
            },
            text: {
              primary: '#1A1A1A',
              secondary: '#6D6D6D',
              disabled: '#A0A0A0',
            },
            divider: 'rgba(0, 0, 0, 0.12)',
            action: {
              active: 'rgba(0, 0, 0, 0.54)',
              hover: 'rgba(0, 0, 0, 0.04)',
              selected: 'rgba(0, 0, 0, 0.08)',
              disabled: 'rgba(0, 0, 0, 0.26)',
              disabledBackground: 'rgba(0, 0, 0, 0.12)',
            },
            header: {
              background: '#4A90E2',
              text: '#FFFFFF',
            },
            footer: {
              background: '#333333',
              text: '#EDEDED',
            },
          }
        : {
            primary: {
              main: '#76B7F0',
              light: '#8EC8F2',
              dark: '#2C6AA8',
              contrastText: '#FFFFFF',
            },
            secondary: {
              main: '#FF6F61',
              light: '#FF9385',
              dark: '#D94F48',
              contrastText: '#FFFFFF',
            },
            background: {
              default: '#1E1E1E',
              paper: '#292929',
              variant: '#333333',
            },
            text: {
              primary: '#EDEDED',
              secondary: '#A0A0A0',
              disabled: '#666666',
            },
            divider: 'rgba(255, 255, 255, 0.12)',
            action: {
              active: 'rgba(255, 255, 255, 0.7)',
              hover: 'rgba(255, 255, 255, 0.08)',
              selected: 'rgba(255, 255, 255, 0.16)',
              disabled: 'rgba(255, 255, 255, 0.3)',
              disabledBackground: 'rgba(255, 255, 255, 0.12)',
            },
            header: {
              background: '#333333',
              text: '#EDEDED',
            },
            footer: {
              background: '#1E1E1E',
              text: '#A0A0A0',
            },
          }),
    },
    typography: {
      fontFamily: '"Lato", "Arial", sans-serif',
      h1: {
        fontFamily: '"Montserrat", "Arial", sans-serif',
        fontWeight: 700,
        fontSize: '2.5rem',
        letterSpacing: '-0.01562em',
        '@media (max-width:600px)': {
          fontSize: '2rem',
        },
      },
      h2: {
        fontFamily: '"Montserrat", "Arial", sans-serif',
        fontWeight: 600,
        fontSize: '2rem',
        letterSpacing: '-0.00833em',
        '@media (max-width:600px)': {
          fontSize: '1.75rem',
        },
      },
      h3: {
        fontFamily: '"Montserrat", "Arial", sans-serif',
        fontSize: '1.75rem',
        fontWeight: 600,
        letterSpacing: '0em',
        '@media (max-width:600px)': {
          fontSize: '1.5rem',
        },
      },
      h4: {
        fontFamily: '"Montserrat", "Arial", sans-serif',
        fontSize: '1.5rem',
        fontWeight: 600,
        letterSpacing: '0.00735em',
        '@media (max-width:600px)': {
          fontSize: '1.25rem',
        },
      },
      body1: {
        fontFamily: '"Lato", "Arial", sans-serif',
        fontSize: '1rem',
        lineHeight: 1.6,
        letterSpacing: '0.00938em',
      },
      body2: {
        fontFamily: '"Lato", "Arial", sans-serif',
        fontSize: '0.875rem',
        lineHeight: 1.57,
        letterSpacing: '0.01071em',
      },
      button: {
        fontFamily: '"Montserrat", "Arial", sans-serif',
        textTransform: 'none',
        fontWeight: 500,
        letterSpacing: '0.02857em',
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          html: {
            overflowY: 'scroll',
          },
          body: {
            margin: 0,
            padding: 0,
            fontFamily: '"Lato", "Arial", sans-serif',
            WebkitFontSmoothing: 'antialiased',
            MozOsxFontSmoothing: 'grayscale',
            backgroundColor: mode === 'light' ? '#F9FAFB' : '#1E1E1E',
            transition: 'background-color 0.3s ease-in-out',
          },
        },
      },
      MuiContainer: {
        styleOverrides: {
          root: {
            backgroundColor: mode === 'light' ? '#F9FAFB' : '#1E1E1E',
            transition: 'background-color 0.3s ease-in-out',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            padding: '8px 16px',
            transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: mode === 'light' 
                ? '0 6px 12px rgba(0,0,0,0.1)'
                : '0 6px 12px rgba(0,0,0,0.3)',
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
            boxShadow: mode === 'light'
              ? '0 4px 6px rgba(0,0,0,0.05), 0 1px 3px rgba(0,0,0,0.08)'
              : '0 4px 6px rgba(0,0,0,0.3)',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: mode === 'light'
                ? '0 12px 24px rgba(0,0,0,0.1)'
                : '0 12px 24px rgba(0,0,0,0.4)',
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            transition: 'background-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: mode === 'light' ? '#4A90E2' : '#8B0000',
            color: mode === 'light' ? '#FFFFFF' : '#EDEDED',
          },
        },
      },
      MuiTypography: {
        styleOverrides: {
          h1: {
            color: mode === 'light' ? '#4A90E2' : '#EDEDED', // Header text color
          },
          h2: {
            color: mode === 'light' ? '#4A90E2' : '#EDEDED', // Header text color
          },
          h3: {
            color: mode === 'light' ? '#4A90E2' : '#EDEDED', // Header text color
          },
        },
      },
    },
    shape: {
      borderRadius: 12,
    },
    transitions: {
      duration: {
        shortest: 150,
        shorter: 200,
        short: 250,
        standard: 300,
        complex: 375,
        enteringScreen: 225,
        leavingScreen: 195,
      },
      easing: {
        easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
        easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
        easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
        sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
      },
    },
  });

  theme = responsiveFontSizes(theme);
  return theme;
};

export default theme;
