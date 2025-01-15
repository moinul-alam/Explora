import { useState, useEffect } from 'react';

const useDarkMode = () => {
  const getInitialMode = () => {
    try {
      const savedMode = localStorage.getItem('theme');
      return savedMode === 'dark' ? 'dark' : 'light';
    } catch {
      return 'light';
    }
  };

  const [mode, setMode] = useState(getInitialMode);

  const toggleMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    localStorage.setItem('theme', mode);
  }, [mode]);

  return { mode, toggleMode };
};

export default useDarkMode;
