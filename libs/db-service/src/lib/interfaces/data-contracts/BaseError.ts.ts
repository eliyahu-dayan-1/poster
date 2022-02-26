import { ERROR_CODES } from './ERROR_CODES_ENUM';

export default class BaseError {
  constructor(
    ErrorMessage = '',
    DisplayErrorMessage = '',
    UniqueErrorCode = ERROR_CODES.OperationCompletedSuccessfully
  ) {
    this.ErrorMessage = ErrorMessage;
    this.DisplayErrorMessage = DisplayErrorMessage;
    this.UniqueErrorCode = UniqueErrorCode;
  }

  ErrorMessage: string;
  DisplayErrorMessage: string;
  UniqueErrorCode: ERROR_CODES;
}
