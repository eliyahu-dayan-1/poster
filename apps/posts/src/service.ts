import * as dbService from './services/db.service';
import { ObjectId } from 'mongodb';

const COLLECTION = 'user';

export async function query(filterBy = {}) {
  const criteria = _buildCriteria(filterBy);
  const collection = await dbService.getCollection(COLLECTION);
  try {
    const users = await collection.find(criteria).toArray();
    users.forEach((user) => delete user.password);

    return users;
  } catch (err) {
    console.log('ERROR: cannot find users');
    throw err;
  }
}

export async function getById(userId) {
  const collection = await dbService.getCollection(COLLECTION);
  try {
    const user = await collection.findOne({ _id: ObjectId(userId) });
    delete user.password;

    // user.givenReviews = await reviewService.query({ byUserId: ObjectId(user._id) })
    // user.givenReviews = user.givenReviews.map(review => {
    //     delete review.byUser
    //     return review
    // })

    return user;
  } catch (err) {
    console.log(`ERROR: while finding user ${userId}`);
    throw err;
  }
}

export async function getByUsername(userName) {
  const collection = await dbService.getCollection(COLLECTION);
  try {
    const user = await collection.findOne({ userName });
    return user;
  } catch (err) {
    console.log(`ERROR: while finding user ${userName}`);
    throw err;
  }
}

export async function remove(userId) {
  const collection = await dbService.getCollection(COLLECTION);
  try {
    await collection.deleteOne({ _id: ObjectId(userId) });
  } catch (err) {
    console.log(`ERROR: cannot remove user ${userId}`);
    throw err;
  }
}

export async function update(user) {
  const collection = await dbService.getCollection(COLLECTION);
  user._id = ObjectId(user._id);

  try {
    await collection.replaceOne({ _id: user._id }, { $set: user });
    return user;
  } catch (err) {
    console.log(`ERROR: cannot update user ${user._id}`);
    throw err;
  }
}

export async function add(user) {
  const collection = await dbService.getCollection(COLLECTION);
  try {
    await collection.insertOne(user);
    return user;
  } catch (err) {
    console.log(`ERROR: cannot insert user`);
    throw err;
  }
}

function _buildCriteria(filterBy) {
  const criteria: any = {};
  if (filterBy.txt) {
    criteria.userName = filterBy.txt;
  }
  /* if (filterBy.minBalance) {
        criteria.balance = { $gte: +filterBy.minBalance }
    } */
  return criteria;
}
