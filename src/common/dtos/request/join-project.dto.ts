import { ApiProperty } from '@nestjs/swagger';
import * as Joi from '@hapi/joi';
import { JoiValidationPipe } from '../../utils/joi-validation.pipe';
import { ProjectIdDto, projectIdSchema } from './project-id.dto';

export class JoinProjectDto extends ProjectIdDto {
  @ApiProperty()
  userId: string;
}

export const joiSchema = {
  ...projectIdSchema,
  userId: Joi.string().required()
}

const validationSchema = Joi.object(joiSchema)

export const validateJoinProjectDto = new JoiValidationPipe(validationSchema)
