import BaseErrorRes from './BaseErrorRes';


class BaseCollectionServiceRes extends BaseErrorRes {
  constructor({
    error,
    success,
    response,
  }: BaseCollectionServiceRes) {
    super({ error, success });
    this.response = response;
  }

  response: any;
}

export default BaseCollectionServiceRes;
