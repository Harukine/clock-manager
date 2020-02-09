import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { DatabaseModule } from '../database/database.module';
import { UserService } from './user.service';
import { UserProviders } from './entities/user.provider';

@Module({
  imports: [DatabaseModule],
  providers: [UserService, ...UserProviders],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule {}
