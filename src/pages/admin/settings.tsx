import React from 'react';
import LayoutAdmin from '@/layouts/LayoutAdmin';
import { Button, Typography, Box } from '@mui/material';
import { signOut } from 'next-auth/react';

const SettingsPage: React.FC = () => {
  return (
    <LayoutAdmin>
      <Typography variant="h4" component="h1" gutterBottom>
        Settings page
      </Typography>
      <Typography paragraph>This is the Settings page content.</Typography>
      <Box sx={{ p: 3 }}>
        <Button onClick={() => signOut()}>Sign out</Button>
      </Box>
    </LayoutAdmin>
  );
};

export default SettingsPage;
