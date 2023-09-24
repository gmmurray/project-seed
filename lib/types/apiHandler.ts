import * as yup from 'yup';

import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { RequestMethod, isRequestMethod } from './requestTypes';
import { Session, getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';

import { isString } from './typeGuards';
import jwt from 'jsonwebtoken';

type RequestHandler = {
  [method in RequestMethod]?: NextApiHandler;
};

export interface IApiHandler extends RequestHandler {
  requiresAuth: boolean;
}

export abstract class ApiHandler implements IApiHandler {
  public GET: IApiHandler['GET'];
  public POST: IApiHandler['POST'];
  public PUT: IApiHandler['PUT'];
  public PATCH: IApiHandler['PATCH'];
  public DELETE: IApiHandler['DELETE'];
  public requiresAuth: IApiHandler['requiresAuth'];

  constructor(requiresAuth: boolean) {
    this.requiresAuth = requiresAuth;
  }

  public createRouteHandler: NextApiHandler = async (req, res) => {
    try {
      const { method } = req;

      const handlerDef =
        isRequestMethod(method) && this[method] ? this[method] : undefined;

      if (handlerDef) {
        const handler = this.requiresAuth
          ? withApiAuthRequired(handlerDef)
          : handlerDef;
        return await handler(req, res);
      } else {
        res.status(405).json({ error: 'Method Not Allowed' });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Something went wrong.' });
    }
  };

  public static getQueryParamString = (req: NextApiRequest, key: string) => {
    const param = req.query[key];

    return isString(param) ? param : undefined;
  };

  public static ok = (res: NextApiResponse, data: any) =>
    res.status(200).json({ data });

  public static created = (res: NextApiResponse, data: any) =>
    res.status(201).json({ data });

  public static noContent = (res: NextApiResponse) => res.status(204).send('');

  public static sendErrorResponse = (
    res: NextApiResponse,
    status: number,
    error: ApiHandlerError,
  ) => res.status(status).json(new ApiHandlerResponse(undefined, error));

  public static badRequest = (res: NextApiResponse, message?: string) => {
    return ApiHandler.sendErrorResponse(
      res,
      400,
      new ApiHandlerError('badRequest', message),
    );
  };

  public static notFound = (res: NextApiResponse, message?: string) => {
    return ApiHandler.sendErrorResponse(
      res,
      404,
      new ApiHandlerError('notFound', message),
    );
  };

  public static internalError = (res: NextApiResponse, message?: string) => {
    return ApiHandler.sendErrorResponse(
      res,
      500,
      new ApiHandlerError('internal', message),
    );
  };

  public static validationError = (res: NextApiResponse, message?: string) => {
    return ApiHandler.sendErrorResponse(
      res,
      400,
      new ApiHandlerError('validation', message),
    );
  };

  public static validateInput = async (
    res: NextApiResponse,
    validationSchema: yup.AnyObjectSchema,
    input: any,
  ): Promise<boolean> => {
    let isValid = false;

    try {
      await validationSchema.validate(input, {
        abortEarly: false,
      });
      isValid = true;
    } catch (error: any) {
      isValid = false;
      if (error.name === 'ValidationError') {
        ApiHandler.validationError(res, error.errors.join(', '));
      } else {
        ApiHandler.validationError(res, 'Unexpected error during validation');
      }
    }

    return isValid;
  };

  public static validateDataLimits = async (
    res: NextApiResponse,
    errorMessage: string,
    validators: Promise<boolean>[],
  ): Promise<boolean> => {
    let isValid = false;

    const results = await Promise.all(validators);

    if (results.includes(false)) {
      isValid = false;
      ApiHandler.badRequest(res, errorMessage);
    } else {
      isValid = true;
    }

    return isValid;
  };

  public static getSessionUser = async (
    req: NextApiRequest,
    res: NextApiResponse,
  ): Promise<Session['user'] & { sub: string }> => {
    const session = await getSession(req, res);

    if (!session?.user || !isString(session.user.sub)) {
      throw new Error(
        'Invalid session - session does not exist or is missing expected properties',
      );
    }

    return session.user as Session['user'] & { sub: string };
  };

  public static getSessionUserWithPermissions = async (
    req: NextApiRequest,
    res: NextApiResponse,
  ): Promise<{ user: Session['user']; permissions: string[] }> => {
    const session = await getSession(req, res);

    const decoded = jwt.decode(session?.accessToken ?? '');

    if (!session?.user.sub) {
      throw new Error(
        'Invalid session - session does not exist or is missing expected properties',
      );
    }

    return {
      user: session.user,
      permissions: ApiHandler.getPermissionsFromToken(decoded),
    };
  };

  private static getPermissionsFromToken = (
    decodedToken: string | jwt.JwtPayload | null,
  ): string[] => {
    return decodedToken && !isString(decodedToken)
      ? decodedToken['permissions'] ?? []
      : [];
  };
}

export class ApiHandlerResponse<T> {
  constructor(public data?: T, public error?: ApiHandlerError) {
    this.data = data;
    this.error = error;
  }
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

export class ApiHandlerError {
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

const isApiHandlerErrorType = (type: unknown): type is ApiHandlerErrorType => {
  return (
    typeof type === 'string' &&
    apiHandlerErrorTypes[type as ApiHandlerErrorType] !== undefined &&
    apiHandlerErrorTypes[type as ApiHandlerErrorType].title !== undefined
  );
};

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
