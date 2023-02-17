const { gql } = require("apollo-server")

module.exports = gql`

type Example {
  _id: String
  ex_name: String
}

input deleteInput {
  _id: String!
}

type Query {
  getAllExamples:[Example]
}
type Mutation {
  deleteExample(input: deleteInput!): Example
}

`