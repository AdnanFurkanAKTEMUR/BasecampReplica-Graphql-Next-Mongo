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