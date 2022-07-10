import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SoldProduct, SoldProductDocument } from 'src/schemas/sold-product.schema';
import { CreateSoldProductDto } from './dto/create-sold-product.dto';
import { UpdateSoldProductDto } from './dto/update-sold-product.dto';

@Injectable()
export class SoldProductService {

  constructor(@InjectModel(SoldProduct.name) private soldProductModel: Model<SoldProductDocument>) { }

  create(createSoldProductDto: CreateSoldProductDto) {
    return 'This action adds a new soldProduct';
  }

  findAll() {
    return `This action returns all soldProduct`;
  }

  findUserProducts(id: string) {

  }

  findOne(id: string) {
    return `This action returns a #${id} soldProduct`;
  }

  update(id: string, updateSoldProductDto: UpdateSoldProductDto) {
    return `This action updates a #${id} soldProduct`;
  }

  remove(id: string) {
    return `This action removes a #${id} soldProduct`;
  }
}
