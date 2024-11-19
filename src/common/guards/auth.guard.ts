import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  NotFoundException,
  NotImplementedException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { ERROR_MESSAGE, TOKEN_SCHEMA } from '../constants/common-constants';

@Injectable()
export class AuthGuard implements CanActivate {
  private static readonly logger = new Logger(AuthGuard.name);

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      AuthGuard.logger.log('AuthGuard 시작');
      const request = context.switchToHttp().getRequest();

      const authorization = request.headers.authorization || null;

      if (!authorization) {
        AuthGuard.logger.error(`authorization: ${authorization}`);
        throw new BadRequestException(ERROR_MESSAGE.E002);
      }

      const [schema, accessToken] = authorization.split(' ');

      if (schema.toLowerCase() !== TOKEN_SCHEMA) {
        AuthGuard.logger.error(`schema: ${schema}`);
        throw new BadRequestException(ERROR_MESSAGE.E002);
      }

      const decoded = this.jwtService.verify(accessToken);
      AuthGuard.logger.debug(`decoded: ${decoded}`);
      const user = await this.userService.findOne(decoded.id);

      if (!user) {
        AuthGuard.logger.error(`user: ${user}`);
        throw new BadRequestException(ERROR_MESSAGE.E002);
      }

      request.user = user;

      AuthGuard.logger.log(`AuthGuard 종료`)
      return true;
    } catch (e) {
      AuthGuard.logger.error(`error catch: ${e}`);
      throw e;
    }
  }
}