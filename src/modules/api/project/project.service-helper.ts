import { User } from '../../common/users/dtos/http/user.interface';
import { UpdateProjectDto } from './dtos/request/update-project.dto';
import { NotFoundException, PreconditionFailedException, UnauthorizedException } from '@nestjs/common';
import { Config } from '../../../common/utils/config';
import { UserAndManager, UsersById } from './project.service';
import { GetProjectResponse } from './dtos/response/get-user.interface';

export class ProjectServiceHelper {
  /**
   * Validate if the user exists and is a manager
   *
   * @param user
   * @param project
   *
   */
  static validateManager(user: User, project: UpdateProjectDto): boolean {
    if (!user) {
      throw new NotFoundException(`user ${project.owner} does not exist`);
    }

    if (user.role !== Config.role.manager) {
      throw new UnauthorizedException(`user ${project.owner} is not a manager`);
    }

    return true;
  }

  /**
   * Find the current Manager and user by id
   *
   * @param users
   * @param managerId
   * @param userId
   */
  static getManagerAndUser(users: Array<User>, managerId: string, userId: string): UserAndManager {

    const usersFound: UsersById = users
      .filter((user) => [managerId, userId].includes(user.id))
      .reduce((acc, user) => {
        acc[user.id] = user;
        return acc;
      }, {});

    if (!usersFound[managerId]) {
      throw new PreconditionFailedException('failed to find the manager of this project');
    }

    if (!usersFound[userId]) {
      throw new PreconditionFailedException('failed to find the user to join this project');
    }

    return {
      manager: usersFound[managerId],
      user: usersFound[userId],
    };
  }

  /**
   * Validates the User and Project
   *
   * @param userAlreadyJoined
   * @param userId
   * @param users
   * @param project
   */
  static validateProjectAndUser(userAlreadyJoined: boolean, userId: string, users: Array<User>, project: GetProjectResponse): boolean {
    if (userAlreadyJoined) {
      throw new PreconditionFailedException(`User ${userId} is already assigned to this project`);
    }

    const userAndManager = ProjectServiceHelper.getManagerAndUser(users, project.owner, userId);

    if (userAndManager.manager.department !== userAndManager.user.department) {
      throw new PreconditionFailedException('User and Manager do not belong to the same department');
    }

    return true;
  }
}
