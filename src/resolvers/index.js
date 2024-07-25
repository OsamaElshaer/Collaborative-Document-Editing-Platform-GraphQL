const userResolvers = require("./userResolvers");
const documentResolvers = require("./documentResolvers");

const resolvers = {
    Query: {
        ...userResolvers.Query,
        ...documentResolvers.Query,
    },
    Mutation: {
        ...userResolvers.Mutation,
        ...documentResolvers.Mutation,
    },
};

module.exports = resolvers;
