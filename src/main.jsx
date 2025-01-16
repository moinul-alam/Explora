//main.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '@src/context/AuthContext';
import { CustomThemeProvider } from '@src/context/ThemeContext';
import { CssBaseline } from '@mui/material';
import App from '@src/App.jsx';
import ScrollToTop from '@src/utils/ScrollToTop';
import ErrorBoundary from '@src/components/ErrorBoundary/ErrorBoundary';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <AuthProvider>
        <BrowserRouter>
          <ScrollToTop />
            <CustomThemeProvider >
            <CssBaseline />
              <App />
            </CustomThemeProvider >
        </BrowserRouter>
      </AuthProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
