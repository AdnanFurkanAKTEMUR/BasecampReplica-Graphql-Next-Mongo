module.exports = {

  Query: {
    getAllExamples: async (_, {input}, {req, res, client}) => {
      return null
    }
  },

  Mutation: {
    deleteExample: async (_ , { input }, { req, res, client })=>{
      return null
    }
  }

}