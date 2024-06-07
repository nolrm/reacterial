import { signIn } from 'next-auth/react';
import { Button, Container, Typography } from '@mui/material';
import { NextPage } from 'next';

const SignIn: NextPage = () => {
    return (
        <Container maxWidth="sm">
            <Typography variant="h4" component="h1" gutterBottom>
                Sign In
            </Typography>
            <Button variant="contained" color="primary" onClick={() => signIn('google')}>
                Sign in with Google
            </Button>
        </Container>
    );
};

export default SignIn;