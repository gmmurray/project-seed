import {
  useMutationBuilder,
  useQueryBuilder,
} from '../../lib/helpers/reactQueryHelpers';

import { ApiHandlerResponse } from '../../lib/types/apiHandler';
import ReactQueryKeys from 'react-query-keys';
import { UseQueryResult } from '@tanstack/react-query';
import axios from 'axios';

const keyConfig = {
  keyDefinitions: {
    single: {
      dynamicVariableNames: ['modelId'],
    },
  },
};

export const modelQueryKeys = new ReactQueryKeys('model', keyConfig);

export const useGetModelQuery = (modelId: string, enabled: boolean) =>
  useQueryBuilder(
    modelQueryKeys.key('single', { modelId }),
    enabled,
    async () => {
      const res = await axios.get<ApiHandlerResponse<any>>('/api/model');

      return res.data.data;
    },
  );

type MutationTypes = {
  create: {
    model: Partial<any>;
  };
};

export const useCreateModelMutation = () =>
  useMutationBuilder<MutationTypes['create'], string | undefined>(
    [modelQueryKeys.all()],
    async model => {
      const res = await axios.post<ApiHandlerResponse<string>>(
        '/api/model',
        model,
      );

      return res.data.data;
    },
  );
