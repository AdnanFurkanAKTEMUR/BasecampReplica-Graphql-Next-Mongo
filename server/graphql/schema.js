const { makeExecutableSchema } = require("@graphql-tools/schema")

const exampleTypDefs = require("./typeDefs/example.js")
const exampleResolvers = require("./resolvers/exampleResolvers.js")

const projectTypeDefs = require("./typeDefs/projects.js")
const projectResolvers = require("./resolvers/projectsResolvers.js")

const topicTypeDefs = require("./typeDefs/topics.js")
const topicResolvers = require("./resolvers/topicsResolvers.js")

const schema = makeExecutableSchema({
  typeDefs: [exampleTypDefs, projectTypeDefs, topicTypeDefs],
  resolvers: [exampleResolvers, projectResolvers, topicResolvers]
})

module.exports = schema