import React from 'react';
//import { Link } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@material-ui/core';
import Auth from '../../utils/auth';

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    // <header className="bg-primary text-light mb-4 py-3 flex-row align-center">
    //   <div className="container flex-row justify-space-between-lg justify-center align-center">
    //     <div>
    //       <Link className="text-light" to="/">
    //         <h1 className="m-0">Workout Planner</h1>
    //       </Link>
    //       <p className="m-0">Shape Your Future, Start Today!</p>
    //     </div>
    //     <div>
    //       {Auth.loggedIn() ? (
    //         <>
    //           <Link className="btn btn-lg btn-info m-2" to="/me">
    //             {Auth.getProfile().data.username}'s Record
    //           </Link>
    //           <button className="btn btn-lg btn-light m-2" onClick={logout}>
    //             Logout
    //           </button>
    //         </>
    //       ) : (
    //         <>
    //           <Link className="btn btn-lg btn-info m-2" to="/login">
    //             Login
    //           </Link>
    //           <Link className="btn btn-lg btn-light m-2" to="/signup">
    //             Signup
    //           </Link>
    //         </>
    //       )}
    //     </div>
    //   </div>
    // </header>
    <AppBar position="static" color="primary">
      <Toolbar>
        <Box display="flex" flexGrow={1}>
          <RouterLink to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Typography variant="h6">
              Workout Planner
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
