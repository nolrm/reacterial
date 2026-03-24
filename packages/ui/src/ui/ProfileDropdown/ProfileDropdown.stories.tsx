import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import React from 'react';
import ProfileDropdown from './ProfileDropdown';

const meta: Meta<typeof ProfileDropdown> = {
  title: 'UI/ProfileDropdown',
  component: ProfileDropdown,
  tags: ['autodocs'],
  args: {
    onSignOut: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof ProfileDropdown>;

export const Default: Story = {
  args: {
    user: {
      name: 'Jane Doe',
      email: 'jane@example.com',
      image: null,
    },
    menuGroups: [
      [
        {
          label: 'Profile',
          href: '/admin/profile',
          icon: <PersonIcon sx={{ mr: 2 }} />,
        },
        {
          label: 'Settings',
          href: '/admin/settings',
          icon: <SettingsIcon sx={{ mr: 2 }} />,
          badge: 3,
        },
      ],
    ],
  },
};

export const NoAvatar: Story = {
  args: {
    user: {
      name: 'Jane Doe',
      email: 'jane@example.com',
      image: null,
    },
    menuGroups: [],
  },
};

export const NoMenuGroups: Story = {
  args: {
    user: {
      name: 'Jane Doe',
      email: 'jane@example.com',
      image: null,
    },
  },
};
