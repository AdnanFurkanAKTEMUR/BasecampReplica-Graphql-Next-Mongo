const { makeExecutableSchema } = require("@graphql-tools/schema")

const exampleTypDefs = require("./typeDefs/example.js")
const exampleResolvers = require("./resolvers/exampleResolvers.js")

const schema = makeExecutableSchema({
  typeDefs: [exampleTypDefs],
  resolvers: [exampleResolvers]
})

module.exports = schema