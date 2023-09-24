import { ApiHandlerErrorFactory } from '../apiHandler/apiHandlerError';
import { AxiosError } from 'axios';

export const handleAxiosError = (error: unknown) => {
  let errorBody;
  if (error instanceof AxiosError) {
    errorBody = error.response?.data.error;
  } else {
    errorBody = undefined;
  }

  throw ApiHandlerErrorFactory.parseError(errorBody);
};

export async function performAxiosRequest<T>(
  request: () => Promise<T>,
): Promise<T | undefined> {
  try {
    return await request();
  } catch (error) {
    handleAxiosError(error);
  }
}
