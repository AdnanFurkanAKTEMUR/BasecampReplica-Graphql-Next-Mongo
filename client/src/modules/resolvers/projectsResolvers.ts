import { gql } from "@apollo/client"

export const GET_ALL_PROJECTS = gql`
  query GetAllProjects {
    getAllProjects {
      _id
      project_name
      project_image
      project_description
      owner_info {
        user_id
        user_name
        user_image
      }
      parent_project_id
      updated_at
      created_at
    }
  }
`

export const GET_OWNER_PROJECTS = gql`
  query GetOWnerProject($input: getUserProjectInput!) {
    getOwnerProject(input: $input) {
      _id
      project_name
      project_image
      project_description
      owner_info {
        user_id
        user_name
        user_image
      }
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
    owner_info {
        user_id
        user_name
        user_image
      }
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

export const GET_STUFF_PROJECT = gql`
query GetStuffProject($input: getUserProjectInput!) {
  getStuffProject(input: $input) {
    _id
    project_name
    project_image
    project_description
    owner_info {
      user_id
      user_name
      user_image
    }
    parent_project_id
    stuffs {
      _id
      user_name
      user_image
    }
    updated_at
    created_at
  }
}
`

export const CREATE_PROJECT = gql`
  mutation CreateProject($input: createProjectInput) {
    createProject(input: $input) {
      _id
      project_name
      project_image
      project_description
      owner_info {
        user_id
        user_name
        user_image
      }
      parent_project_id
      stuffs {
        _id
        user_email
        user_image
        user_name
      }
      updated_at
      created_at
    }
  }
`

export const UPDATE_PROJECT = gql`
mutation UpdateProject($input: updateProjectInput) {
  updateProject(input: $input) {
    _id
    project_name
    project_image
    project_description
    owner_info {
      user_id
      user_name
      user_image
    }
    parent_project_id
    stuffs {
      _id
      user_email
      user_image
      user_name
    }
    updated_at
    created_at
  }
}
`