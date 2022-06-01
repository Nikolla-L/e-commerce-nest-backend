import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PaginationParams } from 'src/utils/PaginationParams';
import { AnyAuthenticated, Public } from '../auth/jwt/jwt-auth.guard';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // TODO --- ადმინის პრივილეგიის ან საკუთარი პროფილის ამოცნობის მოფიქრება და პროფილის დეაქტივაცია-ედიტირებაზე მიბმა

  @Public()
  @ApiOperation({ summary: 'მომხმარებლის შექმნა, რეგისტრაცია' })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.register(createUserDto);
  }

  @Public()
  @ApiOperation({ summary: 'მომხმარებელთა სიის მიღება' })
  @Get()
  findAll(@Query() pagination: PaginationParams) {
    return this.usersService.findAll(pagination);
  }

  @Public()
  @ApiOperation({ summary: 'ცალკეული მომხმარებლის ინფგორმაციის ნახვა, პროფილის დათვალიერება' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @ApiBearerAuth()
  @AnyAuthenticated()
  @ApiOperation({ summary: 'მომხმარებლის რედაქტირება, პროფილის რედაქტირება' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @ApiBearerAuth()
  @AnyAuthenticated()
  @ApiOperation({ summary: 'მომხმარებლის წაშლა, პროფილის წაშლა' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.delete(id);
  }
}
