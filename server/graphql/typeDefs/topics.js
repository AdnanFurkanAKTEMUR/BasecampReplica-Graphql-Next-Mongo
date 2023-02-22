const { gql } = require("apollo-server")

module.exports = gql`

type Topic {
  _id: String
  project_id: String
  topic_name: String
  topic_description: String
  updated_at: String
  created_at: String
}

input getTopicInput{
  _id: String!
}

input getAllTopicOfProjectInput{
  project_id: String!
}

input createTopicInput{
  project_id: String!
  topic_name: String!
  topic_description: String
}

input updateTopicInput{
  _id: String!
  topic_name: String!
  topic_description: String
}

input deleteTopicInput{
  _id: String!
}

type Query {
  getAllTopics: [Topic]
  getTopic(input: getTopicInput!): Topic
  getAllTopicsOfProject(input: getAllTopicOfProjectInput): [Topic]
}

type Mutation {
  createTopic(input: createTopicInput!): Topic
  updateTopic(input: updateTopicInput!): Topic
  deleteTopic(input: deleteTopicInput!): Topic
}
`