import withAuth from '../components/withAuth';
import { useSession, signIn, signOut } from 'next-auth/react';
import { Typography, Button, Container } from '@mui/material';

const HomePage = () => {
    const { data: session, status } = useSession();

    return (
        <Container>
            <Typography variant="h4">Welcome to the Home Page</Typography>
            <Typography variant="h6">Signed in as {session?.user?.name}</Typography>
            <Button onClick={() => signOut()}>Sign out</Button>
            {/* Add your admin dashboard components here */}
        </Container>
    );
};

export default withAuth(HomePage);