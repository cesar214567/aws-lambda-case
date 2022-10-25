// Import the MongoDB driver
import {MongoClient} from 'mongodb';


export const connectToDatabase = async () => {
  // Define our connection string. Info on where to get this will be described below. In a real world application you'd want to get this string from a key vault like AWS Key Management, but for brevity, we'll hardcode it in our serverless function here.
  const MONGODB_URI =
  "mongodb+srv://cesar214567:masterking212@cluster0.zy8g2k3.mongodb.net/?retryWrites=true&w=majority"
  // Once we connect to the database once, we'll store that connection and reuse it so that we don't have to connect to the database on every request
  // Connect to our MongoDB database hosted on MongoDB Atlas
  const client = await MongoClient.connect(MONGODB_URI)
  // Specify which database we want to use
  const db = client.db("test");
  return db;
}
