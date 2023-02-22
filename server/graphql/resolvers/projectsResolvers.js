const ObjectId = require('mongodb').ObjectId;
module.exports = {

  Query: {
    getAllProjects: async (_, { input }, { req, res, client }) => {
      try {
        const projectCollection = await client.db("basecampReplica").collection("projects")
        const allProjects = await projectCollection.find({}).toArray()
        return allProjects ? allProjects : null
      } catch (e) {
        throw new Error("We have an error! " + e)
      }
    },
    getProject: async (_, { input }, { req, res, client }) => {
      try {
        const projectCollection = await client.db("basecampReplica").collection("projects")
        const project = await projectCollection.findOne({ _id: new ObjectId(input?._id) })
        return project ? project : null
      } catch (e) {
        throw new Error("We have an error! " + e)
      }
    }
  },

  Mutation: {
    createProject: async (_, { input }, { req, res, client }) => {
      try {
        const projectCollection = await client.db("basecampReplica").collection("projects")
        const project = await projectCollection.insertOne({
          project_name: input?.project_name,
          project_image: input?.project_image,
          project_description: input?.project_description,
          owner_id: input?.owner_id,
          parent_project_id: input?.parent_project_id,
          created_at: new Date(),
          updated_at: new Date()
        })
        if (project.acknowledged) {
          const createdProject = await projectCollection.findOne({ _id: project.insertedId })
          return createdProject ? createdProject : null
        } else {
          return null
        }
      } catch (e) {
        throw new Error("We have an error! " + e)
      }
    },

    updateProject: async (_, { input }, { req, res, client }) => {
      try {
        const projectCollection = await client.db("basecampReplica").collection("projects")
        const projectUpdate = await projectCollection.updateOne({ _id: new ObjectId(input?._id) }, {
          $set: {
            project_name: input?.project_name,
            project_image: input?.project_image,
            project_description: input?.project_description,
            parent_project_id: input?.parent_project_id,
            updated_at: new Date()
          }
        })
        if (projectUpdate.modifiedCount > 0) {
          const project = await projectCollection.findOne({ _id: new ObjectId(input?._id) })
          return project ? project : null
        } else {
          return null
        }
      } catch (e) {
        throw new Error("We have an error! " + e)
      }
    },
    deleteProject: async (_, { input }, { req, res, client }) => {
      try {
        const projectCollection = await client.db("basecampReplica").collection("projects")
        const deletedProject = await projectCollection.findOne({ _id: new ObjectId(input?._id) })
        const project = await projectCollection.deleteOne({ _id: new ObjectId(input?._id) })

        if (project.deletedCount > 0) {
          return deletedProject ? deletedProject : null
        } else {
          return null
        }
      } catch (e) {
        throw new Error("We found an error! " + e)
      }
    }
  }

}