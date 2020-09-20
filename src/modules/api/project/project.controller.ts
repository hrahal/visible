import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ProjectId, ProjectService } from './project.service';
import { CreateProjectDto, validateCreateProjectDto } from './dtos/request/create-project.dto';
import { UpdateProjectDto, validateUpdateProjectDto } from './dtos/request/update-project.dto';
import { ProjectIdDto, validateProjectIdDto } from '../../../common/dtos/request/project-id.dto';
import { JoinProjectDto, validateJoinProjectDto } from '../../../common/dtos/request/join-project.dto';
import { ApiTags } from '@nestjs/swagger';
import { PaginationDto, paginationValidation } from '../../../common/dtos/request/pagination.dto';
import { DataResponseMany, DataResponseOne, ResponseUtils } from '../../../common/utils/response/response-utils';
import { GetProjectResponse } from './dtos/response/get-user.interface';

/**
 * The Project controller is where all the routes for this
 * module are defined and validated, then passed to the
 * service to apply the route specific business logic
 */
@ApiTags('projects')
@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {
  }

  @Get('/')
  async getAllProjects(@Query(paginationValidation) query: PaginationDto,
  ): Promise<DataResponseMany<GetProjectResponse>> {

    const projects = await this.projectService.getProjects(query.limit, query.offset);
    return ResponseUtils.wrapMany(projects);
  }

  @Get('/:id')
  async getProject(@Param(validateProjectIdDto) params: ProjectIdDto)
    : Promise<DataResponseOne<GetProjectResponse>> {

    const project = await this.projectService.getProject(params.id);
    return ResponseUtils.wrapOne(project);
  }

  @Post('/')
  async createProject(@Body(validateCreateProjectDto) project: CreateProjectDto)
    : Promise<DataResponseOne<ProjectId>> {

    const createdProject = await this.projectService.createProject(project);
    return ResponseUtils.wrapOne(createdProject);
  }

  @Put('/:id')
  async updateProject(
    @Body(validateUpdateProjectDto) project: UpdateProjectDto,
    @Param(validateProjectIdDto) params: ProjectIdDto,
  ): Promise<DataResponseOne<ProjectId>> {

    const updatedProjectId: string = await this.projectService.updateProject(params.id, project);
    return ResponseUtils.wrapOne(updatedProjectId);
  }

  @Get('/:id/join/:userId')
  async joinProject(@Param(validateJoinProjectDto) joinProjectParamsDto: JoinProjectDto)
    : Promise<DataResponseOne<ProjectId>> {

    const projectId = await this.projectService.joinProject(joinProjectParamsDto.id, joinProjectParamsDto.userId);
    return ResponseUtils.wrapOne(projectId);
  }
}
