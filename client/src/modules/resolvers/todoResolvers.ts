import { gql } from "@apollo/client"

export const GET_TODOS_OF_TOPIC = gql`
query GetAllTodosOfTopic($input: getAllTodosOfTopicInput) {
  getAllTodosOfTopic(input: $input) {
    _id
    topic_id
    todo_name
    todo_owners {
      _id
      user_email
      user_image
      user_name
    }
    todo_description
    updated_at
    created_at
  }
}
`

export const CREATE_TODO = gql`
mutation CreateTodo($input: createTodoInput!) {
  createTodo(input: $input) {
    _id
    topic_id
    todo_name
    todo_owners {
      _id
      user_email
      user_image
      user_name
    }
    todo_description
    updated_at
    created_at
  }
}
`