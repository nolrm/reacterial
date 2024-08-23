import { useState } from 'react';
import { GetServerSideProps } from 'next';
import { getSession, getProviders, ClientSafeProvider, signIn } from 'next-auth/react';
import { Button, Container, Typography, Box, TextField, Paper, Alert } from '@mui/material';
import RtError from '@/components/RtError';
import LoginForm from '../components/login/LoginForm';


const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    minHeight: '100vh',
    paddingBottom: '50px'
};

interface SignInProps {
    providers: Record<string, ClientSafeProvider> | null;
    session: any;
}

export const getServerSideProps: GetServerSideProps<SignInProps> = async (context) => {
    const providers = await getProviders();
    const session = await getSession(context);

    if (session) {
        return {
            redirect: {
                destination: '/admin',
                permanent: false,
            },
        };
    }

    return {
        props: {
            providers: providers || null,
            session: session || null,
        },
    };
};

const LoginPage = ({ providers }: SignInProps) => {
    const [error, setError] = useState<string | null>(null);

    return (
        <Container component="main" maxWidth="xs">
            <div style={containerStyle}>
                <Paper elevation={0} style={{ padding: '40px 40px 30px', border: '1px solid #dfdfdf', borderRadius: '16px' }}>
                    <Typography component="h1" variant="h5" align="center">
                        Welcome to Reacterial!
                        <div>
                            <small>U: admin / PW: admin</small>
                        </div>

                    </Typography>

                    <RtError message={error} />

                    {providers &&
                        Object.values(providers).map((provider) =>
                            provider.name === 'Credentials' ? (
                                <LoginForm key={provider.id} setError={setError} />
                            ) : (
                                <Box mt={4} mb={2} key={provider.id}>
                                    <Typography variant="body1" gutterBottom>
                                        Sign in using your {provider.name} account
                                    </Typography>
                                    <Button
                                        fullWidth
                                        variant="outlined"
                                        color="primary"
                                        onClick={() => signIn(provider.id, { callbackUrl: `${window.location.origin}/admin` })}
                                    >
                                        Sign in with {provider.name}
                                    </Button>
                                </Box>
                            )
                        )}
                </Paper>
            </div>
        </Container>
    );
};

export default LoginPage;
