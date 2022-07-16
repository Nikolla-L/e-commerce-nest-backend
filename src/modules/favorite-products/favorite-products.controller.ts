import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FavoriteProductsService } from './favorite-products.service';
import { CreateFavoriteProductDto } from './dto/create-favorite-product.dto';
import { UpdateFavoriteProductDto } from './dto/update-favorite-product.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Products')
@Controller('favorite-products')
export class FavoriteProductsController {
  constructor(private readonly favoriteProductsService: FavoriteProductsService) {}

  @Post()
  create(@Body() createFavoriteProductDto: CreateFavoriteProductDto) {
    return this.favoriteProductsService.create(createFavoriteProductDto);
  }

  @Get()
  findAll() {
    return this.favoriteProductsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.favoriteProductsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFavoriteProductDto: UpdateFavoriteProductDto) {
    return this.favoriteProductsService.update(+id, updateFavoriteProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.favoriteProductsService.remove(+id);
  }
}
