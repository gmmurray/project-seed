export const sortDirOptions = ['asc', 'desc'] as const;

export type Sort<T extends string> = {
  order: T;
  dir: (typeof sortDirOptions)[number];
};
