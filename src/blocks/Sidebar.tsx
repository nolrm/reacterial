import React from 'react';
import Link from 'next/link';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
} from '@mui/material';
import { ChevronLeft as ChevronLeftIcon } from '@mui/icons-material';
import { styled, useTheme } from '@mui/material/styles';
import Image from 'next/image';
import sidebarItems from '@/data/sidebarItems';

const drawerWidth: number = 240;

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const Sidebar: React.FC<{
  isDrawerOpen: boolean;
  toggleDrawer: () => void;
}> = ({ isDrawerOpen, toggleDrawer }) => {
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
      <DrawerHeader>
        <div className="sidebar-header">
          <Link className="logo" href="/admin">
            <Image
              src="/logo.svg"
              alt="Marlon Maniti Logo"
              width={50}
              height={50}
            />
          </Link>
          <IconButton onClick={toggleDrawer}>
            {theme.direction === 'ltr' ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
      </DrawerHeader>
      <List>
        {sidebarItems.map((item) => (
          <ListItem button component="a" href={item.link} key={item.text}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
