import { ApiProperty } from '@nestjs/swagger';
import * as Joi from '@hapi/joi';
import { JoiValidationPipe } from '../../utils/joi-validation.pipe';
import { ObjectId } from 'mongodb';

const projectIdMessage = 'must be a single String of 12 bytes or a string of 24 hex characters';

const projectIdValidation = (id) => {
  if (!ObjectId.isValid(id)) {
    throw new Error(`Id format: ${projectIdMessage}`);
  }

  return id;
};


export class ProjectIdDto {
  @ApiProperty({
    description: `Project id: ${projectIdMessage}`,
  })
  id: string;
}

export const projectIdSchema = {
  id: Joi.string().custom(projectIdValidation, 'Project Id Validation').required(),
};

const validationSchema = Joi.object(projectIdSchema);

export const validateProjectIdDto = new JoiValidationPipe(validationSchema);
