import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box, Avatar, Menu, MenuItem } from '@mui/material';
import { Menu as MenuIcon, ChevronLeft as ChevronLeftIcon } from '@mui/icons-material';
import { styled, useTheme } from '@mui/material/styles';
import { useRouter } from 'next/router';
import { signOut } from "next-auth/react";

const drawerWidth: number = 240;

const Header: React.FC<{ isDrawerOpen: boolean; toggleDrawer: () => void; anchorEl: null | HTMLElement; handleMenuOpen: (event: React.MouseEvent<HTMLElement>) => void; handleMenuClose: () => void; }> = ({ isDrawerOpen, toggleDrawer, anchorEl, handleMenuOpen, handleMenuClose }) => {
    const theme = useTheme();
    const router = useRouter();
    const menuId = 'primary-search-account-menu';

    const handleRedirectClick = (link: string) => {
        router.push(link);
    };

    return (
        <AppBar position="fixed" sx={{
            zIndex: theme.zIndex.drawer + 1,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            boxShadow: '0',
            borderBottom: '1px solid #333',
            backgroundColor: theme.palette.background.default,
            width: isDrawerOpen ? `calc(100% - ${drawerWidth}px)` : '100%'
        }}>
            <Toolbar>
                <IconButton
                    aria-label="open drawer"
                    onClick={toggleDrawer}
                    edge="start"
                    sx={{ marginRight: 2 }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
                    Admin Dashboard
                </Typography>
                <Box>
                    <IconButton
                        edge="end"
                        aria-label="account of current user"
                        aria-controls={menuId}
                        aria-haspopup="true"
                        onClick={handleMenuOpen}
                        color="inherit"
                    >
                        <Avatar alt="User Avatar" src="//ionicframework.com/docs/img/demos/avatar.svg" />
                    </IconButton>
                    <Menu
                        id={menuId}
                        anchorEl={anchorEl}
                        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                        keepMounted
                        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                    >
                        <MenuItem onClick={() => handleRedirectClick('/admin/profile')}>Profile</MenuItem>
                        <MenuItem onClick={() => handleRedirectClick('/admin/profile')}>My account</MenuItem>
                        <MenuItem onClick={() => signOut()}>Logout</MenuItem>
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
