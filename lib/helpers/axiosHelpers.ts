import { AxiosError } from 'axios';

export const handleAxiosError = (error: unknown) => {
  if (error instanceof AxiosError) {
    throw new Error(error.response?.data?.error ?? error.message);
  }

  throw error;
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
