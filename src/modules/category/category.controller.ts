import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { IsAdmin, Public } from '../auth/jwt/jwt-auth.guard';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiBearerAuth()
  @IsAdmin()
  @ApiOperation({ summary: 'კატეგორიის შექმნა' })
  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Public()
  @ApiOperation({ summary: 'კატეგორიების სიის მიღება' })
  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @ApiBearerAuth()
  @IsAdmin()
  @ApiOperation({ summary: 'კატეგორიის რედაქტირება' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update(id, updateCategoryDto);
  }

  @ApiBearerAuth()
  @IsAdmin()
  @ApiOperation({ summary: 'კატეგორიის წაშლა' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(id);
  }
}
