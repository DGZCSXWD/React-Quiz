import React from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardContent,
  Button,
  Typography,
} from "@material-ui/core";
import UpvoteButton from "../UpvoteButton";
import DownvoteButton from "../DownvoteButton";

const WorkoutList = ({
  workouts,
  title,
  showTitle = true,
  showUsername = true,
}) => {
  if (!workouts.length) {
    return <Typography variant="h5">No Workouts Yet</Typography>;
  }

  return (
    <div>
      {showTitle && <Typography variant="h5">{title}</Typography>}
      {workouts &&
        workouts.map((workout) => (
          <Card
            key={workout._id}
            variant="outlined"
            style={{ marginBottom: "16px" }}
          >
            <CardHeader
              title={
                showUsername ? (
                  <RouterLink to={`/profiles/${workout.workoutAuthor}`}>
                    {workout.workoutAuthor} <br />
                    <Typography variant="body2">
                      uploaded this workout record on {workout.createdAt}
                    </Typography>
                  </RouterLink>
                ) : (
                  <Typography variant="body2">
                    This workout is recorded on {workout.createdAt}
                  </Typography>
                )
              }
            />
            <CardContent>
              <Typography variant="body1">{workout.workoutText}</Typography>
            </CardContent>
            <Button
              variant="contained"
              color="primary"
              component={RouterLink}
              to={`/workouts/${workout._id}`}
            >
              Comment
            </Button>
            <UpvoteButton workoutId={workout._id} upvoteCount={workout.upvotes} />
            <DownvoteButton workoutId={workout._id} downvoteCount={workout.downvotes} />
          </Card>
        ))}
    </div>
  );
};

export default WorkoutList;