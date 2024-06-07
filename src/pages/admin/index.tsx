import React from 'react';
import withAuth from '@/components/withAuth';
import LayoutAdmin from '@/components/layout-admin';
import Typography from '@mui/material/Typography';


const DashboardPage: React.FC = () => {
    return (
        <LayoutAdmin>
            <Typography variant="h4" component="h1" gutterBottom>
                Welcome to the Admin Dashboard
            </Typography>
            <Typography paragraph>
                This is the home page content.
            </Typography>
        </LayoutAdmin>
    );
};

export default withAuth(DashboardPage);