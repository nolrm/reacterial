import React from 'react';
import LayoutAdmin from '@/components/layout-admin';
import Typography from '@mui/material/Typography';


const SettingsPage: React.FC = () => {
    return (
        <LayoutAdmin>
            <Typography variant="h4" component="h1" gutterBottom>
                Settings page
            </Typography>
            <Typography paragraph>
                This is the Settings page content.
            </Typography>
        </LayoutAdmin>
    );
};

export default SettingsPage;