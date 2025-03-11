import { Box, Typography, Container, Button } from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';

export default function Banner() {
  return (
    <Box
      className="landing-banner"
      sx={{
        maxWidth: '700px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 2,
        margin: '5em auto 10em',
        textAlign: 'center',
      }}
    >
      <Container>
        <Box
          sx={{
            maxWidth: '700px',
            margin: '0 auto',
          }}
        >
          <Typography variant="h2" component="h1" gutterBottom>
            Discover the Power of Reacterial
          </Typography>
          <Typography variant="h5" component="p" gutterBottom>
            This project is a modern web application built with Next.js, React,
            and Material-UI (MUI), and is deployed on Vercel.
          </Typography>
          <Link href="/login" passHref>
            <Button variant="contained" color="primary" sx={{ mt: 2 }}>
              Demo
            </Button>
          </Link>
        </Box>

        <Box
          sx={{
            marginTop: '10em',
          }}
        >
          <Image
            src="/reacterial.gif"
            alt="Reacterial Demo"
            layout="responsive"
            width={1200}
            height={500}
          />
        </Box>
      </Container>
    </Box>
  );
}
