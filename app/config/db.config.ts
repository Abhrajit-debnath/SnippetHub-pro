import { MongoClient } from "mongodb";

if (!process.env.MONGODB_URI) {
    throw new Error("MongoDb uri not found")
}

const uri = process.env.MONGODB_URI

const client = new MongoClient(uri)

let isConnected = false

export async function getDb() {
    try {
        if (!isConnected) {
            await client.connect()
            isConnected = true
        }
        
        
    } catch (error) {
        console.log(error);
        
    }

    return client.db("Snippethub-pro")
}
