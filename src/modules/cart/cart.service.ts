import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductService } from '../product/product.service';
import { Cart, CartDocument } from 'src/schemas/cart.schema';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { PaginationParams } from 'src/utils/PaginationParams';
import { CustomService } from 'src/utils/CustomService';
import { AuthService } from '../auth/auth.service';
import { IncomingHttpHeaders } from 'http';

@Injectable()
export class CartService {

  constructor(
    @InjectModel(Cart.name) private cartModel: Model<CartDocument>,
    private productService: ProductService,
    private service: CustomService,
    private authService: AuthService
  ) { }

  async add(headers: IncomingHttpHeaders, createCartDto: CreateCartDto): Promise<Cart> {
    const userData = await this.authService.getUsersCredentials(headers);
    const product = await this.productService.findOne(createCartDto.productId);

    // TOFO -- INVALID VALIDATION
    if(!product) {
      throw new NotFoundException(`Product not found with id ${createCartDto.productId}`);
    }

    const addedProduct = await new this.cartModel({userId: userData.sub, ...createCartDto});
    return addedProduct.save();
  }

  async findAll(pagination: PaginationParams): Promise<any> {
    return await this.service.getPaginatedAll(this.cartModel, pagination);
  }

  async findOne(id: string): Promise<Cart> {
    return await this.cartModel.findOne({_id: id}).exec();
  }

  async update(id: string, updateCartDto: UpdateCartDto) {
    const item = await this.findOne(id);
    if(!item) {
      throw new NotFoundException(`Cart item not found with id ${id}`);
    }
    return await this.cartModel.findByIdAndUpdate(id, { ...updateCartDto }, { useFindAndModify: false }).exec();
  }

  async remove(id: string) {
    const item = await this.findOne(id);
    if(!item) {
      throw new NotFoundException(`Cart item not found with id ${id}`);
    }
    return await this.cartModel.deleteOne({_id: id}).exec();
  }
}
