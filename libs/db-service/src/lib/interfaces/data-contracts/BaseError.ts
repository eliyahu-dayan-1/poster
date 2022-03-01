import { ERROR_CODES } from './ERROR_CODES_ENUM';

export class BaseError {
  constructor({
    ErrorMessage = '',
    DisplayErrorMessage = '',
    UniqueErrorCode = ERROR_CODES.OperationCompletedSuccessfully,
  }: BaseError) {
    this.ErrorMessage = ErrorMessage;
    this.DisplayErrorMessage = DisplayErrorMessage;
    this.UniqueErrorCode = UniqueErrorCode;
  }

  ErrorMessage: string;
  DisplayErrorMessage: string;
  UniqueErrorCode: ERROR_CODES;
}
