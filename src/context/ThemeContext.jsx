import { createContext, useState, useContext, useMemo, useEffect, useCallback } from 'react';
import { ThemeProvider as MuiThemeProvider, CssBaseline, GlobalStyles } from '@mui/material';
import theme from '@src/theme/theme';

// Create ThemeContext
const ThemeContext = createContext();

// Custom hook to access ThemeContext with error checking
export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
};

// ThemeProvider component
export const CustomThemeProvider = ({ children }) => {
  const getInitialTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark' || savedTheme === 'light' ? savedTheme : 'light';
  };

  const [mode, setMode] = useState(getInitialTheme);

  useEffect(() => {
    localStorage.setItem('theme', mode);
  }, [mode]);

  const toggleTheme = useCallback(() => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  }, []);

  const contextValue = useMemo(() => ({
    mode,
    toggleTheme,
  }), [mode, toggleTheme]);

  const muiTheme = useMemo(() => theme(mode), [mode]);

  return (
    <ThemeContext.Provider value={contextValue}>
      <MuiThemeProvider theme={muiTheme}>
        <CssBaseline />
        <GlobalStyles
          styles={{
            body: {
              backgroundColor: muiTheme.palette.background.default,
              color: muiTheme.palette.text.primary,
              transition: 'all 0.3s ease-in-out',
            },
          }}
        />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export default CustomThemeProvider;
