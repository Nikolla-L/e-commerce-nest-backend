import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { SoldProductService } from './sold-product.service';
import { CreateSoldProductDto } from './dto/create-sold-product.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { IsAdmin, Public } from '../auth/jwt/jwt-auth.guard';

@ApiTags('Sold Products - development')
@Controller('sold-product')
export class SoldProductController {

  constructor(private readonly soldProductService: SoldProductService) { }
  
  @ApiBearerAuth()
  @ApiOperation({ summary: 'პროდუქტის ყიდვა' })
  @Post()
  create(@Body() createSoldProductDto: CreateSoldProductDto) {
    return this.soldProductService.create(createSoldProductDto);
  }

  @Public()
  // @IsAdmin()
  @ApiOperation({ summary: 'ყველა გაყიდული პროდუქტიის სიის მიღება' })
  @Get()
  findAll() {
    return this.soldProductService.findAll();
  }

  @Public()
  @ApiOperation({ summary: 'მომხმარებლის მიერ ნაყიდი პროდუქტების სიის მიღება' })
  @Get(':id')
  findUserProducts(@Param('id') id: string) {
    return this.soldProductService.findUserProducts(id);
  }

  @Public()
  // @IsAdmin()
  @ApiOperation({ summary: 'კონკრეტული გაყიდული პროდუქტის ნახვა' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.soldProductService.findOne(id);
  }

  @Public()
  // @IsAdmin()
  @ApiOperation({ summary: 'გაყიდული პროდუქტის წაშლა' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.soldProductService.remove(id);
  }
}
