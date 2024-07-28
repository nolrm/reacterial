import { Box, Typography, Container } from '@mui/material';

export default function Footer() {
    return (
        <Box
            sx={{
                backgroundColor: '#1f2937',
                color: 'white',
                textAlign: 'center',
                py: 3,
            }}
        >
            <Container>
                <Typography variant="body1">
                    © 2024 My Company. All rights reserved.
                </Typography>
            </Container>
        </Box>
    );
}