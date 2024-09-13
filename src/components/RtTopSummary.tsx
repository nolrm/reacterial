import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Divider,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import PagesIcon from '@mui/icons-material/Pages';
import WalletIcon from '@mui/icons-material/AccountBalanceWallet';
import MoneyIcon from '@mui/icons-material/AttachMoney';

const RtTopSummary: React.FC = () => {
  return (
    <Card sx={{ mb: 6 }}>
      <CardContent sx={{ padding: '24px' }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          flexWrap="wrap"
          sx={{ gap: 4 }}
        >
          {/* Clients */}
          <Box sx={{ flex: 1, textAlign: 'center', paddingBottom: 2 }}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box>
                <Typography variant="h4" sx={{ mb: 0 }}>
                  24
                </Typography>
                <Typography variant="body1">Clients</Typography>
              </Box>
              <Avatar sx={{ backgroundColor: '#f0eff0' }}>
                <PersonIcon sx={{ color: '#3b4056' }} />
              </Avatar>
            </Box>
          </Box>

          {/* Divider */}
          <Divider
            orientation="vertical"
            flexItem
            sx={{ display: { xs: 'none', sm: 'block' } }}
          />

          {/* Invoices */}
          <Box sx={{ flex: 1, textAlign: 'center', paddingBottom: 2 }}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box>
                <Typography variant="h4" sx={{ mb: 0 }}>
                  165
                </Typography>
                <Typography variant="body1">Invoices</Typography>
              </Box>
              <Avatar sx={{ backgroundColor: '#f0eff0' }}>
                <PagesIcon sx={{ color: '#3b4056' }} />
              </Avatar>
            </Box>
          </Box>

          {/* Divider */}
          <Divider
            orientation="vertical"
            flexItem
            sx={{ display: { xs: 'none', sm: 'block' } }}
          />

          {/* Paid */}
          <Box sx={{ flex: 1, textAlign: 'center', paddingBottom: 2 }}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box>
                <Typography variant="h4" sx={{ mb: 0 }}>
                  $2.46k
                </Typography>
                <Typography variant="body1">Paid</Typography>
              </Box>
              <Avatar sx={{ backgroundColor: '#f0eff0' }}>
                <WalletIcon sx={{ color: '#3b4056' }} />
              </Avatar>
            </Box>
          </Box>

          {/* Divider */}
          <Divider
            orientation="vertical"
            flexItem
            sx={{ display: { xs: 'none', sm: 'block' } }}
          />

          {/* Unpaid */}
          <Box sx={{ flex: 1, textAlign: 'center', paddingBottom: 2 }}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box>
                <Typography variant="h4" sx={{ mb: 0 }}>
                  $876
                </Typography>
                <Typography variant="body1">Unpaid</Typography>
              </Box>
              <Avatar sx={{ backgroundColor: '#f0eff0' }}>
                <MoneyIcon sx={{ color: '#3b4056' }} />
              </Avatar>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default RtTopSummary;
