import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AnyAuthenticated, Public } from '../auth/jwt/jwt-auth.guard';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';

@ApiTags('Contact')
@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @ApiBearerAuth()
  @AnyAuthenticated()
  @ApiOperation({ summary: 'საკონტაქტო ინფორმაციის დამატება' })
  @Post()
  create(@Body() createContactDto: CreateContactDto) {
    return this.contactService.create(createContactDto);
  }

  @Public()
  @ApiOperation({ summary: 'საკონტაქტო ინფორმაციის მიღება' })
  @Get()
  findAll() {
    return this.contactService.findAll();
  }

  @ApiBearerAuth()
  @AnyAuthenticated()
  @ApiOperation({ summary: 'საკონტაქტო ინფორმაციის რედაქტირება' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateContactDto: UpdateContactDto) {
    return this.contactService.update(id, updateContactDto);
  }

  @ApiBearerAuth()
  @AnyAuthenticated()
  @ApiOperation({ summary: 'საკონტაქტო ინფორმაციის წაშლა' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contactService.remove(id);
  }
}
