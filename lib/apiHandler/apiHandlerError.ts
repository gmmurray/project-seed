import {
  ApiHandlerErrorType,
  IApiHandlerError,
  apiHandlerErrorTypes,
  isApiHandlerErrorType,
} from './apiHandlerTypes';

export class ApiHandlerError implements IApiHandlerError {
  public type: ApiHandlerErrorType;
  public message?: string;
  constructor(type: ApiHandlerErrorType, message?: string) {
    this.type = type;
    this.message = message;
  }

  public get title(): string {
    let title: string;
    if (
      apiHandlerErrorTypes[this.type] &&
      apiHandlerErrorTypes[this.type].title
    ) {
      title = apiHandlerErrorTypes[this.type].title;
    } else {
      title = apiHandlerErrorTypes.unknown.title;
    }

    return title;
  }
}

export abstract class ApiHandlerErrorFactory {
  public static parseError(error: any): ApiHandlerError {
    if (
      error &&
      isApiHandlerErrorType(error.type) &&
      (typeof error.message === 'string' || !error.message)
    ) {
      return new ApiHandlerError(error.type, error.message);
    }

    return new ApiHandlerError('unknown');
  }
}
