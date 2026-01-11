import { MongoClient, Db } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) {
  // Don't throw at import time; throw only when function runs
  console.warn("Warning: MONGODB_URI is not set!");
}

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function getDb(): Promise<Db> {
  if (!uri) {
    throw new Error("MONGODB_URI environment variable is missing");
  }

  if (cachedDb) return cachedDb;

  if (!cachedClient) {
    const client = new MongoClient(uri);
    await client.connect();
    cachedClient = client;
  }

  cachedDb = cachedClient.db("Snippethub-pro");
  return cachedDb;
}
