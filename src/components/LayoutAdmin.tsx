import React, { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Header from './Header';
import Sidebar from './Sidebar';
import MainContent from './MainContent';

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
        <div style={{ display: 'flex' }}>
            <CssBaseline />
            <Header
                isDrawerOpen={isDrawerOpen}
                toggleDrawer={toggleDrawer}
                anchorEl={anchorEl}
                handleMenuOpen={handleMenuOpen}
                handleMenuClose={handleMenuClose}
            />
            <Sidebar
                isDrawerOpen={isDrawerOpen}
                toggleDrawer={toggleDrawer}
            />
            <MainContent isDrawerOpen={isDrawerOpen}>
                {children}
            </MainContent>
        </div>
    );
};

export default LayoutAdmin;
