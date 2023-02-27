const ObjectId = require('mongodb').ObjectId;
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const cookie = require('cookie')
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
    },
    checkToken: async (_, __, { req, res, client }) => {
      try {
        if (req && req.headers) {
          const userCollection = await client.db("basecampReplica").collection("users")
          const cookies = cookie.parse(req.headers.cookie)
          const userVerify = jwt.verify(cookies.token, "UNSAFE_STRING")
          const user = await userCollection.findOne({ _id: userVerify.user_id })
          if (user) {
            return user
          } else {
            throw new Error("Kullanıcı doğrulaması başarısız!" + e)
          }
        }
      } catch (e) {
        throw new Error("We found an error! " + e)
      }
    },
    logout: async (_, __, { req, res, client }) => {
      try {
        await res.cookie("token", "", { httpOnly: true, secure: true })
        return "Çıkış başarılı!"
      } catch (e) {
        throw new Error("We found an error! " + e)
      }
    },
  },

  Mutation: {
    createUser: async (_, { input }, { req, res, client }) => {
      try {
        const userCollection = await client.db("basecampReplica").collection("users")
        const oldUser = await userCollection.findOne({ _id: input?.user_email })
        if (oldUser) {
          throw new Error("Kullanıcı zaten kayıtlı.")
        }
        const enPass = await bcrypt.hash(input?.user_password, 10)
        const user = await userCollection.insertOne({
          user_name: input?.user_name,
          user_password: enPass,
          user_email: input?.user_email,
          user_image: input?.user_image,
          created_at: new Date(),
          updated_at: new Date()
        })

        if (user.acknowledged) {
          const token = jwt.sign({
            user_id: user.insertedId,
            user_email: input?.user_email,
            user_name: input?.user_name,
            user_image: input?.user_image,
            created_at: new Date(),
          }, "UNSAFE_STRING", { expiresIn: "2h" })
          await userCollection.updateOne({ _id: user.insertedId }, { $set: { token: token } })
          const createdUser = await userCollection.findOne({ _id: user.insertedId })
          return createdUser ? createdUser : null
        } else {
          return null
        }
      } catch (e) {
        throw new Error("We have an error! " + e)
      }
    },
    loginUser: async (_, { input }, { req, res, client }) => {
      try {

        const userCollection = await client.db("basecampReplica").collection("users")
        const user = await userCollection.findOne({ user_email: input?.user_email })
        const dogrula = await bcrypt.compare(input?.user_password, user.user_password)

        if (user && dogrula) {
          const token = jwt.sign({
            user_id: user._id,
            user_email: user.user_email,
            user_name: user.user_name,
            user_image: user.user_image,
            created_at: user?.created_at
          }, "UNSAFE_STRING", { expiresIn: "2h" })
          await res.cookie("token", token, { httpOnly: true, secure: true })

          await userCollection.updateOne({ _id: user._id }, { $set: { token: token } })
          const updatedUser = await userCollection.findOne({ _id: user._id })
          return updatedUser ? updatedUser : null
        } else {
          throw new Error("Doğrulama başarısız oldu!")
        }

      } catch (e) {
        throw new Error("we found an error!")
      }
    },
    updateUser: async (_, { input }, { req, res, client }) => {
      try {
        const userCollection = await client.db("basecampReplica").collection("users")
        const userUpdate = await userCollection.updateOne({ _id: new ObjectId(input?._id) }, {
          $set: {
            user_name: input?.user_name,
            user_password: input?.user_password,
            user_email: input?.user_email,
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