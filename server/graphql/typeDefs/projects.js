const { gql } = require("apollo-server")


//stuff eklenecek
module.exports = gql`

type Project {
  _id: String
  project_name: String
  project_image: String
  project_description: String
  owner_id: String
  parent_project_id: String
  stuffs: [ User ]
  updated_at: String
  created_at: String
}

input getProjectInput{
  _id: String!
}

input createProjectInput {
  project_name: String!
  project_image: String!
  project_description: String!
  owner_id: String
  parent_project_id: String
}

input updateProjectInput {
  _id: String!
  project_name: String
  project_image: String
  project_description: String
  parent_project_id: String
}

input deleteProjectInput {
  _id: String!
}

input updateProjectStuffInput{
  user_id: String!
  project_id: String!
  process: String!
}

type Query{
  getAllProjects:[Project]
  getProject(input: getProjectInput!):Project
}

type Mutation {
  createProject(input: createProjectInput): Project
  updateProject(input: updateProjectInput): Project
  deleteProject(input: deleteProjectInput): Project
  updateProjectStuff(input: updateProjectStuffInput): Project
}
`