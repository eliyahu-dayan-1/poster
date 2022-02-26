import BaseError from '../data-contracts/BaseError.ts';

interface Constractor {
  error: BaseError;
  response: any;
  success: boolean;
}

export class BaseResponse {
  constructor({
    success,
    error = new BaseError(),
    response = {},
  }: Constractor) {
    this.Response = response;
    this.Error = error;
    this.Success = success;
  }

  Response: any;
  Error: BaseError;
  Success: boolean;
}
