import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
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
  @ApiOperation({ summary: 'ინფორმაციის დამატება "ჩვენს შესახებ" სექციაში' })
  @Post()
  create(@Body() createAboutUsDto: CreateAboutUsDto) {
    return this.aboutUsService.create(createAboutUsDto);
  }

  @Public()
  @ApiOperation({ summary: '"ჩვენს შესახებ" ინფორმაციის მიღება' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.aboutUsService.findOne(id);
  }

  @ApiBearerAuth()
  @AnyAuthenticated()
  @ApiOperation({ summary: '"ჩვენს შესახებ" ინფორმაციის რედაქტირება' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAboutUsDto: UpdateAboutUsDto) {
    return this.aboutUsService.update(id, updateAboutUsDto);
  }

  @ApiBearerAuth()
  @AnyAuthenticated()
  @ApiOperation({ summary: '"ჩვენს შესახებ" ინფორმაციის წაშლა' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.aboutUsService.remove(id);
  }
}
