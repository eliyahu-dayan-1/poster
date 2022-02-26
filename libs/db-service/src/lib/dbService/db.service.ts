import { Logger } from '@poster/logger-service';
import { Db, MongoClient, Collection } from 'mongodb';

interface Constractor {
  dbName: string;
  dbURL: string;
  logger?: Console | Logger;
}
class DbService {
  constructor({ dbName, dbURL, logger = console }: Constractor) {
    this.dbName = dbName;
    this.dbURL = dbURL;
    this.logger = logger;
  }
  logger: Console | Logger;
  dbURL: string;
  dbConn: Db | undefined;
  dbName = '';
  getCollection = async (
    collectionName: string
  ): Promise<undefined | Collection> => {
    let collection: undefined | Collection;

    try {
      const db = await this.connect();
      collection = await db.collection(collectionName);
    } catch (err) {
      this.logger.error(err);
      throw err;
    }

    return collection;
  };

  connect = async () => {
    if (this.dbConn) return this.dbConn;
    try {
      const client = await MongoClient.connect(this.dbURL);
      const db = client.db(this.dbName);
      this.dbConn = db;
      return db;
    } catch (err) {
      this.logger.log(`Cannot Connect to DB ${err}`);
      throw err;
    }
  };
}

export default DbService;
