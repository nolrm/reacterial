import React from 'react';
import { Alert } from '@mui/material';
interface RtErrorProps {
  message: string | null;
}

const RtError: React.FC<RtErrorProps> = ({ message }) => {
  return message ? (
    <Alert severity="error" sx={{ mt: 2 }}>
      {message}
    </Alert>
  ) : null;
};

export default RtError;
