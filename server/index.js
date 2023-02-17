const mongodbClient = require("./database_config/mongodb")
const { ApolloServer } = require("apollo-server-express");
const cors = require("cors");
const express = require("express");
const schema = require("./graphql/schema.js");

(async function (){
  const app = express()

  const corsOptions = {
    origin: true,
    credentials: true
  }

  app.use(cors(corsOptions))

  const apolloServer = new ApolloServer({
    schema: schema,
    context: ({req, res}) => ({
      req,
      res,
      client: mongodbClient
    })
  })

  await apolloServer.start();
  console.log("ApolloServer has started.")
  
  apolloServer.applyMiddleware({app, path:"/", cors: false})
  console.log("middleware applied.")

  app.listen({port:4000}, ()=> {
    console.log("server is ready on port 4000.")
  })
})();