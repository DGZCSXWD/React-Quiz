import React from "react";
import { useQuery } from "@apollo/client";

import WorkoutList from "../components/WorkoutList";
import WorkoutForm from "../components/WorkoutForm";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import { QUERY_WORKOUTS } from "../utils/queries";

const Home = () => {
  const { loading, data } = useQuery(QUERY_WORKOUTS);
  const workouts = data?.workouts || [];

  return (
    
    <main>
      <Grid container justifyContent="center" spacing={3}>
        <Grid item xs={12} md={10}>
          <Paper style={{ padding: "1em", border: "1px dotted #1a1a1a" }}>
            <WorkoutForm />
          </Paper>
        </Grid>
        <Grid item xs={12} md={8}>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <WorkoutList workouts={workouts} title="Joint the rank:" />
          )}
        </Grid>
      </Grid>
    </main>
  );
};

export default Home;


// <main>
    //   <div className="flex-row justify-center">
    //     <div
    //       className="col-12 col-md-10 mb-3 p-3"
    //       style={{ border: "1px dotted #1a1a1a" }}
    //     >
    //       <WorkoutForm />
    //     </div>
    //     <div className="col-12 col-md-8 mb-3">
    //       {loading ? (
    //         <div>Loading...</div>
    //       ) : (
    //         <WorkoutList workouts={workouts} title="Joint the rank:" />
    //       )}
    //     </div>
    //   </div>
    // </main>