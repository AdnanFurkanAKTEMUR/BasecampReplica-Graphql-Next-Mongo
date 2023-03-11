import { gql } from "@apollo/client"

export const GET_ALL_TOPICS_OF_PROJECT = gql`
  query GetAllTopicsOfProject($input: getAllTopicOfProjectInput) {
    getAllTopicsOfProject(input: $input) {
      _id
      project_id
      topic_name
      topic_description
      updated_at
      created_at
    }
  }
`

export const CREATE_TOPIC = gql`
  mutation CreateTopic($input: createTopicInput!) {
    createTopic(input: $input) {
      _id
      project_id
      topic_name
      topic_description
      updated_at
      created_at
    }
  }
`

export const GET_TOPIC = gql`
  query GetTopic($input: getTopicInput!) {
    getTopic(input: $input) {
      _id
      project_id
      topic_name
      topic_description
      updated_at
      created_at
    }
  }
`

export const UPDATE_TOPIC = gql`
mutation UpdateTopic($input: updateTopicInput!) {
  updateTopic(input: $input) {
    _id
    project_id
    topic_name
    topic_description
    updated_at
    created_at
  }
}
`

export const DELETE_TOPIC = gql`
  mutation DeleteTopic($input: deleteTopicInput!) {
    deleteTopic(input: $input) {
      topic_name
      topic_description
    }
  }
`