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