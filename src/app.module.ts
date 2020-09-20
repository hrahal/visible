import { Module } from '@nestjs/common';
import { ProjectModule } from './modules/api/project/project.module';
import { UsersModule } from './modules/common/users/users.module';

/**
 * Modules are used to managed Dependency Injection, and as a simpler way
 * to share Injectables between different Modules
 */
@Module({
  imports: [
    ProjectModule,
    UsersModule
  ]
})
export class AppModule {
}
