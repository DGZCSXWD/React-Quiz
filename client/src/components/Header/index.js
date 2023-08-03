import React from 'react';
//import { Link } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import Auth from '../../utils/auth';

const Header = () => {
  const navigate = useNavigate();
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
    navigate("/")
  };
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Box display="flex" flexGrow={1}>
          <RouterLink to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Typography variant="h6">
              Workout Tracker
            </Typography>
            <Typography variant="subtitle1">
              Shape Your Future, Start Today!
            </Typography>
          </RouterLink>
        </Box>
        <Box>
          {Auth.loggedIn() ? (
            <>
              <Button variant="contained" color="secondary" component={RouterLink} to="/me" style={{ margin: '0.5rem' }}>
                {Auth.getProfile().data.username}'s Record
              </Button>
              <Button variant="outlined" color="inherit" onClick={logout} style={{ margin: '0.5rem' }}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button variant="contained" color="secondary" component={RouterLink} to="/login" style={{ margin: '0.5rem' }}>
                Login
              </Button>
              <Button variant="outlined" color="inherit" component={RouterLink} to="/signup" style={{ margin: '0.5rem' }}>
                Signup
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
