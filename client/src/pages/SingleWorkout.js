import React from 'react';

import { CircularProgress, Box, Typography, Paper } from '@material-ui/core';

// Import the `useParams()` hook
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import CommentList from '../components/CommentList';
import CommentForm from '../components/CommentForm';

import { QUERY_SINGLE_WORKOUT } from '../utils/queries';

const SingleWorkout = () => {
  // Use `useParams()` to retrieve value of the route parameter `:profileId`
  const { workoutId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_WORKOUT, {
    // pass URL parameter
    variables: { workoutId: workoutId },
  });

  const workout = data?.workout || {};

  if (loading) {
    return <CircularProgress />;
}

return (
    <Box mt={3}>
        <Paper elevation={3} style={{ backgroundColor: '#3f51b5', color: '#fff', padding: '1rem' }}>
            <Typography variant="h5" align="center">
            {workout.workoutAuthor} <br />
                <Typography variant="subtitle1">
                    had this workout on {workout.createdAt}
                </Typography>
            </Typography>
        </Paper>
        
        <Box mt={3} p={3} bgcolor="grey.200">
            <Typography variant="body1" style={{ fontStyle: 'italic', border: '1px solid black', padding: '1rem' }}>
                {workout.workoutText}
            </Typography>
        </Box>

        <Box my={3}>
            <CommentList comments={workout.comments} />
        </Box>

        <Box m={2} p={2} border={1} borderColor="grey.500">
            <CommentForm workoutId={workout._id} />
        </Box>
    </Box>
);
};

export default SingleWorkout;
