import { Controller, Get, Render } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiExcludeEndpoint } from '@nestjs/swagger';
import { AnyAuthenticated, IsAdmin, Public } from './modules/auth/jwt/jwt-auth.guard';

@ApiTags('Test')
@Controller()
export class AppController {
  
  @Public()
  @Get()
  @Render('index')
  @ApiExcludeEndpoint()
  test() {
    return { message: 'Hello, this is e-commerce website server!' }
  }

  @Public()
  @Get('/public')
  testPublic() {
    return { message: 'Hello, this is public route!'}
  }

  @ApiBearerAuth()
  @AnyAuthenticated()
  @Get('/protected')
  testGuard() {
    return { mesage: 'Hello, this is protected route!' };
  }

  @ApiBearerAuth()
  @IsAdmin()
  @Get('/protected-for-admin')
  testAdmin() {
    return { message: 'route for only admin' };
  }


  @ApiBearerAuth()
  @Get('/without-any-decorator')
  testEmpty() {
    return { message: 'This is without any auth decorator' };
  }
}
