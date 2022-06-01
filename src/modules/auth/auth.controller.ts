import { Controller, Post, Body } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { UserDto } from './dto/user.dto';
import { Public } from './jwt/jwt-auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) { }

  @Public()
  @ApiOperation({ summary: 'ავტორიზაცია' })
  @Post('login')
  login(@Body() userDto: UserDto) {
    return this.authService.loginWithCredentials(userDto)
  }
}
