import { Box, Typography, Container, Button } from '@mui/material';
import Link from 'next/link';

export default function Banner() {
    return (
        <Box
            sx={{
                height: '400px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                // backgroundColor: 'primary.main',
                // color: 'white',
                textAlign: 'center',
                padding: 2,
            }}
        >
            <Container>
                <Typography variant="h2" component="h1" gutterBottom>
                    Welcome to Reacterial
                </Typography>
                <Typography variant="h5" component="p" gutterBottom>
                    This project is a modern web application built with Next.js, React, and Material-UI (MUI), and is deployed on Vercel.
                </Typography>
                <Link href="/login" passHref>
                    <Button variant="contained" color="secondary" sx={{ mt: 2 }}>
                        Get Started
                    </Button>
                </Link>
            </Container>
        </Box>
    );
}
