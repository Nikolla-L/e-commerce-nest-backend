import { ExecutionContext, Injectable, SetMetadata } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";
import { UsersService } from "src/modules/users/users.service";

const API_PUBLIC_KEY = 'isPublic';
const ANY_AUTHENTICATED_KEY = 'anyAuthenticated';
const AUTHORITY_KEY = 'authroity';

export const Public = () => SetMetadata(API_PUBLIC_KEY, true);
export const AnyAuthenticated = () => SetMetadata(ANY_AUTHENTICATED_KEY, true);
export const IsAdmin = () => SetMetadata(AUTHORITY_KEY, true);

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {

    constructor(
      private reflector: Reflector,
      public usersService: UsersService
    ) {
      super();
    }

    async canActivate(context: ExecutionContext) {
      // checking if route's public
      const isPublic = this.reflector.getAllAndOverride<boolean>(API_PUBLIC_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);
      if (isPublic) {
        return true;
      }

      if(await super.canActivate(context)) {
        // checking if routes open any authenicated user
        const anyAuthenticated = this.reflector.getAllAndOverride<boolean>(ANY_AUTHENTICATED_KEY, [
          context.getHandler(),
          context.getClass(),
        ]);
        if (anyAuthenticated) {
          return true;
        }
        // validate request for admin
        const req = await context.switchToHttp().getRequest();
        return await this.validateAccess(context, req)
      }
    }

    private async validateAccess(context: ExecutionContext, req: any) {

      const isAdmin = this.reflector.getAllAndOverride<boolean>(AUTHORITY_KEY, [
        context.getHandler(),
        context.getClass()
      ]);
      if (isAdmin) {
        const user = await this.usersService.findOne(req.user.sub);
        const hasAuthority = user.isAdmin;
        return await JwtAuthGuard.hasAdminAuthority(hasAuthority);
      }
    }

    private static hasAdminAuthority(hasAuthority: boolean): boolean {
      return hasAuthority;
    }
}