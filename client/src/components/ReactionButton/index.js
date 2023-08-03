// import React, { useState, useEffect } from "react";
// import Button from "@material-ui/core/Button";
// import { makeStyles } from "@material-ui/core/styles";
// import { useMutation } from "@apollo/client";
// import { ADD_REACTION } from "../../utils/mutations";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     margin: theme.spacing(1),
//   },
// }));

// const ReactionButton = ({ workout, reactionType, emoji }) => {
//   const classes = useStyles();
//   const [clicked, setClicked] = useState(false);
//   const [reactionCount, setReactionCount] = useState(0);
//   const [addReaction, { error }] = useMutation(ADD_REACTION);

//   // When the component mounts, check if this visitor has already clicked this button.
//   useEffect(() => {
//     const clickedReaction = localStorage.getItem(
//       `${workout._id}-${reactionType}`
//     );
//     setClicked(clickedReaction ? true : false);
//     setReactionCount(workout.reactions[reactionType] || 0); // Set the initial reaction count
//   }, [workout, reactionType]);

//   // Handle the reaction click
//   const handleReaction = async () => {
//     if (clicked) return; // If the button is already clicked, return early.

//     try {
//       // Add reaction to the workout in the server
//       await addReaction({
//         variables: { workoutId: workout._id, reactionType },
//       });

//       // Update the clicked state and the local storage
//       setClicked(true);
//       localStorage.setItem(`${workout._id}-${reactionType}`, "true");

//       // Increment the reaction count
//       setReactionCount(reactionCount + 1);
//     } catch (e) {
//       console.error(e);
//     }
//   };

//   return (
//     <Button
//       onClick={handleReaction}
//       className={`${classes.root} ${clicked ? "clicked" : ""}`}
//     >
//       <span role="img" aria-label={reactionType}>
//         {emoji}
//       </span>
//       {/* Display the count here */}
//       {reactionCount}
//     </Button>
//   );
// };

// export default ReactionButton;

// // client/src/components/ReactionButton.js
import { useMutation } from "@apollo/client";
import { ADD_REACTION } from "../../utils/mutations";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { useState, useEffect } from "react";

const useStyles = makeStyles({
  root: {
    background: "none",
    border: "none",
    boxShadow: "none",
    textTransform: "none",
    transition: "transform 0.3s",
    "&:hover": {
      backgroundColor: "transparent",
      cursor: "pointer",
    },
    "&.clicked": {
      transform: "scale(1.2)",
    },
  },
});

const ReactionButton = ({ workoutId, reactionType, emoji }) => {
  const [addReaction] = useMutation(ADD_REACTION);
  const classes = useStyles();

  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    const reactedWorkouts =
      JSON.parse(localStorage.getItem(`reactedWorkouts_${reactionType}`)) || [];
    if (reactedWorkouts.includes(workoutId)) {
      setClicked(true);
    }
  }, [workoutId, reactionType]);

  const handleReaction = async () => {
    if (clicked) return;
    try {
      await addReaction({
        variables: {
          workoutId,
          reactionType,
        },
      });
      const reactedWorkouts =
        JSON.parse(localStorage.getItem(`reactedWorkouts_${reactionType}`)) ||
        [];
      reactedWorkouts.push(workoutId);
      localStorage.setItem(
        `reactedWorkouts_${reactionType}`,
        JSON.stringify(reactedWorkouts)
      );
      setClicked(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Button
      onClick={handleReaction}
      className={`${classes.root} ${clicked ? "clicked" : ""}`}
    >
      <span role="img" aria-label={reactionType}>
        {emoji}
      </span>
      {/* {workout.reactions[reactionType] || 0} */}
    </Button>
  );
};

export default ReactionButton;
