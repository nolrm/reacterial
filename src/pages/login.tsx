import { Button, Container, Typography, Box, TextField, Grid, Paper } from '@mui/material';
import {signIn, signOut} from 'next-auth/react';

const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    minHeight: '100vh',
    paddingBottom: '50px'
};

const LoginPage = () => {
    return (
    <Container component="main" maxWidth="xs">
        <div style={containerStyle}>
            <Paper elevation={0} style={{padding: '40px 40px 30px', border: '1px solid #dfdfdf', borderRadius: '16px'}}>
                <Typography component="h1" variant="h5" align="center">
                    Welcome to Reacterial!
                </Typography>

                <p style={{marginBottom: '30px'}}>
                    Sign in using your google account
                </p>


                {/*<Button variant="contained" color="primary" onClick={() => signIn('google')}>*/}
                {/*    Sign in with Google*/}
                {/*</Button>*/}

                <Box mt={2}>
                    <Button
                        fullWidth
                        variant="outlined"
                        color="primary"
                        onClick={() => signIn('google', {callbackUrl: `${window.location.origin}/admin`})}
                    >
                        Sign In with Google
                    </Button>
                </Box>
            </Paper>
        </div>
    </Container>
    );
};

export default LoginPage;