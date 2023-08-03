import React from 'react';
import { Box, Typography, Paper, Grid } from '@material-ui/core';

const CommentList = ({ comments = [] }) => {
  if (!comments.length) {
    return <Typography variant="h5">No Comments Yet</Typography>;
  }

  return (
    <>
      <Box pb={3} borderBottom={1}>
        <Typography variant="h5">Comments</Typography>
      </Box>
      <Grid container spacing={3} direction="column">
        {comments &&
          comments.map((comment) => (
            <Grid item xs={12} key={comment._id}>
              <Paper elevation={3} square>
                <Box p={3}>
                  <Typography variant="subtitle1">
                    {comment.commentAuthor} commented{' '}
                    <span style={{ fontSize: '0.825rem' }}>
                      on {comment.createdAt}
                    </span>
                  </Typography>
                  <Typography>{comment.commentText}</Typography>
                </Box>
              </Paper>
            </Grid>
          ))}
      </Grid>
    </>
  );
};

export default CommentList;
