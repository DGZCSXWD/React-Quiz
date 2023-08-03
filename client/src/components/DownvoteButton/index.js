import { useMutation } from '@apollo/client';
import { DOWNVOTE_WORKOUT } from '../../utils/mutations';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { useState, useEffect } from 'react';

const useStyles = makeStyles({
  root: {
    background: 'none',
    border: 'none',
    boxShadow: 'none',
    textTransform: 'none',
    transition: 'transform 0.3s',
    '&:hover': {
      backgroundColor: 'transparent',
    },
    '&.clicked': {
      transform: 'scale(1.2)',
    },
  },
});

const DownvoteButton = ({ workoutId, downvoteCount }) => {
  const [downvoteWorkout] = useMutation(DOWNVOTE_WORKOUT);
  const classes = useStyles();

  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    // Check if this workout has been downvoted before by this visitor
    const downvotedWorkouts = JSON.parse(localStorage.getItem('downvotedWorkouts')) || [];
    if (downvotedWorkouts.includes(workoutId)) {
      setClicked(true);
    }
  }, [workoutId]);

  const handleDownvote = async () => {
    if (clicked) return;
    try {
      // Execute the downvoteWorkout mutation and pass in necessary variables
      await downvoteWorkout({
        variables: {
          workoutId,
        },
      });
      // Add this workout to the list of downvoted workouts
      const downvotedWorkouts = JSON.parse(localStorage.getItem('downvotedWorkouts')) || [];
      downvotedWorkouts.push(workoutId);
      localStorage.setItem('downvotedWorkouts', JSON.stringify(downvotedWorkouts));
      setClicked(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Button onClick={handleDownvote} className={`${classes.root} ${clicked ? 'clicked' : ''}`}>
      <span role="img" aria-label="strong">💩</span>
      <span>{downvoteCount > 0 ? downvoteCount : ""}</span>
    </Button>
  );
};

export default DownvoteButton;
