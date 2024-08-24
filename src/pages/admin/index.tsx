import React from 'react';
import { useSession } from 'next-auth/react';
import LayoutAdmin from '@/layouts/LayoutAdmin';
import Typography from '@mui/material/Typography';

const DashboardPage: React.FC = () => {
  const { data: session, status } = useSession();

  console.log('session', session);
  console.log('status', status);

  return (
    <LayoutAdmin>
      <Typography variant="h4" component="h1" gutterBottom>
        Welcome to the Admin Dashboard
      </Typography>
      <p>This is the home page content.</p>
      <div className="test">Welcome, {session?.user?.name}!</div>
    </LayoutAdmin>
  );
};

export default DashboardPage;
