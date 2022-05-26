import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationParams } from 'src/utils/PaginationParams';
import { AnyAuthenticated, Public } from '../auth/jwt/jwt-auth.guard';
import { ProductSearchDto } from './dto/search-product.dto';

@ApiTags('Products')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  // @ApiBearerAuth()
  // @AnyAuthenticated()
  
  @Public()
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Public()
  @Get()
  findAll(@Query() params: ProductSearchDto) {
    return this.productService.findAll(params);
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @ApiBearerAuth()
  @AnyAuthenticated()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }

  @ApiBearerAuth()
  @AnyAuthenticated()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }
}
