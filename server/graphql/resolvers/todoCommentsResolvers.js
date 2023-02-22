const ObjectId = require('mongodb').ObjectId;
module.exports = {

  Query: {
    getAllComments: async (_, { input }, { req, res, client }) => {
      try {
        const commentCollection = await client.db("basecampReplica").collection("todo_comments")
        const allComments = await commentCollection.find({}).toArray()
        return allComments ? allComments : null
      } catch (e) {
        throw new Error("We have an error! " + e)
      }
    },
    getAllCommentsOfTodo: async (_, { input }, { req, res, client }) => {
      try {
        const commentCollection = await client.db("basecampReplica").collection("todo_comments")
        const allComments = await commentCollection.find({ todo_id: input?.todo_id }).toArray()
        return allComments ? allComments : null
      } catch (e) {
        throw new Error("We have an error! " + e)
      }
    },
    getComment: async (_, { input }, { req, res, client }) => {
      try {
        const commentCollection = await client.db("basecampReplica").collection("todo_comments")
        const comment = await commentCollection.findOne({ _id: new ObjectId(input?._id) })
        return comment ? comment : null
      } catch (e) {
        throw new Error("We have an error! " + e)
      }
    }
  },

  Mutation: {
    createComment: async (_, { input }, { req, res, client }) => {
      try {
        const commentCollection = await client.db("basecampReplica").collection("todo_comments")
        const comment = await commentCollection.insertOne({
          todo_id: input?.todo_id,
          comment_owner_id: input?.comment_owner_id,
          comment_owner_name: input?.comment_owner_name,
          comment: input?.comment,
          created_at: new Date(),
          updated_at: new Date()
        })
        if (comment.acknowledged) {
          const createdComment = await commentCollection.findOne({ _id: comment.insertedId })
          return createdComment ? createdComment : null
        } else {
          return null
        }
      } catch (e) {
        throw new Error("We have an error! " + e)
      }
    },

    updateComment: async (_, { input }, { req, res, client }) => {
      try {
        const commentCollection = await client.db("basecampReplica").collection("todo_comments")
        const commentUpdate = await commentCollection.updateOne({ _id: new ObjectId(input?._id) }, {
          $set: {
            comment: input?.comment,
            updated_at: new Date()
          }
        })
        if (commentUpdate.modifiedCount > 0) {
          const comment = await commentCollection.findOne({ _id: new ObjectId(input?._id) })
          return comment ? comment : null
        } else {
          return null
        }
      } catch (e) {
        throw new Error("We have an error! " + e)
      }
    },
    deleteComment: async (_, { input }, { req, res, client }) => {
      try {
        const commentCollection = await client.db("basecampReplica").collection("todo_comments")
        const deletedComment = await commentCollection.findOne({ _id: new ObjectId(input?._id) })
        const comment = await commentCollection.deleteOne({ _id: new ObjectId(input?._id) })

        if (comment.deletedCount > 0) {
          return deletedComment ? deletedComment : null
        } else {
          return null
        }
      } catch (e) {
        throw new Error("We found an error! " + e)
      }
    }
  }

}