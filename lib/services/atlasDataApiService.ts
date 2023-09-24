import AtlasDataApiClient from '@gmmurray/mongodb-atlas-data-api';
import { FindManyDocumentsRequest } from '@gmmurray/mongodb-atlas-data-api/dist/types';
import { Sort } from '../types/sortTypes';
import { WithId } from '../types/utilityTypes';
import dayjs from 'dayjs';
import { defaultToEmptyArray } from '../util/arrayUtil';
import { getAtlasDataApiClient } from '../../config/atlasDataApiClient';

export class AtlasDataApiService {
  private collection: string;
  private client: AtlasDataApiClient;

  constructor(collection: string) {
    this.collection = collection;
    this.client = getAtlasDataApiClient();
  }

  async insertOne<TData>(data: TData) {
    const result = await this.client.insertOneDocument({
      collection: this.collection,
      document: { ...data, createdAt: new Date(), updatedAt: new Date() },
    });

    return result.data?.insertedId;
  }

  async getOne<TData>(filter: Record<string, any>): Promise<TData | undefined> {
    const result = await this.client.findOneDocument<TData>({
      collection: this.collection,
      filter,
    });

    return AtlasDataApiService.transformMongoId(
      result.data?.document as MongoDocument,
    );
  }

  async getById<TData>(
    id: string,
    additionalFilter?: Record<string, any>,
  ): Promise<TData | undefined> {
    const filter = {
      ...(additionalFilter ?? {}),
      _id: { $oid: id },
    };

    return await this.getOne<TData>(filter);
  }

  async getByFilter<TData>({
    filter,
    sort,
    pageSize = 100,
    pageNumber = 1,
  }: Partial<FindManyDocumentsRequest<TData>>): Promise<TData[]> {
    const result = await this.client.findDocuments<TData>({
      collection: this.collection,
      filter,
      sort,
      pageSize,
      pageNumber,
    });

    return defaultToEmptyArray(result.data?.documents).map(item =>
      AtlasDataApiService.transformMongoId(item as MongoDocument),
    );
  }

  async updateById<TData>(
    id: string,
    updates: TData,
    additionalFilter?: Record<string, any>,
  ) {
    const filter = {
      ...(additionalFilter ?? {}),
      _id: { $oid: id },
    };

    const result = await this.client.updateOneDocument({
      collection: this.collection,
      filter,
      update: {
        $set: { ...updates, updatedAt: dayjs().toDate() },
      },
    });

    return !!result.data?.modifiedCount;
  }

  async updateMultiple<TData>(
    filter: Record<string, any>,
    set: TData,
    additionalOperations?: Record<string, any>,
  ) {
    const result = await this.client.updateManyDocuments({
      collection: this.collection,
      filter,
      update: {
        ...(additionalOperations ?? {}),
        $set: {
          ...set,
          updatedAt: dayjs().toDate(),
        },
      },
    });

    return result.data?.modifiedCount ?? 0;
  }

  async deleteById(id: string, additionalFilter?: Record<string, any>) {
    const filter = {
      ...(additionalFilter ?? {}),
      _id: { $oid: id },
    };

    const result = await this.client.deleteOneDocument({
      collection: this.collection,
      filter,
    });

    return !!result.data?.deletedCount;
  }

  static transformMongoId = <T>(
    data: MongoDocument<T> | null | undefined,
  ): WithId<T> | undefined => {
    if (!data) {
      return undefined;
    }

    const { _id, ...rest }: WithId<any> = data;
    return {
      ...rest,
      id: _id,
    };
  };

  static transformToMongoSort = (sortDir: Sort<any>['dir']): 1 | -1 =>
    sortDir === 'asc' ? 1 : -1;
}

export type MongoDocument<T = any> = {
  _id: string;
} & T;
