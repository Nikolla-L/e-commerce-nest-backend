import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public, IsAdmin} from '../auth/jwt/jwt-auth.guard';
import { AboutUsService } from './about-us.service';
import { CreateAboutUsDto } from './dto/create-about-us.dto';
import { UpdateAboutUsDto } from './dto/update-about-us.dto';

@ApiTags('About Us')
@Controller('about-us')
export class AboutUsController {
  constructor(private readonly aboutUsService: AboutUsService) {}

  @ApiBearerAuth()
  @IsAdmin()
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
  @IsAdmin()
  @ApiOperation({ summary: '"ჩვენს შესახებ" ინფორმაციის რედაქტირება' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAboutUsDto: UpdateAboutUsDto) {
    return this.aboutUsService.update(id, updateAboutUsDto);
  }

  @ApiBearerAuth()
  @IsAdmin()
  @ApiOperation({ summary: '"ჩვენს შესახებ" ინფორმაციის წაშლა' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.aboutUsService.remove(id);
  }
}
