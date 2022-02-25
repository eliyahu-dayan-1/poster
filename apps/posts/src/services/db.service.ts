import { MongoClient } from 'mongodb';
import config from '../config';
import * as logger from './logger.service'

const dbName = 'poster_posts';

let dbConn = null;

export async function getCollection(collectionName) {
  try {
    const db = await connect();
    return db.collection(collectionName);
  } catch (err) {
    logger.error(err)
  }
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
