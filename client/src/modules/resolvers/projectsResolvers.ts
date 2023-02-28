import { gql } from "@apollo/client"

export const GET_ALL_PROJECTS = gql`
  query GetAllProjects {
    getAllProjects {
      _id
      project_name
      project_image
      project_description
      owner_id
      parent_project_id
      updated_at
      created_at
    }
  }
`

export const GET_USER_PROJECTS = gql`
  query GetUserProject($input: getUserProjectInput!) {
    getUserProject(input: $input) {
      _id
      project_name
      project_image
      project_description
      owner_id
      stuffs {
        _id
        user_name
        user_email
        user_image
      }
      updated_at
      created_at
    }
  }
`

export const GET_PROJECT = gql`
query GetProject($input: getProjectInput!) {
  getProject(input: $input) {
    _id
    project_name
    project_image
    project_description
    owner_id
    parent_project_id
    stuffs {
      _id
      user_name
      user_email
      user_image
    }
    updated_at
    created_at
  }
}
`