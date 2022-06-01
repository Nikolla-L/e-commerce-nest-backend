import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AnyAuthenticated, Public } from '../auth/jwt/jwt-auth.guard';
import { ProductSearchDto } from './dto/search-product.dto';

@ApiTags('Products')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  
  @ApiBearerAuth()
  @AnyAuthenticated()
  @ApiOperation({ summary: 'პროდუქტის შექმნა' })
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  // TODO - ფასების ფილტრის დამატება
  @Public()
  @ApiOperation({ summary: 'პროდუქტების სიის მიღება, გაფილტვრა' })
  @Get()
  findAll(@Query() params: ProductSearchDto) {
    return this.productService.findAll(params);
  }

  @Public()
  @ApiOperation({ summary: 'ცალკეული პროდუქტის დათვალიერება' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @ApiBearerAuth()
  @AnyAuthenticated()
  @ApiOperation({ summary: 'პროდუქტის რედაქტირება' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }

  @ApiBearerAuth()
  @AnyAuthenticated()
  @ApiOperation({ summary: 'პროდუქტის წაშლა' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }
}
