const ObjectId = require('mongodb').ObjectId;
module.exports = {

  Query: {
    getAllTodos: async (_, { input }, { req, res, client }) => {
      try {
        const todoCollection = await client.db("basecampReplica").collection("todos")
        const allTodos = await todoCollection.find({}).toArray()
        return allTodos ? allTodos : null
      } catch (e) {
        throw new Error("We have an error! " + e)
      }
    },
    getAllTodosOfTopic: async (_, { input }, { req, res, client }) => {
      try {
        const todoCollection = await client.db("basecampReplica").collection("todos")
        const allTodos = await todoCollection.find({ topic_id: input?.topic_id }).toArray()
        return allTodos ? allTodos : null
      } catch (e) {
        throw new Error("We have an error! " + e)
      }
    },
    getTodo: async (_, { input }, { req, res, client }) => {
      try {
        const todoCollection = await client.db("basecampReplica").collection("todos")
        const todo = await todoCollection.findOne({ _id: new ObjectId(input?._id) })
        return todo ? todo : null
      } catch (e) {
        throw new Error("We have an error! " + e)
      }
    }
  },

  Mutation: {
    createTodo: async (_, { input }, { req, res, client }) => {
      try {
        const todoCollection = await client.db("basecampReplica").collection("todos")
        const userCollection = await client.db("basecampReplica").collection("users")
        const ownersIds = input.owner_ids.map((a) => {
          return new ObjectId(a)
        })
        const owners = await userCollection.find({ _id: { $in: ownersIds } }).toArray()
        const todo = await todoCollection.insertOne({
          topic_id: input?.topic_id,
          todo_name: input?.todo_name,
          todo_owners: owners,
          todo_description: input?.todo_description,
          created_at: new Date(),
          updated_at: new Date()
        })
        if (todo.acknowledged) {
          const createdTodo = await todoCollection.findOne({ _id: todo.insertedId })
          return createdTodo ? createdTodo : null
        } else {
          return null
        }
      } catch (e) {
        throw new Error("We have an error! " + e)
      }
    },

    updateTodo: async (_, { input }, { req, res, client }) => {
      try {
        const todoCollection = await client.db("basecampReplica").collection("todos")
        const todoUpdate = await todoCollection.updateOne({ _id: new ObjectId(input?._id) }, {
          $set: {
            todo_name: input?.todo_name,
            todo_description: input?.todo_description,
            todo_owner_id: input?.todo_owner_id,
            updated_at: new Date()
          }
        })
        if (todoUpdate.modifiedCount > 0) {
          const todo = await todoCollection.findOne({ _id: new ObjectId(input?._id) })
          return todo ? todo : null
        } else {
          return null
        }
      } catch (e) {
        throw new Error("We have an error! " + e)
      }
    },
    deleteTodo: async (_, { input }, { req, res, client }) => {
      try {
        const todoCollection = await client.db("basecampReplica").collection("todos")
        const deletedTodo = await todoCollection.findOne({ _id: new ObjectId(input?._id) })
        const todo = await todoCollection.deleteOne({ _id: new ObjectId(input?._id) })

        if (todo.deletedCount > 0) {
          return deletedTodo ? deletedTodo : null
        } else {
          return null
        }
      } catch (e) {
        throw new Error("We found an error! " + e)
      }
    },
    updateTodoOwners: async (_, { input }, { req, res, client }) => {
      try {
        const userCollection = await client.db("basecampReplica").collection("users")
        const todosCollection = await client.db("basecampReplica").collection("todos")
        const owner = await userCollection.findOne({ _id: new ObjectId(input?.user_id) })
        if (input?.process == "add") {
          const todoUpdate = await todosCollection.updateOne({ _id: new ObjectId(input?.todo_id) },
            {
              $push: {
                todo_owners: owner
              }
            })
          await userCollection.updateOne({ _id: new ObjectId(input?.user_id) },
            {
              $push: {
                todo_ids: input?.todo_id
              }
            })
          if (todoUpdate.modifiedCount > 0) {
            const todo = await todosCollection.findOne({ _id: new ObjectId(input?.todo_id) })
            return todo ? todo : null
          } else {
            return null
          }
        } else if (input?.process == "delete") {
          const todoUpdate = await todosCollection.updateOne({ _id: new ObjectId(input?.todo_id) },
            {
              $pull: {
                todo_owners: { _id: new ObjectId(input?.user_id) }
              }
            })
          await userCollection.updateOne({ _id: new ObjectId(input?.user_id) },
            {
              $pull: {
                todo_ids: input?.todo_id
              }
            })
          if (todoUpdate.modifiedCount > 0) {
            const todo = await todosCollection.findOne({ _id: new ObjectId(input?.todo_id) })
            return todo ? todo : null
          } else {
            return null
          }
        } else {
          return null
        }
      } catch (e) {
        throw new Error("We found an error! " + e)
      }
    }
  }

}