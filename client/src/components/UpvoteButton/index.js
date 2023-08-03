import { useMutation } from '@apollo/client';
import { UPVOTE_WORKOUT } from '../../utils/mutations';
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

const UpvoteButton = ({ workoutId, upvoteCount }) => {
  const [upvoteWorkout] = useMutation(UPVOTE_WORKOUT);
  const classes = useStyles();

  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    // Check if this workout has been upvoted before by this visitor
    const upvotedWorkouts = JSON.parse(localStorage.getItem('upvotedWorkouts')) || [];
    if (upvotedWorkouts.includes(workoutId)) {
      setClicked(true);
    }
  }, [workoutId]);

  const handleUpvote = async () => {
    if (clicked) return;
    try {
      // Execute the upvoteWorkout mutation and pass in necessary variables
      await upvoteWorkout({
        variables: {
          workoutId,
        },
      });
      // Add this workout to the list of upvoted workouts
      const upvotedWorkouts = JSON.parse(localStorage.getItem('upvotedWorkouts')) || [];
      upvotedWorkouts.push(workoutId);
      localStorage.setItem('upvotedWorkouts', JSON.stringify(upvotedWorkouts));
      setClicked(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Button onClick={handleUpvote} className={`${classes.root} ${clicked ? 'clicked' : ''}`}>
      <span role="img" aria-label="strong">💪</span>
      <span>{upvoteCount > 0 ? upvoteCount : ""}</span>
    </Button>
  );
};

export default UpvoteButton;



// import { useMutation } from '@apollo/client';
// import { UPVOTE_WORKOUT } from '../../utils/mutations';
// import Button from '@material-ui/core/Button';
// import { makeStyles } from '@material-ui/core/styles';

// const useStyles = makeStyles({
//   root: {
//     background: 'none',
//     border: 'none',
//     boxShadow: 'none',
//     textTransform: 'none',
//     '&:hover': {
//       backgroundColor: 'transparent',
//     },
//   },
// });

// const UpvoteButton = ({ workoutId, upvoteCount }) => {
//   const [upvoteWorkout] = useMutation(UPVOTE_WORKOUT);
//   const classes = useStyles();

//   const handleUpvote = async () => {
//     try {
//       // Execute the upvoteWorkout mutation and pass in necessary variables
//       await upvoteWorkout({
//         variables: {
//           workoutId,
//         },
//       });
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <Button onClick={handleUpvote} className={classes.root}>
//       <span role="img" aria-label="strong">💪</span>
//       <span>{upvoteCount}</span>
//     </Button>
//   );
// };

// export default UpvoteButton;




// import { useMutation } from '@apollo/client';
// import { UPVOTE_WORKOUT } from '../../utils/mutations';

// const UpvoteButton = ({ workoutId, upvoteCount }) => {
//   const [upvoteWorkout] = useMutation(UPVOTE_WORKOUT);

//   const handleUpvote = async () => {
//     try {
//       // Execute the upvoteWorkout mutation and pass in necessary variables
//       await upvoteWorkout({
//         variables: {
//           workoutId,
//         },
//       });
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <button onClick={handleUpvote} style={{background: 'none', border: 'none'}}>
//       <span role="img" aria-label="strong">💪</span>
//       <span>{upvoteCount}</span>
//     </button>
//   );
// };

// export default UpvoteButton;




// import { useMutation } from "@apollo/client";
// import { UPVOTE_WORKOUT } from "../../utils/mutations";

// const UpvoteButton = ({ workoutId, upvoteCount }) => {
//   const [upvoteWorkout] = useMutation(UPVOTE_WORKOUT);

//   const handleUpvote = async () => {
//     try {
//       // Execute the upvoteWorkout mutation and pass in necessary variables
//       await upvoteWorkout({
//         variables: {
//           workoutId,
//         },
//       });
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return <button onClick={handleUpvote}>💪 {upvoteCount}</button>;
// };

// export default UpvoteButton;
