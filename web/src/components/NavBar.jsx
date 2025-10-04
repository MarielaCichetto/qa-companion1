import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import useAuth from '../hooks/useAuth';

const NavBar = () => {
  const { logout } = useAuth();

  return (
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          QA Companion
        </Typography>
        <Button color="primary" variant="outlined" onClick={logout}>
          Salir
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
