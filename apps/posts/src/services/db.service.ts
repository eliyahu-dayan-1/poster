import { MongoClient } from 'mongodb';

import config from '../config';

// Database Name
const dbName = 'poster_db';

let dbConn = null;

export async function getCollection(collectionName) {
  const db = await connect();
  return db.collection(collectionName);
}

async function connect() {
  if (dbConn) return dbConn;
  try {
    const client = await MongoClient.connect(config.dbURL, {
      // @ts-expect-error:No overload matches this call.
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    // @ts-expect-error:No overload matches this call.
    const db = client.db(dbName);
    dbConn = db;
    return db;
  } catch (err) {
    console.log('Cannot Connect to DB', err);
    throw err;
  }
}
