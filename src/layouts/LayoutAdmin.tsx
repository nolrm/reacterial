import React, { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Header from '@/blocks/Header';
import Sidebar from '@/blocks/Sidebar';
import MainContent from '@/blocks/MainContent';
import styles from './LayoutAdmin.module.css';

const LayoutAdmin: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDrawerOpen, setOpen] = useState<boolean>(true);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

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
  );
};

export default LayoutAdmin;
