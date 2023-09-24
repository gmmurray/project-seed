export const defaultToEmptyArray = <T>(input?: T[]): T[] => input ?? [];

export const uniqueArray = <T>(input: T[]): T[] => {
  return [...new Set(input)];
};

export const toggleArrayEle = <T>(ele: T, arr: T[] = []) => {
  if (arr.includes(ele)) {
    return arr.filter(item => item !== ele);
  }

  return [...arr, ele];
};
