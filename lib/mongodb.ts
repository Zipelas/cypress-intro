import 'server-only';
import { MongoClient, Db } from 'mongodb';

const uri = process.env.DATABASE_URL;
if (!uri) throw new Error('Missing DATABASE_URL in .env');

let db: Db | null = null;

export async function getDb(): Promise<Db> {
  if (db) return db;


  const g = global as typeof global & { _mongoClientPromise?: Promise<MongoClient> };
  if (!g._mongoClientPromise) {
    g._mongoClientPromise = new MongoClient(uri as string).connect();
  }
  const client = (await g._mongoClientPromise) as MongoClient;
  db = client.db(); // DB-namnet hämtas från din connection string (cypress-dev)
  return db;
}
