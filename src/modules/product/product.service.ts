import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from 'src/schemas/product.schema';
import { PaginationParams } from 'src/utils/PaginationParams';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {

  constructor(@InjectModel(Product.name) private productModel: Model<ProductDocument>) { }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const createdProduct = await new this.productModel(createProductDto);
    return createdProduct.save();
  }

  async findAll(pagination: PaginationParams): Promise<any> {
    return await this.productModel.find().skip(pagination.page).limit(pagination.size).exec();
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
