import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { SubscribersService } from './subscribers.service';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { AnyAuthenticated, Public } from '../auth/jwt/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PaginationParams } from 'src/utils/PaginationParams';

@ApiTags('Subscribers')
@Controller('subscribers')
export class SubscribersController {
  constructor(private readonly subscribersService: SubscribersService) {}

  @Public()
  @ApiOperation({ summary: 'მომხმარებლის მიერ სიახლეების გამოწერა' })
  @Post()
  create(@Body() createSubscriberDto: CreateSubscriberDto) {
    return this.subscribersService.create(createSubscriberDto);
  }

  @ApiBearerAuth()
  @AnyAuthenticated()
  @ApiOperation({ summary: 'გამომწერთა სიის მიღება' })
  @Get()
  findAll(@Query() pagination: PaginationParams) {
    return this.subscribersService.findAll(pagination);
  }

  @ApiBearerAuth()
  @AnyAuthenticated()
  @ApiOperation({ summary: 'გამომწერის წაშლა' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subscribersService.remove(id);
  }
}
