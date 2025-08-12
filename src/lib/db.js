"use server";

const { MongoClient, ServerApiVersion } = require("mongodb");

//check if db uri exists
const dbUri = process.env.DB_URI;
if (!dbUri) {
  throw new Error("DB_URI is not defined in the environment variables");
}

//create a new MongoDB client
const client = new MongoClient(dbUri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

//connect to the database
async function getDb(dbName) {
  try {
    await client.connect();
    console.log("Connected to the database successfully.");
    return client.db(dbName);
  } catch (error) {
    console.log("Failed to connect to the database:", error);
  }
}

//function to get collections
export async function getCollection(colletionName) {
  const db = await getDb("blogsite");
  if (db) {
    return db.collection(colletionName);
  } else {
    console.log("Error retrieving collections");
  }
}
