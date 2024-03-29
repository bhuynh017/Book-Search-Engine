// import statements for node.js app using express and apollo.
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const path = require("path");
const { authMiddleware } = require("./utils/auth");

// setting up express server with Apollo
// typeDefs and resolvers are imported from schemas file.
const { typeDefs, resolvers } = require("./schemas");
// database connection is imported.
const db = require("./config/connection");

const PORT = process.env.PORT || 3001;
// express application is created
const app = express();
// new instance of apollo is created and passed through these
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

// encoded data
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/"));
});

// Starting the ApolloServer and express application.
const startApolloServer = async (typeDefs, resolvers) => {
  // this line stats Apollo
  await server.start();
  // applying middleware
  server.applyMiddleware({ app });

  // database connection is opened
  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(
        `Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`
      );
    });
  });
};

startApolloServer(typeDefs, resolvers);
