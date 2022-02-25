import * as dbService from '../../services/db.service';
import { ObjectId } from 'mongodb';

const COLLECTION = 'posts';

export async function query(filterBy = {}) {
  const criteria = _buildCriteria(filterBy);
  const collection = await dbService.getCollection(COLLECTION);
  try {
    const posts = await collection.find(criteria).toArray();
    posts.forEach((post) => delete post.password);

    return posts;
  } catch (err) {
    console.log('ERROR: cannot find posts');
    throw err;
  }
}

export async function getById(postId) {
  const collection = await dbService.getCollection(COLLECTION);
  try {
    const post = await collection.findOne({ _id: new ObjectId(postId) });
    delete post.password;

    // post.givenReviews = await reviewService.query({ byUserId: ObjectId(post._id) })
    // post.givenReviews = post.givenReviews.map(review => {
    //     delete review.byUser
    //     return review
    // })

    return post;
  } catch (err) {
    console.log(`ERROR: while finding post ${postId}`);
    throw err;
  }
}

export async function getByUsername(postName) {
  const collection = await dbService.getCollection(COLLECTION);
  try {
    const post = await collection.findOne({ postName });
    return post;
  } catch (err) {
    console.log(`ERROR: while finding post ${postName}`);
    throw err;
  }
}

export async function remove(postId) {
  const collection = await dbService.getCollection(COLLECTION);
  try {
    await collection.deleteOne({ _id: new ObjectId(postId) });
  } catch (err) {
    console.log(`ERROR: cannot remove post ${postId}`);
    throw err;
  }
}

export async function update(post) {
  const collection = await dbService.getCollection(COLLECTION);
  post._id = new ObjectId(post._id);

  try {
    await collection.replaceOne({ _id: post._id }, { $set: post });
    return post;
  } catch (err) {
    console.log(`ERROR: cannot update post ${post._id}`);
    throw err;
  }
}

export async function add(post) {
  const collection = await dbService.getCollection(COLLECTION);
  try {
    await collection.insertOne(post);
    return post;
  } catch (err) {
    console.log(`ERROR: cannot insert post`);
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
