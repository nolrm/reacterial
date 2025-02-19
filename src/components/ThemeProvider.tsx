import { ReactNode } from 'react';
import { ThemeProvider as MUIThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useSelector } from 'react-redux';
import { selectTheme } from '@/redux/themeSlice';

interface CustomThemeProviderProps {
  children: ReactNode;
}

export default function CustomThemeProvider({ children }: CustomThemeProviderProps) {
  const mode = useSelector(selectTheme);

  const theme = createTheme({
    palette: {
      mode,
      // You can customize your theme colors here
      primary: {
        main: '#1976d2',
        // ... other color variations
      },
      secondary: {
        main: '#dc004e',
        // ... other color variations
      },
      background: {
        default: mode === 'light' ? '#f5f5f5' : '#121212',
        paper: mode === 'light' ? '#ffffff' : '#1e1e1e',
      },
    },
    // You can add more theme customizations here
  });

  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );
} 