import { isString } from '../types/typeGuards';

export const resolveIfStringAndTruthy = (value: any, defaultValue: string) => {
  if (!value) {
    return undefined;
  }
  return isString(value) ? value : defaultValue;
};

export const resolveIfString = (value: any, defaultValue: string) =>
  isString(value) ? value : defaultValue;
