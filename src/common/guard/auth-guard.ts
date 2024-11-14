import { CanActivate, ExecutionContext, Injectable, Logger, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class AuthGuard implements CanActivate {
    private static readonly logger = new Logger(AuthGuard.name);

    async canActivate(context: ExecutionContext): Promise<boolean> {
        try {
            AuthGuard.logger.log('# AuthGuard 시작');
            const request = context.switchToHttp().getRequest();

            const authorization = request.headers.authorization ?? undefined;
            AuthGuard.logger.log(`# Authorization: ${authorization}`);

            if(!authorization) {
                throw new UnauthorizedException();
            }

            const [schema, accessToken] = authorization.split(" ");
            return true;
        } catch (e) {
            if(e.message === '존재하지 않는 사용자입니다.') {
                throw new NotFoundException(e.message);
            }
            throw e;
        }
    }
}