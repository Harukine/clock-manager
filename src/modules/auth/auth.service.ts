import { Inject, Injectable } from '@nestjs/common';
import { AUTH_REPOSITORY_TOKEN, USER_REPOSITORY_TOKEN } from '../../common/config/database.tokens.constants';
import { Repository } from 'typeorm';
import { AuthEntity } from './entities/auth.entity';
import { AuthDto } from './dto/auth.dto';
import { AuthResponseDto } from './dto/auth.response.dto';
import { INPUT, OUTPUT, STATUS_CODE_RESPONSE } from './constants/auth.constants';
import * as moment from 'moment';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @Inject(AUTH_REPOSITORY_TOKEN)
    private readonly authRepository: Repository<AuthEntity>,
    @Inject(USER_REPOSITORY_TOKEN)
    private readonly userRepository: Repository<User>
  ) {
  }

  async authIn(auth: AuthDto): Promise<AuthResponseDto> {
    try {
      const user = await this.saveTicketing({ ...auth, reader: INPUT });
      return this.welcomeUser(user.name);
    } catch (error) {
      return { status: STATUS_CODE_RESPONSE.KO, msg: `Input Error ${error}` };
    }
  }

  async authOut(auth: AuthDto): Promise<AuthResponseDto> {
    try {
      const user = await this.saveTicketing({...auth, reader: OUTPUT});
      return this.byeUser(user.name);
    } catch (error) {
      return { status: STATUS_CODE_RESPONSE.KO, msg: `Output Error ${error}` };
    }
  }

  private async saveTicketing(auth: AuthDto): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        key: auth.key,
      },
    });
    if (!user) {
      throw new Error();
    }
    await this.authRepository.save({
      ...auth,
      user,
      timestamp: moment().unix(),
    });
    return user;
  }

  private welcomeUser(userName) {
    return {
      status: STATUS_CODE_RESPONSE.OK,
      msg: `Input - ${userName}`,
    };
  }

  private byeUser(userName) {
    return {
      status: STATUS_CODE_RESPONSE.OK,
      msg: `Output - ${userName}`,
    };
  }
}
