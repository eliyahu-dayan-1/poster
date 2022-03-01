import { BaseError } from '../data-contracts/BaseError';

export default class BaseErrorRes {
  constructor({ error, success }: BaseErrorRes) {
    this.error = error;
    this.success = success;
  }

  error: BaseError;
  success: boolean;
}
