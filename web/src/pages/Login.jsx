import { useState } from 'react';
import { Container, Paper, Typography, TextField, Button, Stack } from '@mui/material';
import useAuth from '../hooks/useAuth';

const Login = () => {
  const { login } = useAuth();
  const [credentials, setCredentials] = useState({ username: '', password: '' });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    login(credentials);
  };

  return (
    <Container maxWidth="sm" sx={{ display: 'flex', alignItems: 'center', height: '100vh' }}>
      <Paper elevation={3} sx={{ p: 4, width: '100%' }}>
        <Typography variant="h5" gutterBottom>
          QA Companion
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Inicia sesión para gestionar tus pruebas rápidamente.
        </Typography>
        <Stack component="form" spacing={2} onSubmit={handleSubmit}>
          <TextField label="Usuario" name="username" value={credentials.username} onChange={handleChange} required />
          <TextField
            label="Contraseña"
            name="password"
            type="password"
            value={credentials.password}
            onChange={handleChange}
            required
          />
          <Button variant="contained" type="submit">
            Ingresar
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
};

export default Login;
