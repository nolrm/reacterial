import { createTheme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import Paper from '@mui/material/Paper';

const theme = createTheme({
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#fff',
          borderRadius: '0.625rem',
          boxShadow: '0 0.25rem 0.875rem 0 rgba(38, 43, 67, 0.16)',
          padding: '16px',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#fff',
          borderRadius: '0.625rem',
          boxShadow: '0 0.25rem 0.875rem 0 rgba(38, 43, 67, 0.16)',
          padding: '16px',
        },
      },
    },
  },
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#fff',
      // paper: '#2d333b'
    },
  },
});

export default theme;
