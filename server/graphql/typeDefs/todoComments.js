const { gql } = require("apollo-server")

module.exports = gql`

type Comment {
  _id: String
  todo_id: String
  comment_owner_id: String
  comment_owner_name: String
  comment: String
  updated_at: String
  created_at: String
}

input getCommentInput{
  _id: String!
}

input getAllCommentsOfTodoInput{
  todo_id: String!
}

input createCommentInput{
  todo_id: String!
  comment_owner_id: String
  comment_owner_name: String
  comment: String
}

input updateCommentInput{
  _id: String!
  comment: String!
}

input deleteCommentInput{
  _id: String!
}

type Query {
  getAllComments: [Comment]
  getComment(input: getTopicInput!): Comment
  getAllCommentsOfTodo(input: getAllCommentsOfTodoInput): [Comment]
}

type Mutation {
  createComment(input: createCommentInput!): Comment
  updateComment(input: updateCommentInput!): Comment
  deleteComment(input: deleteCommentInput!): Comment
}
`