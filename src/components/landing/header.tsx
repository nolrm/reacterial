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
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Image
              src="/logo.svg"
              alt="Marlon Maniti Logo"
              width={50}
              height={50}
            />
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, ml: 2 }}
            >
              Reacterial
            </Typography>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
