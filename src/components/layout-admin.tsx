import withAuth from '@/components/withAuth';
import React, { useState, ReactNode } from 'react';
import { useRouter } from 'next/router';
import { Box, Avatar, Menu, MenuItem, AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemIcon, ListItemText, CssBaseline, Container, IconButton } from '@mui/material';
import { Dashboard as DashboardIcon, AccountCircle as AccountCircleIcon, Settings as SettingsIcon, Menu as MenuIcon, ChevronLeft as ChevronLeftIcon } from '@mui/icons-material';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';

const drawerWidth: number = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })< { open?: boolean }>(({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

interface LayoutProps {
    children: ReactNode;
}


const LayoutAdmin: React.FC<LayoutProps> = ({ children }) => {
    const [open, setOpen] = useState<boolean>(true);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const theme = useTheme<Theme>();
    const router = useRouter();

    const toggleDrawer = () => {
        setOpen(!open);
    };


    const handleMenuOpen = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleRedirectClick = (link) => {
        router.push(link);
    };

    const menuId = 'primary-search-account-menu';

    return (
        <div style={{display: 'flex'}}>
            <CssBaseline/>
            <AppBar position="fixed" sx={{
                zIndex: theme.zIndex.drawer + 1,
                transition: theme.transitions.create(['width', 'margin'], {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen
                })
            }}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={toggleDrawer}
                        edge="start"
                        sx={{ marginRight: 2, ...(open && { display: 'none' }) }}
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
                            <Avatar alt="User Avatar" src="/static/images/avatar/1.jpg" />
                        </IconButton>
                        <Menu
                            id={menuId}
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorEl)}
                            onClose={toggleDrawer}
                        >
                            <MenuItem onClick={handleRedirectClick('/admin/profile')}>Profile</MenuItem>
                            <MenuItem onClick={handleRedirectClick('/admin/profile')}>My account</MenuItem>
                            <MenuItem>Logout</MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader>
                    <IconButton onClick={toggleDrawer}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon/> : <ChevronLeftIcon/>}
                    </IconButton>
                </DrawerHeader>
                <List>
                    <ListItem button onClick={handleRedirectClick('/admin')}>
                        <ListItemIcon><DashboardIcon/></ListItemIcon>
                        <ListItemText primary="Dashboard"/>
                    </ListItem>
                    <ListItem button onClick={handleRedirectClick('/admin/profile')}>
                        <ListItemIcon><AccountCircleIcon/></ListItemIcon>
                        <ListItemText primary="Profile"/>
                    </ListItem>
                    <ListItem button onClick={handleRedirectClick('/admin/settings')}>
                        <ListItemIcon><SettingsIcon/></ListItemIcon>
                        <ListItemText primary="Settings"/>
                    </ListItem>
                </List>
            </Drawer>
            <Main open={open}>
                <DrawerHeader/>
                <Container maxWidth="lg">
                    {children}
                </Container>
            </Main>
        </div>
    );
};

LayoutAdmin.displayName = 'Layout';
export default withAuth(LayoutAdmin);