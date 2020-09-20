import { ProjectServiceHelper } from '../../../../src/modules/api/project/project.service-helper';
import { PreconditionFailedException } from '@nestjs/common';
import { projectServiceHelplerMocks } from './mocks';

describe(ProjectServiceHelper.name, () => {

  describe('getManagerAndUser', () => {

    it('should return user and manager', () => {
      const result = ProjectServiceHelper.getManagerAndUser(
        projectServiceHelplerMocks.input.users,
        'f3e868b9-6151-49c4-8d51-b9e3fb9255ba',
        '3f949e89-4d40-48fb-b43c-da20e7c768aa',
      );

      expect(result).toStrictEqual({
        manager: projectServiceHelplerMocks.output.manager,
        user: projectServiceHelplerMocks.output.employee,
      });
    });

    it('should throw PreconditionFailedException', () => {

      expect(() => {
        ProjectServiceHelper.getManagerAndUser(
          projectServiceHelplerMocks.input.users,
          'wrongIdForManager',
          '3f949e89-4d40-48fb-b43c-da20e7c768aa',
        );
      }).toThrowError(new PreconditionFailedException(
        'failed to find the manager of this project',
      ));

    });

    it('should throw PreconditionFailedException', () => {

      expect(() => {
        ProjectServiceHelper.getManagerAndUser(
          projectServiceHelplerMocks.input.users,
          'f3e868b9-6151-49c4-8d51-b9e3fb9255ba',
          'wrongIdForUser',
        );
      }).toThrowError(new PreconditionFailedException(
        'failed to find the user to join this project',
      ));

    });
  });

});
