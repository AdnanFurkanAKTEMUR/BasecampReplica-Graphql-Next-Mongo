const ObjectId = require('mongodb').ObjectId;
module.exports = {

  Query: {
    getAllUsers: async (_, { input }, { req, res, client }) => {
      try {
        const userCollection = await client.db("basecampReplica").collection("users")
        const allUsers = await userCollection.find({}).toArray()
        return allUsers ? allUsers : null
      } catch (e) {
        throw new Error("We have an error! " + e)
      }
    },
    getUser: async (_, { input }, { req, res, client }) => {
      try {
        const userCollection = await client.db("basecampReplica").collection("users")
        const user = await userCollection.findOne({ _id: new ObjectId(input?._id) })
        return user ? user : null
      } catch (e) {
        throw new Error("We have an error! " + e)
      }
    }
  },

  Mutation: {
    createUser: async (_, { input }, { req, res, client }) => {
      try {
        const userCollection = await client.db("basecampReplica").collection("users")
        const user = await userCollection.insertOne({
          user_name: input?.user_name,
          user_password: input?.user_password,
          user_email: input?.user_email,
          user_image: input?.user_image,
          created_at: new Date(),
          updated_at: new Date()
        })
        if (user.acknowledged) {
          const createdUser = await userCollection.findOne({ _id: user.insertedId })
          return createdUser ? createdUser : null
        } else {
          return null
        }
      } catch (e) {
        throw new Error("We have an error! " + e)
      }
    },

    updateUser: async (_, { input }, { req, res, client }) => {
      try {
        const userCollection = await client.db("basecampReplica").collection("users")
        const userUpdate = await userCollection.updateOne({ _id: new ObjectId(input?._id) }, {
          $set: {
            user_name:input?.user_name,
            user_password:input?.user_password,
            user_email:input?.user_email,
            user_image: input?.user_image,
            updated_at: new Date()
          }
        })
        if (userUpdate.modifiedCount > 0) {
          const user = await userCollection.findOne({ _id: new ObjectId(input?._id) })
          return user ? user : null
        } else {
          return null
        }
      } catch (e) {
        throw new Error("We have an error! " + e)
      }
    },
    deleteUser: async (_, { input }, { req, res, client }) => {
      try {
        const userCollection = await client.db("basecampReplica").collection("users")
        const deletedUser = await userCollection.findOne({ _id: new ObjectId(input?._id) })
        const user = await userCollection.deleteOne({ _id: new ObjectId(input?._id) })

        if (user.deletedCount > 0) {
          return deletedUser ? deletedUser : null
        } else {
          return null
        }
      } catch (e) {
        throw new Error("We found an error! " + e)
      }
    },
    updateUserProjects: async (_, { input }, { req, res, client }) => {
      try{
        const userCollection = await client.db("basecampReplica").collection("users")
        const projectsCollection = await client.db("basecampReplica").collection("projects")
        if(input?.job == "add"){
          const userUpdate = await userCollection.updateOne({ _id: new ObjectId(input?._id)},
            {
              $push:{
                project_ids: input?.project_id
              }
            })
          await projectsCollection.updateOne({ _id: new ObjectId(input?.project_id)},
          {
            $push:{
              stuff_ids: input?._id
            }
          })
          if(userUpdate.modifiedCount > 0){
            const user = await userCollection.findOne({ _id: new ObjectId(input?._id) })
            return user ? user : null
          }else {
            return null
          }
        } else if(input?.job == "delete"){
          const userUpdate = await userCollection.updateOne({ _id: new ObjectId(input?._id)},
          {
            $pull: {
              project_ids: input?.project_id
            }
          })
          await projectsCollection.updateOne({ _id: new ObjectId(input?.project_id)},
          {
            $pull:{
              stuff_ids: input?._id
            }
          })
          if(userUpdate.modifiedCount > 0 ){
            const user = await userCollection.findOne({ _id: new ObjectId(input?._id)})
            return user ? user : null
          }else{
            return null
          }
        } else {
          return null
        }
      }catch(e){
        throw new Error("We found an error! " + e)
      }
    },
    updateUserTodos: async (_, { input }, { req, res, client }) => {
      try{
        const userCollection = await client.db("basecampReplica").collection("users")
        const todosCollection = await client.db("basecampReplica").collection("todos")
        if(input?.job == "add"){
          const userUpdate = await userCollection.updateOne({ _id: new ObjectId(input?._id)},
            {
              $push:{
                todo_ids: input?.todo_id
              }
            })
          await todosCollection.updateOne({ _id: new ObjectId(input?.todo_id)},
          {
            $push:{
              todo_owner_ids: input?._id
            }
          })
          if(userUpdate.modifiedCount > 0){
            const user = await userCollection.findOne({ _id: new ObjectId(input?._id) })
            return user ? user : null
          }else {
            return null
          }
        } else if(input?.job == "delete"){
          const userUpdate = await userCollection.updateOne({ _id: new ObjectId(input?._id)},
          {
            $pull: {
              todo_ids: input?.todo_id
            }
          })
          await todosCollection.updateOne({ _id: new ObjectId(input?.todo_id)},
          {
            $pull:{
              todo_owner_ids: input?._id
            }
          })
          if(userUpdate.modifiedCount > 0 ){
            const user = await userCollection.findOne({ _id: new ObjectId(input?._id)})
            return user ? user : null
          }else{
            return null
          }
        } else {
          return null
        }
      }catch(e){
        throw new Error("We found an error! " + e)
      }
    }
  }

}

/*
  const di_br = await db.updateOne({_id: o_id, active: true}, {$set:{
    di_id: input?.di_id,
    di_tr_i: input?.di_tr_i,
    version: input?.version,
    i: input?.i,
    line_v: input?.line_v,
    start_page: input?.start_page,
    start_line: input?.start_line,
    start_column: input?.start_column,
    dc_id: input?.dc_id,
    dc_section_i: input?.dc_section_i,
    di_tr_outline_hierarchy: [ {i: input?.hierarchy?.i, hierarchy_i: input?.hierarchy?.hierarchy_i} ],
    date_updated: new Date() },$push: {hierarchy: { i:input?.hierarchy?.i, hierarchy_index: input?.hierarchy?.hierarchy_i}}})
*/