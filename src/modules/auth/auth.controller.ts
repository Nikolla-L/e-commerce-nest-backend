import { Controller, Post, Body, Delete, Req } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
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
    return this.authService.loginWithCredentials(userDto);
  }

  @Public()
  @ApiOperation({ summary: 'სისტემიდან გასვლა' })
  @Delete('logout')
  logout(@Req() request) {
    return this.authService.logout(request);
  }

  @Public()
  @ApiOperation({ summary: 'მომხმარებლის შექმნა, რეგისტრაცია' })
  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

}
