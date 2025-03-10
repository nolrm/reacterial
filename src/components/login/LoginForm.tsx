import React from 'react';
import { Box, TextField, Button } from '@mui/material';
import { signIn } from 'next-auth/react';

interface LoginProps {
  setError: (message: string | null) => void;
}

const LoginForm: React.FC<LoginProps> = ({ setError }) => {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const email = (event.currentTarget.email as HTMLInputElement).value;
    const password = (event.currentTarget.password as HTMLInputElement).value;

    setError(null);

    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
        callbackUrl: '/admin',
      });

      if (result?.error) {
        setError(
          'Login failed! Please use the email: admin@reacterial.com and the password: admin123'
        );
      } else if (result?.url) {
        window.location.href = result.url;
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } catch (error) {
      setError('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} method="post">
      <Box
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <TextField
          name="email"
          type="text"
          placeholder="Email"
          fullWidth
          margin="normal"
        />
        <TextField
          name="password"
          type="password"
          placeholder="Password"
          fullWidth
          margin="normal"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Sign in with Credentials
        </Button>
      </Box>
    </form>
  );
};

export default LoginForm;
