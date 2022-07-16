import { Controller, Get, Put, Body, Param, Delete } from '@nestjs/common';
import { StaredProductService } from './stared-product.service';
import { CreateStaredProductDto } from './dto/create-stared-product.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { IsAdmin } from '../auth/jwt/jwt-auth.guard';

@ApiTags('Products')
@Controller('stared-product')
export class StaredProductController {
  constructor(private readonly staredProductService: StaredProductService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'პროდუქტის ვარსკვლავებით შეფასება' })
  @Put()
  create(@Body() createStaredProductDto: CreateStaredProductDto) {
    return this.staredProductService.create(createStaredProductDto);
  }

  @ApiBearerAuth()
  @IsAdmin()
  @ApiOperation({ summary: 'პროდუქტების შეფასებების სიის მიღება' })
  @Get()
  findAll() {
    return this.staredProductService.findAll();
  }

  @ApiBearerAuth()
  @IsAdmin()
  @ApiOperation({ summary: 'პროდუქტის შეფასების წაშლა' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.staredProductService.remove(+id);
  }
}
