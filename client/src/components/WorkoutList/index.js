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

//import ReactionButton from "../ReactionButton";

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
              //fullWidth
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

// import React from 'react';
// import { Link } from 'react-router-dom';

// const WorkoutList = ({
//   workouts,
//   title,
//   showTitle = true,
//   showUsername = true,
// }) => {
//   if (!workouts.length) {
//     return <h3>No Workouts Yet</h3>;
//   }

//   return (
//     <div>
//       {showTitle && <h3>{title}</h3>}
//       {workouts &&
//         workouts.map((workout) => (
//           <div key={workout._id} className="card mb-3">
//             <h4 className="card-header bg-primary text-light p-2 m-0">
//               {showUsername ? (
//                 <Link
//                   className="text-light"
//                   to={`/profiles/${workout.workoutAuthor}`}
//                 >
//                   {workout.workoutAuthor} <br />
//                   <span style={{ fontSize: '1rem' }}>
//                     uploaded this workout record on {workout.createdAt}
//                   </span>
//                 </Link>
//               ) : (
//                 <>
//                   <span style={{ fontSize: '1rem' }}>
//                     You had this workout on {workout.createdAt}
//                   </span>
//                 </>
//               )}
//             </h4>
//             <div className="card-body bg-light p-2">
//               <p>{workout.workoutText}</p>
//             </div>
//             <Link
//               className="btn btn-primary btn-block btn-squared"
//               to={`/workouts/${workout._id}`}
//             >
//               Comment.
//             </Link>
//           </div>
//         ))}
//     </div>
//   );
// };

// export default WorkoutList;
