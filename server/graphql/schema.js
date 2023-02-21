const { makeExecutableSchema } = require("@graphql-tools/schema")

const exampleTypDefs = require("./typeDefs/example.js")
const exampleResolvers = require("./resolvers/exampleResolvers.js")

const projectTypeDefs = require("./typeDefs/projects.js")
const projectResolvers = require("./resolvers/projectsResolvers.js")

const schema = makeExecutableSchema({
  typeDefs: [exampleTypDefs, projectTypeDefs],
  resolvers: [exampleResolvers, projectResolvers]
})

module.exports = schema