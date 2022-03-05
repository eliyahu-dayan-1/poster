import BaseErrorRes from './BaseErrorRes';

class BaseRes extends BaseErrorRes {
  constructor({ error, success, response }: BaseRes) {
    super({ error, success });
    this.response = response;
  }

  response: any;
}

export default BaseRes;
