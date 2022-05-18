import { Module } from '@nestjs/common';
import { DBModule } from './config/Database';
import { AppController } from './app.controller';
import { ProductModule } from './modules/product/product.module';
import { CartModule } from './modules/cart/cart.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { ClientMessageModule } from './modules/client-message/client-message.module';
import { AboutUsModule } from './modules/about-us/about-us.module';
import { ContactModule } from './modules/contact/contact.module';

@Module({
  imports: [
    DBModule,
    ProductModule,
    CartModule,
    UsersModule,
    AuthModule,
    ClientMessageModule,
    AboutUsModule,
    ContactModule
  ],
  controllers: [AppController]
})
export class AppModule {}
