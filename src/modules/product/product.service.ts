import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from 'src/schemas/product.schema';
import { CustomService } from 'src/utils/CustomService';
import { CustomValidation } from 'src/utils/CustomValidator';
import { PaginationParams } from 'src/utils/PaginationParams';
import { CategoryService } from '../category/category.service';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductSearchDto } from './dto/search-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {

  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    private categoryService: CategoryService,
    private validation: CustomValidation,
    private customService: CustomService
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

  async getMostView(pagination: PaginationParams) {
    const result = await this.productModel.find()
                                        .sort({views: -1})
                                        .skip(pagination.page)
                                        .limit(pagination.size) 
                                        .exec();
    const count = await this.productModel.find().count();
    const totalPages = await Math.ceil(count / pagination.size);
    return {result, totalPages, count};
  }

  async findOne(id: string): Promise<Product> {
    await this.validation.validateIdType(id);
    const product = await this.productModel.findOne({_id: id}).exec();
    if(product) {
      let currentViews = product.views || 0;
      await this.productModel.findByIdAndUpdate(id, {views: currentViews + 1}, { useFindAndModify: false }).exec();
      return product;
    }
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    await this.customService.findAndUpdate(id, this.productModel, updateProductDto);
  }

  async remove(id: string) {
    await this.customService.findAndDelete(id, this.productModel);
  }
  
}
