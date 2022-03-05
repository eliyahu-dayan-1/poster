import { Db } from 'mongodb';
import BaseRes from './BaseRes';

class ConnectToDbRes extends BaseRes {
  constructor({ error, success, response }: ConnectToDbRes) {
    super({ error, success, response });
  }

  response: Db | undefined;
}

export default ConnectToDbRes;
