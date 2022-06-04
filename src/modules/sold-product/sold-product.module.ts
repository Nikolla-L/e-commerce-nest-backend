import { Module } from '@nestjs/common';
import { SoldProductService } from './sold-product.service';
import { SoldProductController } from './sold-product.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { soldProductSchema } from 'src/schemas/sold-product.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'SoldProduct', schema: soldProductSchema }])],
  controllers: [SoldProductController],
  providers: [SoldProductService]
})
export class SoldProductModule {}
