import * as dbService from '../../services/db.service';
import { ObjectId } from 'mongodb';
import { postLogger } from '../../services/logger.service';

const COLLECTION_NAME = 'posts';
const DB_NAME = 'poster_posts';

interface Constractor {
  collectionName: string;
  dbName: string;
}
class CollectionService {
  constructor({ collectionName, dbName }: Constractor) {
    this.collectionName = collectionName;
    this.dbName = dbName;
  }
  collectionName: string;
  dbName: string;
  query = async (filterBy = {}) => {
    const criteria = this._buildCriteria(filterBy);
    const collection = await dbService.getCollection(this.collectionName);
    if (collection) {
      try {
        const posts = await collection.find(criteria).toArray();

        return posts;
      } catch (err) {
        postLogger.error('ERROR: cannot find posts');
        throw err;
      }
    }
  };

  getById = async (postId: string) => {
    const collection = await dbService.getCollection(this.collectionName);
    if (collection) {
      try {
        const post = await collection.findOne({ _id: new ObjectId(postId) });

        return post;
      } catch (err) {
        postLogger.error(`ERROR: while finding post ${postId}`);
        throw err;
      }
    }
  };

  getByUserId = async (userId: string) => {
    const collection = await dbService.getCollection(this.collectionName);
    if (collection) {
      try {
        const posts = await collection.find({ user: userId }).toArray();

        return posts;
      } catch (err) {
        postLogger.error(`ERROR: while get post By User Id ${userId}`);
        throw err;
      }
    }
  };

  remove = async (postId: string) => {
    const collection = await dbService.getCollection(this.collectionName);
    if (collection) {
      try {
        await collection.deleteOne({ _id: new ObjectId(postId) });
      } catch (err) {
        postLogger.error(`ERROR: cannot remove post ${postId}`);
        throw err;
      }
    }
  };

  update = async (post: any, id: string) => {
    const collection = await dbService.getCollection(this.collectionName);
    if (collection) {
      try {
        await collection.replaceOne({ _id: new ObjectId(id) }, { $set: post });

        return post;
      } catch (err) {
        postLogger.error(`ERROR: cannot update post ${id}`);
        postLogger.error(err);
        throw err;
      }
    }
  };
  add = async (post: any) => {
    const collection = await dbService.getCollection(this.collectionName);
    if (collection) {
      try {
        await collection.insertOne(post);
        return post;
      } catch (err) {
        postLogger.error(`ERROR: cannot insert post`);
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

const postCollectionService = new CollectionService({
  collectionName: COLLECTION_NAME,
  dbName: DB_NAME,
});

export { postCollectionService };
