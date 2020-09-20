import { Inject, Injectable } from '@nestjs/common';
import { MongoClient } from 'mongodb';
import { MongoResMany, MongoUtils } from '../../../common/utils/db/mongo-utils';
import { GetProjectMongo } from './dtos/db/project.interface';
import { CreateProjectDto } from './dtos/request/create-project.dto';
import { UpdateProjectDto } from './dtos/request/update-project.dto';
import { Config } from '../../../common/utils/config';

/**
 * MongoDB is being used to persist the projects and participants
 * for this two collections are created in the database
 *
 * As the project grows and for better organizational purposes,
 * it might be better to split this repo into two Classes with each
 * touching a specific database Collection
 */
@Injectable()
export class ProjectRepository extends MongoUtils {

  static PROJECT_COLLECTION = 'projects';
  static PARTICIPANTS_COLLECTION = 'participants';

  constructor(@Inject(Config.connection_token) private db: MongoClient) {
    super(db, Config.core_db_name);
  }

  async getProjects(limit: number, offset: number): Promise<MongoResMany<GetProjectMongo>> {
    const collection = this.collection(ProjectRepository.PROJECT_COLLECTION);

    const [projects, count] = await Promise.all([
      collection.find<GetProjectMongo>({}).limit(limit).skip(offset).toArray(),
      collection.countDocuments({}),
    ]);

    return {
      data: projects,
      total: count,
    };
  }

  async getProject(id: string): Promise<GetProjectMongo | null> {
    return await this.collection(ProjectRepository.PROJECT_COLLECTION)
      .findOne<GetProjectMongo>(this.mongoIdQuery(id));
  }

  async createProject(project: CreateProjectDto) {
    return this.collection(ProjectRepository.PROJECT_COLLECTION)
      .insertOne(project);
  }

  async checkExistingProjectByName(projectName: string): Promise<boolean> {
    const res = await this.collection(ProjectRepository.PROJECT_COLLECTION)
      .countDocuments({ name: projectName });
    return !!res;
  }

  async checkExistingProjectById(id: string): Promise<boolean> {
    const res = await this.collection(ProjectRepository.PROJECT_COLLECTION)
      .countDocuments(this.mongoIdQuery(id));

    return !!res;
  }

  async updateProject(id: string, project: UpdateProjectDto): Promise<boolean> {
    const res = await this.collection(ProjectRepository.PROJECT_COLLECTION).updateOne(
      this.mongoIdQuery(id),
      { $set: project });

    return (res.result.ok === 1);
  }

  async assignUserToProject(projectId: string, userId: string): Promise<boolean> {
    const assignUser = await this.collection(ProjectRepository.PARTICIPANTS_COLLECTION)
      .updateOne(
        this.mongoIdQuery(projectId),
        {
          $set: { projectId: projectId },
          $push: { participants: userId },
        },
        { upsert: true });

    return (!!assignUser.upsertedId || assignUser.modifiedCount === 1);
  }

  async participantExist(projectId: string, userId: string): Promise<boolean> {
    const count: number = await this.collection(ProjectRepository.PARTICIPANTS_COLLECTION)
      .countDocuments({
        $and: [
          { projectId: projectId },
          { participants: userId },
        ],
      });

    return (count !== 0);
  }
}
