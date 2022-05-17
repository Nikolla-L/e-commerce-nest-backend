import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AnyAuthenticated, Public } from '../auth/jwt/jwt-auth.guard';
import { AboutUsService } from './about-us.service';
import { CreateAboutUsDto } from './dto/create-about-us.dto';
import { UpdateAboutUsDto } from './dto/update-about-us.dto';

@ApiTags('About Us')
@Controller('about-us')
export class AboutUsController {
  constructor(private readonly aboutUsService: AboutUsService) {}

  @ApiBearerAuth()
  @AnyAuthenticated()
  @Post()
  create(@Body() createAboutUsDto: CreateAboutUsDto) {
    return this.aboutUsService.create(createAboutUsDto);
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.aboutUsService.findOne(id);
  }

  @ApiBearerAuth()
  @AnyAuthenticated()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAboutUsDto: UpdateAboutUsDto) {
    return this.aboutUsService.update(id, updateAboutUsDto);
  }

  @ApiBearerAuth()
  @AnyAuthenticated()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.aboutUsService.remove(id);
  }
}
