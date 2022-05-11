import { Module } from '@nestjs/common';
import { DBModule } from './config/Database';
import { AppController } from './app.controller';
import { ProductModule } from './product/product.module';
import { CartModule } from './cart/cart.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    DBModule,
    ProductModule,
    CartModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController]
})
export class AppModule {}
