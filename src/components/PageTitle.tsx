import { Typography, useTheme } from '@mui/material';
import { ReactNode } from 'react';

interface PageTitleProps {
  children: ReactNode;
  withDivider?: boolean;
}

export default function PageTitle({
  children,
  withDivider = true,
}: PageTitleProps) {
  const theme = useTheme();

  return (
    <Typography
      variant="h4"
      className="page-title"
      gutterBottom
      sx={{
        color: theme.palette.mode === 'light' ? '#2c3e50' : '#ecf0f1',
        position: 'relative',
        mb: withDivider ? 4 : 2,
        ...(withDivider && {
          '&::after': {
            content: '""',
            position: 'absolute',
            left: 0,
            bottom: -8,
            width: 50,
            height: 3,
            backgroundColor: theme.palette.primary.main,
            borderRadius: 1.5,
          },
        }),
      }}
    >
      {children}
    </Typography>
  );
}
