import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category, CategoryDocument } from 'src/schemas/category.schema';
import { CustomService } from 'src/utils/CustomService';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {

  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
    private service: CustomService
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const newCategory = await new this.categoryModel(createCategoryDto);
    return newCategory.save();
  }

  async findAll(): Promise<any> {
    return await this.categoryModel.find().exec();
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    await this.service.findAndUpdate(id, this.categoryModel, updateCategoryDto);
  }

  async remove(id: string) {
    return await this.service.findAndDelete(id, this.categoryModel);
  }

  async validateCategoryId(categoryId: number) {
    let categories = await this.findAll();
    let categoryIndex = categories.findIndex(category => category.categoryId === categoryId);

    if(categoryIndex == -1) {
      throw new BadRequestException(`Category with Id - ${categoryId} does not exist`);
    }
  }
}
