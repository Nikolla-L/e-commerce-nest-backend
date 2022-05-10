import { Controller, Get, Render } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller()
export class AppController {
  
  @Get()
  @ApiTags('Start')
  @Render('index')
  root() {
    return { message: 'Hello, this is e-commerce website server!' }
  }
}
