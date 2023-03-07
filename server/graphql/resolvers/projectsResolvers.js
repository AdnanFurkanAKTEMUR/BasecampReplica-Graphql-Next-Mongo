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
    },
    getOwnerProject: async (_,{input}, { req, res, client }) => {
      try{
        const projectCollection = await client.db("basecampReplica").collection("projects")
        const project = await projectCollection.find({ "owner_info.user_id": new ObjectId(input?.user_id), parent_project_id: null }).toArray()
        return project ? project : null
      } catch(e){
        throw new Error("We have an error! " + e)
      }
    },
    getStuffProject: async (_,{input}, { req, res, client }) => {
      try{
        const projectCollection = await client.db("basecampReplica").collection("projects")
        const project = await projectCollection.find({ stuffs: {$elemMatch:{_id: new ObjectId(input.user_id)}}, parent_project_id: null }).toArray()
        return project ? project : null
      } catch(e){
        throw new Error("We have an error! " + e)
      }
    }
  },

  Mutation: {
    createProject: async (_, { input }, { req, res, client }) => {
      try {
        const projectCollection = await client.db("basecampReplica").collection("projects")
        const userCollection = await client.db("basecampReplica").collection("users")
        const user = await userCollection.findOne({_id: new ObjectId(input?.owner_id)})
        const project = await projectCollection.insertOne({
          project_name: input?.project_name,
          project_image: input?.project_image,
          project_description: input?.project_description,
          owner_info: {
            user_id:user._id,
            user_name: user.user_name,
            user_image: user.user_image
          },
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
    },
    updateProjectStuff: async (_, { input }, { req, res, client }) => {
      try{
        const userCollection = await client.db("basecampReplica").collection("users")
        const projectsCollection = await client.db("basecampReplica").collection("projects")
        const stuff = await userCollection.findOne({ _id: new ObjectId(input?.user_id)})
        if(input?.process == "add"){  
          const projectUpdate = await projectsCollection.updateOne({ _id: new ObjectId(input?.project_id)},
          {
            $push:{
              stuffs: stuff
            }
          })

          await userCollection.updateOne({ _id: new ObjectId(input?.user_id)},
            {
              $push:{
                project_ids: input?.project_id
              }
            })
          if(projectUpdate.modifiedCount > 0){
            const project = await projectsCollection.findOne({ _id: new ObjectId(input?.project_id) })
            return project ? project : null
          }else {
            return null
          }
        } else if(input?.process == "delete"){
          const projectUpdate = await projectsCollection.updateOne({ _id: new ObjectId(input?.project_id)},
          {
            $pull:{
              stuffs: { _id: new ObjectId(input?.user_id)}
            }
          })

          await userCollection.updateOne({ _id: new ObjectId(input?.user_id)},
          {
            $pull: {
              project_ids: input?.project_id
            }
          })
          if(projectUpdate.modifiedCount > 0 ){
            const project = await projectsCollection.findOne({ _id: new ObjectId(input?.project_id)})
            return project ? project : null
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
  }

}