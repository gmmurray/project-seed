import AtlasDataApiClient from '@gmmurray/mongodb-atlas-data-api';
import { AtlasDataApiClientOptions } from '@gmmurray/mongodb-atlas-data-api/dist/types';

const config: AtlasDataApiClientOptions = {
  apiKey: process.env.ATLAS_DATA_API_KEY ?? '',
  dataApiUrlEndpoint: process.env.ATLAS_DATA_API_URL_ENDPOINT ?? '',
  defaultDataSource: process.env.ATLAS_DATA_API_DATA_SOURCE ?? '',
  defaultDatabase: process.env.ATLAS_DATA_API_DATABASE ?? '',
};

let instance: AtlasDataApiClient;

export const getAtlasDataApiClient = () => {
  if (!instance) {
    instance = new AtlasDataApiClient(config);
  }

  return instance;
};
