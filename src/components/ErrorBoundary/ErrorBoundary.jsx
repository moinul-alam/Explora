import { Component } from 'react';
import { Button, Typography, Container, Box, Paper, CircularProgress } from '@mui/material';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      errorMessage: '',
      errorStack: '',
      isRecovering: false,
      retryCount: 0,
      lastError: null
    };
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      errorMessage: error.message,
      errorStack: error.stack,
      lastError: error
    };
  }

  componentDidCatch(error, errorInfo) {
    // Log error details
    console.error('Error details:', {
      error,
      componentStack: errorInfo.componentStack,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href
    });

    // Call optional error reporting callback if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  handleRetry = async () => {
    this.setState({ isRecovering: true });

    try {
      // Optional callback before retry
      if (this.props.onRetry) {
        await this.props.onRetry();
      }

      // Increment retry count
      this.setState(prevState => ({
        hasError: false,
        errorMessage: '',
        errorStack: '',
        isRecovering: false,
        retryCount: prevState.retryCount + 1,
        lastError: null
      }));
    } catch (error) {
      this.setState({
        hasError: true,
        errorMessage: 'Recovery failed. Please refresh the page.',
        isRecovering: false
      });
    }
  };

  handleRefresh = () => {
    window.location.reload();
  };

  renderErrorMessage() {
    const { errorMessage, retryCount } = this.state;
    const maxRetries = this.props.maxRetries || 3;

    if (retryCount >= maxRetries) {
      return 'Maximum retry attempts reached. Please refresh the page.';
    }

    return errorMessage || 'An unexpected error has occurred.';
  }

  render() {
    const { hasError, isRecovering, retryCount } = this.state;
    const { fallback, maxRetries = 3 } = this.props;

    if (!hasError) {
      return this.props.children;
    }

    // If a custom fallback is provided, use it
    if (fallback) {
      return fallback(this.handleRetry, this.handleRefresh);
    }

    return (
      <Container maxWidth="sm" sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh',
        p: 2
      }}>
        <Paper elevation={3} sx={{ 
          p: 4, 
          borderRadius: 2,
          backgroundColor: '#f8f9fa',
          width: '100%',
          maxWidth: 500
        }}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography 
              variant="h4" 
              gutterBottom 
              sx={{ 
                fontWeight: 'bold', 
                color: '#dc3545',
                mb: 3
              }}
            >
              Oops! Something Went Wrong
            </Typography>

            <Typography 
              variant="body1" 
              sx={{ 
                color: '#6c757d', 
                mb: 4,
                lineHeight: 1.6
              }}
            >
              {this.renderErrorMessage()}
            </Typography>

            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
              {retryCount < maxRetries && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.handleRetry}
                  disabled={isRecovering}
                  sx={{ 
                    py: 1.5,
                    px: 3,
                    fontWeight: 'bold',
                    minWidth: 120
                  }}
                >
                  {isRecovering ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    'Try Again'
                  )}
                </Button>
              )}
              
              <Button
                variant="outlined"
                color="primary"
                onClick={this.handleRefresh}
                sx={{ 
                  py: 1.5,
                  px: 3,
                  fontWeight: 'bold',
                  minWidth: 120
                }}
              >
                Refresh Page
              </Button>
            </Box>

            {process.env.NODE_ENV === 'development' && this.state.errorStack && (
              <Box sx={{ mt: 4, textAlign: 'left' }}>
                <Typography variant="caption" component="pre" sx={{ 
                  p: 2,
                  backgroundColor: '#f1f3f5',
                  borderRadius: 1,
                  overflow: 'auto',
                  maxHeight: 200
                }}>
                  {this.state.errorStack}
                </Typography>
              </Box>
            )}
          </Box>
        </Paper>
      </Container>
    );
  }
}

export default ErrorBoundary;