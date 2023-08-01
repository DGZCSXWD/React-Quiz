const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    password: String
  }

  type Question {
    _id: ID
    question: String
    options: [String]
    correctOption: Int
    points: Int
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    me: User
    users: [User]
    user(username: String!): User
    questions: [Question]
    question(_id: ID!): Question
  }

  type Mutation {
    addUser(username: String!, password: String!): Auth
    login(username: String!, password: String!): Auth
    addQuestion(
      question: String!
      options: [String!]!
      correctOption: Int!
      points: Int
    ): Question
  }
`;

module.exports = typeDefs;
