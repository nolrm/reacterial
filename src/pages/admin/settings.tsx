import React from 'react';
import LayoutAdmin from '@/layouts/LayoutAdmin';
import { Button, Typography, Box, Card, CardContent, Switch, FormControlLabel } from '@mui/material';
import { signOut } from 'next-auth/react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme, selectTheme } from '@/redux/themeSlice';

const SettingsPage: React.FC = () => {
  const dispatch = useDispatch();
  const themeMode = useSelector(selectTheme);

  const handleThemeChange = () => {
    dispatch(toggleTheme());
  };

  return (
    <LayoutAdmin>
      <Typography variant="h4" component="h1" gutterBottom>
        Settings page
      </Typography>
      <Typography paragraph>This is the Settings page content.</Typography>
      <Button onClick={() => signOut()}>Sign out</Button>

      <Box sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Appearance
        </Typography>
        
        <Card>
          <CardContent>
            <FormControlLabel
              control={
                <Switch
                  checked={themeMode === 'dark'}
                  onChange={handleThemeChange}
                  name="themeMode"
                />
              }
              label="Dark Mode"
            />
          </CardContent>
        </Card>
      </Box>
    </LayoutAdmin>
  );
};

export default SettingsPage;
