import { Module } from '@nestjs/common';
import { StaredProductService } from './stared-product.service';
import { StaredProductController } from './stared-product.controller';
import { AuthModule } from '../auth/auth.module';
import { CustomService } from 'src/utils/CustomService';
import { MongooseModule } from '@nestjs/mongoose';
import { StaredProductSchema } from 'src/schemas/stared-product.schema';
import { ProductSchema } from 'src/schemas/product.schema';
import { ProductModule } from '../product/product.module';

@Module({
  imports: [
    AuthModule,
    ProductModule,
    MongooseModule.forFeature([
      { name: 'StaredProduct', schema: StaredProductSchema },
      { name: 'Product', schema: ProductSchema }
    ])
  ],
  controllers: [StaredProductController],
  providers: [
    StaredProductService,
    CustomService
  ]
})
export class StaredProductModule {}
