const { gql } = require("apollo-server");

const userSchema = gql`
    type User {
        id: ID!
        username: String!
        email: String!
    }

    type Query {
        me: User
    }

    type Mutation {
        signUp(username: String!, email: String!, password: String!): User
        login(email: String!, password: String!): String
    }
`;

module.exports = userSchema;
