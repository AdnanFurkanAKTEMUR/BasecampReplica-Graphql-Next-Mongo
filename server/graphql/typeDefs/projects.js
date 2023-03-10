const { gql } = require("apollo-server")


//stuff eklenecek
module.exports = gql`

type Project {
  _id: String
  project_name: String
  project_image: String
  project_description: String
  owner_info: Owner_Info
  parent_project_id: String
  stuffs: [ User ]
  updated_at: String
  created_at: String
}

type Owner_Info {
  user_id: String
  user_name: String
  user_image: String
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
  stuff: [String]
}

input updateProjectInput {
  _id: String!
  project_name: String
  project_image: String
  project_description: String
  parent_project_id: String
  stuff: [String]
}

input deleteProjectInput {
  _id: String!
  user_id: String!
}

input updateProjectStuffInput{
  user_id: String!
  project_id: String!
  process: String!
}

input getUserProjectInput{
  user_id: String!
}

type Query{
  getAllProjects:[Project]
  getProject(input: getProjectInput!):Project
  getOwnerProject(input: getUserProjectInput!): [Project]
  getStuffProject(input: getUserProjectInput!): [Project]
}

type Mutation {
  createProject(input: createProjectInput): Project
  updateProject(input: updateProjectInput): Project
  deleteProject(input: deleteProjectInput): Project
  updateProjectStuff(input: updateProjectStuffInput): Project
}
`