import { authLogger } from './logger.service';
import config from '../../config';
import { CollectionService } from '@poster/db-service';

const BLACK_LIST_COLLECTION = 'black_list';
const PASSWORD_COLLECTION = 'passwords';
const USERS_COLLECTION = 'users';
const DB_NAME = 'poster_auth';
const dbURL = config.dbURL;

const passwordCollection = new CollectionService({
  collectionName: PASSWORD_COLLECTION,
  dbName: DB_NAME,
  dbURL: dbURL,
  logger: authLogger,
});
const blacklistCollection = new CollectionService({
  collectionName: BLACK_LIST_COLLECTION,
  dbName: DB_NAME,
  dbURL: dbURL,
  logger: authLogger,
});
const userCollection = new CollectionService({
  collectionName: USERS_COLLECTION,
  dbName: DB_NAME,
  dbURL: dbURL,
  logger: authLogger,
});

export { passwordCollection, blacklistCollection, userCollection };
