
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
