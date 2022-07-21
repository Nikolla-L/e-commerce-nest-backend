import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IncomingHttpHeaders } from 'http';
import { Model } from 'mongoose';
import { Product, ProductDocument } from 'src/schemas/product.schema';
import { StaredProduct, StaredProductDocument } from 'src/schemas/stared-product.schema';
import { CustomService } from 'src/utils/CustomService';
import { AuthService } from '../auth/auth.service';
import { CreateStaredProductDto } from './dto/create-stared-product.dto';
import { StaredProductSearchDto } from './dto/stared-product-search.dto';
import { UpdateStaredProductDto } from './dto/update-stared-product.dto';

@Injectable()
export class StaredProductService {

  constructor(
    @InjectModel(StaredProduct.name) private staredProductModel: Model<StaredProductDocument>,
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    private authService: AuthService,
    private service: CustomService
  ) { }

  async create(headers: IncomingHttpHeaders, createStaredProductDto: CreateStaredProductDto): Promise<any> {
    const userData = await this.authService.getUsersCredentials(headers);
    await this.service.validateId(createStaredProductDto.productId, this.productModel);
    const addedProduct = await new this.staredProductModel({userId: userData.sub, ...createStaredProductDto});
    return addedProduct.save();
  }

  async findAll(headers: IncomingHttpHeaders, params: StaredProductSearchDto): Promise<any> {
    const userData = await this.authService.getUsersCredentials(headers);
    if(userData) {
      const userId = userData.sub;
      let staredProducts = await this.service.getPaginatedAll(this.staredProductModel, params, {userId: userId, ...params});
      if(staredProducts) {
        return await staredProducts;
      }
    }
  }

  async remove(headers: IncomingHttpHeaders, id: string) {
    await this.service.validateId(id, this.staredProductModel);
    return await this.staredProductModel.deleteOne({_id: id}).exec();
  }

  async findOne(): Promise<StaredProduct | string> {
    return await 'should be single stared product';
  }
}
