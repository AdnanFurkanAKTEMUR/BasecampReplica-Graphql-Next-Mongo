module.exports = {

  Query: {
    getAllProjects: async (_, {input}, {req, res, client}) => {
      try{
        const projectCollection = await client.db("basecampReplica").collection("projects")
        const allProjects = await projectCollection.find({}).toArray()
        return allProjects ? allProjects : null
      }catch(e){
        throw new Error("We have an error!")
      }
    },
    getProjects: async (_, { input }, { req, res, client }) => {
      try{
        const projectCollection = await client.db("basecampReplica").collection("projects")
        const project = await projectCollection.findOne({ _id: input._id })
        return project ? project : null
      }catch(e){
        throw new Error("We have an error!")
      }
    }
  },

  Mutation: {
    createProject: async (_ , { input }, { req, res, client }) => {
      try{
        const projectCollection = await client.db("basecampReplica").collection("projects")
        const project = await projectCollection.insertOne({
          project_name:input?.project_name,
          project_image:input?.project_image,
          project_description:input?.project_description,
          owner_id: input?.owner_id,
          parent_project_id: input?.parent_project_id
        })
        return project ? project : null
      }catch(e){
        throw new Error("We have an error!")
      }
    },

    updateProject: async ( _, { input }, { req, res, client }) => {
      return null
    }
  }

}