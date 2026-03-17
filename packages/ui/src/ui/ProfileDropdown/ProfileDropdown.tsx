import React, { useState } from 'react';
import {
  Menu,
  MenuItem,
  Avatar,
  IconButton,
  Typography,
  Divider,
  Badge,
} from '@mui/material';
import { Logout } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

export type ProfileMenuItem = {
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: number;
};

export type ProfileDropdownProps = {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
  onSignOut: () => void;
  /** Each array is a group of items separated by a divider */
  menuGroups?: ProfileMenuItem[][];
};

const StyledMenu = styled(Menu)({
  '& .MuiMenu-paper': {
    width: 250,
  },
});

const fallbackAvatar = '//ionicframework.com/docs/img/demos/avatar.svg';

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({
  user,
  onSignOut,
  menuGroups = [],
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const userImg = user.image ?? fallbackAvatar;

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
            '& .MuiMenuItem-root': { px: 2, py: 1 },
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

        {menuGroups.map((group, groupIndex) => (
          <React.Fragment key={groupIndex}>
            <Divider />
            {group.map((item) => (
              <MenuItem key={item.href} component="a" href={item.href}>
                {item.icon}
                {item.badge !== undefined ? (
                  <div style={{ position: 'relative', width: '100%' }}>
                    {item.label}
                    <Badge
                      badgeContent={item.badge}
                      color="error"
                      sx={{ position: 'absolute', right: 10, top: '50%' }}
                    />
                  </div>
                ) : (
                  item.label
                )}
              </MenuItem>
            ))}
          </React.Fragment>
        ))}

        <Divider />
        <MenuItem onClick={onSignOut}>
          <Logout sx={{ mr: 2 }} />
          Logout
        </MenuItem>
      </StyledMenu>
    </>
  );
};

export default ProfileDropdown;
