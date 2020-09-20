import { Module } from '@nestjs/common';
import { UsersRepository } from './users.repository';

@Module({
  exports: [UsersRepository],
  providers: [UsersRepository],
})
export class UsersModule {
}
