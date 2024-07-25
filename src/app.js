const { ApolloServer } = require("@apollo/server");
const {
    ApolloServerPluginLandingPageLocalDefault,
} = require("@apollo/server/plugin/landingPage/default");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { WebSocketServer } = require("ws");
const { useServer } = require("graphql-ws/lib/use/ws");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const connectDB = require("./config/db");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");

const startServer = async () => {
    await connectDB();

    const schema = makeExecutableSchema({ typeDefs, resolvers });

    const wsServer = new WebSocketServer({
        port: 4001,
        path: "/graphql",
    });

    const serverCleanup = useServer({ schema }, wsServer);

    // Initialize Apollo Server
    const server = new ApolloServer({
        schema,
        plugins: [
            ApolloServerPluginLandingPageLocalDefault(),
            {
                async serverWillStart() {
                    return {
                        async drainServer() {
                            await serverCleanup.dispose();
                        },
                    };
                },
            },
        ],
    });

    const { url } = await startStandaloneServer(server, {
        listen: { port: process.env.PORT || 4000 },
        context: ({ req }) => {
            const token = req.headers.authorization || "";
            return { token };
        },
    });

    console.log(`🚀 Server ready at ${url}`);
    console.log(`🚀 Subscriptions ready at ws://localhost:4001/graphql`);
};

startServer();
