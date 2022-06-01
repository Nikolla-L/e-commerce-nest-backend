import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from 'src/schemas/product.schema';
import { CategoryService } from '../category/category.service';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductSearchDto } from './dto/search-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {

  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    private categoryService: CategoryService
  ) { }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    await this.categoryService.validateCategoryId(createProductDto.categoryId);
    
    const createdProduct = await new this.productModel(createProductDto);
    return createdProduct.save();
  }

  async findAll(params: ProductSearchDto): Promise<any> {
    let query = {...params, price: { $gt: params?.minPrice-1 || -1, $lt: params?.maxPrice+1 || 1000000000000}};
    if(Number(params?.minPrice) > Number(params?.maxPrice)) {
      throw new BadRequestException('Price range is incorrect');
    }
    
    const result = await this.productModel.find(query).skip(params.page).limit(params.size).exec();
    const count = await this.productModel.find(query).count();
    const totalPages = await Math.ceil(count / params.size);
    return {result, totalPages, count};
  }

  async findOne(id: string): Promise<Product> {
    return await this.productModel.findOne({_id: id}).exec();
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    return await this.productModel.findByIdAndUpdate(id, { ...updateProductDto }, { useFindAndModify: false }).exec();
  }

  async remove(id: string) {
    return await this.productModel.deleteOne({ _id: id }).exec();
  }
  
}
