import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ERROR_MESSAGE } from '../constants/common-constants';

@Injectable()
export class RoleGuard implements CanActivate {
  private static readonly logger = new Logger(RoleGuard.name);

  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    RoleGuard.logger.log(`RoleGuard 시작`);

    const needRoles = this.reflector.get<string[]>(
      'roles',
      context.getHandler(),
    );

    RoleGuard.logger.log(`needRoles: ${needRoles}`);

    if (needRoles.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const match = [];

    RoleGuard.logger.debug(`request.user ${request.user}`);
    RoleGuard.logger.debug(`request.user.role ${request.user.role}`);

    for (const role of needRoles) {
      if (role === request.user.role) {
        match.push(role);
      }
    }

    if(!match.length) {
        throw new ForbiddenException(ERROR_MESSAGE.E003);
    }

    RoleGuard.logger.log(`RoleGuard 종료`);
    return true;
  }
}
