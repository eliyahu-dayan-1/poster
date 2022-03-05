import { authLogger } from '../logger/logger.service';
import config from '../../../config';
import { CollectionService } from '@poster/db-service';
import { AUTH_COLLECTIONS } from '../../interfaces/data-contracts/AUTH_COLLECTIONS';

const DB_NAME = 'poster_auth';
const dbURL = config.dbURL;

const passwordCollection = new CollectionService({
  collectionName: AUTH_COLLECTIONS.PASSWORD,
  dbName: DB_NAME,
  dbURL: dbURL,
  logger: authLogger,
});
const blacklistCollection = new CollectionService({
  collectionName: AUTH_COLLECTIONS.BLACK_LIST,
  dbName: DB_NAME,
  dbURL: dbURL,
  logger: authLogger,
});
const usersCollection = new CollectionService({
  collectionName: AUTH_COLLECTIONS.USERS,
  dbName: DB_NAME,
  dbURL: dbURL,
  logger: authLogger,
});

export { passwordCollection, blacklistCollection, usersCollection };
