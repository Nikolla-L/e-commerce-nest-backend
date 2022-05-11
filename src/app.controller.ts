import { Controller, Get, Render, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from './auth/jwt/jwt-auth.guard';

@ApiTags('Test')
@Controller()
export class AppController {
  
  @Get()
  @Render('index')
  test() {
    return { message: 'Hello, this is e-commerce website server!' }
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('/protected')
  testGuard(@Request() req) {
    return { mesage: 'It works!', request: req };
  }

}
