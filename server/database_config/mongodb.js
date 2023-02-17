const { MongoClient } = require("mongodb")
const dotenv = require("dotenv")
dotenv.config()

let client;
async function mongo(){
  client = new MongoClient(process.env.MONGO_URL)
  try{
    await client.connect();
    console.log("mongodb connected")
  }catch(e){
    console.log("failed mongodb connected")
  }finally{
    //await client.close()
  }
}

mongo();
module.exports = client;