import { Collection } from 'mongodb';
import BaseRes from './BaseRes';

class GetCollectionRes extends BaseRes {
  constructor({ error, success, response }: GetCollectionRes) {
    super({ error, success, response });
  }

  response: undefined | Collection;
}

export default GetCollectionRes;
