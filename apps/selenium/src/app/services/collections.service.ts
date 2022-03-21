import { postLogger } from './logger.service';
import config from '../../config';
import { CollectionService } from '@poster/db-service';
import { POST_COLLECTIONS } from '../interfaces/data-contracts/COLLECTION_NAMES';

const POST_DB_NAME = 'poster_posts';
const dbURL = config.dbURL;

const postCollection = new CollectionService({
  collectionName: POST_COLLECTIONS.POST,
  dbName: POST_DB_NAME,
  dbURL: dbURL,
  logger: postLogger,
});

export { postCollection };