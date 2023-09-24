const concatenatePath = (base: string, path: string) => base + path;
const apiPath = (path: string) => concatenatePath('/api', path);

export const apiRouteMap = {
  auth: {
    key: 'auth',
    path: apiPath('/auth'),
    children: {
      login: {
        key: 'login',
        path: () => concatenatePath(apiRouteMap.auth.path, '/login'),
      },
      logout: {
        key: 'logout',
        path: () => concatenatePath(apiRouteMap.auth.path, '/logout'),
      },
    },
  },
};
