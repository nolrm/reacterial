import React, { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Header from '@/components/blocks/Header';
import Sidebar from '@/components/blocks/Sidebar';
import MainContent from '@/components/blocks/MainContent';
import styles from './LayoutAdmin.module.css';
import { Box, useTheme } from '@mui/material';

const LayoutAdmin: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDrawerOpen, setOpen] = useState<boolean>(true);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const theme = useTheme();

  const toggleDrawer = () => {
    setOpen(!isDrawerOpen);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        p: 3,
        minHeight: '100vh',
        backgroundColor: theme.palette.background.default,
        transition: 'background-color 0.2s ease-in-out',
      }}
    >
      <Box
        component="div"
        sx={{
          backgroundColor: theme.palette.background.content,
          borderRadius: 2,
          p: 3,
          minHeight: 'calc(100vh - 64px)', // Adjust based on your header height
          mt: 8, // Space for fixed header
          transition: 'background-color 0.2s ease-in-out',
        }}
      >
        <div className="app-wrapper" style={{ display: 'flex' }}>
          <CssBaseline />
          <div className="app-header">
            <Header
              isDrawerOpen={isDrawerOpen}
              toggleDrawer={toggleDrawer}
              anchorEl={anchorEl}
              handleMenuOpen={handleMenuOpen}
              handleMenuClose={handleMenuClose}
            />
          </div>

          <div className="app-sidebar">
            <Sidebar isDrawerOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />
          </div>

          <div className={styles['app-content']}>
            <MainContent isDrawerOpen={isDrawerOpen}>{children}</MainContent>
          </div>
        </div>
      </Box>
    </Box>
  );
};

export default LayoutAdmin;
