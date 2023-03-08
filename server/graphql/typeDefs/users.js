const { gql } = require("apollo-server")


//stuff eklenecek
module.exports = gql`

type User {
  _id: String
  user_name: String
  user_password: String
  user_email: String
  user_image: String
  token: String
  project_ids: [ String ]
  todo_ids: [ String ]
  updated_at: String
  created_at: String
}

input getUserInput{
  _id: String!
}

input createUserInput {
  user_name: String!
  user_password: String
  user_email: String
  user_image: String

}

input updateUserInput {
  _id: String!
  user_name: String!
  user_password: String
  user_email: String
  user_image: String
}

input deleteUserInput {
  _id: String!
}

input loginUserInput {
 user_email: String!
 user_password: String!
}

input getStuffInput {
  user_id: String!
}

type Query{
  getAllUsers: [User]
  getUser(input: getUserInput!): User
  checkToken: User
  logout: String
  getStuff(input: getStuffInput!): [ User ]
}

type Mutation {
  createUser(input: createUserInput): User
  updateUser(input: updateUserInput): User
  deleteUser(input: deleteUserInput): User
  loginUser(input: loginUserInput!): User
}
`