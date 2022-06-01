import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Headers } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AnyAuthenticated } from '../auth/jwt/jwt-auth.guard';
import { CartService } from './cart.service';
import { CartProductSearchDto } from './dto/cart-product-search.dto';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

@ApiTags('Cart')
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @ApiBearerAuth()
  @AnyAuthenticated()
  @ApiOperation({ summary: 'პროდუქტის ქარტში დამატება' })
  @Post()
  create(@Headers() headers, @Body() createCartDto: CreateCartDto) {
    return this.cartService.add(headers, createCartDto);
  }

  @ApiBearerAuth()
  @AnyAuthenticated()
  @ApiOperation({ summary: 'ქარტის პროდუქტების სიის მიღება' })
  @Get()
  findAll(@Headers() headers, @Query() params: CartProductSearchDto) {
    return this.cartService.findAll(headers, params);
  }

  @ApiBearerAuth()
  @AnyAuthenticated()
  @ApiOperation({ summary: 'ცალკეული პროდუქტის დათვალიერება' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cartService.findOne(id);
  }

  @ApiBearerAuth()
  @AnyAuthenticated()
  @ApiOperation({ summary: 'ქარტის პროდუქტის რედაქტირება' })
  @Patch(':id')
  update(
    @Headers() headers,
    @Param('id') id: string,
    @Body() updateCartDto: UpdateCartDto
  ) {
    return this.cartService.update(headers, id, updateCartDto);
  }

  @ApiBearerAuth()
  @AnyAuthenticated()
  @ApiOperation({ summary: 'პროდუქტის წაშლა ქარტიდან' })
  @Delete(':id')
  remove(@Headers() headers, @Param('id') id: string) {
    return this.cartService.remove(headers, id);
  }
}
