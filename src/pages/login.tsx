import withAuth from '../components/withAuth';
import { Button, Container, Typography, Box, TextField, Grid, Paper } from '@mui/material';
import {signIn, signOut} from 'next-auth/react';

const LoginPage = () => {
    return (
    <Container component="main" maxWidth="xs">
        <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
            <Typography component="h1" variant="h5" align="center">
                Sign In
            </Typography>


            {/*<Button variant="contained" color="primary" onClick={() => signIn('google')}>*/}
            {/*    Sign in with Google*/}
            {/*</Button>*/}

            <Box mt={2}>
                <Button
                    fullWidth
                    variant="outlined"
                    color="primary"
                    onClick={() => signIn('google', { callbackUrl: `${window.location.origin}/admin` })}
                >
                    Sign In with Google
                </Button>
            </Box>
        </Paper>
    </Container>
    );
};

export default withAuth(LoginPage);