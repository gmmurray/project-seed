export const isString = (input: any): input is string =>
  !!input && typeof input === 'string';

export const isStringOfType = <T extends string>(
  input: any,
  options: T[],
): input is (typeof options)[number] =>
  isString(input) && options.includes(input as any);
