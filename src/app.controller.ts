import { Controller, Get, Render } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AnyAuthenticated, Public } from './modules/auth/jwt/jwt-auth.guard';

@ApiTags('Test')
@Controller()
export class AppController {
  
  @Public()
  @Get()
  @Render('index')
  test() {
    return { message: 'Hello, this is e-commerce website server!' }
  }

  @ApiBearerAuth()
  @AnyAuthenticated()
  @Get('/protected')
  testGuard() {
    return { mesage: 'It works!' };
  }

}
