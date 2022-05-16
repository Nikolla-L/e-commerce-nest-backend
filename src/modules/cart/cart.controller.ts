import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PaginationParams } from 'src/utils/PaginationParams';
import { AnyAuthenticated } from '../auth/jwt/jwt-auth.guard';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

@ApiTags('Cart')
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @ApiBearerAuth()
  @AnyAuthenticated()
  @Post()
  create(@Body() createCartDto: CreateCartDto) {
    return this.cartService.add(createCartDto);
  }

  @ApiBearerAuth()
  @AnyAuthenticated()
  @Get()
  findAll(@Query() pagination: PaginationParams) {
    return this.cartService.findAll(pagination);
  }

  @ApiBearerAuth()
  @AnyAuthenticated()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cartService.findOne(id);
  }

  @ApiBearerAuth()
  @AnyAuthenticated()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
    return this.cartService.update(id, updateCartDto);
  }

  @ApiBearerAuth()
  @AnyAuthenticated()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cartService.remove(id);
  }
}
