import { ObjectId } from 'mongodb';
import { DbService } from '../dbService';
import { Logger } from '@poster/logger-service';

interface Constractor {
  collectionName: string;
  dbName: string;
  dbURL: string;
  logger?: Console | Logger;
}
class CollectionService {
  constructor({
    collectionName,
    dbName,
    dbURL,
    logger = console,
  }: Constractor) {
    this.collectionName = collectionName;
    this.dbName = dbName;
    this.dbService = new DbService({ dbName, dbURL });
    this.logger = logger;
  }
  logger: Console | Logger;
  collectionName: string;
  dbName: string;
  dbService: DbService;
  query = async (filterBy = {}) => {
    const criteria = this._buildCriteria(filterBy);
    const collection = await this.dbService.getCollection(this.collectionName);
    if (collection) {
      try {
        const posts = await collection.find(criteria).toArray();

        return posts;
      } catch (err) {
        this.logger.error('ERROR: cannot find posts');
        throw err;
      }
    }
  };

  getById = async (postId: string) => {
    const collection = await this.dbService.getCollection(this.collectionName);
    if (collection) {
      try {
        const post = await collection.findOne({ _id: new ObjectId(postId) });

        return post;
      } catch (err) {
        this.logger.error(`ERROR: while finding post ${postId}`);
        throw err;
      }
    }
  };

  getByUserId = async (userId: string) => {
    const collection = await this.dbService.getCollection(this.collectionName);
    if (collection) {
      try {
        const posts = await collection.find({ user: userId }).toArray();

        return posts;
      } catch (err) {
        this.logger.error(`ERROR: while get post By User Id ${userId}`);
        throw err;
      }
    }
  };

  remove = async (postId: string) => {
    const collection = await this.dbService.getCollection(this.collectionName);
    if (collection) {
      try {
        await collection.deleteOne({ _id: new ObjectId(postId) });
      } catch (err) {
        this.logger.error(`ERROR: cannot remove post ${postId}`);
        throw err;
      }
    }
  };

  update = async (post: any, id: string) => {
    const collection = await this.dbService.getCollection(this.collectionName);
    if (collection) {
      try {
        await collection.replaceOne({ _id: new ObjectId(id) }, { $set: post });

        return post;
      } catch (err) {
        this.logger.error(`ERROR: cannot update post ${id}`);
        this.logger.error(err);
        throw err;
      }
    }
  };
  add = async (post: any) => {
    const collection = await this.dbService.getCollection(this.collectionName);
    if (collection) {
      try {
        await collection.insertOne(post);
        return post;
      } catch (err) {
        this.logger.error(`ERROR: cannot insert post`);
        throw err;
      }
    }
  };

  _buildCriteria = (filterBy: any) => {
    const criteria: any = {};
    // if (filterBy.txt) {
    //   criteria.postName = filterBy.txt;
    // }
    /* if (filterBy.minBalance) {
        criteria.balance = { $gte: +filterBy.minBalance }
    } */
    return criteria;
  };
}

export default CollectionService;
