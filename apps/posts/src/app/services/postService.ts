import { postLogger } from '../../services/logger.service';
import config from '../../config';
import { CollectionService } from '@poster/db-service';

const COLLECTION_NAME = 'posts';
const DB_NAME = 'poster_posts';
const dbURL = config.dbURL;

const postCollectionService = new CollectionService({
  collectionName: COLLECTION_NAME,
  dbName: DB_NAME,
  dbURL: dbURL,
  logger: postLogger,
});

export { postCollectionService };
