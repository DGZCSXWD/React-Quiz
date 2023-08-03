
import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import { TextField, Button, Checkbox, FormControlLabel, Box, Grid, Typography, Paper } from '@material-ui/core';
import { useMutation } from "@apollo/client";

import { ADD_WORKOUT } from "../../utils/mutations";
import { QUERY_WORKOUTS, QUERY_ME } from "../../utils/queries";

import Auth from "../../utils/auth";

const WorkoutForm = () => {
  const [workoutText, setWorkoutText] = useState("");
  const [plannedWorkouts, setPlannedWorkouts] = useState(
    JSON.parse(localStorage.getItem("plannedWorkouts")) || []
  );
  const [completedWorkouts, setCompletedWorkouts] = useState(
    JSON.parse(localStorage.getItem("completedWorkouts")) || {}
  );

  const [characterCount, setCharacterCount] = useState(0);

  const [addWorkout, { error }] = useMutation(ADD_WORKOUT, {
    update(cache, { data: { addWorkout } }) {
      try {
        const { workouts } = cache.readQuery({ query: QUERY_WORKOUTS });

        cache.writeQuery({
          query: QUERY_WORKOUTS,
          data: { workouts: [addWorkout, ...workouts] },
        });
      } catch (e) {
        console.error(e);
      }

    },
  });

  useEffect(() => {
    localStorage.setItem("plannedWorkouts", JSON.stringify(plannedWorkouts));
  }, [plannedWorkouts]);

  useEffect(() => {
    localStorage.setItem("completedWorkouts", JSON.stringify(completedWorkouts));
  }, [completedWorkouts]);

  const addPlan = () => {
    if (workoutText.trim() !== "") {
      setPlannedWorkouts([...plannedWorkouts, workoutText]);
      setWorkoutText("");
    }
  };

  const handleCompletion = (plan) => {
    const newCompletedWorkouts = {
      ...completedWorkouts,
      [plan]: !completedWorkouts[plan],
    };
    setCompletedWorkouts(newCompletedWorkouts);
    localStorage.setItem("completedWorkouts", JSON.stringify(newCompletedWorkouts));
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (Object.values(completedWorkouts).every((completed) => completed)) {
      const workoutText = plannedWorkouts.join(", ");

      try {
        const { data } = await addWorkout({
          variables: {
            workoutText,
            workoutAuthor: Auth.getProfile().data.username,
          },
        });

        setPlannedWorkouts([]);
        setCompletedWorkouts({});
        localStorage.removeItem("plannedWorkouts");
        localStorage.removeItem("completedWorkouts");
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "workoutText" && value.length <= 280) {
      setWorkoutText(value);
      setCharacterCount(value.length);
    }
  };

  return (
    <div>
      <Typography variant="h6">What is your workout plan today?</Typography>

      {Auth.loggedIn() ? (
        <>
          {plannedWorkouts.map((plan, i) => (
            <FormControlLabel
              key={i}
              control={
                <Checkbox
                  checked={completedWorkouts[plan] || false}
                  onChange={() => handleCompletion(plan)}
                />
              }
              label={plan}
            />
          ))}
          <form onSubmit={handleFormSubmit}>
            <Grid container spacing={2} direction="column">
              <Grid item xs={12}>
                <TextField
                  name="workoutText"
                  value={workoutText}
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={4}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  //fullWidth
                  onClick={addPlan}
                >
                  Add to Plan
                </Button>
                {plannedWorkouts.length > 0 &&
                  Object.values(completedWorkouts).length ===
                    plannedWorkouts.length &&
                  Object.values(completedWorkouts).every(
                    (completed) => completed
                  ) && (
                    <Button
                      variant="contained"
                      color="secondary"
                      type="submit"
                    >
                      Add Record
                    </Button>
                  )}
              </Grid>
              {error && (
                <Box my={2}>
                  <Paper elevation={3} style={{ backgroundColor: '#f44336', color: '#ffffff', padding: '16px' }}>
                    <Typography variant="body1">{error.message}</Typography>
                  </Paper>
                </Box>
              )}
            </Grid>
          </form>
        </>
      ) : (
        <Typography variant="body1">
          You need to be logged in to share your workouts. Please{" "}
          <RouterLink to="/login">login</RouterLink> or <RouterLink to="/signup">signup.</RouterLink>
        </Typography>
      )}
    </div>
  );
};

export default WorkoutForm;



/*
import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import { TextField, Button, Checkbox, FormControlLabel, Box, Grid, Typography, Paper } from '@material-ui/core';
import { useMutation } from "@apollo/client";

import { ADD_WORKOUT } from "../../utils/mutations";
import { QUERY_WORKOUTS, QUERY_ME } from "../../utils/queries";

import Auth from "../../utils/auth";

const WorkoutForm = () => {
  const [workoutText, setWorkoutText] = useState("");
  const [plannedWorkouts, setPlannedWorkouts] = useState(
    JSON.parse(localStorage.getItem("plannedWorkouts")) || []
  );
  const [completedWorkouts, setCompletedWorkouts] = useState({});

  const [characterCount, setCharacterCount] = useState(0);

  const [addWorkout, { error }] = useMutation(ADD_WORKOUT, {
    update(cache, { data: { addWorkout } }) {
      try {
        const { workouts } = cache.readQuery({ query: QUERY_WORKOUTS });

        cache.writeQuery({
          query: QUERY_WORKOUTS,
          data: { workouts: [addWorkout, ...workouts] },
        });
      } catch (e) {
        console.error(e);
      }

    },
  });

  useEffect(() => {
    localStorage.setItem("plannedWorkouts", JSON.stringify(plannedWorkouts));
  }, [plannedWorkouts]);

  const addPlan = () => {
    if (workoutText.trim() !== "") {
      setPlannedWorkouts([...plannedWorkouts, workoutText]);
      setWorkoutText("");
    }
  };

  const handleCompletion = (plan) => {
    setCompletedWorkouts({
      ...completedWorkouts,
      [plan]: !completedWorkouts[plan],
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (Object.values(completedWorkouts).every((completed) => completed)) {
      const workoutText = plannedWorkouts.join(", ");

      try {
        const { data } = await addWorkout({
          variables: {
            workoutText,
            workoutAuthor: Auth.getProfile().data.username,
          },
        });

        setPlannedWorkouts([]);
        setCompletedWorkouts({});
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "workoutText" && value.length <= 280) {
      setWorkoutText(value);
      setCharacterCount(value.length);
    }
  };

  return (
    <div>
  <Typography variant="h6">What is your workout plan today?</Typography>

  {Auth.loggedIn() ? (
    <>
      {plannedWorkouts.map((plan, i) => (
        <FormControlLabel
          key={i}
          control={
            <Checkbox
              checked={completedWorkouts[plan] || false}
              onChange={() => handleCompletion(plan)}
            />
          }
          label={plan}
        />
      ))}
      <form onSubmit={handleFormSubmit}>
        <Grid container spacing={2} direction="column">
          <Grid item xs={12}>
            <TextField
              name="workoutText"
              value={workoutText}
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={addPlan}
            >
              Add to Plan
              
            </Button>
            {plannedWorkouts.length > 0 &&
              Object.values(completedWorkouts).length ===
                plannedWorkouts.length &&
              Object.values(completedWorkouts).every(
                (completed) => completed
              ) && (
                <Button
                  variant="contained"
                  color="secondary"
                  type="submit"
                >
                  Add Record
                </Button>
              )}
          </Grid>
          {error && (
            <Box my={2}>
              <Paper elevation={3} style={{ backgroundColor: '#f44336', color: '#ffffff', padding: '16px' }}>
                <Typography variant="body1">{error.message}</Typography>
              </Paper>
            </Box>
          )}
        </Grid>
      </form>
    </>
  ) : (
    <Typography variant="body1">
      You need to be logged in to share your workouts. Please{" "}
      <RouterLink to="/login">login</RouterLink> or <RouterLink to="/signup">signup.</RouterLink>
    </Typography>
  )}
</div>
  );
};

export default WorkoutForm;
*/