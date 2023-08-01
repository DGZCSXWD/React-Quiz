const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  options: {
    type: [String],
    required: true,
  },
  correctOption: {
    type: Number,
    required: true,
  },
  points: {
    type: Number,
    default: 0,
  },
});

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;
