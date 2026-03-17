import React from 'react';
import { Alert } from '@mui/material';

interface ErrorMessageProps {
  message: string | null;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return message ? (
    <Alert severity="error" sx={{ mt: 2 }}>
      {message}
    </Alert>
  ) : null;
};

export default ErrorMessage;
