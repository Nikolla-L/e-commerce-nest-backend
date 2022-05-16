import { ExecutionContext, Injectable, SetMetadata, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";

const API_PUBLIC_KEY = 'isPublic';
const ANY_AUTHENTICATED_KEY = 'anyAuthenticated';

export const Public = () => SetMetadata(API_PUBLIC_KEY, true);
export const AnyAuthenticated = () => SetMetadata(ANY_AUTHENTICATED_KEY, true);
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(private reflector: Reflector) {
        super();
    }

    canActivate(context: ExecutionContext) {
        const isPublic = this.reflector.getAllAndOverride<boolean>(API_PUBLIC_KEY, [
          context.getHandler(),
          context.getClass(),
        ]);
        if (isPublic) {
          return true;
        }
        return super.canActivate(context);
      }
    
    handleRequest(err, user) {
        if (err || !user) {
          throw err || new UnauthorizedException();
        }
        return user;
    }

}