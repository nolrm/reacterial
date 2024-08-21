import React from 'react';
import LayoutAdmin from '@/components/LayoutAdmin';
import Typography from '@mui/material/Typography';


const ProfilePage: React.FC = () => {
    return (
        <LayoutAdmin>
            <Typography variant="h4" component="h1" gutterBottom>
                Welcome to the Profile page
            </Typography>
            <Typography paragraph>
                This is the profile page content.
            </Typography>
        </LayoutAdmin>
    );
};

export default ProfilePage;