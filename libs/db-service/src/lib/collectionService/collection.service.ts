import { ObjectId } from 'mongodb';
import { DbService } from '../dbService';
import { Logger } from '@poster/logger-service';
import BaseRes from '../interfaces/message-contracts/BaseRes';
import { ERROR_CODES } from '../interfaces/data-contracts/ERROR_CODES_ENUM';
import { getBaseErrorResByErrorCode } from '../interfaces/services/error';

class CollectionService {
  constructor({
    collectionName,
    dbName,
    dbURL,
    logger = console,
  }: CollectionConstractor) {
    this.collectionName = collectionName;
    this.dbService = new DbService({ dbName, dbURL });
    this.logger = logger;
  }
  logger: Console | Logger;
  collectionName: string;
  dbService: DbService;
  query = async (
    filterBy: { [key: string]: string | object | number } = {}
  ): Promise<BaseRes> => {
    const collectionRes = await this.dbService.getCollection(
      this.collectionName
    );
    let errorCode = ERROR_CODES.OperationFailed;
    let findRes: Array<string | object | number> = [];

    if (collectionRes.success && collectionRes.response) {
      try {
        findRes = await collectionRes.response.find(filterBy).toArray();
        errorCode = ERROR_CODES.OperationCompletedSuccessfully;
      } catch (err) {
        this.logger.error('ERROR: cannot find query');
        this.logger.error(err);
        errorCode = ERROR_CODES.OperationFailed;
      }
    }

    return new BaseRes({
      response: findRes,
      ...getBaseErrorResByErrorCode(errorCode),
    });
  };

  getById = async (id: string): Promise<BaseRes> => {
    const collectionRes = await this.dbService.getCollection(
      this.collectionName
    );
    let errorCode = ERROR_CODES.OperationFailed;
    let getByIdRes: any = null;

    if (collectionRes.success && collectionRes.response) {
      try {
        getByIdRes = await collectionRes.response.findOne({ _id: new ObjectId(id) });
        errorCode = ERROR_CODES.OperationCompletedSuccessfully;
      } catch (err) {
        this.logger.error(`ERROR: while finding by ${id}`);
        this.logger.error(err);
        errorCode = ERROR_CODES.OperationFailed;
      }
    }

    return new BaseRes({
      response: getByIdRes,
      ...getBaseErrorResByErrorCode(errorCode),
    });
  };

  removeById = async (id: string): Promise<BaseRes> => {
    const collectionRes = await this.dbService.getCollection(
      this.collectionName
    );
    let errorCode = ERROR_CODES.OperationFailed;
    let removeRes: any = null;
    if (collectionRes.success && collectionRes.response) {
      try {
        removeRes = await collectionRes.response.deleteOne({
          _id: new ObjectId(id),
        });
        errorCode = ERROR_CODES.OperationCompletedSuccessfully;
      } catch (err) {
        this.logger.error(`ERROR: cannot remove by id ${id}`);
        this.logger.error(err);
        errorCode = ERROR_CODES.OperationFailed;
      }
    }

    return new BaseRes({
      response: removeRes,
      ...getBaseErrorResByErrorCode(errorCode),
    });
  };

  updateById = async (data: any, id: string): Promise<BaseRes> => {
    const collectionRes = await this.dbService.getCollection(
      this.collectionName
    );
    let errorCode = ERROR_CODES.OperationFailed;
    let updateRes: any = null;
    if (collectionRes.success && collectionRes.response) {
      try {
        updateRes = await collectionRes.response.replaceOne(
          { _id: new ObjectId(id) },
          { $set: data }
        );

        errorCode = ERROR_CODES.OperationCompletedSuccessfully;
      } catch (err) {
        this.logger.error(`ERROR: cannot update by id ${id}`);
        this.logger.error(err);
        errorCode = ERROR_CODES.OperationFailed;
      }
    }

    return new BaseRes({
      response: updateRes,
      ...getBaseErrorResByErrorCode(errorCode),
    });
  };
  add = async (data: any): Promise<BaseRes> => {
    const collectionRes = await this.dbService.getCollection(
      this.collectionName
    );
    let errorCode = ERROR_CODES.OperationFailed;
    let addRes: any = null;

    if (collectionRes.success && collectionRes.response) {
      try {
        addRes = await collectionRes.response.insertOne(data);
        errorCode = ERROR_CODES.OperationCompletedSuccessfully;
      } catch (err) {
        this.logger.error(`ERROR: cannot insert post`);
        this.logger.error(err);
        errorCode = ERROR_CODES.OperationFailed;
      }
    }

    return new BaseRes({
      response: addRes,
      ...getBaseErrorResByErrorCode(errorCode),
    });
  };
}

export default CollectionService;

interface CollectionConstractor {
  collectionName: string;
  dbName: string;
  dbURL: string;
  logger?: Console | Logger;
}
