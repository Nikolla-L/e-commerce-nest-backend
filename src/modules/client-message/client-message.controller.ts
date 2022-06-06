import { Controller, Get, Post, Body, Param, Delete, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PaginationParams } from 'src/utils/PaginationParams';
import { IsAdmin, Public } from '../auth/jwt/jwt-auth.guard';
import { ClientMessageService } from './client-message.service';
import { CreateClientMessageDto } from './dto/create-client-message.dto';

@ApiTags('Client Message')
@Controller('client-message')
export class ClientMessageController {
  constructor(private readonly clientMessageService: ClientMessageService) {}

  @Public()
  @ApiOperation({ summary: 'მომხმარებლის მიერ შეტყობინების გაგზავნა' })
  @Post()
  create(@Body() createClientMessageDto: CreateClientMessageDto) {
    return this.clientMessageService.add(createClientMessageDto);
  }

  @ApiBearerAuth()
  @IsAdmin()
  @ApiOperation({ summary: 'მომხმარებლების გამოგზავნილი შეტყობინებების მიღება' })
  @Get()
  findAll(@Query() pagination: PaginationParams) {
    return this.clientMessageService.findAll(pagination);
  }

  @ApiBearerAuth()
  @IsAdmin()
  @ApiOperation({ summary: 'მომხმარებლის გამოგზავნილი შეტყობინების წაშლა' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clientMessageService.remove(id);
  }
}
