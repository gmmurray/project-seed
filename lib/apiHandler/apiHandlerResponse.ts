import { IApiHandlerError, IApiHandlerResponse } from './apiHandlerTypes';

export class ApiHandlerResponse<T> implements IApiHandlerResponse<T> {
  constructor(public data?: T, public error?: IApiHandlerError) {
    this.data = data;
    this.error = error;
  }
}
