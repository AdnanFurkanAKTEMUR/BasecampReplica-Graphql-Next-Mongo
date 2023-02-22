const ObjectId = require('mongodb').ObjectId;
module.exports = {

  Query: {
    getAllTodos: async (_, {input}, {req, res, client}) => {
      try{
        const todoCollection = await client.db("basecampReplica").collection("todos")
        const allTodos = await todoCollection.find({}).toArray()
        return allTodos ? allTodos : null
      }catch(e){
        throw new Error("We have an error! " + e)
      }
    },
    getAllTodosOfTopic: async (_, {input}, {req, res, client}) => {
      try{
        const todoCollection = await client.db("basecampReplica").collection("todos")
        const allTodos = await todoCollection.find({topic_id: input?.topic_id}).toArray()
        return allTodos ? allTodos : null
      }catch(e){
        throw new Error("We have an error! " + e)
      }
    },
    getTodo: async (_, { input }, { req, res, client }) => {
      try{
        const todoCollection = await client.db("basecampReplica").collection("todos")
        const todo = await todoCollection.findOne({ _id: new ObjectId(input?._id) })
        return todo ? todo : null
      }catch(e){
        throw new Error("We have an error! " + e)
      }
    }
  },

  Mutation: {
    createTodo: async (_ , { input }, { req, res, client }) => {
      try{
        const todoCollection = await client.db("basecampReplica").collection("todos")
        const todo = await todoCollection.insertOne({
          topic_id: input?.topic_id,
          todo_name: input?.todo_name,
          todo_description: input?.todo_description,
          todo_owner_id: input?.todo_owner_id
        })
        if(todo.acknowledged){
          const createdTodo = await todoCollection.findOne({ _id: todo.insertedId})
          return createdTodo ? createdTodo : null
        }else {
          return null
        }
      }catch(e){
        throw new Error("We have an error! " + e)
      }
    },

    updateTodo: async ( _, { input }, { req, res, client }) => {
      try{
        const todoCollection = await client.db("basecampReplica").collection("todos")
        const todoUpdate = await todoCollection.updateOne({ _id: new ObjectId(input?._id) }, {
          $set:{
            todo_name: input?.todo_name,
            todo_description: input?.todo_description,
            todo_owner_id: input?.todo_owner_id
          }
        })
        if(todoUpdate.modifiedCount>0){
          const todo = await todoCollection.findOne({ _id:new ObjectId(input?._id) })
          return todo ? todo : null
        }else{
          return null
        }
      }catch(e){
        throw new Error("We have an error! " + e)
      }
    },
    deleteTodo: async ( _, { input }, { req, res, client }) => {
      try{
        const todoCollection = await client.db("basecampReplica").collection("todos")
        const deletedTodo = await todoCollection.findOne({ _id: new ObjectId(input?._id) })
        const todo = await todoCollection.deleteOne({ _id: new ObjectId(input?._id) })
        
        if(todo.deletedCount > 0){
          return deletedTodo ? deletedTodo : null
        }else{
          return null
        }
      }catch(e){
        throw new Error("We found an error! " + e)
      }
    }
  }

}