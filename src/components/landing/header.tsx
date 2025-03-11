import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Image from 'next/image';
import React from 'react';
import { Box, Typography, Container } from '@mui/material';

export default function Header() {
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: '#1f2937',
        color: 'white',
      }}
    >
      <Container>
        <Toolbar>
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <Image
              src="/logo.svg"
              alt="Marlon Maniti Logo"
              width={50}
              height={50}
            />
            <Typography
              variant="h6"
              component="div"
              sx={{ ml: 2, color: 'white' }}
            >
              Reacterial
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 3 }}>
            <Typography
              variant="body1"
              component="a"
              href="https://github.com/nolrm/reacterial"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ color: 'inherit', textDecoration: 'none' }}
            >
              Github
            </Typography>
            <Typography
              variant="body1"
              component="a"
              href="/login"
              sx={{ color: 'inherit', textDecoration: 'none' }}
            >
              Login
            </Typography>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
