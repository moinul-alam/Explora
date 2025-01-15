import { createTheme } from '@mui/material/styles';
import { useState, useEffect } from 'react';

export const useThemeMode = () => {
  const storedDarkMode = localStorage.getItem('darkMode') === 'true';
  const [darkMode, setDarkMode] = useState(storedDarkMode);

  // Saving darkmode status to local storage
  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  // Toggle dark mode function
  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return [darkMode, toggleDarkMode];
};

export const getTheme = (mode) => createTheme({
  palette: {
    mode: mode,
    background: {
      default: mode === 'dark' ? '#0d1117' : '#f5f5f5',
      paper: mode === 'dark' ? '#161b22' : '#ffffff',
    },
    text: {
      primary: mode === 'dark' ? '#e6edf3' : '#333333',
      secondary: mode === 'dark' ? '#8b949e' : '#555555',
    },
    primary: {
      main: mode === 'dark' ? '#58a6ff' : '#1976d2',
    },
    secondary: {
      main: mode === 'dark' ? '#9d79ff' : '#6d4cff',
    },
    error: {
      main: mode === 'dark' ? '#ff6e6e' : '#d32f2f',
    },
    success: {
      main: mode === 'dark' ? '#34d399' : '#2e7d32',
    },
    warning: {
      main: mode === 'dark' ? '#f59e0b' : '#ed6c02',
    },
    info: {
      main: mode === 'dark' ? '#4dc4ff' : '#0288d1',
    },
  },
  typography: {
    fontFamily: 'Ubuntu, Arial, sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      lineHeight: 1.3,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 500,
      lineHeight: 1.4,
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: 1.5,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          padding: '8px 16px',
          borderRadius: '8px',
          boxShadow: mode === 'dark' ? '0px 3px 6px rgba(0,0,0,0.4)' : '0px 2px 4px rgba(0,0,0,0.2)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: mode === 'dark' ? '0px 4px 12px rgba(0,0,0,0.6)' : '0px 3px 8px rgba(0,0,0,0.3)',
          borderRadius: '12px',
        },
      },
    },
  },
});

export default getTheme;