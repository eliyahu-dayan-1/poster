import * as dbService from '../../services/db.service';
import { Collection, ObjectId } from 'mongodb';
import { postLogger } from '../../services/logger.service';

const COLLECTION = 'posts';

export async function query(filterBy = {}) {
  const criteria = _buildCriteria(filterBy);
  const collection = await dbService.getCollection(COLLECTION);
  if (collection) {
    try {
      const posts = await collection.find(criteria).toArray();

      return posts;
    } catch (err) {
      postLogger.error('ERROR: cannot find posts');
      throw err;
    }
  }
}

export async function getById(postId: string) {
  const collection = await dbService.getCollection(COLLECTION);
  if (collection) {
    try {
      const post = await collection.findOne({ _id: new ObjectId(postId) });

      return post;
    } catch (err) {
      postLogger.error(`ERROR: while finding post ${postId}`);
      throw err;
    }
  }
}

export async function getByUserId(userId: string) {
  const collection = await dbService.getCollection(COLLECTION);
  if (collection) {
    try {
      const posts = await collection.find({ user: userId }).toArray();

      return posts;
    } catch (err) {
      postLogger.error(`ERROR: while get post By User Id ${userId}`);
      throw err;
    }
  }
}

export async function remove(postId: string) {
  const collection = await dbService.getCollection(COLLECTION);
  if (collection) {
    try {
      await collection.deleteOne({ _id: new ObjectId(postId) });
    } catch (err) {
      postLogger.error(`ERROR: cannot remove post ${postId}`);
      throw err;
    }
  }
}

export async function update(post, id: string) {
  const collection = await dbService.getCollection(COLLECTION);
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
}
export async function add(post) {
  const collection = await dbService.getCollection(COLLECTION);
  if (collection) {
    try {
      await collection.insertOne(post);
      return post;
    } catch (err) {
      postLogger.error(`ERROR: cannot insert post`);
      throw err;
    }
  }
}

function _buildCriteria(filterBy: any) {
  const criteria: any = {};
  // if (filterBy.txt) {
  //   criteria.postName = filterBy.txt;
  // }
  /* if (filterBy.minBalance) {
        criteria.balance = { $gte: +filterBy.minBalance }
    } */
  return criteria;
}
