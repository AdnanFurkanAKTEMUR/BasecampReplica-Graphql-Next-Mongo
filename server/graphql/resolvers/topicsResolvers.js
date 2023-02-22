const ObjectId = require('mongodb').ObjectId;
module.exports = {

  Query: {
    getAllTopics: async (_, { input }, { req, res, client }) => {
      try {
        const topicCollection = await client.db("basecampReplica").collection("topics")
        const allTopics = await topicCollection.find({}).toArray()
        return allTopics ? allTopics : null
      } catch (e) {
        throw new Error("We have an error! " + e)
      }
    },
    getAllTopicsOfProject: async (_, { input }, { req, res, client }) => {
      try {
        const topicCollection = await client.db("basecampReplica").collection("topics")
        const allTopics = await topicCollection.find({ project_id: input?.project_id }).toArray()
        return allTopics ? allTopics : null
      } catch (e) {
        throw new Error("We have an error! " + e)
      }
    },
    getTopic: async (_, { input }, { req, res, client }) => {
      try {
        const topicCollection = await client.db("basecampReplica").collection("topics")
        const topic = await topicCollection.findOne({ _id: new ObjectId(input?._id) })
        return topic ? topic : null
      } catch (e) {
        throw new Error("We have an error! " + e)
      }
    }
  },

  Mutation: {
    createTopic: async (_, { input }, { req, res, client }) => {
      try {
        const topicCollection = await client.db("basecampReplica").collection("topics")
        const topic = await topicCollection.insertOne({
          project_id: input?.project_id,
          topic_name: input?.topic_name,
          topic_description: input?.topic_description
        })
        if (topic.acknowledged) {
          const createdTopic = await topicCollection.findOne({ _id: topic.insertedId })
          return createdTopic ? createdTopic : null
        } else {
          return null
        }
      } catch (e) {
        throw new Error("We have an error! " + e)
      }
    },

    updateTopic: async (_, { input }, { req, res, client }) => {
      try {
        const topicCollection = await client.db("basecampReplica").collection("topics")
        const topicUpdate = await topicCollection.updateOne({ _id: new ObjectId(input?._id) }, {
          $set: {
            topic_name: input?.topic_name,
            topic_description: input?.topic_description
          }
        })
        if (topicUpdate.modifiedCount > 0) {
          const topic = await topicCollection.findOne({ _id: new ObjectId(input?._id) })
          return topic ? topic : null
        } else {
          return null
        }
      } catch (e) {
        throw new Error("We have an error! " + e)
      }
    },
    deleteTopic: async (_, { input }, { req, res, client }) => {
      try {
        const topicCollection = await client.db("basecampReplica").collection("topics")
        const deletedTopic = await topicCollection.findOne({ _id: new ObjectId(input?._id) })
        const topic = await topicCollection.deleteOne({ _id: new ObjectId(input?._id) })

        if (topic.deletedCount > 0) {
          return deletedTopic ? deletedTopic : null
        } else {
          return null
        }
      } catch (e) {
        throw new Error("We found an error! " + e)
      }
    }
  }

}