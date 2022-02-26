import { Db, MongoClient } from 'mongodb';
import config from '../config';
import { postLogger } from './logger.service';
import { Collection } from 'mongodb';

const dbName = 'poster_posts';
let dbConn: Db | null = null;

export async function getCollection(
  collectionName: string
): Promise<undefined | Collection> {
  let collection: undefined | Collection;

  try {
    const db = await connect();
    collection = await db.collection(collectionName);
  } catch (err) {
    postLogger.error(err);
    throw err;
  }

  return collection;
}

async function connect() {
  if (dbConn) return dbConn;
  try {
    const client = await MongoClient.connect(config.dbURL);
    const db = client.db(dbName);
    dbConn = db;
    return db;
  } catch (err) {
    console.log('Cannot Connect to DB', err);
    throw err;
  }
}
