import React, { useState } from 'react';
import { Link as RouterLink} from 'react-router-dom';
import { Box, Typography, TextField, Button, Grid } from '@material-ui/core';
import { useMutation } from '@apollo/client';

import { ADD_COMMENT } from '../../utils/mutations';

import Auth from '../../utils/auth';

const CommentForm = ({ workoutId }) => {
  const [commentText, setCommentText] = useState('');
  const [characterCount, setCharacterCount] = useState(0);

  const [addComment, { error }] = useMutation(ADD_COMMENT);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addComment({
        variables: {
          workoutId,
          commentText,
          commentAuthor: Auth.getProfile().data.username,
        },
      });

      setCommentText('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'commentText' && value.length <= 280) {
      setCommentText(value);
      setCharacterCount(value.length);
    }
  };

  return (
    // <div>
    //   <h4>Leave you comment here:</h4>

    //   {Auth.loggedIn() ? (
    //     <>
    //       <p
    //         className={`m-0 ${
    //           characterCount === 280 || error ? 'text-danger' : ''
    //         }`}
    //       >
    //         Character Count: {characterCount}/280
    //         {error && <span className="ml-2">{error.message}</span>}
    //       </p>
    //       <form
    //         className="flex-row justify-center justify-space-between-md align-center"
    //         onSubmit={handleFormSubmit}
    //       >
    //         <div className="col-12 col-lg-9">
    //           <textarea
    //             name="commentText"
    //             placeholder="Add your comment..."
    //             value={commentText}
    //             className="form-input w-100"
    //             style={{ lineHeight: '1.5', resize: 'vertical' }}
    //             onChange={handleChange}
    //           ></textarea>
    //         </div>

    //         <div className="col-12 col-lg-3">
    //           <button className="btn btn-primary btn-block py-3" type="submit">
    //             Add Comment
    //           </button>
    //         </div>
    //       </form>
    //     </>
    //   ) : (
    //     <p>
    //       You need to be logged in to leave comment. Please{' '}
    //       <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
    //     </p>
    //   )}
    // </div>
    <Box>
      <Typography variant="h6">Leave you comment here:</Typography>
      {Auth.loggedIn() ? (
        <>
          <Typography 
            color={characterCount === 280 || error ? "error" : "initial"}
          >
            Character Count: {characterCount}/280
            {error && <span className="ml-2">{error.message}</span>}
          </Typography>
          <form onSubmit={handleFormSubmit}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} lg={9}>
                <TextField
                  name="commentText"
                  placeholder="Add your comment..."
                  value={commentText}
                  variant="outlined"
                  multiline
                  rows={4}
                  fullWidth
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} lg={3}>
                <Button variant="contained" color="primary" type="submit" fullWidth>
                  Add Comment
                </Button>
              </Grid>
            </Grid>
          </form>
        </>
      ) : (
        <Typography>
          You need to be logged in to leave comment. Please{' '}
          <RouterLink to="/login">login</RouterLink> or <RouterLink to="/signup">signup.</RouterLink>
        </Typography>
      )}
    </Box>
  );
};

export default CommentForm;
