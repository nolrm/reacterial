import { getProviders, signIn } from 'next-auth/react';
import { Button, Container, Typography, Box, TextField, Paper } from '@mui/material';

const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    minHeight: '100vh',
    paddingBottom: '50px'
};

export default function LoginPage({ providers }) {
    const handleSubmit = async (event) => {
        event.preventDefault();
        const username = event.target.username.value;
        const password = event.target.password.value;

        const res = await signIn('credentials', {
            redirect: true,
            username,
            password,
            callbackUrl: '/admin'
        });

        if (res?.error) {
            alert('Login failed! Please check your credentials.');
        } else {
            window.location.href = res.url; // Redirect to home or a protected page after successful login
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <div style={containerStyle}>
                <Paper elevation={0} style={{padding: '40px 40px 30px', border: '1px solid #dfdfdf', borderRadius: '16px'}}>
                    <Typography component="h1" variant="h5" align="center">
                        Welcome to Reacterial!
                    </Typography>

                    {Object.values(providers).map((provider) => (
                        provider.name === 'Credentials' ? (
                            <form onSubmit={handleSubmit} method="post" key={provider.id}>
                                <input name="csrfToken" type="hidden" defaultValue={provider.csrfToken} />
                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <div>
                                        Admin / Admin
                                    </div>
                                    <TextField name="username" type="text" placeholder="Username" fullWidth margin="normal" />
                                    <TextField name="password" type="password" placeholder="Password" fullWidth margin="normal" />
                                    <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                                        Sign in with Credentials
                                    </Button>
                                </Box>
                            </form>
                        ) : (
                            <Box mt={4} mb={2} key={provider.id}>
                                <p style={{marginBottom: '15px'}}>
                                    Sign in using your google account
                                </p>

                                <Button
                                    fullWidth
                                    variant="outlined"
                                    color="primary"
                                    onClick={() => signIn('google', {callbackUrl: `${window.location.origin}/admin`})}
                                >
                                    Sign in with {provider.name}
                                </Button>
                                {/*onClick={() => signIn(provider.id)}*/}
                            </Box>
                        )
                    ))}


                </Paper>
            </div>
        </Container>
    );
}

export async function getServerSideProps(context) {
    const providers = await getProviders();
    const session = await getSession(context);
    if (session) {
        return {
            redirect: { destination: '/' },
        };
    }
    return {
        props: { providers },
    };
}