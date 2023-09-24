export const requestMethods = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
} as const;

const requestMethodOptions = Object.values(requestMethods);

export type RequestMethod = (typeof requestMethodOptions)[number];

export function isRequestMethod(method?: any): method is RequestMethod {
  return method && requestMethodOptions.includes(method);
}
