import { Logger } from '@poster/logger-service';
import { Db, MongoClient, Collection } from 'mongodb';
import { ERROR_CODES } from '../interfaces/data-contracts/ERROR_CODES_ENUM';
import ConnectToDbRes from '../interfaces/message-contracts/ConnectToDbRes';
import GetCollectionRes from '../interfaces/message-contracts/GetCollectionRes';
import { getBaseErrorResByErrorCode } from '../interfaces/services/error';

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
  dbConnection: Db | undefined;
  dbName = '';
  getCollection = async (collectionName: string): Promise<GetCollectionRes> => {
    let collection: undefined | Collection;
    const connectRes = await this.connectToDB();
    let errorCode = ERROR_CODES.OperationFailed;

    if (connectRes.success && connectRes.response) {
      try {
        collection = connectRes.response.collection(collectionName);
        errorCode = ERROR_CODES.OperationCompletedSuccessfully;
      } catch (err) {
        this.logger.log(
          `Cannot Connect get collection ${collectionName} in DB ${this.dbName}`
        );
        this.logger.error(err);
        errorCode = ERROR_CODES.OperationFailed;
      }
    } else {
      errorCode = ERROR_CODES.OperationFailed;
    }

    return new GetCollectionRes({
      response: collection,
      ...getBaseErrorResByErrorCode(errorCode),
    });
  };

  connectToDB = async (): Promise<ConnectToDbRes> => {
    const isConnectionExist = !!this.dbConnection;
    let errorCode = ERROR_CODES.OperationFailed;

    if (isConnectionExist) {
      errorCode = ERROR_CODES.OperationCompletedSuccessfully;
    } else {
      try {
        const client = await MongoClient.connect(this.dbURL);
        const db = client.db(this.dbName);
        this.dbConnection = db;
        errorCode = ERROR_CODES.OperationCompletedSuccessfully;
      } catch (err) {
        this.logger.log(`Cannot Connect to DB ${err}`);
        errorCode = ERROR_CODES.OperationFailed;
      }
    }

    return new ConnectToDbRes({
      response: this.dbConnection,
      ...getBaseErrorResByErrorCode(errorCode),
    });
  };
}

export default DbService;
