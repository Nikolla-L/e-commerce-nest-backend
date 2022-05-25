import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { CategorySchema } from 'src/schemas/category.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomService } from 'src/utils/CustomService';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Category', schema: CategorySchema }])
  ],
  controllers: [CategoryController],
  providers: [CategoryService, CustomService]
})
export class CategoryModule {}
