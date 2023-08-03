import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Button, Typography, Box } from '@material-ui/core';

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <Box mt={4} py={4} bgcolor="secondary.main" color="background.paper" className="w-100">
      <Container className="text-center mb-5">
        {location.pathname !== '/' && (
          <Button
            variant="contained"
            color="primary"
            className="mb-3"
            onClick={() => navigate("/")}
          >
            &larr; Go Back to Home
          </Button>
        )}
        <Typography variant="h6">
          Never Stand Still{' '}
          <span role="img" aria-label="muscle" aria-hidden="false">
            💪
          </span>{' '}
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
