import { Controller, Get, Post, Body, Param, Delete, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PaginationParams } from 'src/utils/PaginationParams';
import { AnyAuthenticated, Public } from '../auth/jwt/jwt-auth.guard';
import { ClientMessageService } from './client-message.service';
import { CreateClientMessageDto } from './dto/create-client-message.dto';

@ApiTags('Client Message')
@Controller('client-message')
export class ClientMessageController {
  constructor(private readonly clientMessageService: ClientMessageService) {}

  @Public()
  @Post()
  create(@Body() createClientMessageDto: CreateClientMessageDto) {
    return this.clientMessageService.add(createClientMessageDto);
  }

  @ApiBearerAuth()
  @AnyAuthenticated()
  @Get()
  findAll(@Query() pagination: PaginationParams) {
    return this.clientMessageService.findAll(pagination);
  }

  @ApiBearerAuth()
  @AnyAuthenticated()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clientMessageService.remove(id);
  }
}
