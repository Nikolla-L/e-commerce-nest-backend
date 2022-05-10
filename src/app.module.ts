import { Module } from '@nestjs/common';
import { DBModule } from './config/Database';
import { AppController } from './app.controller';
import { ProductModule } from './product/product.module';
import { CartModule } from './cart/cart.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    DBModule,
    ProductModule,
    CartModule,
    UsersModule
  ],
  controllers: [AppController]
})
export class AppModule {}
