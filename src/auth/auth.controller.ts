import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { UserDto } from './dto/user.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) { }

  @Post('login')
  login(@Body() userDto: UserDto) {
    return this.authService.loginWithCredentials(userDto)
  }
}
