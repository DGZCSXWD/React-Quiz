import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      workouts {
        _id
        workoutText
        createdAt
        upvotes
        downvotes
      }
    }
  }
`;

export const QUERY_WORKOUTS = gql`
  query getWorkouts {
    workouts {
      _id
      workoutText
      workoutAuthor
      createdAt
      upvotes
      downvotes
    }
  }
`;

export const QUERY_SINGLE_WORKOUT = gql`
  query getSingleWorkout($workoutId: ID!) {
    workout(workoutId: $workoutId) {
      _id
      workoutText
      workoutAuthor
      createdAt
      comments {
        _id
        commentText
        commentAuthor
        createdAt
      }
      upvotes
      downvotes
      #reactions
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      workouts {
        _id
        workoutText
        workoutAuthor
        createdAt
        upvotes
        downvotes
        #reactions
      }
    }
  }
`;

