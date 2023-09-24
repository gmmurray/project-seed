import { useMutation, useQuery } from '@tanstack/react-query';

import { performAxiosRequest } from './axiosHelpers';
import { reactQueryClient } from '../../config/reactQueryClient';

export const useQueryBuilder = <TResult>(
  key: any[],
  enabled: boolean,
  callback: () => Promise<TResult>,
) =>
  useQuery(key, async () => performAxiosRequest(async () => callback()), {
    enabled,
  });

export const useMutationBuilder = <TParams, TResult = any>(
  queryKeys: any[][],
  callback: (params: TParams) => Promise<TResult>,
) =>
  useMutation(
    async (params: TParams) =>
      performAxiosRequest(async () => callback(params)),
    {
      onSuccess: () => invalidateMultipleQueries(queryKeys),
    },
  );

export const invalidateSingleQuery = async (query: any[]) =>
  await reactQueryClient.invalidateQueries(query);

export const invalidateMultipleQueries = async (queries: any[][]) => {
  await Promise.all(
    queries.map(query => reactQueryClient.invalidateQueries(query)),
  );
};
