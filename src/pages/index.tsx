import { useSession, signIn, signOut } from 'next-auth/react';
import { Button, Typography } from '@mui/material';

const HomePage = () => {
    const { data: session, status } = useSession();

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Typography variant="h4">Welcome to the Home Page</Typography>
            {session ? (
                <>
                    <Typography variant="h6">Signed in as {session.user?.name}</Typography>
                    <Button onClick={() => signOut()}>Sign out</Button>
                </>
            ) : (
                <>
                    <Typography variant="h6">You are not signed in</Typography>
                    <Button onClick={() => signIn('google')}>Sign in with Google</Button>
                </>
            )}
        </div>
    );
};

export default HomePage;