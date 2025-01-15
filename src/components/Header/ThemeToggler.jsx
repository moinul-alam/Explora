import { IconButton } from '@mui/material';
import { Brightness7, Brightness4 } from '@mui/icons-material';
import { useThemeContext } from '@src/context/ThemeContext';

const ThemeToggler = () => {
  const { mode, toggleTheme } = useThemeContext();

  return (
    <IconButton onClick={toggleTheme} color="inherit">
      {mode === 'light' ? <Brightness4 /> : <Brightness7 />} 
    </IconButton>
  );
};

export default ThemeToggler;
