import { ApiProperty } from '@nestjs/swagger';
import { Config } from '../../../../../common/utils/config';

export class BaseProjectDto {
  @ApiProperty({
    description: 'The name of the project',
    example: 'Red Apple',
  })
  name: string;

  @ApiProperty({
    description: 'the state of the project',
    example: `${Config.states.join(', ')}`,
  })
  state: string;

  @ApiProperty({
    description: 'The owner Id of this project',
  })
  owner: string;

  @ApiProperty({
    description: 'The progress percentage of the project',
    example: 'number between 0 and 100',
  })
  progress: number;
}
