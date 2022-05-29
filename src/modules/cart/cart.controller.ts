import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Headers } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PaginationParams } from 'src/utils/PaginationParams';
import { AnyAuthenticated, Public } from '../auth/jwt/jwt-auth.guard';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

@ApiTags('Cart')
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  // ფილტრი სახელით
  // დამმატებელი იუზერი
  // TODO
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
  findAll(@Query() pagination: PaginationParams) {
    return this.cartService.findAll(pagination);
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
  update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
    return this.cartService.update(id, updateCartDto);
  }

  @ApiBearerAuth()
  @AnyAuthenticated()
  @ApiOperation({ summary: 'პროდუქტის წაშლა ქარტიდან' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cartService.remove(id);
  }
}
