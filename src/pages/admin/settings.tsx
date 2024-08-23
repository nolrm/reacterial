import React from 'react';
import LayoutAdmin from '@/layouts/LayoutAdmin';
import { Button, Typography } from '@mui/material';
import { signOut } from 'next-auth/react';


const SettingsPage: React.FC = () => {
    return (
        <LayoutAdmin>
            <Typography variant="h4" component="h1" gutterBottom>
                Settings page
            </Typography>
            <Typography paragraph>
                This is the Settings page content.
            </Typography>
            <Button onClick={() => signOut()}>Sign out</Button>
        </LayoutAdmin>
    );
};

export default SettingsPage;