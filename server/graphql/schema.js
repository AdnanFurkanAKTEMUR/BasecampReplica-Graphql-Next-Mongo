const { makeExecutableSchema } = require("@graphql-tools/schema")

const exampleTypDefs = require("./typeDefs/example.js")
const exampleResolvers = require("./resolvers/exampleResolvers.js")

const projectTypeDefs = require("./typeDefs/projects.js")
const projectResolvers = require("./resolvers/projectsResolvers.js")

const topicTypeDefs = require("./typeDefs/topics.js")
const topicResolvers = require("./resolvers/topicsResolvers.js")

const todoTypeDefs = require("./typeDefs/todos.js")
const todoResolvers = require("./resolvers/todosResolvers.js")

const todoCommentTypeDefs = require("./typeDefs/todoComments.js")
const todoCommentResolvers = require("./resolvers/todoCommentsResolvers.js")

const userTypedefs = require("./typeDefs/users.js")
const userResolvers = require("./resolvers/usersResolvers.js")

const schema = makeExecutableSchema({
  typeDefs: [exampleTypDefs, projectTypeDefs, topicTypeDefs, todoTypeDefs, todoCommentTypeDefs, userTypedefs],
  resolvers: [exampleResolvers, projectResolvers, topicResolvers, todoResolvers, todoCommentResolvers, userResolvers]
})

module.exports = schema