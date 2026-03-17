import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Tooltip,
} from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import {
  AccountCircle,
  Settings,
  AttachMoney,
  Help,
  PriceCheck,
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { signOut } from 'next-auth/react';
import { ProfileDropdown } from '@reacterial/ui';
import type { ProfileMenuItem } from '@reacterial/ui';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme, selectTheme } from '@/redux/store';
import type { RootState } from '@/redux/store';
import WbSunnyRoundedIcon from '@mui/icons-material/WbSunnyRounded';
import NightlightRoundIcon from '@mui/icons-material/NightlightRound';

const drawerWidth: number = 240;

const menuGroups: ProfileMenuItem[][] = [
  [
    {
      label: 'My Profile',
      href: '/admin/profile',
      icon: <AccountCircle sx={{ mr: 2 }} />,
    },
    {
      label: 'Settings',
      href: '/admin/settings',
      icon: <Settings sx={{ mr: 2 }} />,
    },
    {
      label: 'Invoice',
      href: '/admin/invoice',
      icon: <AttachMoney sx={{ mr: 2 }} />,
      badge: 3,
    },
  ],
  [
    { label: 'FAQ', href: '/admin/faq', icon: <Help sx={{ mr: 2 }} /> },
    {
      label: 'Pricing',
      href: '/admin/pricing',
      icon: <PriceCheck sx={{ mr: 2 }} />,
    },
  ],
];

const Header: React.FC<{
  isDrawerOpen: boolean;
  toggleDrawer: () => void;
  anchorEl: null | HTMLElement;
  handleMenuOpen: (event: React.MouseEvent<HTMLElement>) => void;
  handleMenuClose: () => void;
}> = ({ isDrawerOpen, toggleDrawer }) => {
  const dispatch = useDispatch();
  const themeMode = useSelector(selectTheme);
  const theme = useTheme();
  const user = useSelector((state: RootState) => state.user);

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
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Tooltip
            title={`Switch to ${themeMode === 'light' ? 'dark' : 'light'} mode`}
          >
            <IconButton
              onClick={() => dispatch(toggleTheme())}
              color="inherit"
              size="large"
              sx={{
                transition: 'transform 0.3s ease-in-out',
                '&:hover': { transform: 'rotate(30deg)' },
              }}
            >
              {themeMode === 'light' ? (
                <NightlightRoundIcon sx={{ fontSize: 24 }} />
              ) : (
                <WbSunnyRoundedIcon sx={{ fontSize: 24 }} />
              )}
            </IconButton>
          </Tooltip>
          <Box>
            <ProfileDropdown
              user={user}
              onSignOut={() => signOut()}
              menuGroups={menuGroups}
            />
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
