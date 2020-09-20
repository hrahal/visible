export interface GetProjectResponse {
  id: string;
  name: string;
  state: string;
  progress?: number;
  owner: string
}
