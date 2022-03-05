import { BaseError } from '../data-contracts/BaseError';
import { ERROR_CODES } from '../data-contracts/ERROR_CODES_ENUM';
import BaseErrorRes from '../message-contracts/BaseErrorRes';

export const getBaseErrorResByErrorCode = (
  errorCode: ERROR_CODES
): BaseErrorRes => {
  const isSuccess = errorCode === ERROR_CODES.OperationCompletedSuccessfully;

  return new BaseErrorRes({
    error: getBaseErrorByErrorCode(errorCode),
    success: isSuccess,
  });
};
export const getBaseErrorByErrorCode = (errorCode: ERROR_CODES): BaseError => {
  const errorMessage = getErrorMessageByErrorCode(errorCode);
  const displayErrorMessage = `displayErrorMessage.error.${errorCode}`;

  return new BaseError({
    ErrorMessage: errorMessage,
    DisplayErrorMessage: displayErrorMessage,
    UniqueErrorCode: errorCode,
  });
};

export const getErrorMessageByErrorCode = (errorCode: ERROR_CODES): string => {
  return (
    Object.keys(ERROR_CODES)[Object.values(ERROR_CODES).indexOf(errorCode)] ||
    ''
  );
};
