import React, { useState } from 'react';
import {
  Menu,
  MenuItem,
  Avatar,
  IconButton,
  Typography,
  Divider,
  Badge,
  AppBar,
  Toolbar,
} from '@mui/material';
import {
  AccountCircle,
  Settings,
  AttachMoney,
  Help,
  PriceCheck,
  Logout,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { signOut } from 'next-auth/react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

const drawerWidth = 240;

const StyledMenu = styled(Menu)(({ theme }) => ({
  '& .MuiMenu-paper': {
    width: 250,
  },
}));

const RTProfileDropdown: React.FC = () => {
  const user = useSelector((state: RootState) => state.user);
  const userImg =
    user.image || '//ionicframework.com/docs/img/demos/avatar.svg';

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        edge="end"
        aria-haspopup="true"
        onClick={handleClick}
        color="inherit"
      >
        <Avatar alt="User Avatar" src={userImg} />
      </IconButton>

      <StyledMenu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.1))',
            mt: 1.5,
            '& .MuiMenuItem-root': {
              px: 2,
              py: 1,
            },
          },
        }}
      >
        <MenuItem>
          <Avatar src={userImg} sx={{ mr: 2 }}>
            U
          </Avatar>
          <div>
            <Typography variant="subtitle1">{user.name}</Typography>
            <Typography variant="body2" color="textSecondary">
              {user.email}
            </Typography>
          </div>
        </MenuItem>
        <Divider />
        <MenuItem component="a" href="/admin/profile">
          <AccountCircle sx={{ mr: 2 }} />
          My Profile
        </MenuItem>
        <MenuItem component="a" href="/admin/settings">
          <Settings sx={{ mr: 2 }} />
          Settings
        </MenuItem>
        <MenuItem component="a" href="/admin/billing">
          <AttachMoney sx={{ mr: 2 }} />
          <div style={{ position: 'relative', width: '100%' }}>
            Billing
            <Badge
              badgeContent={3}
              color="error"
              sx={{ position: 'absolute', right: 10, top: '50%' }}
            />
          </div>
        </MenuItem>
        <Divider />
        <MenuItem component="a" href="/admin/faq">
          <Help sx={{ mr: 2 }} />
          FAQ
        </MenuItem>
        <MenuItem component="a" href="/admin/pricing">
          <PriceCheck sx={{ mr: 2 }} />
          Pricing
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => signOut()}>
          <Logout sx={{ mr: 2 }} />
          Logout
        </MenuItem>
      </StyledMenu>
    </>
  );
};

export default RTProfileDropdown;
