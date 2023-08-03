const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const workoutSchema = new Schema({
  workoutText: {
    type: String,
    required: 'You need to leave a workout!',
    minlength: 1,
    maxlength: 280,
    trim: true,
  },
  workoutAuthor: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  comments: [
    {
      commentText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
      },
      commentAuthor: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
      },
    },
  ],


  upvotes: {
    type: Number,
    default: 0,
  },

  downvotes: {
    type: Number,
    default: 0,
  },

// reactions: {
//     strong: { type: Number, default: 0 },
//     fire: { type: Number, default: 0 },
//     hot: { type: Number, default: 0 },
//     scream: { type: Number, default: 0 },
//     poop: { type: Number, default: 0 },
//   },

});

const Workout = model('Workout', workoutSchema);

module.exports = Workout;


