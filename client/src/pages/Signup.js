import React, { useState } from 'react';
import { Link as RouterLink} from 'react-router-dom';
import { Box, Card, CardHeader, CardContent, TextField, Button, Typography } from '@material-ui/core';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';

import Auth from '../utils/auth';

const Signup = () => {
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    // <main className="flex-row justify-center mb-4">
    //   <div className="col-12 col-lg-10">
    //     <div className="card">
    //       <h4 className="card-header bg-dark text-light p-2">Sign Up</h4>
    //       <div className="card-body">
    //         {data ? (
    //           <p>
    //             Success! You may now head{' '}
    //             <Link to="/">back to the homepage.</Link>
    //           </p>
    //         ) : (
    //           <form onSubmit={handleFormSubmit}>
    //             <input
    //               className="form-input"
    //               placeholder="Your username"
    //               name="username"
    //               type="text"
    //               value={formState.name}
    //               onChange={handleChange}
    //             />
    //             <input
    //               className="form-input"
    //               placeholder="Your email"
    //               name="email"
    //               type="email"
    //               value={formState.email}
    //               onChange={handleChange}
    //             />
    //             <input
    //               className="form-input"
    //               placeholder="******"
    //               name="password"
    //               type="password"
    //               value={formState.password}
    //               onChange={handleChange}
    //             />
    //             <button
    //               className="btn btn-block btn-primary"
    //               style={{ cursor: 'pointer' }}
    //               type="submit"
    //             >
    //               Submit
    //             </button>
    //           </form>
    //         )}

    //         {error && (
    //           <div className="my-3 p-3 bg-danger text-white">
    //             {error.message}
    //           </div>
    //         )}
    //       </div>
    //     </div>
    //   </div>
    // </main>
    <Box
  display="flex"
  alignItems="center"
  justifyContent="center"
  height="100vh"
  width="100%"
>
  <Box sx={{ width: { xs: '100%', sm: '80%', md: '60%', lg: '50%' } }}>
    <Card>
      <CardHeader title="Sign Up" style={{ backgroundColor: '#3f51b5', color: '#fff' }}/>
      <CardContent>
        {data ? (
          <Typography>
            Success! You may now head{' '}
            <RouterLink to="/">back to the homepage.</RouterLink>
          </Typography>
        ) : (
          <form onSubmit={handleFormSubmit}>
            <TextField
              fullWidth
              margin="normal"
              label="Your Username"
              name="username"
              type="text"
              value={formState.name}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Your Email"
              name="email"
              type="email"
              value={formState.email}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Password"
              name="password"
              type="password"
              value={formState.password}
              onChange={handleChange}
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              style={{ cursor: 'pointer', marginTop: '1rem' }}
              type="submit"
            >
              Submit
            </Button>
          </form>
        )}

        {error && (
          <Box sx={{ my: 2, p: 2, bgcolor: 'error.main', color: '#fff' }}>
            {error.message}
          </Box>
        )}
      </CardContent>
    </Card>
  </Box>
</Box>
  );
};

export default Signup;
