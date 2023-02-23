const { gql } = require("apollo-server")

module.exports = gql`

type Todo {
  _id: String
  topic_id: String
  todo_name: String
  todo_owner_id: String
  todo_description: String
  updated_at: String
  created_at: String
}

input getTodoInput{
  _id: String!
}

input getAllTodosOfTopicInput{
  topic_id: String!
}

input createTodoInput{
  topic_id: String!
  todo_name: String!
  todo_description: String
  todo_owners_ids: [String]
}

input updateTodoInput{
  _id: String!
  todo_name: String!
  todo_description: String
  todo_owner_id: String
}

input deleteTodoInput{
  _id: String!
}

type Query {
  getAllTodos: [Todo]
  getTodo(input: getTodoInput!): Todo
  getAllTodosOfTopic(input: getAllTodosOfTopicInput): [Todo]
}

type Mutation {
  createTodo(input: createTodoInput!): Todo
  updateTodo(input: updateTodoInput!): Todo
  deleteTodo(input: deleteTodoInput!): Todo
}
`