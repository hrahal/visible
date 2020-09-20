import * as Joi from '@hapi/joi';
import { JoiValidationPipe } from '../../utils/joi-validation.pipe';
import { Config } from '../../utils/config';

const inputSchema = Joi.object({
  limit: Joi.number().min(1).default(Config.pagination_limit),
  offset: Joi.number().min(0).default(Config.pagination_offset),
});

export class PaginationDto {
  limit: number;
  offset: number;
}

export const paginationValidation = new JoiValidationPipe(inputSchema);
