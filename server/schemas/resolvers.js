const { AuthenticationError } = require("apollo-server-express");
const { User, Question } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    users: async () => {
      return User.find({});
    },
    user: async (parent, { username }) => {
      return User.findOne({ username });
    },
    questions: async () => {
      return Question.find({});
    },
    question: async (parent, { _id }) => {
      return Question.findOne({ _id });
    },
  },

  Mutation: {
    addUser: async (parent, { username, password }) => {
      const user = await User.create({ username, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { username, password }) => {
      const user = await User.findOne({ username });

      if (!user) {
        throw new AuthenticationError("No user found with this username!");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials!");
      }

      const token = signToken(user);
      return { token, user };
    },
    addQuestion: async (
      parent,
      { question, options, correctOption, points },
      context
    ) => {
      if (context.user) {
        const newQuestion = await Question.create({
          question,
          options,
          correctOption,
          points,
        });

        return newQuestion;
      }
      throw new AuthenticationError(
        "You need to be logged in to add a question!"
      );
    },
  },
};

module.exports = resolvers;
