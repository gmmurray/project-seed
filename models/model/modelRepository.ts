import { AtlasDataApiService } from '../../lib/services/atlasDataApiService';

export class ModelRepository {
  private atlasDataApiService: AtlasDataApiService;
  constructor(collection: string) {
    this.atlasDataApiService = new AtlasDataApiService(collection);
  }
}
