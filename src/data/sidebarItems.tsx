import React from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import BarChart from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';

interface SidebarItem {
  text: string;
  icon: React.ReactNode;
  link: string;
}

// Define and export the sidebar items array
const sidebarItems: SidebarItem[] = [
  {
    text: 'Dashboard',
    icon: <DashboardIcon />,
    link: '/admin',
  },
  {
    text: 'Profile',
    icon: <AccountCircleIcon />,
    link: '/admin/profile',
  },
  {
    text: 'Invoice',
    icon: <DescriptionIcon />,
    link: '/admin/invoice',
  },
  {
    text: 'Settings',
    icon: <SettingsIcon />,
    link: '/admin/settings',
  },
  {
    text: 'Charts',
    icon: <BarChart />,
    link: '/admin/charts',
  },
];

export default sidebarItems;
