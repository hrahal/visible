import * as Joi from '@hapi/joi';
import { JoiValidationPipe } from '../../../../../common/utils/joi-validation.pipe';
import { Config } from '../../../../../common/utils/config';
import { CreateProjectDto } from './create-project.dto';

export class UpdateProjectDto extends CreateProjectDto {}

const validationSchema = Joi.object({
  name: Joi.string().required(),
  owner: Joi.string().required(),
  state: Joi.string().valid(...Config.states).required(),
  progress: Joi.number().min(0).max(100)
})

export const validateUpdateProjectDto = new JoiValidationPipe(validationSchema)
