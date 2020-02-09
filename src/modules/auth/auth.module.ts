import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { AuthService } from './auth.service';
import { AuthProviders } from './entities/auth.providers';
import { UserModule } from '../user/user.module';

@Module({
  imports: [DatabaseModule, UserModule ],
  providers: [AuthService, ...AuthProviders],
  controllers: [],
  exports: [AuthService],
})
export class AuthModule {}
