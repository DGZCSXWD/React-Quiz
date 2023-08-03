import React from "react";
import { Box, Paper, Typography } from "@material-ui/core";
import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import WorkoutList from "../components/WorkoutList";

import { QUERY_USER, QUERY_ME } from "../utils/queries";

import Auth from "../utils/auth";

const Profile = () => {
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/me" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <Typography variant="h5" align="center">
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </Typography>
    );
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      flexDirection="column"
      alignItems="center"
      m={3}
    >
      <Paper
        elevation={3}
        style={{
          width: "100%",
          backgroundColor: "#3f51b5",
          color: "#fff",
          padding: "1rem",
        }}
      >
        <Typography variant="h5" align="center">
          Viewing {userParam ? `${user.username}'s` : "your"} workout records:
        </Typography>
      </Paper>

      <Box mt={3} style={{ width: "100%" }}>
        <WorkoutList
          workouts={user.workouts}
          title={`${user.username}'s workouts...`}
          showTitle={false}
          showUsername={false}
        />
      </Box>
    </Box>
  );
};

export default Profile;
