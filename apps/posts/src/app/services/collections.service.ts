import { postLogger } from './logger.service';
import config from '../../config';
import { CollectionService } from '@poster/db-service';

const COLLECTION_NAME = 'posts';
const DB_NAME = 'poster_posts';
const dbURL = config.dbURL;

const postCollection = new CollectionService({
  collectionName: COLLECTION_NAME,
  dbName: DB_NAME,
  dbURL: dbURL,
  logger: postLogger,
});

export { postCollection };
