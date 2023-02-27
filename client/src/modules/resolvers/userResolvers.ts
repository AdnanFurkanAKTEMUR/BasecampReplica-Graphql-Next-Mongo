import { gql } from "@apollo/client"


export const LOGIN_USER = gql`
  mutation LoginUser($input: loginUserInput!) {
    loginUser(input: $input) {
      _id
      user_name
      user_password
      user_email
      user_image
      token
      project_ids
      todo_ids
      updated_at
      created_at
    }
  }
`

export const LOGOUT = gql`
  query Query {
    logout
  }
`

export const CHECK_TOKEN = gql`
query CheckToken {
  checkToken {
    _id
    user_name
    user_password
    user_email
    user_image
    token
    project_ids
    todo_ids
    updated_at
    created_at
  }
}
`