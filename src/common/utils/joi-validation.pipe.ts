import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { ObjectSchema } from '@hapi/joi';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private schema: ObjectSchema) {}

  transform(input: any, metadata: ArgumentMetadata): any {
    const { error, value } = this.schema.validate(input);
    if (error) {
      throw new BadRequestException('Validation failed', error.message);
    }
    return value;
  }
}
