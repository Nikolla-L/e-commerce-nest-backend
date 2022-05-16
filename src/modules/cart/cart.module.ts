import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { CartSchema } from 'src/schemas/cart.schema';
import { ProductModule } from '../product/product.module';

@Module({
  imports: [
    ProductModule,
    MongooseModule.forFeature([{ name: 'Cart', schema: CartSchema }])
  ],
  controllers: [CartController],
  providers: [CartService]
})
export class CartModule {}
