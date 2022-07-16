import { Module } from '@nestjs/common';
import { FavoriteProductsService } from './favorite-products.service';
import { FavoriteProductsController } from './favorite-products.controller';

@Module({
  controllers: [FavoriteProductsController],
  providers: [FavoriteProductsService]
})
export class FavoriteProductsModule {}
