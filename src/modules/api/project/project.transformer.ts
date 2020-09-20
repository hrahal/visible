import { GetProjectMongo } from './dtos/db/project.interface';
import { InsertOneWriteOpResult } from 'mongodb';
import { GetProjectResponse } from './dtos/response/get-user.interface';

export class ProjectTransformer {
  static toProjectResponse(project: GetProjectMongo): GetProjectResponse {
    return {
      id: project._id,
      name: project.name,
      state: project.state,
      progress: project.progress,
      owner: project.owner,
    };
  }

  static toCreatedProjectIdResponse(inserted: InsertOneWriteOpResult): string {
    return inserted.insertedId.toHexString();
  }
}
