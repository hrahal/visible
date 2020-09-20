import { Module } from '@nestjs/common';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { ProjectRepository } from './project.repository';
import { MongoClient } from 'mongodb';
import { UsersModule } from '../../common/users/users.module';
import { Config } from '../../../common/utils/config';

@Module({
  imports: [UsersModule],
  controllers: [ProjectController],
  providers: [
    ProjectService,
    ProjectRepository,
    {
      provide: Config.connection_token,
      useFactory: async (): Promise<MongoClient> => {
        return await MongoClient.connect(Config.mongodb.conn, Config.mongodb.opt);
      },
    },
  ],
})
export class ProjectModule {
}
