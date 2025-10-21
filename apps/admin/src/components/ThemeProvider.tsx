import { ReactNode } from 'react';
import {
  ThemeProvider as MUIThemeProvider,
  createTheme,
  Theme,
} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useSelector } from 'react-redux';
import { selectTheme } from '@/redux/store';

interface CustomThemeProviderProps {
  children: ReactNode;
}

// Theme configuration
const getTheme = (mode: 'light' | 'dark'): Theme =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: '#1976d2',
        light: '#42a5f5',
        dark: '#1565c0',
      },
      secondary: {
        main: '#dc004e',
        light: '#ff4081',
        dark: '#9a0036',
      },
      background: {
        default: mode === 'light' ? '#f5f5f5' : '#121212',
        paper: mode === 'light' ? '#ffffff' : '#1e1e1e',
        content: mode === 'light' ? '#f8f9fa' : '#1a1a1a',
      },
      text: {
        primary: mode === 'light' ? '#1a1a1a' : '#ffffff',
        secondary: mode === 'light' ? '#666666' : '#b3b3b3',
        title: mode === 'light' ? '#2c3e50' : '#ecf0f1',
      },
    },
    typography: {
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
      ].join(','),
      h1: {
        fontSize: '2.5rem',
        fontWeight: 500,
      },
      h2: {
        fontSize: '2rem',
        fontWeight: 500,
      },
      h3: {
        fontSize: '1.75rem',
        fontWeight: 500,
      },
      h4: {
        fontSize: '1.5rem',
        fontWeight: 600,
        color: mode === 'light' ? '#2c3e50' : '#ecf0f1',
      },
      h5: {
        fontSize: '1.25rem',
        fontWeight: 500,
      },
      h6: {
        fontSize: '1rem',
        fontWeight: 500,
        color: mode === 'light' ? '#2c3e50' : '#ecf0f1',
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            borderRadius: 8,
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            boxShadow:
              mode === 'light'
                ? '0px 2px 4px rgba(0, 0, 0, 0.1)'
                : '0px 2px 4px rgba(0, 0, 0, 0.3)',
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            background: mode === 'light' ? '#ffffff' : '#1e1e1e',
            color: mode === 'light' ? '#000000' : '#ffffff',
            boxShadow: 'none',
            borderBottom: `1px solid ${mode === 'light' ? '#e0e0e0' : '#333333'}`,
          },
        },
      },
      MuiTypography: {
        styleOverrides: {
          root: {
            transition: 'color 0.2s ease-in-out',
          },
        },
        variants: [
          {
            props: { variant: 'h4', className: 'page-title' },
            style: {
              fontSize: '1.5rem',
              fontWeight: 600,
              marginBottom: '1.5rem',
            },
          },
        ],
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            transition:
              'background-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
            backgroundColor: mode === 'light' ? '#ffffff' : '#1e1e1e',
          },
        },
      },
    },
  });

export default function CustomThemeProvider({
  children,
}: CustomThemeProviderProps) {
  const mode = useSelector(selectTheme);
  const theme = getTheme(mode);

  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );
}
