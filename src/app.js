const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const connectDB = require("./config/db");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");

const startServer = async () => {
    await connectDB();

    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: ({ req }) => {
            const token = req.headers.authorization || "";
            return { token };
        },
    });

    const { url } = await startStandaloneServer(server, {
        listen: { port: process.env.PORT || 4000 },
    });

    console.log(`🚀 Server ready at ${url}`);
};

startServer();
