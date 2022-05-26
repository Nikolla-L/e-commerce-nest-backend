import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { ProductSchema } from 'src/schemas/product.schema';
import { CustomService } from 'src/utils/CustomService';
import { CategoryService } from '../category/category.service';
import { CategorySchema } from 'src/schemas/category.schema';

@Module({
  imports: [MongooseModule.forFeature([
    { name: 'Product', schema: ProductSchema },
    { name: 'Category', schema: CategorySchema }
  ])],
  controllers: [ProductController],
  providers: [
    ProductService,
    CustomService,
    CategoryService
  ],
  exports: [ProductService]
})
export class ProductModule {}
