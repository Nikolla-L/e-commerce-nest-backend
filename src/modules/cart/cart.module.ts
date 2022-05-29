import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { CartSchema } from 'src/schemas/cart.schema';
import { ProductModule } from '../product/product.module';
import { CustomService } from 'src/utils/CustomService';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    ProductModule,
    MongooseModule.forFeature([{ name: 'Cart', schema: CartSchema }]),
    AuthModule
  ],
  controllers: [CartController],
  providers: [CartService, CustomService]
})
export class CartModule {}
