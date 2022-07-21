import { Controller, Headers, Get, Put, Body, Param, Delete, Query } from '@nestjs/common';
import { StaredProductService } from './stared-product.service';
import { CreateStaredProductDto } from './dto/create-stared-product.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AnyAuthenticated, IsAdmin } from '../auth/jwt/jwt-auth.guard';
import { StaredProductSearchDto } from './dto/stared-product-search.dto';

@ApiTags('Products')
@Controller('stared-product')
export class StaredProductController {
  constructor(private readonly staredProductService: StaredProductService) {}

  @ApiBearerAuth()
  @AnyAuthenticated()
  @ApiOperation({ summary: 'პროდუქტის ვარსკვლავებით შეფასება' })
  @Put()
  create(@Headers() headers, @Body() createStaredProductDto: CreateStaredProductDto) {
    return this.staredProductService.create(headers, createStaredProductDto);
  }

  @ApiBearerAuth()
  @IsAdmin()
  @ApiOperation({ summary: 'პროდუქტების შეფასებების სიის მიღება' })
  @Get()
  findAll(@Headers() headers, @Query() params: StaredProductSearchDto) {
    return this.staredProductService.findAll(headers, params);
  }

  @ApiBearerAuth()
  @IsAdmin()
  @ApiOperation({ summary: 'პროდუქტის შეფასების წაშლა' })
  @Delete(':id')
  remove(@Headers() headers, @Param('id') id: string) {
    return this.staredProductService.remove(headers, id);
  }
}
