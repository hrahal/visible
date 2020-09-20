import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  PreconditionFailedException,
} from '@nestjs/common';
import { ProjectRepository } from './project.repository';
import { CreateProjectDto } from './dtos/request/create-project.dto';
import { UpdateProjectDto } from './dtos/request/update-project.dto';
import { GetProjectMongo } from './dtos/db/project.interface';
import { UsersRepository } from '../../common/users/users.repository';
import { User } from '../../common/users/dtos/http/user.interface';
import { ProjectTransformer } from './project.transformer';
import { Paginated } from '../../../common/utils/response/response-utils';
import { GetProjectResponse } from './dtos/response/get-user.interface';
import { InsertOneWriteOpResult } from 'mongodb';
import { ProjectServiceHelper } from './project.service-helper';

export type ProjectId = string

export interface UsersById {
  [id: string]: User
}

export interface UserAndManager {
  manager: User,
  user: User
}

@Injectable()
export class ProjectService {

  constructor(private projectRepository: ProjectRepository, private usersRepository: UsersRepository) {
  }

  /**
   * Get all projects paginated with total
   *
   * @param limit
   * @param offset
   *
   */
  async getProjects(limit: number, offset: number): Promise<Paginated<GetProjectResponse>> {
    const projects = await this.projectRepository.getProjects(limit, offset);
    return {
      total: projects.total,
      data: projects.data.map(ProjectTransformer.toProjectResponse),
    };
  }

  /**
   * Get one project by Id
   * @param id
   */
  async getProject(id: string): Promise<GetProjectResponse> {
    const project: GetProjectMongo | null = await this.projectRepository.getProject(id);

    if (!project) {
      throw new NotFoundException(`Project ${id} does not exist`);
    }

    return ProjectTransformer.toProjectResponse(project);
  }

  /**
   * Create a new Project
   *
   * Additional consideration:
   *  - Only managers can create a project
   *
   *  - Can't create a new project if the name already exists
   *
   *  - project progress percentage can be updated even is the state is not 'active'
   *    [in a real world example this can be changed according to the business logic]
   *
   * @param project
   */
  async createProject(project: CreateProjectDto): Promise<ProjectId> {

    const [projectExists, user] = await Promise.all([
      this.projectRepository.checkExistingProjectByName(project.name),
      this.usersRepository.getUser(project.owner),
    ]);

    ProjectServiceHelper.validateManager(user, project);

    if (projectExists) {
      throw new PreconditionFailedException(`Project name : ${project.name} already exists`);
    }
    const insertedProject: InsertOneWriteOpResult = await this.projectRepository.createProject(project);
    return ProjectTransformer.toCreatedProjectIdResponse(insertedProject);
  }

  /**
   * update an existing project
   *
   * Additional consideration:
   *  - Only managers can update a project
   *
   *  - Project must be exist to be able to update it
   *
   *  - project progress percentage can be updated even is the state is not 'active'
   *    [in a real world example this can be changed according to the business logic]
   *
   * @param projectId
   * @param project
   */
  async updateProject(projectId: string, project: UpdateProjectDto): Promise<ProjectId> {
    const [projectExists, user] = await Promise.all([
      this.projectRepository.checkExistingProjectById(projectId),
      this.usersRepository.getUser(project.owner),
    ]);

    ProjectServiceHelper.validateManager(user, project);

    if (!projectExists) {
      throw new PreconditionFailedException(`Project id : ${projectId} does not exists`);
    }

    const projectUpdated = await this.projectRepository.updateProject(projectId, project);

    if (!projectUpdated) {
      throw new InternalServerErrorException('Cannot update project');
    }

    return projectId;
  }

  /**
   * Assign a user to a project
   *
   * Additional consideration:
   *
   *  - User must exist to be able to join project
   *
   *  - User can't be added twice to the same project
   *
   *  - User and Manager must belong to the same department
   *
   *  - Project must be exist to be able to add user to it
   *
   *  - Manager id is being fetched from the project owner info
   *
   * @param projectId
   * @param userId
   */
  async joinProject(projectId: string, userId: string): Promise<ProjectId> {

    const [project, users, userAlreadyJoined] = await Promise.all([
      this.getProject(projectId),
      /**
       * for now, the get all users endpoint is being used to get
       * the user and manager in one call. this might not be ideal
       * if the expected number of users grow a lot for it may produce
       * extra lags in the response.
       *
       * In a real scenario it might be better to
       * perform two separate calls to getOne employee endpoint. but it is
       * always a trade between speed and number of IO operations. This has to
       * be evaluated as the application grows to make sure it's scalable
       */
      this.usersRepository.getUsers(),
      this.projectRepository.participantExist(projectId, userId),
    ]);

    ProjectServiceHelper.validateProjectAndUser(userAlreadyJoined, userId, users, project);

    const assigned = await this.projectRepository.assignUserToProject(projectId, userId);

    if (!assigned) {
      throw new Error('Could not assign current user');
    }

    return projectId;
  }

}
