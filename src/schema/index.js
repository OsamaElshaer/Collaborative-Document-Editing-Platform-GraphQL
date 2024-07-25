const { gql } = require("apollo-server");
const userSchema = require("./userSchema");
const documentSchema = require("./documentSchema");

const typeDefs = gql`
    ${userSchema}
    ${documentSchema}
`;

module.exports = typeDefs;
