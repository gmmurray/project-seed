import { NextApiHandler } from 'next';
import { RequestMethod } from '../types/requestTypes';

type RequestHandler = {
  [method in RequestMethod]?: NextApiHandler;
};

export interface IApiHandler extends RequestHandler {
  requiresAuth: boolean;
}

export interface IApiHandlerResponse<T> {
  data?: T;
  error?: IApiHandlerError;
}

export const apiHandlerErrorTypes = {
  validation: {
    title: 'Validation error',
  },
  badRequest: {
    title: 'Bad request',
  },
  notFound: {
    title: 'Not found',
  },
  internal: {
    title: 'Internal error',
  },
  unknown: {
    title: 'Unexpected error',
  },
} as const;

export type ApiHandlerErrorType = keyof typeof apiHandlerErrorTypes;

export const isApiHandlerErrorType = (
  type: unknown,
): type is ApiHandlerErrorType => {
  return (
    typeof type === 'string' &&
    apiHandlerErrorTypes[type as ApiHandlerErrorType] !== undefined &&
    apiHandlerErrorTypes[type as ApiHandlerErrorType].title !== undefined
  );
};

export interface IApiHandlerError {
  type: ApiHandlerErrorType;
  message?: string;
}
