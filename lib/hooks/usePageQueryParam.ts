import { isString } from '../types/typeGuards';
import { useRouter } from 'next/router';

export const usePageQueryParam = (key: string) => {
  const { query } = useRouter();

  const value = query[key];

  if (!value) {
    return undefined;
  }

  return isString(value) ? value : undefined;
};
