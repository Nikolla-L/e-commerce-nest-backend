import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { StaredProduct, StaredProductDocument } from 'src/schemas/stared-product.schema';
import { CustomService } from 'src/utils/CustomService';
import { AuthService } from '../auth/auth.service';
import { CreateStaredProductDto } from './dto/create-stared-product.dto';
import { UpdateStaredProductDto } from './dto/update-stared-product.dto';

@Injectable()
export class StaredProductService {

  constructor(
    @InjectModel(StaredProduct.name) private staredProductModel: Model<StaredProductDocument>,
    private authService: AuthService,
    private service: CustomService
  ) { }

  async create(createStaredProductDto: CreateStaredProductDto): Promise<any> {
    return 'This action adds a new staredProduct';
  }

  findAll() {
    return `This action returns all staredProduct`;
  }

  findOne(id: number) {
    return `This action returns a #${id} staredProduct`;
  }

  update(id: number, updateStaredProductDto: UpdateStaredProductDto) {
    return `This action updates a #${id} staredProduct`;
  }

  remove(id: number) {
    return `This action removes a #${id} staredProduct`;
  }
}
