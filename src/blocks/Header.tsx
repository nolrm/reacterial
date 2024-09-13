import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Avatar,
  Menu,
  MenuItem,
} from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/router';
import { signOut } from 'next-auth/react';
import RtProfileDropdown from '@/components/RtProfileDropdown';

const drawerWidth: number = 240;

const Header: React.FC<{
  isDrawerOpen: boolean;
  toggleDrawer: () => void;
  anchorEl: null | HTMLElement;
  handleMenuOpen: (event: React.MouseEvent<HTMLElement>) => void;
  handleMenuClose: () => void;
}> = ({
  isDrawerOpen,
  toggleDrawer,
  anchorEl,
  handleMenuOpen,
  handleMenuClose,
}) => {
  const theme = useTheme();

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        boxShadow: '0',
        borderBottom: '1px solid #0000001f',
        backgroundColor: theme.palette.background.default,
        width: isDrawerOpen ? `calc(100% - ${drawerWidth}px)` : '100%',
      }}
    >
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
          <RtProfileDropdown />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
