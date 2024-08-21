import React from 'react';
import Link from 'next/link';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton } from '@mui/material';
import { ChevronLeft as ChevronLeftIcon, Dashboard as DashboardIcon, AccountCircle as AccountCircleIcon, Settings as SettingsIcon, BarChart as BarChart } from '@mui/icons-material';
import { styled, useTheme } from '@mui/material/styles';
import Image from 'next/image';

const drawerWidth: number = 240;

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

const Sidebar: React.FC<{ isDrawerOpen: boolean; toggleDrawer: () => void; }> = ({ isDrawerOpen, toggleDrawer }) => {
    const theme = useTheme();

    return (
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
            open={isDrawerOpen}
        >
            <DrawerHeader className="sidebar-header">
                <Link className="logo" href="/admin">
                    <Image src="/logo.svg" alt="Marlon Maniti Logo" width={50} height={50} />
                </Link>
                <IconButton onClick={toggleDrawer}>
                    {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronLeftIcon />}
                </IconButton>
            </DrawerHeader>
            <List>
                <ListItem button component="a" href="/admin">
                    <ListItemIcon><DashboardIcon /></ListItemIcon>
                    <ListItemText primary="Dashboard" />
                </ListItem>
                <ListItem button component="a" href="/admin/profile">
                    <ListItemIcon><AccountCircleIcon /></ListItemIcon>
                    <ListItemText primary="Profile" />
                </ListItem>
                <ListItem button component="a" href="/admin/settings">
                    <ListItemIcon><SettingsIcon /></ListItemIcon>
                    <ListItemText primary="Settings" />
                </ListItem>
                <ListItem button component="a" href="/admin/charts">
                    <ListItemIcon><BarChart /></ListItemIcon>
                    <ListItemText primary="Charts" />
                </ListItem>
            </List>
        </Drawer>
    );
};

export default Sidebar;
