import * as dbService from '../../services/db.service';
import { ObjectId } from 'mongodb';
import * as logger from '../../services/logger.service';

const COLLECTION = 'posts';

export async function query(filterBy = {}) {
  const criteria = _buildCriteria(filterBy);
  const collection = await dbService.getCollection(COLLECTION);
  try {
    const posts = await collection.find(criteria).toArray();
    posts.forEach((post) => delete post.password);

    return posts;
  } catch (err) {
    logger.error('ERROR: cannot find posts');
    throw err;
  }
}

export async function getById(postId) {
  const collection = await dbService.getCollection(COLLECTION);
  try {
    const post = await collection.findOne({ _id: new ObjectId(postId) });

    return post;
  } catch (err) {
    logger.error(`ERROR: while finding post ${postId}`);
    throw err;
  }
}

export async function remove(postId) {
  const collection = await dbService.getCollection(COLLECTION);
  try {
    await collection.deleteOne({ _id: new ObjectId(postId) });
  } catch (err) {
    logger.error(`ERROR: cannot remove post ${postId}`);
    throw err;
  }
}

export async function update(post, id) {
  const collection = await dbService.getCollection(COLLECTION);

  try {
    await collection.replaceOne({ _id: new ObjectId(id) }, { $set: post });

    return post;
  } catch (err) {
    logger.error(`ERROR: cannot update post ${id}`);
    logger.error(err);
    throw err;
  }
}

export async function add(post) {
  const collection = await dbService.getCollection(COLLECTION);
  try {
    await collection.insertOne(post);
    return post;
  } catch (err) {
    logger.error(`ERROR: cannot insert post`);
    throw err;
  }
}

function _buildCriteria(filterBy) {
  const criteria: any = {};
  if (filterBy.txt) {
    criteria.postName = filterBy.txt;
  }
  /* if (filterBy.minBalance) {
        criteria.balance = { $gte: +filterBy.minBalance }
    } */
  return criteria;
}
