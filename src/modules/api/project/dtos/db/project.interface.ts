export interface GetProjectMongo {
  _id: string;
  name: string;
  state: string;
  progress?: number;
  owner: string
}

