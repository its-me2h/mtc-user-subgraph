import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { schema } from "./src/graphql";
import dotenv from 'dotenv';
dotenv.config();

const app: any = express();
app.use(express.json());

// Function to start the ApolloServer
async function startApolloServer() {
    const server = new ApolloServer({ 
        schema,
    });
    // Start the ApolloServer
    await server.start();
    // Apply ApolloServer middleware to Express app
    server.applyMiddleware({ app, path: '/graphql' });
    // Start the Express server
    app.listen({ port: process.env.PORT }, () =>
        console.log(`👨 user service running at http://localhost:${process.env.PORT}${server.graphqlPath}`)
    );
}

startApolloServer();
