export interface IModel {}

export interface IModelDto extends IModel {
  id: string;
  updatedAt: Date;
  createdAt: Date;
}
